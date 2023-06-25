async function Ranker() {
    const API = await fetch("https://groups.roblox.com/v1/groups/5587275/roles/68240996/users?limit=100&sortOrder=Asc");
    const Object = await API.json();
    const Members = [];
    for (let Index in Object) {
        Members.push(Object[Index]);
    };
    for (let Member of Members[2]) {
        const API2 = await fetch(`https://badges.roblox.com/v1/users/${Member.userId}/badges/awarded-dates?badgeIds=2146720182,2136041569,2136041136,2136040813,2136040637,2136040098,2136039282,2136039140`);
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
        let Ranked = false;
        for (let Index = 0; Index < 8; Index++) {
            if (Owned[0][0] && Owned[0][0].badgeId == BadgeIds[Index]) {
                await fetch(`https://groups.roblox.com/v1/groups/5587275/users/${Member.userId}`, {
                    method: "POST",
                    body: {"roleid": RoleIds[Index]},
                    headers: {
                        "cookie": ".ROBLOSECURITY=" + process.env.COOKIE
                    },
                });
                Ranked = true;
            };
        };
        if (Ranked != true) {
            // Rank to Casual (0 badges)
            fetch(`https://groups.roblox.com/v1/groups/5587275/users/${Member.userId}`, {
                method: "POST",
                body: {"roleid": 36859950},
                headers: {
                    "cookie": ".ROBLOSECURITY=" + process.env.COOKIE
                },
            });
        };
    };
    if (Members[1] != null) {
        Ranker();
    }
    else {
        setTimeout(() => {Ranker();}, 60000);
    }
};

Ranker();
