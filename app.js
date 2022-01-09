function readFormData (){
    console.log("readFromData");
    let formData = {};
    formData ["first"] = document.getElementById("fieldOne").value;
    formData ["two"] = document.getElementById("fieldTwo").value
    formData ["three"] = document.getElementById("fieldThree").value;    
    return formData;
}
function setFormLocalStorage(){
    let formList = [];
    if (localStorage.getItem("FormData") == null){
    formList.push(readFormData());
    localStorage.setItem("FormData",JSON.stringify(formList))
    console.log(readFormData());
    console.log(formList);
} else {
    let savedData = JSON.parse(localStorage.getItem("FormData"));
    let savedDataID = savedData.length;
    savedData.push(readFormData());
    localStorage.setItem("FormData",JSON.stringify(savedData));
    console.log("ID: ",savedDataID);
}

}
function saveForm(){
    readFormData();
    setFormLocalStorage();
}
function viewID(){
    let savedDataID = JSON.parse(localStorage.getItem("FormData")).length;
    let savedData = JSON.parse(localStorage.getItem("FormData"));
    let formID = document.getElementById("idView").value;
    let showIDvalue = JSON.stringify(savedData[formID - 1]);
    if(savedDataID < formID)
    { 
        document.getElementById("showID").innerHTML = "not saved!!";
    } else {
        document.getElementById("showID").innerHTML = showIDvalue;
        console.log("ID :",showIDvalue);
    }
}
function deleteID(){
    let savedDataID = JSON.parse(localStorage.getItem("FormData")).length;
    let savedData = JSON.parse(localStorage.getItem("FormData"));
    let formID = document.getElementById("idView").value;
    let showIDvalue = JSON.stringify(savedData[formID - 1]);
    if(savedDataID < formID)
    { 
        document.getElementById("showID").innerHTML = "not saved!!";
    } else {
        document.getElementById("showID").innerHTML = "Item deleted: " + showIDvalue;
        let resultData = savedData.splice(formID - 1,1);
        localStorage.setItem("FormData",JSON.stringify(savedData));
        console.log("ID :",formID);
        console.log("Deleted :",resultData);
        console.log(savedDataID);
        
    }
}