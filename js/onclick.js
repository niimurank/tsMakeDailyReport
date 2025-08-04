const setMorning = () =>{
    const paragraph = "\n\n";  
    const greetingText = morningGreeting();
    const workType = getWorkType();
    const shere = getShare();
    const mtg = getMtg();
    const todo = getTodo();

    doCopy(
        greetingText + paragraph +  
        workType + paragraph + 
        temp.common.business + paragraph +
        mtg + "\n" + 
        todo + 
        shere 
    );
}

const setEvening = () =>{
    const paragraph = "\n\n";  
    const greetingText = eveningGreeting();
    const workType = getWorkType();
    const shere = getShare();
    const remailing = getRemailing();
    const mtg = getMtg();
    const todo = getTodo();

    doCopy(
        greetingText + paragraph +  
        workType + paragraph + 
        temp.common.business + paragraph +
        mtg + "\n" + 
        todo + 
        remailing + paragraph + 
        shere 
    );
}

//コピー実行
const doCopy = (copyText) => {
    const alertText = "コピーが実行されました";
    alert(alertText);
    
    // 上記要素をクリップボードにコピーする
    navigator.clipboard.writeText(copyText);
}

const mtgAddButton = () =>{
    const mtgGroup = document.getElementById("mtgGroup");
    const element = mtgElement(mtgGroup.children.length);
    mtgGroup.insertAdjacentHTML("beforeend", element);
    // 追加直後のoneBlock
    const newIndex = mtgGroup.children.length;
    const mtgAddedButton = document.getElementById("mtgMinusTime"+ newIndex);
    mtgAddedButton.addEventListener("click", function(e){
        // 親のoneBlockを削除
        const oneBlock = e.target.closest('.oneBlock');
        if(oneBlock) oneBlock.remove();
    });
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
        if(oneBlock) oneBlock.remove();
    });
}

