import cron from "node-cron";
import axios from "axios";

export function startScheduler() {
  // Өглөө 10 цагтimport cron from 'node-cron';

  cron.schedule("0 11 * * *", async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/send-reminder?type=afternoon",
        {
          headers: {
            "x-forwarded-proto": "https",
          },
        }
      );
      console.log("✅ SMS reminder response:", response.data);
    } catch (err) {
      if (err instanceof Error) {
        console.error("❌ Error:", err.message);
      } else {
        console.error("❌ Unknown error", err);
      }
    }
  });

  // Орой 18 цагт
  cron.schedule("0 10 * * *", async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/send-reminder?type=tomorning",
        {
          headers: {
            "x-forwarded-proto": "https",
          },
        }
      );
      console.log("✅ SMS reminder response:", response.data);
    } catch (err) {
      if (err instanceof Error) {
        console.error("❌ Error:", err.message);
      } else {
        console.error("❌ Unknown error", err);
      }
    }
  });

  console.log("⏰ Cron jobs scheduled");
}
