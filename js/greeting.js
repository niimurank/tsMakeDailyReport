
const morningGreeting = () =>{
    const name = setName();
    const greetingText = 
        temp.morning.greeting_1 + "\n" + name + temp.morning.greeting_2;
    
    return greetingText;
};
const eveningGreeting = () =>{
    const name = setName();
    const greetingText = 
        temp.evening.greeting_1 + "\n" + name + temp.evening.greeting_2;
    
    return greetingText;
};

const setName = () => {
    const userName = document.getElementById("userName").value;
    if(userName !== ""){
        return userName + "です。\n";
    }else{
        return "";
    };
}
   


