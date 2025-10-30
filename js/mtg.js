const getMtg = () =>{
    const mtgGroup = document.getElementById("mtgGroup").children.length;
    
    let mtgDetail  = ""; 
    for(let index = 1;index <= mtgGroup; index++){
        mtgDetail += mtgOneSection(index);
    }
    return "【MTG】\n" + mtgDetail;
}

const mtgOneSection = (number) => {
    const MtgStartTime = document.getElementById("MtgStartTime" + number).value;
    const MtgEndTime = document.getElementById("MtgEndTime" + number).value;
    const MtgText = document.getElementById("MtgText" + number).value;

    return MtgStartTime + "-" + MtgEndTime + " " + MtgText + "\n";
}

const mtgElement = (length) =>{
    const number =  length + 1;
    
    const element = 
    '<div class="oneBlock" id="mtgElement' + number + '"><div class="minusButton"><input  id="mtgMinusTime' + number + '" type="button" value="-" ></div><div class="timeBlock"><div><div>開始時間</div><select id="MtgStartTime'+ 
    number + '"><option>9:00</option><option>9:15</option><option>9:30</option><option>9:45</option><option>10:00</option><option>10:15</option><option>10:30</option><option>10:45</option><option>11:00</option><option>11:15</option><option>11:30</option><option>11:45</option><option>12:00</option><option>12:15</option><option>12:30</option><option>12:45</option><option>13:00</option><option>13:15</option><option>13:30</option><option>13:45</option><option>14:00</option><option>14:15</option><option>14:30</option><option>14:45</option><option>15:00</option><option>15:15</option><option>15:30</option><option>15:45</option><option>16:00</option><option>16:15</option><option>16:30</option><option>16:45</option><option>17:00</option><option>17:15</option><option>17:30</option><option>17:45</option><option>18:00</option><option>18:15</option><option>18:30</option><option>18:45</option><option>19:00</option><option>19:15</option><option>19:30</option><option>19:45</option></select></div><div><div>終了時間</div><select id="MtgEndTime' +  
    number+'"><option>9:00</option><option>9:15</option><option>9:30</option><option>9:45</option><option>10:00</option><option>10:15</option><option>10:30</option><option>10:45</option><option>11:00</option><option>11:15</option><option>11:30</option><option>11:45</option><option>12:00</option><option>12:15</option><option>12:30</option><option>12:45</option><option>13:00</option><option>13:15</option><option>13:30</option><option>13:45</option><option>14:00</option><option>14:15</option><option>14:30</option><option>14:45</option><option>15:00</option><option>15:15</option><option>15:30</option><option>15:45</option><option>16:00</option><option>16:15</option><option>16:30</option><option>16:45</option><option>17:00</option><option>17:15</option><option>17:30</option><option>17:45</option><option>18:00</option><option>18:15</option><option>18:30</option><option>18:45</option><option>19:00</option><option>19:15</option><option>19:30</option><option>19:45</option></select></div></div><div class="inputBlock"><div>内容</div><input type="text" id="MtgText'+ number +'" /></div></div>';

    return element;
}

const mtgDeleteEvent = (number) =>{
    const mtgElement = document.getElementById("mtgElement"+ number);
    mtgElement.remove(); 
}