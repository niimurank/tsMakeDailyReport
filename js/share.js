const getShare = () =>{
    const share = document.getElementById("share").value;

    if(share !== ""){

        return temp.common.share + "\n" + share;
    }else{

        return temp.common.share + "\nなし";
    }
}