import fs from "fs/promises";
import path from "path";

const HISTORY_DIR = path.join(process.cwd(), "sms-history");

const BASE_NUMBER = 72888610;
const LIMIT_PER_NUMBER = 500;

async function ensureDir() {
  try {
    await fs.mkdir(HISTORY_DIR);
  } catch {}
}

async function loadDailyFile(date: string) {
  await ensureDir();

  const file = path.join(HISTORY_DIR, `${date}.json`);

  try {
    const txt = await fs.readFile(file, "utf8");
    return JSON.parse(txt);
  } catch {
    return [];
  }
}

async function saveDailyFile(date: string, data: any[]) {
  const file = path.join(HISTORY_DIR, `${date}.json`);

  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

async function getTodaySlot() {
  const today = new Date().toISOString().slice(0, 10);

  const list = await loadDailyFile(today);

  if (list.length === 0) {
    const fresh = {
      date: today,
      fromNumber: String(BASE_NUMBER),
      count: 0,
    };

    list.push(fresh);

    await saveDailyFile(today, list);

    return fresh;
  }

  return list[list.length - 1];
}

export async function incrementSlot() {
  const today = new Date().toISOString().slice(0, 10);

  const list = await loadDailyFile(today);

  let slot = await getTodaySlot();

  if (slot.count >= LIMIT_PER_NUMBER) {
    const slotIndex = list.length;

    const nextNumber = String(BASE_NUMBER + (slotIndex % 9));

    const newSlot = {
      date: today,
      fromNumber: nextNumber,
      count: 1,
    };

    list.push(newSlot);

    await saveDailyFile(today, list);

    return newSlot;
  }

  slot.count += 1;

  await saveDailyFile(today, list);

  return slot;
}

export async function sendSMS(phone: string, message: string) {
  const apiKey = "2dd4b85fb19d0af23afaab189b7ea290";

  const baseUrl = "https://api-text.callpro.mn/v1/sms/send";

  const todaySlot = await getTodaySlot();

  try {
    const resp = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        from: todaySlot.fromNumber,
        to: String(phone),
        text: message,
      }),
    });

    const rawText = await resp.text();

    console.log("SMS RAW RESPONSE:", rawText);

    let result: any;

    try {
      result = JSON.parse(rawText);
      console.log(result);
    } catch {
      throw new Error(`Invalid JSON response: ${rawText}`);
    }

    if (!resp.ok) {
      throw new Error(result?.error || result?.reason || `HTTP ${resp.status}`);
    }

    if (!result?.message_id) {
      throw new Error(`Invalid SMS response: ${rawText}`);
    }

    const updatedSlot = await incrementSlot();

    return {
      success: true,
      messageId: result.message_id,
      status: result.status,
      slot: updatedSlot,
    };
  } catch (err: any) {
    console.error("❌ SMS SEND ERROR:", {
      phone,
      error: err?.message,
    });

    throw err;
  }
}
