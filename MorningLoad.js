
window.onload = function(){
    const copyButton = document.getElementById("copyButton");
    copyButton.addEventListener("click",setMorning);

    const mtgAddButtonElement = document.getElementById("mtgAddButton");
    mtgAddButtonElement.addEventListener("click", function() {
        mtgAddButton();
        setTimeout(updatePreview, 0); // 追加直後にプレビュー更新
    });

    const todoAddButtonElement = document.getElementById("todoAddButton");
    todoAddButtonElement.addEventListener("click", function() {
        todoAddButton();
        setTimeout(updatePreview, 0); // 追加直後にプレビュー更新
    });

    // 入力欄の変更時にプレビュー更新
    document.addEventListener('input', function(e) {
        if (e.target.closest('input') || e.target.closest('textarea') || e.target.closest('select')) {
            updatePreview();
        }
    });
    updatePreview(); // 初期表示
}

function generateMorningPreview() {
    const paragraph = "\n\n";
    const greetingText = (typeof morningGreeting === 'function') ? morningGreeting() : '';
    const workType = (typeof getWorkType === 'function') ? getWorkType() : '';
    const shere = (typeof getShare === 'function') ? getShare() : '';
    const mtg = (typeof getMtg === 'function') ? getMtg() : '';
    const todo = (typeof getTodo === 'function') ? getTodo() : '';
    const business = (window.temp && window.temp.common && window.temp.common.business) ? window.temp.common.business : '';
    return (
        greetingText + paragraph +
        workType + paragraph +
        business + paragraph +
        mtg + "\n" +
        todo +
        shere
    );
}

function updatePreview() {
    const previewArea = document.getElementById('previewArea');
    if (previewArea) {
        previewArea.textContent = generateMorningPreview();
    }
}
