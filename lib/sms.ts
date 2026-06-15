import fs from "fs/promises";
import path from "path";

const HISTORY_DIR = path.join(process.cwd(), "sms-history");

const BASE_NUMBER = 72888610;
const LIMIT_PER_NUMBER = 500;
const API_KEY = "2dd4b85fb19d0af23afaab189b7ea290";

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

async function getTodaySlot() {
  const today = new Date().toISOString().slice(0, 10);

  let list = await loadDailyFile(today);

  if (list.length === 0) {
    const firstSlot = {
      date: today,
      fromNumber: String(BASE_NUMBER),
      count: 0,
    };

    list.push(firstSlot);

    await saveDailyFile(today, list);

    return firstSlot;
  }

  return list[list.length - 1];
}

async function incrementSlot() {
  const today = new Date().toISOString().slice(0, 10);

  const list = await loadDailyFile(today);

  if (list.length === 0) {
    const firstSlot = {
      date: today,
      fromNumber: String(BASE_NUMBER),
      count: 1,
    };

    list.push(firstSlot);

    await saveDailyFile(today, list);

    return firstSlot;
  }

  const currentIndex = list.length - 1;

  if (list[currentIndex].count >= LIMIT_PER_NUMBER) {
    const newSlot = {
      date: today,
      fromNumber: String(BASE_NUMBER + (list.length % 9)),
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

export async function sendSMS(phone: string | number, message: string) {
  const slot = await getTodaySlot();

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
    throw new Error(`message_id missing: ${rawText}`);
  }

  const updatedSlot = await incrementSlot();

  console.log(
    `📨 SMS queued | From=${updatedSlot.fromNumber} | Count=${updatedSlot.count}/${LIMIT_PER_NUMBER}`
  );

  return {
    success: true,
    messageId: result.message_id,
    status: result.status,
  };
}
