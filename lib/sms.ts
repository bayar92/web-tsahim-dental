import fs from "fs/promises";
import path from "path";

const HISTORY_DIR = path.join(process.cwd(), "sms-history");

const API_KEY = "2dd4b85fb19d0af23afaab189b7ea290";

const BASE_NUMBER = 72888610;
const LIMIT_PER_NUMBER = 500;

const BRAND_MAP: Record<string, number> = {
  uGiJQUeiwmJm1AHG: 198, // Evada Dent
  X8CLKeswvlaIcj5z: 197, // Shigtgemel Dent
  IS8uMR5hxGYVabgo: 199, // Sanora Dent
  eBlUoS3yAVX6TtqA: 200, // Vera Dent
};

type SmsSlot = {
  date: string;
  fromNumber: string;
  count: number;
};

function getBrandId(clinicId: string): number | "" {
  return BRAND_MAP[clinicId] ?? "";
}

async function ensureDir() {
  await fs.mkdir(HISTORY_DIR, {
    recursive: true,
  });
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
  const file = path.join(HISTORY_DIR, `${date}.json`);

  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

async function getTodaySlot() {
  const today = new Date().toISOString().slice(0, 10);

  const list = await loadDailyFile(today);

  if (list.length === 0) {
    const slot = {
      date: today,
      fromNumber: String(BASE_NUMBER),
      count: 0,
    };

    list.push(slot);

    await saveDailyFile(today, list);

    return slot;
  }

  return list[list.length - 1];
}

async function incrementSlot() {
  const today = new Date().toISOString().slice(0, 10);

  const list = await loadDailyFile(today);

  if (list.length === 0) {
    const slot = {
      date: today,
      fromNumber: String(BASE_NUMBER),
      count: 1,
    };

    list.push(slot);

    await saveDailyFile(today, list);

    return slot;
  }

  const currentIndex = list.length - 1;

  if (list[currentIndex].count >= LIMIT_PER_NUMBER) {
    const nextNumber = String(BASE_NUMBER + (list.length % 9));

    const newSlot = {
      date: today,
      fromNumber: nextNumber,
      count: 1,
    };

    list.push(newSlot);

    await saveDailyFile(today, list);

    return newSlot;
  }

  list[currentIndex].count++;

  await saveDailyFile(today, list);

  return list[currentIndex];
}

export async function sendSMS(
  phone: string | number,
  message: string,
  clinicId: string
) {
  const slot = await getTodaySlot();

  const brandId = getBrandId(clinicId);

  const body = {
    from: slot.fromNumber,
    to: String(phone),
    text: message,
    ...(brandId && { brand: String(brandId) }),
  };

  console.log(`📨 Sending SMS | Clinic=${clinicId} | Brand=${brandId}`);

  try {
    const response = await fetch("https://api-text.callpro.mn/v1/sms/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        from: slot.fromNumber,
        to: String(phone),
        text: message,
        brand: String(brandId),
      }),
    });

    const rawText = await response.text();

    console.log("📨 SMS RAW RESPONSE:", rawText);

    let result;

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
      `✅ SMS queued | Brand=${brandId} | From=${updatedSlot.fromNumber} | Count=${updatedSlot.count}/${LIMIT_PER_NUMBER}`
    );

    return {
      success: true,
      brandId,
      messageId: result.message_id,
      status: result.status,
      fromNumber: updatedSlot.fromNumber,
      count: updatedSlot.count,
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("❌ SMS SEND ERROR:", {
      clinicId,
      brandId,
      phone,
      error: errorMessage,
    });

    throw err;
  }
}
