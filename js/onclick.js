const DEFAULT_PARAGRAPH = "\n\n";

const safeInvoke = (fn) => (typeof fn === 'function' ? fn() : "");

const getBusinessText = () => {
    if (typeof window !== 'undefined' && window.temp?.common?.business) {
        return window.temp.common.business;
    }
    if (typeof globalThis !== 'undefined' && globalThis.temp?.common?.business) {
        return globalThis.temp.common.business;
    }
    return "";
};

const buildReportMessage = (config = {}) => {
    const paragraph = config.paragraph ?? DEFAULT_PARAGRAPH;
    const greetingText = safeInvoke(config.greetingFn);
    const workType = safeInvoke(config.workTypeFn);
    const businessText = config.businessText ?? getBusinessText();
    const mtg = safeInvoke(config.mtgFn);
    const todo = safeInvoke(config.todoFn);
    const mtgAndTodo = mtg + "\n" + todo;

    const head =
        greetingText + paragraph +
        workType + paragraph +
        businessText + paragraph +
        mtgAndTodo;

    const context = {
        paragraph,
        shareText: () => safeInvoke(config.shareFn),
        remailingText: () => safeInvoke(config.remailingFn)
    };

    let trailingText = "";
    if (typeof config.trailingBuilder === 'function') {
        trailingText = config.trailingBuilder(context) || "";
    } else {
        trailingText = context.shareText();
    }

    return head + trailingText;
};

const resolveFn = (fn) => (typeof fn === 'function' ? fn : undefined);

const setMorning = () =>{
    const message = buildReportMessage({
        greetingFn: resolveFn(typeof morningGreeting !== 'undefined' ? morningGreeting : undefined),
        workTypeFn: resolveFn(typeof getWorkType !== 'undefined' ? getWorkType : undefined),
        mtgFn: resolveFn(typeof getMtg !== 'undefined' ? getMtg : undefined),
        todoFn: resolveFn(typeof getTodo !== 'undefined' ? getTodo : undefined),
        shareFn: resolveFn(typeof getShare !== 'undefined' ? getShare : undefined)
    });

    doCopy(message);
}

const setEvening = () =>{
    const message = buildReportMessage({
        greetingFn: resolveFn(typeof eveningGreeting !== 'undefined' ? eveningGreeting : undefined),
        workTypeFn: resolveFn(typeof getWorkType !== 'undefined' ? getWorkType : undefined),
        mtgFn: resolveFn(typeof getMtg !== 'undefined' ? getMtg : undefined),
        todoFn: resolveFn(typeof getTodo !== 'undefined' ? getTodo : undefined),
        shareFn: resolveFn(typeof getShare !== 'undefined' ? getShare : undefined),
        remailingFn: resolveFn(typeof getRemailing !== 'undefined' ? getRemailing : undefined),
        trailingBuilder: ({ paragraph, remailingText, shareText }) => {
            const remailing = remailingText();
            const share = shareText();

            if (remailing && share) {
                return remailing + paragraph + share;
            }
            return remailing || share;
        }
    });

    doCopy(message);
}

//コピー実行
const doCopy = (copyText) => {
    const alertText = "コピーが実行されました";
    alert(alertText);
    
    // 上記要素をクリップボードにコピーする
    navigator.clipboard.writeText(copyText);
}

const MTG_MINUS_BOUND_FLAG = 'mtgMinusBound';

const bindMtgMinusButtonEvents = () => {
    const mtgGroup = document.getElementById("mtgGroup");
    if (!mtgGroup) {
        return;
    }

    const minusButtons = mtgGroup.querySelectorAll('.minusButton input');
    minusButtons.forEach((button) => {
        if (!button || button.dataset[MTG_MINUS_BOUND_FLAG] === 'true') {
            return;
        }

        button.dataset[MTG_MINUS_BOUND_FLAG] = 'true';
        button.addEventListener("click", function(e){
            // 親のoneBlockを削除
            const oneBlock = e.target.closest('.oneBlock');
            if(oneBlock) {
                oneBlock.remove();
                renumberMtgElements();
                setTimeout(() => {
                    if (typeof updatePreview === 'function') {
                        updatePreview();
                    }
                }, 0);
            }
        });
    });
};

const mtgAddButton = () =>{
    const mtgGroup = document.getElementById("mtgGroup");
    const newIndex = mtgGroup.children.length + 1;
    const element = mtgElement(newIndex);
    mtgGroup.insertAdjacentHTML("beforeend", element);
    bindMtgMinusButtonEvents();
    // 前要素の終了時間を新要素の開始・終了時間にセット
    if (newIndex > 1) {
        const prevEnd = document.getElementById("MtgEndTime" + (newIndex - 1));
        const newStart = document.getElementById("MtgStartTime" + newIndex);
        const newEnd = document.getElementById("MtgEndTime" + newIndex);
        if (prevEnd && newStart && newEnd) {
            // 開始時間は前要素の終了時間
            newStart.value = prevEnd.value;
            // 終了時間は前要素の終了時間+30分
            const timeList = Array.from(newEnd.options).map(opt => opt.value);
            let idx = timeList.indexOf(prevEnd.value);
            if(idx !== -1 && idx+2 < timeList.length) {
                newEnd.value = timeList[idx+2]; // +30分後
            } else if(idx !== -1 && idx+1 < timeList.length) {
                newEnd.value = timeList[idx+1]; // +15分後(端の場合)
            } else {
                newEnd.value = prevEnd.value; // それ以外は同じ値
            }
        }
    }
}

const todoAddButton = () =>{
    const todoGroup = document.getElementById("todoGroup");
    const element = todoElement(todoGroup.children.length);
    todoGroup.insertAdjacentHTML("beforeend", element);

    const todoAddedButton = document.getElementById("todoMinusElement"+ todoGroup.children.length);
    todoAddedButton.addEventListener("click", function(e){
        // 親のoneBlockを削除
        const oneBlock = e.target.closest('.oneBlock');
        if(oneBlock) {
            oneBlock.remove();
            setTimeout(() => {
                if (typeof updatePreview === 'function') {
                    updatePreview();
                }
            }, 0);
        }
    });
}

if (typeof window !== 'undefined') {
    window.buildReportMessage = buildReportMessage;
    window.addEventListener('DOMContentLoaded', bindMtgMinusButtonEvents);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { buildReportMessage, DEFAULT_PARAGRAPH };
}

