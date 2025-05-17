import discord
from discord.ext import commands
import json

with open("../config.json") as f:
    config = json.load(f)

# set the token to the token in the config file
token = config["discord"]["bot_token"]
client = commands.Bot()

@client.event
async def on_ready():
    print("Bot is ready")

@client.slash_command(name="setup", description="⚠️ THIS WILL DELETE ALL CHANNELS IN THE SERVER ⚠️")
async def setup(ctx, *, oauth: str):
    for channel in ctx.guild.channels:
        await channel.delete()

    # create all categories 
    Verification = await ctx.guild.create_category("✅ | Verfication")
    Important = await ctx.guild.create_category("📢 | Important")
    Carries = await ctx.guild.create_category("🛡️| Carries")
    General = await ctx.guild.create_category("📚 | General")
    
    # change all category permissions
    await Verification.set_permissions(ctx.guild.default_role, send_messages=False, add_reactions=False)
    await Important.set_permissions(ctx.guild.default_role, send_messages=False, add_reactions=False)
    await Carries.set_permissions(ctx.guild.default_role, send_messages=False, add_reactions=False)
    await General.set_permissions(ctx.guild.default_role, send_messages=False, add_reactions=False, read_messages=False, connect=False, speak=False)

    # create all channels
    Verify = await ctx.guild.create_text_channel("✅│verify", category=Verification)
    Rules = await ctx.guild.create_text_channel("📜│rules", category=Important)
    Announcements = await ctx.guild.create_text_channel("📢│announcements", category=Important)
    Carry = await ctx.guild.create_text_channel("⚔️│carries", category=Carries)
    GeneralText = await ctx.guild.create_text_channel("📚│general", category=General)
    GeneralVoice = await ctx.guild.create_voice_channel("🔊│general", category=General)

    # config certain channels
    await Announcements.set_permissions(ctx.guild.default_role, send_messages=False, add_reactions=False, read_messages=False)

    verificationembed = discord.Embed(
        title = "Verification",
        description = "Verification is required to view this server.",
        color = 0x0000FF
    )
    verificationembed.add_field(name="FAQ", value="**Q:** What is verification?\n**A:** Verification is a process that allows you to view this server. You will be asked to verify by clicking a button below.\n\n**Q:** Why do I need to verify?\n**A:** This server is a private server that requires verification to view. This is to prevent people from joining and spamming the server.\n\n**Q:** How do I verify?\n**A:** Click the button below to verify. You will be asked to authorize the bot to view your information. This is required to verify you. You will then be asked to join a voice channel. Once you join the voice channel, you will be verified.", inline=False)
    verificationembed.add_field(name="Verification", value=f"Click [here]({oauth}) to verify yourself!", inline=False)
    verificationembed.set_footer(text=f"Before you verify, please read the rules in <#{Rules.id}>.")
    await Verify.send(embed=verificationembed)

    # make rules embed
    rulesembed = discord.Embed(
        title = ctx.guild.name.title() + " Rules",
        description = "Please read the rules below before continuing.",
        color = 0x0000FF
    )
    rulesembed.add_field(name="1.) No spamming.", value="Spamming will get you muted.", inline=False)
    rulesembed.add_field(name="2.) No NSFW content.", value="NSFW content is not tolerated and will get you instantly temp-banned.", inline=False)
    rulesembed.add_field(name="3.) No racism.", value="Racism is not tolerated and will get you instantly and permanently banned", inline=False)
    rulesembed.add_field(name="4.) No advertising.", value="Advertising will get you muted.", inline=False)
    rulesembed.add_field(name="5.) No impersonation.", value="Impersonating anybody, even if it's a regular member will get you banned.", inline=False)
    rulesembed.add_field(name="6.) No bullying.", value="Bullying members is not allowed and will get you muted or banned if it's continued in dms.", inline=False)
    rulesembed.add_field(name="7.) No self-promotion.", value="Self promoting will get you muted.", inline=False)
    rulesembed.add_field(name="8.) No asking for staff.", value="Asking for staff beyond jokes will get you muted.", inline=False)
    await Rules.send(embed=rulesembed)

    # make carries embed
    carriesembed = discord.Embed(
        title = "☠️ Catacombs Carries",
        description="All specifics for dungeon carries.",
        color = 0x0000FF
    )
    carriesembed.add_field(name="Floor 1", value="Price: 50k", inline=False)
    carriesembed.add_field(name="Floor 2", value="Price: 100k", inline=False)
    carriesembed.add_field(name="Floor 3", value="Price: 150k", inline=False)
    carriesembed.add_field(name="Floor 4", value="Price: 200k", inline=False)
    carriesembed.add_field(name="Floor 5", value="Price 300k", inline=False)
    carriesembed.add_field(name="Floor 6", value="Price: 600k", inline=False)
    carriesembed.add_field(name="Floor 7", value="Price: 3m", inline=False)
    carriesembed.add_field(name="Create a ticket", value="at #create-a-ticket to get a carry!", inline=False)
    await Carry.send(embed=carriesembed)

client.run(token)
