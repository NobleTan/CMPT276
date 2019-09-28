var activityCounter = 0;
function getInputValueMean(){
    let toptotal = 0;
    let counter = 0;
    let total = 0;
    for (let i = 1; i <= activityCounter; i++){
        let top_grade = document.getElementById(`Grade${i}`).value;
        let bot_grade = document.getElementById(`outof${i}`).value;
        if (top_grade !="" && bot_grade !="" ){
            toptotal=(top_grade/bot_grade);
            total+=toptotal;
            counter++;
        }
    }

    if(counter > 0 && !isNaN(total/counter)){
        total=total/counter;
        document.getElementById("result").innerHTML = `Mean: ${total} = ~${Math.round(total*1000)/10}/100`; 
    }
     else {
        document.getElementById("result").innerHTML = "ERROR";
    }
}

function getInputValueWeighted(){
    var totalWeight= 0;
    let toptotal=0;
    let total=0;
    for (let i = 1; i <= activityCounter; i++){
        let top_grade = document.getElementById(`Grade${i}`).value;
        let bot_grade = document.getElementById(`outof${i}`).value;
        var weight = parseFloat(document.getElementById(`Weight${i}`).value);
        if (top_grade !="" && bot_grade !="" && weight !=""){
            totalWeight += weight;
            toptotal = (top_grade/bot_grade);
            total+= (toptotal*weight);
        }
    }   

    if (totalWeight > 0 ){
        total =total/totalWeight;
        document.getElementById("result").innerHTML = `Weighted Mean: ${total} = ~${Math.round(total*1000/10)}/100`; 
    }
    else {
        document.getElementById("result").innerHTML = "ERROR";
    }
}


function getInputValuePercent(activityNumber)
{    
    let top_grade = document.getElementById(`Grade${activityNumber}`).value;
    let bot_grade = document.getElementById(`outof${activityNumber}`).value;

    let total_grade=0;

    if ( top_grade !="" && bot_grade !="" )
    {
        grade=Math.round((top_grade/bot_grade) * 10000)/100;
        document.getElementById(`Percentage${activityNumber}`).innerHTML = `${grade}${isNaN(grade) ? '':'%'}`;
    }
    else
    {
        document.getElementById(`Percentage${activityNumber}`).innerHTML ="";
    }
}


function addRow() {
    let table = document.getElementById("table");    
    let newRow = table.insertRow(-1);
    
    activityCounter += 1;

    newRow.insertCell(-1).innerHTML = `Activity ${activityCounter}`; // Activity name
    newRow.insertCell(-1).innerHTML = `A${activityCounter}`; // Short name  

    let weight_input = createInput(`Weight${activityCounter}`);
   // weight_input.setAttribute("onclick", `getInputValueWeighted(${activityCounter})`);
    newRow.insertCell(-1).appendChild(weight_input); // Weight node

    let grade_cell = newRow.insertCell(-1);
    grade_cell.appendChild(createInput(`Grade${activityCounter}`));
    grade_cell.innerHTML = grade_cell.innerHTML + ' /';
    grade_cell.appendChild(document.createElement("p"));
    grade_cell.appendChild(createInput(`outof${activityCounter}`));
    newRow.insertCell(-1).appendChild(document.createElement("p")).setAttribute("id", `Percentage${activityCounter}`); //= "This should be the percentage output" // Percentage node
}

function createInput(id) {
    let size = "7.0";

    let node = document.createElement("input");
    node.setAttribute("type","text");
    node.setAttribute("id", id);
    node.setAttribute("size", size);
    node.setAttribute("onkeyup",`getInputValuePercent(${activityCounter})`);
    return node;
}

function deleteRow(){
    if (activityCounter > 0){
        document.getElementById("table").deleteRow(-1);
        activityCounter--;
    } 
}
function init(){
    for (let i=0; i<4; i++){
    addRow();
    }
}