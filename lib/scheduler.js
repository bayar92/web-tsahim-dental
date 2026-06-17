import cron from "node-cron";
import axios from "axios";

export function startScheduler() {
  // Өдөр бүр 18:00

  cron.schedule("25 07 * * *", async () => {
    try {
      console.log("⏰ Running afternoon reminder...");

      const response = await axios.get(
        "http://localhost:3000/api/send-reminder?type=afternoon"
      );

      console.log("✅ Afternoon reminder:", response.data);
    } catch (error) {
      console.error("❌ Afternoon reminder failed:", error?.message);
    }
  });

  // Өдөр бүр 18:30

  cron.schedule("30 07 * * *", async () => {
    try {
      console.log("⏰ Running tomorrow reminder...");

      const response = await axios.get(
        "http://localhost:3000/api/send-reminder?type=tomorning"
      );

      console.log("✅ Tomorrow reminder:", response.data);
    } catch (error) {
      console.error("❌ Tomorrow reminder failed:", error?.message);
    }
  });

  console.log("🚀 SMS Scheduler started");
}
