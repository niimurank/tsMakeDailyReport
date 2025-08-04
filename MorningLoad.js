window.onload = function(){
    const copyButton = document.getElementById("copyButton");
    
    copyButton.addEventListener("click",setMorning);

    const mtgAddButtonElement = document.getElementById("mtgAddButton");
    mtgAddButtonElement.addEventListener("click",mtgAddButton);

    const todoAddButtonElement = document.getElementById("todoAddButton");
    todoAddButtonElement.addEventListener("click",todoAddButton);
}
