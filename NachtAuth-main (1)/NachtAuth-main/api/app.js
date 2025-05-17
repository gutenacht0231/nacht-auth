const express = require('express');
const axios = require('axios');
const app = express();
const port = 1000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

const data = [
];

app.post('/add-session', (req , res) => {
    username = req.body.username;
    networth = req.body.networth;
    session = req.body.session;
  
    if (!["username", "networth", "session"].every(field => req.body.hasOwnProperty(field))) {
      return res.send("Bad Request");
    }
  
    getUUID(username).then(uuid => {
      if (uuid == null) {
        return res.send("Unable to get uuid");
      }
      checkvalid(session, uuid).then(valid => {
        if (!valid) {
          return res.send("Unable to validate session");
        }

        for (let i = 0; i < data.length; i++) {
            if (data[i][0] == username) {
                return res.send("Unable to add session");
            }
        }

        data.push([username, networth, session]);
        res.send("OK");
      });
    });
  });

app.get('/api', (req, res) => {
    // check if every session is valid
    for (let i = 0; i < data.length; i++) {
        getUUID(data[i][0]).then(uuid => {
            if (uuid == null) {
                data.splice(i, 1);
                return;
            }
            checkvalid(data[i][2], uuid).then(valid => {
                if (!valid) {
                    data.splice(i, 1);
                    return;
                }})
        })};
    res.json(data);
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});

async function getUUID(username) {
    try {
      const response = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`);
      const uuid = response.data.id;
      return uuid;
    } catch (error) {
      return null;
    }
  }
  
  async function checkvalid(session, uuid) {
    try {
      const response = await axios.post("https://sessionserver.mojang.com/session/minecraft/join", JSON.stringify({
        accessToken: session,
        selectedProfile: uuid,
        serverId: uuid
      }),
      {
        headers : {
          "Content-Type": "application/json"
        }
      });
      if (response.status == 204){
        return true;
      }
    } catch (error) {
      return false;
    }
  }