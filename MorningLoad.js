
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
    if (typeof buildReportMessage !== 'function') {
        return '';
    }
    return buildReportMessage({
        greetingFn: (typeof morningGreeting === 'function') ? morningGreeting : undefined,
        workTypeFn: (typeof getWorkType === 'function') ? getWorkType : undefined,
        mtgFn: (typeof getMtg === 'function') ? getMtg : undefined,
        todoFn: (typeof getTodo === 'function') ? getTodo : undefined,
        shareFn: (typeof getShare === 'function') ? getShare : undefined
    });
}

function updatePreview() {
    const previewArea = document.getElementById('previewArea');
    if (previewArea) {
        previewArea.textContent = generateMorningPreview();
    }
}
