const MEETING_TIME_OPTIONS = [
    "9:00", "9:15", "9:30", "9:45",
    "10:00", "10:15", "10:30", "10:45",
    "11:00", "11:15", "11:30", "11:45",
    "12:00", "12:15", "12:30", "12:45",
    "13:00", "13:15", "13:30", "13:45",
    "14:00", "14:15", "14:30", "14:45",
    "15:00", "15:15", "15:30", "15:45",
    "16:00", "16:15", "16:30", "16:45",
    "17:00", "17:15", "17:30", "17:45",
    "18:00", "18:15", "18:30", "18:45",
    "19:00", "19:15", "19:30", "19:45"
];

const createTimeOptions = () => MEETING_TIME_OPTIONS
    .map((time) => `<option>${time}</option>`)
    .join("");

const getMtg = () => {
    const group = document.getElementById("mtgGroup");
    if (!group) {
        return "【MTG】\n";
    }

    let detail = "";
    for (let index = 1; index <= group.children.length; index += 1) {
        detail += mtgOneSection(index);
    }
    return `【MTG】\n${detail}`;
};

const mtgOneSection = (number) => {
    const startTime = document.getElementById(`MtgStartTime${number}`).value;
    const endTime = document.getElementById(`MtgEndTime${number}`).value;
    const description = document.getElementById(`MtgText${number}`).value;

    return `${startTime}-${endTime} ${description}\n`;
};

const mtgElement = (index) => {
    const timeOptions = createTimeOptions();
    return [
        `<div class="oneBlock" id="mtgElement${index}">`,
            `<div class="minusButton"><input id="mtgMinusTime${index}" type="button" value="-"></div>`,
            `<div class="timeBlock">`,
                `<div><div>開始時間</div><select id="MtgStartTime${index}">${timeOptions}</select></div>`,
                `<div><div>終了時間</div><select id="MtgEndTime${index}">${timeOptions}</select></div>`,
            `</div>`,
            `<div class="inputBlock"><div>内容</div><input type="text" id="MtgText${index}" /></div>`,
        `</div>`
    ].join("");
};
