const axios = require("axios");
const { getNetworth } = require("skyhelper-networth");
const networthParser = require("./networthParser.js");
const config = require('../config.json');
const apiKey = config.networth.apiKey;

async function networthCalc(uuid) {
    const apiUrl = "https://api.hypixel.net/skyblock/profiles";
    const response = await axios.get(apiUrl, {
      params: { key: apiKey, uuid },
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });

    const data = response.data;
    if (!data.success) {
      return;
    }
    if (data.profiles == null) {
      return ["0", "No profile data found. 🙁"];
    }
    let richestProfile;
    try {
    for (let i = 0; i < data.profiles.length; i++) {
    
      let profile = data.profiles[i];
      let bank = profile.banking?.balance;
      let profileNetworth = await getNetworth(profile["members"][uuid], bank);
      if (richestProfile == null) {
        richestProfile = profileNetworth;
      } else if (richestProfile.unsoulboundNetworth < profileNetworth.unsoulboundNetworth) {
        richestProfile = profileNetworth;
        }
      } 
    }catch(error){
      console.log(error);
      return null;
    }
    const description = await networthParser(richestProfile);
    return [richestProfile["unsoulboundNetworth"], richestProfile["networth"], description];
}

module.exports = networthCalc;