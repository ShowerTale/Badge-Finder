async function Ranker() {
    const API = await fetch("https://groups.roblox.com/v1/groups/5587275/roles/68240996/users?limit=100&sortOrder=Asc").catch(error => {console.error(`Error getting pending members: ${error}`)});
    const Object = await API.json();
    const Members = [];
    for (let Index in Object) {
        Members.push(Object[Index]);
    };
    for (let Member of Members[2]) {
        const API2 = await fetch(`https://badges.roblox.com/v1/users/${Member.userId}/badges/awarded-dates?badgeIds=2146720182,2136041569,2136041136,2136040813,2136040637,2136040098,2136039282,2136039140`).catch(error => {console.error(`Error getting @${Member.username}'s owned GBL badges: ${error}`)});
        const Object2 = await API2.json();
        const Owned = [];
        for (let Index in Object2) {
            Owned.push(Object2[Index]);
        };
        console.log(Owned[0])
        const BadgeIds = [
            2146720182, // 240k
            2136041569, // 200k
            2136041136, // 150k
            2136040813, // 100k
            2136040637, // 70k
            2136040098, // 50k
            2136039282, // 20k
            2136039140, // 10k
        ];
        const RoleIds = [
            68189622, // Immortal
            36860048, // Godly
            36860047, // Legendary
            36860046, // Master
            36860042, // Skilled
            36860041, // Advanced
            36860036, // Experienced
            36860034, // Dedicated
        ];
        const RoleNames = [
            "Immortal",
            "Godly",
            "Legendary",
            "Master",
            "Skilled",
            "Advanced",
            "Experienced",
            "Dedicated",
        ];
        let Ranked = false;
        for (let Index = 0; Index < 8; Index++) {
            if (Owned[0][0] && Owned[0][0].badgeId == BadgeIds[Index]) {
                await fetch(`https://groups.roblox.com/v1/groups/5587275/users/${Member.userId}`, {
                    method: "POST",
                    body: {"roleid": RoleIds[Index]},
                    headers: {
                        "cookie": ".ROBLOSECURITY=" + process.env.COOKIE
                    },
                }).catch(error => {
                    fetch(`https://discord.com/api/webhooks/${process.env.WEBHOOK}`, {
                        method: "POST",
                        body: JSON.stringify({
                            channel_id: null,
                            embeds: [{
                                color: parseInt("FF0000", 16),
                                description: `There was an error ranking this user. Error: ${error}`,
                                footer: {
                                    icon_url: "https://tr.rbxcdn.com/b934f9d08b04938e3dacadec8a5a102c/420/420/Image/Png",
                                    text: "Error sent by ShowerTale's BoR ranking bot.",
                                },
                                title: `Error ranking ${Member.displayName} (@${Member.username})`,
                            }]
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    console.error(`Error ranking member @${Member.username}: ${error}`);
                    return;
                });
                fetch(`https://discord.com/api/webhooks/${process.env.WEBHOOK}`, {
                    method: "POST",
                    body: JSON.stringify({
                        channel_id: null,
                        embeds: [{
                            color: parseInt("00FF00", 16),
                            description: `This user's role is now ${RoleNames[Index]}.`,
                            footer: {
                                icon_url: "https://tr.rbxcdn.com/b934f9d08b04938e3dacadec8a5a102c/420/420/Image/Png",
                                text: "Ranked by ShowerTale's BoR ranking bot.",
                            },
                            title: `Ranked ${Member.displayName} (@${Member.username})`,
                        }]
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).catch(error => {console.error(`Error sending message through webhook: ${error}`)});
                Ranked = true;
            };
        };
        if (Ranked !== true) {
            // Rank to Casual (0 badges)
            await fetch(`https://groups.roblox.com/v1/groups/5587275/users/${Member.userId}`, {
                method: "POST",
                body: {"roleid": 36859950},
                headers: {
                    "cookie": ".ROBLOSECURITY=" + process.env.COOKIE
                },
            })
            .catch(error => {
                fetch(`https://discord.com/api/webhooks/${process.env.WEBHOOK}`, {
                    method: "POST",
                    body: JSON.stringify({
                        channel_id: null,
                        embeds: [{
                            color: parseInt("FF0000", 16),
                            description: `There was an error ranking this user. Error: ${error}`,
                            footer: {
                                icon_url: "https://tr.rbxcdn.com/b934f9d08b04938e3dacadec8a5a102c/420/420/Image/Png",
                                text: "Error sent by ShowerTale's BoR ranking bot.",
                            },
                            title: `Error ranking ${Member.displayName} (@${Member.username})`,
                        }]
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                console.error(`Error ranking member @${Member.username}: ${error}`);
                return;
            });
            fetch(`https://discord.com/api/webhooks/${process.env.WEBHOOK}`, {
                method: "POST",
                body: JSON.stringify({
                    channel_id: null,
                    embeds: [{
                        color: parseInt("00FF00", 16),
                        description: `This user's role is now ${RoleNames[Index]}.`,
                        footer: {
                            icon_url: "https://tr.rbxcdn.com/b934f9d08b04938e3dacadec8a5a102c/420/420/Image/Png",
                            text: "Ranked by ShowerTale's BoR ranking bot.",
                        },
                        title: `Ranked ${Member.displayName} (@${Member.username})`,
                    }]
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }).catch(error => {console.error(`Error ranking member sending message through webhook: ${error}`)});
        };
    };
    if (Members[1] !== null) {
        Ranker();
    }
    else {
        setTimeout(() => {
            Ranker();
        }, 60000);
    }
};

Ranker();
