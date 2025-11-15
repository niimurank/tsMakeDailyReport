
window.onload = function(){
    const copyButton = document.getElementById("copyButton");
    copyButton.addEventListener("click", setEvening);

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

function generateEveningPreview() {
    if (typeof buildReportMessage !== 'function') {
        return '';
    }
    return buildReportMessage({
        greetingFn: (typeof eveningGreeting === 'function') ? eveningGreeting : undefined,
        workTypeFn: (typeof getWorkType === 'function') ? getWorkType : undefined,
        mtgFn: (typeof getMtg === 'function') ? getMtg : undefined,
        todoFn: (typeof getTodo === 'function') ? getTodo : undefined,
        shareFn: (typeof getShare === 'function') ? getShare : undefined,
        remailingFn: (typeof getRemailing === 'function') ? getRemailing : undefined,
        trailingBuilder: ({ paragraph, remailingText, shareText }) => {
            const remailing = remailingText();
            const share = shareText();

            if (remailing && share) {
                return remailing + paragraph + share;
            }
            return remailing || share;
        }
    });
}

function updatePreview() {
    const previewArea = document.getElementById('previewArea');
    if (previewArea) {
        previewArea.textContent = generateEveningPreview();
    }
}
