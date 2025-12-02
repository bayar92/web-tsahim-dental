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

    const slotIndex = list.length; // 0–∞
    const nextNumber = String(BASE_NUMBER + (slotIndex % 9)); // 0–8 давтан

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
  const baseUrl = "https://api.messagepro.mn/send";

  const todaySlot = await getTodaySlot();

  const url =
    `${baseUrl}?key=${encodeURIComponent(apiKey)}` +
    `&from=${encodeURIComponent(todaySlot.fromNumber)}` +
    `&to=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(message)}`;

  const resp = await fetch(url, { method: "GET" });
  const result = await resp.json();

  if (!resp.ok || result[0].Result !== "SUCCESS") {
    throw new Error(result[0].Reason || "SMS error");
  }

  const updatedSlot = await incrementSlot();

  return {
    ...result[0],
    slot: updatedSlot,
  };
}
