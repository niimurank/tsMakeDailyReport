const getTodo = () => {
    const group = document.getElementById("todoGroup");
    if (!group) {
        return "【本日作業】\n";
    }

    let detail = "";
    for (let index = 1; index <= group.children.length; index += 1) {
        detail += todoOneSection(index);
    }
    return `【本日作業】\n${detail}`;
};

const todoOneSection = (index) => {
    const title = document.getElementById(`todoTitle${index}`).value;
    const description = document.getElementById(`todoText${index}`).value;

    return `◇${title}\n${description}\n\n`;
};

const todoElement = (index) => [
    `<div class="oneBlock" id="todoElement${index}">`,
        `<div class="minusButton"><input type="button" value="-" id="todoMinusElement${index}"></div>`,
        `<div class="selectBlock"><div>項目名</div><input type="text" id="todoTitle${index}"></div>`,
        `<div><div class="title">内容</div><div class="inputBox"><textarea id="todoText${index}"></textarea></div></div>`,
    `</div>`
].join("");
