import fs from "fs/promises";
import path from "path";

const HISTORY_DIR = path.join(process.cwd(), "sms-history");

const BASE_NUMBER = 72888610;
const MAX_NUMBERS = 9;
const LIMIT_PER_NUMBER = 500;

type SmsSlot = {
  date: string;
  fromNumber: string;
  count: number;
};

async function ensureDir() {
  await fs.mkdir(HISTORY_DIR, { recursive: true });
}

async function loadDailyFile(date: string): Promise<SmsSlot[]> {
  await ensureDir();

  const file = path.join(HISTORY_DIR, `${date}.json`);

  try {
    const txt = await fs.readFile(file, "utf8");
    return JSON.parse(txt);
  } catch {
    return [];
  }
}

async function saveDailyFile(date: string, data: SmsSlot[]) {
  await ensureDir();

  const file = path.join(HISTORY_DIR, `${date}.json`);

  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

export async function getTodaySlot(): Promise<SmsSlot> {
  const today = new Date().toISOString().slice(0, 10);

  let list = await loadDailyFile(today);

  if (list.length === 0) {
    const firstSlot: SmsSlot = {
      date: today,
      fromNumber: String(BASE_NUMBER),
      count: 0,
    };

    list = [firstSlot];

    await saveDailyFile(today, list);

    return firstSlot;
  }

  return list[list.length - 1];
}

export async function incrementSlot(): Promise<SmsSlot> {
  const today = new Date().toISOString().slice(0, 10);

  const list = await loadDailyFile(today);

  if (list.length === 0) {
    const firstSlot: SmsSlot = {
      date: today,
      fromNumber: String(BASE_NUMBER),
      count: 1,
    };

    list.push(firstSlot);

    await saveDailyFile(today, list);

    return firstSlot;
  }

  const currentIndex = list.length - 1;
  const currentSlot = list[currentIndex];

  if (currentSlot.count >= LIMIT_PER_NUMBER) {
    const nextNumber = String(BASE_NUMBER + (list.length % MAX_NUMBERS));

    const newSlot: SmsSlot = {
      date: today,
      fromNumber: nextNumber,
      count: 1,
    };

    list.push(newSlot);

    await saveDailyFile(today, list);

    return newSlot;
  }

  list[currentIndex].count += 1;

  await saveDailyFile(today, list);

  return list[currentIndex];
}

export async function sendSMS(phone: string, message: string) {
  const apiKey = "2dd4b85fb19d0af23afaab189b7ea290";

  if (!apiKey) {
    throw new Error("SMS_API_KEY not configured");
  }

  const baseUrl = "https://api-text.callpro.mn/v1/sms/send";

  const slot = await getTodaySlot();

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        from: slot.fromNumber,
        to: String(phone),
        text: message,
      }),
    });

    const rawText = await response.text();

    console.log("📨 SMS RAW RESPONSE:", rawText);

    let result: any;

    try {
      result = JSON.parse(rawText);
    } catch {
      throw new Error(`Invalid JSON response: ${rawText}`);
    }

    if (!response.ok) {
      throw new Error(
        result?.error || result?.reason || `HTTP ${response.status}`
      );
    }

    if (!result?.message_id) {
      throw new Error(`Invalid SMS response: ${rawText}`);
    }

    const updatedSlot = await incrementSlot();

    console.log(
      `✅ SMS sent from ${updatedSlot.fromNumber} (${updatedSlot.count}/${LIMIT_PER_NUMBER})`
    );

    return {
      success: true,
      messageId: result.message_id,
      status: result.status,
      fromNumber: updatedSlot.fromNumber,
      count: updatedSlot.count,
    };
  } catch (error: any) {
    console.error("❌ SMS SEND ERROR", {
      phone,
      error: error?.message,
    });

    throw error;
  }
}
