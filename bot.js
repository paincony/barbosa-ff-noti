const login = require("fb-chat-api");
const TikTokScraper = require("tiktok-scraper");

const TIKTOK_USER = "emutechff";
const CHECK_MIN = 5;
let lastId = "";

login({appState: JSON.parse(process.env.FB_APPSTATE)}, (err, api) => {
  if(err) throw err;
  api.setOptions({listenSelf: false});
  setInterval(async () => {
    try {
      const posts = await TikTokScraper.getUserPosts(TIKTOK_USER);
      const newest = posts.collector[0];
      if(newest && newest.id !== lastId && newest.text.toLowerCase().includes("barbosa")){
        lastId = newest.id;
        api.sendMessage(`Barbosa mới: ${newest.text}\nhttps://tiktok.com/@${TIKTOK_USER}/video/${newest.id}`, process.env.BOX_THREAD_ID);
      }
    } catch(e){ console.log(e.message); }
  }, CHECK_MIN*60*1000);
});