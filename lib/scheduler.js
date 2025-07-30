import cron from 'node-cron';
import axios from 'axios';

export function startScheduler() {
  // Өглөө 10 цагтimport cron from 'node-cron';

  cron.schedule('* 12 * * *', async () => {
    // try {
    //   const response = await axios.get('https://edental.mn:3000/api/send-reminder?type=afternoon', {
    //     headers: {
    //       'x-forwarded-proto': 'https'
    //     }
    //   });
    //   console.log('✅ SMS reminder response:', response.data);
    // } catch (err) {
    //     if (err instanceof Error) {
    //         console.error('❌ Error:', err.message);
    //     } else {
    //         console.error('❌ Unknown error', err);
    //     }
    // }
  });

  console.log('⏰ [Scheduler] Initialized at',new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Ulaanbaatar' }));
  process.env.TZ = 'Asia/Ulaanbaatar';

  cron.schedule('* * * * *', () => {
    console.log(
      '🔥 Cron working at:',
      new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Ulaanbaatar' })
    );
  });
  
  console.log('✅ Cron 1 мин тутам ажиллалаа:', new Date().toLocaleTimeString());
  // Орой 20 цагт
  cron.schedule('* 20 * * *', async () => {
    // try {
    //   const response = await axios.get('https://edental.mn:3000/api/send-reminder?type=tomorning', {
    //     headers: {
    //       'x-forwarded-proto': 'https'
    //     }
    //   });
    //   console.log('✅ SMS reminder response:', response.data);
    // } catch (err) {
    //     if (err instanceof Error) {
    //         console.error('❌ Error:', err.message);
    //     } else {
    //         console.error('❌ Unknown error', err);
    //     }
    // }
  });

  console.log('⏰ Cron jobs scheduled');
}
