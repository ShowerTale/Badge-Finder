// Settings
const UserId = 4127747077; // Your user id. This NEEDS to be set for numerous things to work (such as playability status and badge ownership).
const BadgeValue = { // The value of badges to look for.
    Free: false,
    Legacy: true,
    Valuable: true,
};
const BadgeType = { // Type of badges to look for.
    Any: false, // Bypasses other settings and just looks for *any* badge.
    Welcome: true,
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
const MoveOnAfterEarned = true; // Will only move onto finding the next badge when the other badge has been earned when set to true. When set to false, it'll immediately look for the next badge.

// The actual code (don't edit unless if you know what you're doing).
console.log("Welcome to ShowerTale's Badge Finder! To stop the Badge Finder, simply delete the terminal or press Control + C at any time. Thank you for using ShowerTale's Badge Finder!")
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
        } else if (BeforeOrAfterUpdate == 2) {
            BadgeId = Random(2124945819, 2148348270);
        } else {
            console.error("There was an error, please try again. If the issue persists, report what line it's happening at here: https://github.com/ShowerTale/Badge-Finder/issues");
            process.exit(1);
        };
    } else if (BadgeValue.Free || BadgeValue.Valuable) {
        BadgeId = Random(2124945819, 2148348270);
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
    } else {
        console.error("There was an error, please try again. If the issue persists, report what line it's happening at here: https://github.com/ShowerTale/Badge-Finder/issues");
        process.exit(1);    
    };
    let BadgeInfo = await fetch(`https://badges.roblox.com/v1/badges/${BadgeId}`).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return});
    if (!BadgeInfo.ok) {
        console.log("There was an issue on Roblox's end, retrying in 3 seconds...");
        await new Promise(resolve => {setTimeout(resolve, 3000)});
        Launch();
        return;
    } else {
        BadgeInfo = await BadgeInfo.json();
    };
    if (BadgeInfo.enabled && BadgeInfo.statistics.awardedCount > 1) {
        if (!BadgeType.Any) {
            Accepted = false;
            for (let Type in BadgeType) {
                if (BadgeType[Type] && !Accepted) {
                    for (let Keyword of Accept[Type]) {
                        if ((BadgeInfo.name.toLowerCase()).includes(Keyword)) {
                            Accepted = true;
                        };
                    };
                    for (let Keyword of Decline[Type]) {
                        if ((BadgeInfo.name.toLowerCase()).includes(Keyword)) {
                            Accepted = false;
                        };
                    };
                };
            };
        } else {
            Accepted = true;
        };
        if (Accepted) {
            PlaceId = BadgeInfo.awardingUniverse.rootPlaceId;
            let GameDetails = await fetch(`https://api.showertale.workers.dev/?Places=${PlaceId}`).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return});
            while (!GameDetails.ok) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                GameDetails = await fetch(`https://api.showertale.workers.dev/?Places=${PlaceId}`).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return});
            };
            GameDetails = (await GameDetails.json())[0];
            
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
            } else if (GameDetails.reasonProhibited === "UniverseRootPlaceIsNotActive" || GameDetails.reasonProhibited === "PlaceHasNoPublishedVersion" || GameDetails.reasonProhibited === "ContentDeleted") {
                Accepted = false;
            } else {
                console.error("There was an issue on Roblox's end. If the issue persists, report it here: https://github.com/ShowerTale/Badge-Finder/issues");
                process.exit(1);
            };
            if (Accepted) {
                const Owned = (await (await fetch(`https://badges.roblox.com/v1/users/${UserId}/badges/awarded-dates?badgeIds=${BadgeId}`).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return})).json()).data[0];
                if (!Owned) {
                    if (BadgeId > 2124945818 && BadgeValue.Valuable && !BadgeValue.Free) {
                        await fetch("https://bor-valuable-badge-database-production.up.railway.app/api/v3/user/reportmissing", {method: "POST", body: BadgeId}).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch()});
                        let BadgeValue = (await (await fetch(`https://bor-valuable-badge-database-production.up.railway.app/api/v3/query/bybadgeids?badgeIds=${BadgeId}`).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return})).json()).data[0];
                        while (!BadgeValue.found) {
                            BadgeValue = (await (await fetch(`https://bor-valuable-badge-database-production.up.railway.app/api/v3/query/bybadgeids?badgeIds=${BadgeId}`).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return})).json()).data[0];
                            await new Promise(resolve => {setTimeout(resolve, 1000)});
                        };
                        if (BadgeValue.value === 1) {
                            Accepted = true;
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
        console.log(`Badge is not enabled or hasn't been awarded more than once, retrying... (Tries: ${Tries})`)
        Accepted = false;
    };
    if (Accepted) {
        console.log("Found a badge! Opening Roblox...");
        Tries = 0;
        await open(`roblox://placeId=${PlaceId}`);
        let Owned = (await (await fetch(`https://badges.roblox.com/v1/users/${UserId}/badges/awarded-dates?badgeIds=${BadgeId}`).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return})).json()).data[0];
        while (!Owned) {
            await new Promise(resolve => {setTimeout(resolve, 1000)});
            Owned = (await (await fetch(`https://badges.roblox.com/v1/users/${UserId}/badges/awarded-dates?badgeIds=${BadgeId}`).catch(async function() {console.log("Fetch errored (this is usually due to losing connection and/or poor connection), retrying in 3 seconds..."); await new Promise(resolve => {setTimeout(resolve, 3000)}); Launch(); return})).json()).data[0];
        };
    };
    Launch();
};

Launch();
