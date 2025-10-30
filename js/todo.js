const getTodo = () =>{
    const todoGroup = document.getElementById("todoGroup").children.length;
    
    let todoDetail  = ""; 
    for(let index = 1;index <= todoGroup; index++){
        todoDetail += todoOneSection(index);
    }
    return "【本日作業】\n" + todoDetail;
} 

const todoOneSection = (number) => {
    const todoTitle = document.getElementById("todoTitle" + number).value;
    const todoText = document.getElementById("todoText" + number).value;

    return "◇"+todoTitle + "\n" + todoText + "\n\n";
}

const todoElement = (length) =>{
    const number =  length + 1;
    
    const element = 
    '<div class="oneBlock" id="todoElement'+ number + '"><div class="minusButton"><input type="button" value="-" id="todoMinusElement' + 
    number +'"></div><div class="selectBlock"><div>項目名</div><input type="text" id="todoTitle'+ number +'"></div><div><div class="title">内容</div><div class="inputBox"><textarea id="todoText'+ number + '"></textarea></div></div></div>';
    
    return element;
}
const todoDeleteEvent = (number) =>{
    const todoElement = document.getElementById("todoElement"+ number);
    todoElement.remove(); 
}