// Settings
const UserId = 1; // Your user id. This NEEDS to be set for numerous things to work (such as playability status and badge ownership).
const Cookie = ""; // Put your .ROBLOSECURITY cookie here. Note that this is NOT required, however it is recommended as it is used to check if a game is public when the proxy fails. If you don't want to set your cookie, please leave the string blank or else the script could error.
const Webhook = ""; // Link to your Discord webhook to send any badges that you find. This is not required, however please leave it blank if you won't use it so then the script won't break. Thanks!
const BadgeValue = { // The value of badges to look for.
    Free: false,
    Legacy: true,
    Valuable: true,
};
const BadgeType = { // Type of badges to look for.
    Any: true, // Bypasses other settings and just looks for *any* badge.
    Welcome: false,
    Obby: false,
    Hidden: false,
    AFK: false,
    BadgeWalk: false,
    Group: false,
    Meet: false,
    LimitedTime: false,
    Unobtainable: false,
}
const EarnedRecently = false; // Only looks for badges that were earned in the past day.
const MoveOnAfterEarned = true; // Will only move onto finding the next badge when the other badge has been earned when set to true. When set to false, it'll instead immediately look for the next badge.
const FailedAttempts = 100; // How many times it should try to check if you own the badge before moving onto the next. Set to Infinity if you don't want it to move on until the badge has been earned.

// The actual code (don't edit unless if you know what you're doing).
console.log("Welcome to ShowerTale's Badge Finder! To stop the Badge Finder, simply press Control + C at any time. Thank you for using ShowerTale's Badge Finder!")
import open from "open";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const NonIds = require("./nonids.json").Ids;
async function GetVersion() {
    const NewestVersion = (await (await (fetch("https://raw.githubusercontent.com/ShowerTale/Badge-Finder/main/package.json"))).json()).version
    if (NewestVersion > parseFloat(require("./package.json").version
    )) {
        console.log("There is a newer version of this script available on GitHub. You can find the GitHub repository at this link: ")
    };
};
//GetVersion();

const Accept = {
    Welcome: [
        "welcome",
        "visit",
        "play",
        "join",
        "free",
        "bienvenue",
        "hello",
        "getting started",
        "bienvenido",
        "played the game",
        "enjoy your stay",
        "환영",
        "こんにちは",
        "歡迎",
        "欢迎",
        "ようこそ",
        "came",
        "come",
        "加入",
        "首次",
        "نورت الماب",
        "새로운 방문자",
        "newcomer",
        "new to this game",
        "selamat datang",
        "добро пожаловать",
        "привет",
        "guten tag",
        "hallo",
        "willkommen",
        "guten abend",
        "guten morgen",
        "greetings",
        "entered the game",
    ],
    Hidden: [
        "found ",
        "egg",
        "mr. p",
        "pizzeria",
        "corrupted",
        "find",
        "maze",
        "teamwork",
        "got it",
        "got ",
	" morph",
	"normal ",
	"you found ",
    ],
    Obby: [
        "beat",
        "ninja",
        "easy",
        "obby",
        "beat medium",
        "beat hard",
        "beat effortless",
        "stage ",
        "checkpoint ",
	"you did ",
    ],
    AFK: [
        "seconds",
        "minute",
        "hour",
        "day",
        "week",
        "month",
        "year",
        "time",
    ],
    BadgeWalk: [
        "badge ",
        "free badge",
        "badgeland",
        " visits",
        "player badge",
        "freebadge",
        "free-badge",
    ],
    Group: [
        "badger",
        "sbc",
        "super badge collectors",
        "badgers of robloxia",
        " group",
	"awesome badge collectors",
	"legendary badge collectors",
	"joined my ",
	"you joined ",
	" my group",
    ],
    Meet: [
        "owner",
        "meet ",
        "met ",
        "creator",
        " developer",
        " scripter",
        " builder",
    ],
    LimitedTime: [
        "limited",
        "halloween",
        "christmas",
        "thanksgiving",
        "kwanzaa",
        "hanukkah",
        "independence day",
        "limited time",
        "alpha",
        "beta",
        "demo",
        "month",
    ],
    Unobtainable: [
        "unobtainable",
        "not obtainable",
        "inactive",
        "closed",
        "unattainable",
        "not attainable",
        "unavailable",
        "not available",
        "discontinued",
    ],
};
const Decline = {
    Welcome: [
        "freebadge",
        "free-badge",
        "unattainable",
        "not attainable",
        "obsolete",
        "deprecate",
        "month",
        "demo",
        "early",
        "unavailable",
        "not available",
        "discontinued",
        "friends",
        "sans",
        "hideout",
        "level",
        "halloween",
        "with ",
        "pro ",
        "join group",
        "joined group",
        "joined my group",
        "badger",
        "sbc",
        "super badge collectors",
        "badgers of robloxia",
        " group",
        "christmas",
        "thanksgiving",
        "freedom",
        "limited",
        "limited time",
        "owner",
        "meet",
        "met",
        "creator",
        "unobtainable",
        "not obtainable",
        "inactive",
        "seconds",
        "minute",
        "hour",
        "day",
        "time",
        "week",
        "badger",
        "playz",
        "free badge",
        "badgeland",
        "halloween",
        "kwanzaa",
        "hanukkah",
        "independence day",
        "alpha",
        "beta",
        "freedom",
        " players",
        "player badge",
        "testing",
        "playerbadge",
        "player-badge",
        "before",
        "rejoin",
    ],
    AFK: [
        "welcome",
        "you joined",
    ],
    LimitedTime: [
        " free",
        "inactive",
        "over",
        "broken",
        "finished",
    ],
};

function Random(Minimum, Max) {
    return Math.floor(Math.random() * (Max - Minimum + 1)) + Minimum;
};
let Tries = 0;
async function Launch() {
    let BadgeId;
    let PlaceId;
    let FoundType;
    let Value;
    let Accepted = false;
    const BeforeOrAfterUpdate = Random(1, 2);
    if ((BadgeValue.Free || BadgeValue.Valuable) && BadgeValue.Legacy) {
        if (BeforeOrAfterUpdate == 1) {
            const OldOrNew = Random(1, 2);
            if (OldOrNew == 1) {
                BadgeId = NonIds[Random(0, NonIds.length - 1)];
            } else if (OldOrNew == 2) {
                BadgeId = Random(2124438759, 2124945818);
            } else {
                console.error("There was an error, please try again. If the issue persists, report what line it's happening at here: https://github.com/ShowerTale/Badge-Finder/issues");
                process.exit(1);    
            };
            Value = "Legacy";
        } else if (BeforeOrAfterUpdate == 2) {
            BadgeId = Random(2124945819, 2148348270);
            Value = "Free";
        } else {
            console.error("There was an error, please try again. If the issue persists, report what line it's happening at here: https://github.com/ShowerTale/Badge-Finder/issues");
            process.exit(1);
        };
    } else if (BadgeValue.Free || BadgeValue.Valuable) {
        BadgeId = Random(2124945819, 2148348270);
        Value = "Free";
    } else if (BadgeValue.Legacy) {
        const OldOrNew = Random(1, 2);
        if (OldOrNew == 1) {
            BadgeId = NonIds[Random(0, NonIds.length - 1)];
        } else if (OldOrNew == 2) {
            BadgeId = Random(2124438759, 2124945818);
        } else {
            console.error("There was an error, please try again. If the issue persists, report what line it's happening at here: https://github.com/ShowerTale/Badge-Finder/issues");
            process.exit(1);    
        };
        Value = "Legacy";
    } else {
        console.error("There was an error, please try again. If the issue persists, report what line it's happening at here: https://github.com/ShowerTale/Badge-Finder/issues");
        process.exit(1);    
    };
    let BadgeInfo = await fetch(`https://badges.roblox.com/v1/badges/${BadgeId}`).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch()});
    if (!BadgeInfo) {
        return;
    } else if (!BadgeInfo.ok) {
        console.log("There was an issue on Roblox's end, retrying in 3 seconds...");
        await new Promise(resolve => {setTimeout(resolve, 3000)});
        Launch();
        return;
    } else {
        BadgeInfo = await BadgeInfo.json();
    };
    if (BadgeInfo.enabled && ((!EarnedRecently && BadgeInfo.statistics.awardedCount > 1) || (EarnedRecently && BadgeInfo.statistics.pastDayAwardedCount > 0))) {
        if (!BadgeType.Any) {
            Accepted = false;
            for (let Type in BadgeType) {
                if (BadgeType[Type] && !Accepted) {
                    for (let Keyword of Accept[Type]) {
                        if ((BadgeInfo.name.toLowerCase()).includes(Keyword)) {
                            Accepted = true;
                            FoundType = Type + " ";
                        };
                    };
                    for (let Keyword of Decline[Type]) {
                        if ((BadgeInfo.name.toLowerCase()).includes(Keyword)) {
                            Accepted = false;
                            FoundType = "";
                        };
                    };
                };
            };
        } else {
            Accepted = true;
            FoundType = "";
        };
        if (Accepted) {
            PlaceId = BadgeInfo.awardingUniverse.rootPlaceId;
            let RootPlace = (await (await fetch(`https://develop.roblox.com/v1/universes/multiget?ids=${BadgeInfo.awardingUniverse.id}`)).json()).data[0];
            if (RootPlace.rootPlaceId === PlaceId) {
                let GameDetails = await fetch(`https://api.showertale.workers.dev/?Places=${PlaceId}`).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return});
                if (!GameDetails || !GameDetails.ok) {
                    if (Cookie != "") {
                        GameDetails = await fetch(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${PlaceId}`, {headers: {cookie: ".ROBLOSECURITY=" + Cookie}}).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return});
                        while (!GameDetails.ok) {
                            await new Promise(resolve => {setTimeout(resolve, 1000)});
                            GameDetails = await fetch(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${PlaceId}`, {headers: {cookie: ".ROBLOSECURITY=" + Cookie}}).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return});
                        };
                        GameDetails = (await GameDetails.json())[0];
                    } else {
                        GameDetails = {reasonProhibited: "GuestProhibited"};
                    };
                } else {
                    GameDetails = (await GameDetails.json())[0];
                };
                
                if (GameDetails.reasonProhibited === "None" || GameDetails.reasonProhibited == "GuestProhibited") {
                    Accepted = true;
                } else if (GameDetails.reasonProhibited === "InsufficientPermissionFriendsOnly") {
                    const Friends = (await (await fetch(`https://friends.roblox.com/v1/users/${UserId}/friends`).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return})).json()).data;
                    Friends.forEach(function (User) {
                        if (User.Id === GameDetails.builderId) {
                            Accepted = true;
                            return;
                        } else {
                            Accepted = false;
                        };
                    });
                } else if (GameDetails.reasonProhibited === "InsufficientPermissionGroupOnly") {
                    const Groups = (await (await fetch(`https://groups.roblox.com/v2/users/${UserId}/groups/roles`).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return})).json()).data;
                    Groups.forEach(function (Group) {
                        if (Group.group.id === GameDetails.builderId) {
                            Accepted = true;
                            return;
                        } else {
                            Accepted = false;
                        };
                    });
                } else if (GameDetails.reasonProhibited === "PurchaseRequired") {
                    const Owned = await (await fetch(`https://inventory.roblox.com/v1/users/${UserId}/items/0/${PlaceId}/is-owned`).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return})).text();
                    if (Owned) {
                        Accepted = true;
                    } else {
                        Accepted = false;
                    };
                } else if (GameDetails.reasonProhibited === "UniverseRootPlaceIsNotActive" || GameDetails.reasonProhibited === "PlaceHasNoPublishedVersion" || GameDetails.reasonProhibited === "AssetUnapproved") {
                    Accepted = false;
                } else {
                    console.log(GameDetails.reasonProhibited);
                    console.error("There was an issue on Roblox's end. If the issue persists, report it here: https://github.com/ShowerTale/Badge-Finder/issues");
                };
                if (Accepted) {
                    const Owned = (await (await fetch(`https://badges.roblox.com/v1/users/${UserId}/badges/awarded-dates?badgeIds=${BadgeId}`).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return})).json()).data[0];
                    if (!Owned) {
                        if (BadgeId > 2124945818) {
                            await fetch("https://bor-valuable-badge-database-production.up.railway.app/api/v3/user/reportmissing", {method: "POST", body: BadgeId}).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch()});
                            let ValueOfBadge = (await (await fetch(`https://bor-valuable-badge-database-production.up.railway.app/api/v3/query/bybadgeids?badgeIds=${BadgeId}`).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return})).json()).data[0];
                            while (!ValueOfBadge.found) {
                                ValueOfBadge = (await (await fetch(`https://bor-valuable-badge-database-production.up.railway.app/api/v3/query/bybadgeids?badgeIds=${BadgeId}`).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return})).json()).data[0];
                                await new Promise(resolve => {setTimeout(resolve, 1000)});
                            };
                            if ((ValueOfBadge.value === 1 && BadgeValue.Valuable) || (ValueOfBadge.value === 0 && BadgeValue.Free)) {
                                Accepted = true;
                                if (ValueOfBadge.value === 1) {
                                    Value = "Valuable";
                                }
                            } else {
                                Accepted = false;
                            };
                        } else {
                            Accepted = true;
                        };
                    } else {
                        Tries += 1;
                        console.log(`You already own this badge, retrying... (Tries: ${Tries})`)
                        Accepted = false;
                    };
                } else {
                    Tries += 1;
                    console.log(`The game that the badge was created in is not playable, retrying... (Tries: ${Tries})`)        
                };
            } else {
                Tries += 1;
                console.log(`Badge did not fit any type currently enabled, retrying... (Tries: ${Tries})`)    
            };
        } else {
            Tries += 1;
            console.log(`Badge was in a subplace, retrying... (Tries: ${Tries})`)    
        };
    } else {
        Tries += 1;
        console.log(`Badge is not enabled or hasn't been awarded more than once, retrying... (Tries: ${Tries})`)
        Accepted = false;
    };
    if (Accepted) {
        console.log(`A badge that meets your criteria has been found. Badge link: https://www.roblox.com/badges/${BadgeId}/\nOpening Roblox...`);
        Tries = 0;
        await open(`roblox://placeId=${PlaceId}`);
        let Owned = (await (await fetch(`https://badges.roblox.com/v1/users/${UserId}/badges/awarded-dates?badgeIds=${BadgeId}`).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return})).json()).data[0];
        if (Webhook != "") {
            console.log("Sending badge to your webhook...");
            const ImageResult = await fetch(`https://thumbnails.roblox.com/v1/assets?assetIds=${BadgeInfo.iconImageId}&returnPolicy=PlaceHolder&size=250x250&format=Png&isCircular=false`);
            let BadgeImage;
            if (ImageResult.ok) {
                BadgeImage = (await ImageResult.json()).data[0].imageUrl;
            } else {
                BadgeImage = "";
            };
            const Result = await fetch(Webhook, {
                method: "POST",
                body: JSON.stringify({
                    channel_id: null,
                    embeds: [{
                        color: parseInt("00FF00", 16),
                        fields: [
                            {
                                inline: true,
                                name: "**Badge Info:**",
                                value: `Name: ${BadgeInfo.name}\nDescription: ${BadgeInfo.description != "" ? BadgeInfo.description : "No description provided."}\nBadge Link: https://www.roblox.com/badges/${BadgeId}/\nGame Link: https://www.roblox.com/games/${PlaceId}/`
                            }
                        ],
                        footer: {
                            icon_url: "https://tr.rbxcdn.com/6ce6fb17df668488f3aac11f27eec7aa/720/720/Avatar/Png",
                            text: "Badge found by ShowerTale's badge finder.",
                        },
                        thumbnail: {
                            url: BadgeImage
                        },
                        title: `**New ${Value} ${FoundType}Badge Found!**`,
                        type: "rich",
                        url: `https://www.roblox.com/badges/${BadgeId}/`,
                    }]
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!Result.ok) {
                const JSON = await Result.json();
                console.error("There was an error sending the badge to your webhook. JSON: ", JSON)
            } else {
                console.log("Successfully sent to your webhoook!");
            };
        };
        let Attempts = FailedAttempts;
        while (!Owned && MoveOnAfterEarned && Attempts > 0) {
            console.log(`Badge has not been earned yet. Attempts left: ${Attempts}`)
            Attempts -= 1;
            await new Promise(resolve => {setTimeout(resolve, 1000)});
            Owned = (await (await fetch(`https://badges.roblox.com/v1/users/${UserId}/badges/awarded-dates?badgeIds=${BadgeId}`).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return})).json()).data[0];
        };
    };
    Launch();
};

Launch();
