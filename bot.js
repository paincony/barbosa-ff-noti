const login = require("ws3-fca");
const axios = require("axios");

const BOX_ID = process.env.BOX_THREAD_ID;
let lastText = "";

login({appState: JSON.parse(process.env.FB_APPSTATE)}, (err, api) => {
  if(err) return console.error(err);
  console.log("Bot chạy rồi");
  setInterval(async () => {
    try {
      // check TikTok @emutechff qua API đơn giản
      const res = await axios.get("https://www.tiktok.com/@emutechff", {headers: {"User-Agent":"Mozilla"}});
      if(res.data.includes("barbosa") && res.data !== lastText){
        lastText = res.data.slice(0,100);
        api.sendMessage("Có video mới về Barbosa, check TikTok @emutechff đi ae!", BOX_ID);
      }
    } catch(e){ console.log("check lỗi", e.message) }
  }, 5*60*1000);
});
