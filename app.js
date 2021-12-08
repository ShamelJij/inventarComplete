var limitInput = document.getElementById('limitInput');
var source = document.getElementById('nettoPrice');
var result = document.getElementById('result');
var warning = document.getElementById('warning');
var limit = 1000;
limitInput.addEventListener('blur', (event) => {
    limit = limitInput.value;
    console.log(limit);
    console.log(limitInput.value);
});
source.addEventListener('focus', (event) => {
    warning.style.display = "block";
});
source.addEventListener('blur',(event) => {
    warning.style.display = "none";
});


//bug
var inputHandler = function(e) {
    const statusDiv = document.getElementById("hideDiv");
    statusDiv.style.display = "none";

    const statusResultDiv = document.getElementById("statusResult");
    statusResultDiv.style.display = "none";

    var nettoPriceValue =  parseInt(e.target.value);
    if (nettoPriceValue <= limit && nettoPriceValue > 0) {
        result.innerHTML = "GwG";
        statusDiv.style.display = "block";
        statusResultDiv.innerHTML = "before else";
        statusResultDiv.style.display = "block";



        console.log("before else: " + limit + " and " + nettoPriceValue);
    }
    else if (nettoPriceValue <= 0 ||  isNaN(nettoPriceValue)) {
        console.log("after else if: " + limit + " and " + nettoPriceValue);

            result.innerHTML ="Kein Wert";
            statusDiv.style.display = "none";
    }
    else {
        console.log("after else: " + limit + " and " + nettoPriceValue);
        result.innerHTML = "Abschreibfähig"
        statusDiv.style.display = "block";
    }
}
source.addEventListener('input', inputHandler);
source.addEventListener('propertychange', inputHandler);


//Table saved on localStorage and listed on page



document
    .getElementById("inputForm")
    .addEventListener("submit", function (event){

        event.preventDefault();
        var itemLabel = document.getElementById("itemLabel").value.trim();
        var itemType = document.getElementById("itemType").value.trim();
        var serialNumber = document.getElementById("serialNumber").value.trim();
        var nettoPrice = document.getElementById("nettoPrice").value.trim();

        //error handling
        if (!itemLabel || !itemType || !serialNumber || !nettoPrice){
            return;
        }
        //counter for itemID
        var itemID = localStorage.getItem('counter');
        if (itemID === null) {
            itemID = 0;
        } else {
            itemID++;
        }
        localStorage.setItem("counter", itemID);

        console.log("Storage Key: ", itemID);

        //storing as an object
        var storeInfo = {
            itemID: itemID,
            itemLabel: itemLabel,
            itemType: itemType,
            serialNumber: serialNumber,
            nettoPrice: nettoPrice

        };
        console.log("Item label:", itemLabel);
        console.log("Item type:", itemType);
        console.log("Serial number:", serialNumber);
        console.log("Netto price:", nettoPrice);

        localStorage.setItem("storeInfo", JSON.stringify(storeInfo));
        console.log("Store Info Object:", storeInfo);


        //making a table from local storage
        var storeFormStoreArray = [storeInfo]
        buildTableStoreForm(storeFormStoreArray);
        function buildTableStoreForm(data){
            var table = document.getElementById('formStoreTable')

            for (var i = 0; i < data.length; i++){
                var row = `<tr>
                        <td>${data[i].itemID}</td>
                        <td>${data[i].itemLabel}</td>
                        <td>${data[i].itemType}</td>
                        <td>${data[i].serialNumber}</td>
                        <td>${data[i].nettoPrice}</td>
                        </tr>`
                table.innerHTML += row


            }
        }
    });

//Table CRUD

var selectedRow = null;
function onPFormSubmit(e){
    event.preventDefault();
    var formData = readFormData();
    if(selectedRow === null){
        insertNewRecord(formData);
    }
    else{
        updateRecord(formData);
    }
    resetForm();
}

function readFormData(){
    var formData = {};
    formData ["pLastName"] = document.getElementById("pLastName").value;
    formData ["pFirstName"] = document.getElementById("pLastName").value;
    formData ["pPersonalNumber"] = document.getElementById("pPersonalNumber").value;
    formData ["pEmail"] = document.getElementById("pEmail").value;
    return formData;
}

//Insert the data
function insertNewRecord(data){
    var table = document.getElementById("pStoreList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.statusid;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.anschaffVonid;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.anschaffBisid;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.inventarBezeichnungid;
    var cell9 = newRow.insertCell(4);
    cell9.innerHTML = `<button onClick='onEdit(this)'>Edit</button> <button onClick='onDelete(this)'>Delete</button>`
}


//Edit the data
function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('pLastName').value = selectedRow.cells[0].innerHTML;
    document.getElementById('pFirstName').value = selectedRow.cells[1].innerHTML;
    document.getElementById('pPersonalNumber').value = selectedRow.cells[2].innerHTML;
    document.getElementById('pEmail').value = selectedRow.cells[3].innerHTML;

}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.pLastName;
    selectedRow.cells[1].innerHTML = formData.pFirstName;
    selectedRow.cells[2].innerHTML = formData.pPersonalNumber;
    selectedRow.cells[3].innerHTML = formData.pEmail;
}

//Delete the data
function onDelete(td){
    if(confirm('Wollen Sie wirklich löschen?')){
        row = td.parentElement.parentElement;
        document.getElementById('pStoreList').deleteRow(row.rowIndex);
    }
    resetForm();
}

//Reset the data
function resetForm(){
    document.getElementById('pLastName').value;
    document.getElementById('pFirstName').value;
    document.getElementById('pPersonalNumber').value;
    document.getElementById('pEmail').value;
}