const getRemailing = () =>{
    const share = document.getElementById("remaining").value;

    if(share !== ""){

        return temp.common.remaining + "\n" + share;
    }else{

        return temp.common.remaining + "\nなし";
    }
}