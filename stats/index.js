const fs = require('fs');
global.data = {};

const ten = {};
const min = {};
const hrs = {};
let userInfo = {};
let userTodayInfo = {};
const userNames = {};
const userTodayNames = {};
const userColors = {};
const userTodayColors = {};
const colors = {};
const colorsPerUser = {};
const colorsPerUser2 = {};
const colorsOverTime = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
let knownUsers = 0;
const uniqueUsers = {};
const usersPerHour = {};
const usersPerTen = {};
const newUsers = {};
let estimatedClose = 0;
const usersDroppingPerDay = [];
let usersPerDay = {};
let usersDroppingPerDayAverage = 0;
let usersOnLastDay = 0;
let activityOnLastDay = 0;
const activityDroppingPerDay = [];
let activityPerDay = {};
let activityDroppingPerDayAverage = 0;
let daysUntilZeroUsers = 0;
let daysUntilZeroActivity = 0;
let daysUntilZero = 0;
let colorsPerUserValues = [];
const colorsNames = Array(31);
let lastDay = new Date(new Date().getTime() - 86400000).toISOString().replace(/(^\d{4}-\d{2}-\d{2}T)(\d{2}:\d\d:\d{2}\.\d{3})(Z)/gm, "$100:00:00.000$3");

console.log("Hello!");

let colorsLabels = Object.values({
    0: "Burgundy",
    1: "Dark red",
    2: "Red",
    3: "Orange",
    4: "Yellow",
    5: "Pale yellow",
    6: "Dark green",
    7: "Green",
    8: "Light green",
    9: "Dark teal",
    10: "Teal",
    11: "Light teal",
    12: "Dark blue",
    13: "Blue",
    14: "Light blue",
    15: "Indigo",
    16: "Periwinkle",
    17: "Lavender",
    18: "Dark purple",
    19: "Purple",
    20: "Pale purple",
    21: "Magenta",
    22: "Pink",
    23: "Light pink",
    24: "Dark brown",
    25: "Brown",
    26: "Beige",
    27: "Black",
    28: "Dark gray",
    29: "Gray",
    30: "Light gray",
    31: "White",
    32: "Neon yellow",
    33: "Dimmer neon yellow",
    34: "Vivid orange",
    35: "Sunny yellow",
    36: "Old gold",
    37: "Mustard yellow",
    38: "Ceil",
    39: "Violet-blue",
    40: "Mint green",
    41: "Pixie powder",
    42: "Electric sky blue",
    43: "Windows blue",
    44: "Eggplant",
    45: "Orchid",
    46: "Icy blue",
    47: "Jazzberry jam",
    48: "Deep brown",
    49: "Chestnut",
    50: "Copper red",
    51: "Coral",
    52: "Feldspar",
    53: "Golden oak",
    54: "Cyclamen",
    55: "Pale pink",
    56: "Nature green",
    57: "Light brown",
    58: "Frog green",
    59: "Tea green",
    60: "Silver spoon",
    61: "Violet",
    62: "Floral lavender",
    63: "Pale violet"
});

let colorsConfig = [
    "#6D001A", // Wine red
    "#BE0039", // Dark red
    "#FF4500", // Orange
    "#FFA800", // Gold
    "#FFD635", // Yellow
    "#FFF8B8", // Pastel yellow
    "#00A368", // Dark green
    "#00CC78", // Green
    "#7EED56", // Light green
    "#00756F", // Dark turquoise
    "#009EAA", // Turquoise
    "#00CCC0", // Light turquoise
    "#2450A4", // Dark blue
    "#3690EA", // Light blue
    "#51E9F4", // Sky blue
    "#493AC1", // Dark indigo
    "#6A5CFF", // Indigo
    "#94B3FF", // Lilac
    "#811E9F", // Dark purple
    "#B44AC0", // Purple
    "#E4ABFF", // Pastel pink
    "#DE107F", // Dark magenta
    "#FF3881", // Magenta
    "#FF99AA", // Pink
    "#6D482F", // Dark brown
    "#9C6926", // Brown
    "#FFB470", // Beige
    "#000000", // Black
    "#515252", // Gray
    "#898D90", // Light gray
    "#D4D7D9", // Smoke
    "#EEEEEE", // White
    "#ffff5c", // Strong yellow
    "#d9d94a", // Dark strong yellow
    "#ff7313", // Carrot
    "#fce07c", // Pastel bright yellow
    "#bdbd3e", // Faded yellow
    "#c0aa19", // Dark faded yellow
    "#8f8fe0", // Pastel purple
    "#6b6bd1", // Dark pastel purple
    "#9efe90", // Pastel green
    "#360082", // Darker purple
    "#00ccff", // Strong sky
    "#44b1ce", // Dark strong sky
    "#4a2157", // Purple wine red
    "#d676e3", // Purple pink
    "#abfbff", // Pastel sky
    "#a11461", // Fuchsia
    "#592d1b", // Dark strong brown
    "#914724", // Strong brown
    "#cc6d42", // Lighter strong brown
    "#ff8559", // Light strong brown
    "#ffd5ad", // Pastel beige
    "#d39748", // Caramel
    "#fa74a4", // Candy pink
    "#ffd1dc", // Pastel candy pink
    "#679112", // Olive
    "#d39648", // Bronze
    "#9fc455", // Light olive
    "#d5ebad", // Pastel olive
    "#adafb0", // Faded gray
    "#793ccf", // Strong purple
    "#a771f7", // Light strong purple
    "#d3bff5", // Pastel strong purple
];

console.log("Loading files...");
let file = [];

for (let i = 0; i < 4; i++) {
    if (fs.existsSync("/opt/maneplace-prod/data/e-" + i + ".json")) {
        file = file.concat(JSON.parse(fs.readFileSync("/opt/maneplace-prod/data/e-" + i + ".json").toString()).filter(i => i['userId'] !== "591555636505083905"));
    }
}

const userData = JSON.parse(fs.readFileSync("/opt/maneplace-prod/data/users.json").toString());

console.log("Processing entries...");
let totalEntries = file.length;
let index = 1;
for (let entry of file) {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write("Processing entry " + index + " of " + totalEntries + ". (" + ((index / totalEntries) * 100).toFixed(2) + "% complete)");

    if (entry.x1) {
        index++;
        if (index >= totalEntries) process.stdout.write("\n");
        continue;
    }

    let date = new Date(entry.timestamp);
    let time1 = date.toISOString().replace(/(^\d{4}-\d{2}-\d{2}T\d{2}:\d)(\d:\d{2}\.\d{3})(Z)/gm, "$10:00.000$3");
    let time2 = date.toISOString().replace(/(^\d{4}-\d{2}-\d{2}T\d{2}:\d\d):(\d{2}\.\d{3})(Z)/gm, "$1:00.000$3");
    let time3 = date.toISOString().replace(/(^\d{4}-\d{2}-\d{2}T\d{2}:)(\d\d:\d{2}\.\d{3})(Z)/gm, "$100:00.000$3");
    let time4 = date.toISOString().replace(/(^\d{4}-\d{2}-\d{2}T)(\d{2}:\d\d:\d{2}\.\d{3})(Z)/gm, "$100:00:00.000$3");
    let today = new Date().toISOString().replace(/(^\d{4}-\d{2}-\d{2}T)(\d{2}:\d\d:\d{2}\.\d{3})(Z)/gm, "$100:00:00.000$3");

    if (!ten[time1]) ten[time1] = 0;
    ten[time1]++;

    if (!min[time2]) min[time2] = 0;
    min[time2]++;

    if (!hrs[time3]) hrs[time3] = 0;
    hrs[time3]++;

    if (time4 !== today) {
        if (!activityPerDay[time4]) activityPerDay[time4] = 0;
        activityPerDay[time4]++;
    }

    if (!userInfo[entry.userId]) {
        if (!uniqueUsers[time3]) uniqueUsers[time3] = knownUsers;
        if (!newUsers[time3]) newUsers[time3] = 0;

        uniqueUsers[time3]++;
        newUsers[time3]++;
        knownUsers++;

        userInfo[entry.userId] = {
            count: 0,
            id: entry.userId,
            name: entry.userId,
            color: "#000000"
        };
    }

    if (!userTodayInfo[entry.userId]) {
        if (time4 === today) {
            userTodayInfo[entry.userId] = {
                count: 0,
                id: entry.userId,
                name: entry.userId,
                color: "#000000"
            };
        }
    }

    if (time4 !== today) {
        if (!usersPerDay[time4]) usersPerDay[time4] = [];
        usersPerDay[time4] = [...new Set([...usersPerDay[time4], entry.userId])];
    }

    if (!usersPerHour[time3]) usersPerHour[time3] = [];
    usersPerHour[time3] = [...new Set([...usersPerHour[time3], entry.userId])];

    if (!usersPerTen[time1]) usersPerTen[time1] = [];
    usersPerTen[time1] = [...new Set([...usersPerTen[time1], entry.userId])];

    userInfo[entry.userId]["count"]++;
    userInfo[entry.userId]["name"] = entry.userId;
    userInfo[entry.userId]["color"] = colorsConfig[Math.round(parseInt(require('crypto').createHash("md5").update(entry.userId).digest("hex").substring(0, 2), 16) / 8) - 1];

    if (time4 === today) {
        userTodayInfo[entry.userId]["count"]++;
        userTodayInfo[entry.userId]["name"] = entry.userId;
        userTodayInfo[entry.userId]["color"] = colorsConfig[Math.round(parseInt(require('crypto').createHash("md5").update(entry.userId).digest("hex").substring(0, 2), 16) / 8) - 1];

        try {
            userTodayInfo[entry.userId]["name"] = userData.filter(i => i.id === entry.userId)[0].name;
        } catch (e) {
            userTodayInfo[entry.userId]["name"] = entry.userId;
        }
    }

    try {
        userInfo[entry.userId]["name"] = userData.filter(i => i.id === entry.userId)[0].name;
    } catch (e) {
        userInfo[entry.userId]["name"] = entry.userId;
    }

    if (entry.color !== null && colorsConfig[parseInt(entry.color)] !== null) {
        if (!colorsPerUser[entry.userId]) colorsPerUser[entry.userId] = Array(32);
        if (!colorsPerUser[entry.userId][parseInt(entry.color)]) colorsPerUser[entry.userId][parseInt(entry.color)] = 0;
        colorsPerUser[entry.userId][parseInt(entry.color)]++;

        let colorID = parseInt(entry.color);
        let colorName = colorsLabels[colorID];
        let colorHex = colorsConfig[colorID];

        colorsNames[colorID] = {
            name: colorName,
            hex: colorHex
        }

        if (!colors[colorID]) colors[colorID] = 0;
        colors[colorID]++;

        if (!colorsOverTime[0][time3]) {
            for (let id in colorsOverTime) {
                colorsOverTime[id][time3] = 0;
            }
        }

        colorsOverTime[colorID][time3]++;
    }

    index++;

    if (index >= totalEntries) process.stdout.write("\n");
}

console.log("Computing user info...");
userInfo = Object.values(userInfo).sort((a, b) => {
    return b.count - a.count;
})
userTodayInfo = Object.values(userTodayInfo).sort((a, b) => {
    return b.count - a.count;
})

for (let value of userInfo) {
    userNames[value['id']] = value["name"];
    userColors[value['id']] = value["color"];
}

for (let value of userTodayInfo) {
    userTodayNames[value['id']] = value["name"];
    userTodayColors[value['id']] = value["color"];
}

console.log("Calculating estimated end date...");

for (let day in Object.keys(usersPerDay)) {
    if (day > 0) {
        usersDroppingPerDay.push(Object.values(usersPerDay)[day - 1].length - Object.values(usersPerDay)[day].length);
    }
}

for (let day in Object.keys(activityPerDay)) {
    if (day > 0) {
        activityDroppingPerDay.push(Object.values(activityPerDay)[day - 1] - Object.values(activityPerDay)[day]);
    }
}

usersDroppingPerDayAverage = Math.round(usersDroppingPerDay.reduce((a, b) => a + b) / usersDroppingPerDay.length);
activityDroppingPerDayAverage = Math.round(activityDroppingPerDay.reduce((a, b) => a + b) / activityDroppingPerDay.length);
activityOnLastDay = activityPerDay[lastDay];
usersOnLastDay = usersPerDay[lastDay].length;
daysUntilZeroUsers = Math.round(usersOnLastDay / usersDroppingPerDayAverage) - 2;
daysUntilZeroActivity = Math.round(activityOnLastDay / activityDroppingPerDayAverage) - 2;
daysUntilZero = Math.round((daysUntilZeroActivity + daysUntilZeroUsers) / 2);

if (daysUntilZero !== Infinity) {
    estimatedClose = new Date(new Date(new Date().toISOString().replace(/(^\d{4}-\d{2}-\d{2}T)(\d{2}:\d\d:\d{2}\.\d{3})(Z)/gm, "$100:00:00.000$3")).getTime() + (daysUntilZero * 86400000)).toISOString();
} else {
    estimatedClose = new Date(1672574400000).toISOString();
}

if (new Date(estimatedClose).getTime() >= 1672574400000) {
    estimatedClose = new Date(1672574400000).toISOString();
} else if (new Date(estimatedClose).getTime() <= new Date().getTime()) {
    estimatedClose = new Date(1672574400000).toISOString();
}

colorsPerUserValues = Object.values(colorsPerUser).map((i) => {
    return i.map((j, k) => {
        if (j) {
            return {
                color: colorsConfig[k],
                name: colorsLabels[k],
                value: j
            }
        } else {
            return null;
        }
    }).filter(i => i !== null).sort((a, b) => {
        return b.value - a.value;
    })
})

for (let key of Object.keys(colorsPerUser)) {
    colorsPerUser2[key] = colorsPerUserValues[Object.keys(colorsPerUser).indexOf(key)];
}

console.log("Writing output...");

let output = {
    tenMinutes: {
        titles: Object.keys(ten),
        values: Object.values(ten)
    },
    minutes: {
        titles: Object.keys(min),
        values: Object.values(min)
    },
    hours: {
        titles: Object.keys(hrs),
        values: Object.values(hrs)
    },
    colors: {
        names: colorsNames,
        titles: Object.keys(colors),
        values: Object.values(colors)
    },
    colorsTime: {
        titles: Object.keys(colorsOverTime),
        values: Object.values(colorsOverTime)
    },
    users: {
        names: userNames,
        colors: userColors,
        titles: userInfo.map((i) => i.id),
        values: userInfo.map((i) => i.count),
        pixelColors: colorsPerUser2
    },
    usersToday: {
        names: userTodayNames,
        colors: userTodayColors,
        titles: userTodayInfo.map((i) => i.id),
        values: userTodayInfo.map((i) => i.count)
    },
    uniques: {
        titles: Object.keys(uniqueUsers),
        values: Object.values(uniqueUsers)
    },
    new: {
        titles: Object.keys(newUsers),
        values: Object.values(newUsers)
    },
    usersHours: {
        titles: Object.keys(usersPerHour),
        values: Object.values(usersPerHour).map(i => i.length)
    },
    usersTen: {
        titles: Object.keys(usersPerTen),
        values: Object.values(usersPerTen).map(i => i.length),
        users: Object.values(usersPerTen)
    },
    ai: {
        usersPerDay,
        activityPerDay,
        usersDroppingPerDay,
        activityDroppingPerDay,
        usersDroppingPerDayAverage,
        activityDroppingPerDayAverage,
        usersOnLastDay,
        activityOnLastDay,
        daysUntilZeroUsers,
        daysUntilZeroActivity,
        daysUntilZero,
        estimatedClose
    }
};

fs.writeFileSync("./output.json", JSON.stringify(output));

console.log("Generating HTML...");
fs.writeFileSync("./index.html", fs.readFileSync("./stats.html").toString().replace("%DATA%", JSON.stringify(output)).replace("%DATE%", new Date().toUTCString()).replace("%SECOND%", new Date().getUTCSeconds().toString()));

console.log("Done!");

data.userNames = userNames;
data.userColors = userColors;
data.userInfo = userInfo;
data.colorsPerUser2 = colorsPerUser2;
data.userTodayNames = userTodayNames;
data.userTodayColors = userTodayColors;
data.userTodayInfo = userTodayInfo;