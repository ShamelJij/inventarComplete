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
    savedData.push(readFormData());
    localStorage.setItem("FormData",JSON.stringify(savedData));
    console.log("ID: ",savedData.length);
}

}
function saveForm(){
    readFormData();
    setFormLocalStorage();
}