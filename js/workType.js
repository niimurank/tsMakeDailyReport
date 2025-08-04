const getWorkType = ()=>{
    const workType = document.querySelector('input[name="workType"]:checked').value;
    const setText = temp.common.workType + "\n" + workType;
    
    return setText;
} 

