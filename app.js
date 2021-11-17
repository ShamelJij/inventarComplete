var selectedRow = null;
function onFormSubmit(e){
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
    formData ["statusid"] = document.getElementById("statusid").value;
    formData ["anschaffVonid"] = document.getElementById("anschaffVonid").value;
    formData ["anschaffBisid"] = document.getElementById("anschaffBisid").value;
    formData ["inventarBezeichnungid"] = document.getElementById("inventarBezeichnungid").value;
    formData ["seriennummerid"] = document.getElementById("seriennummerid").value;
    formData ["preisnettoid"] = document.getElementById("preisnettoid").value;
    formData ["abschreibungZeitraumVonid"] = document.getElementById("abschreibungZeitraumVonid").value;
    formData ["abschreibungZeitraumBisid"] = document.getElementById("abschreibungZeitraumBisid").value;
    return formData;
}

//Insert the data
function insertNewRecord(data){
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.statusid;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.anschaffVonid;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.anschaffBisid;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.inventarBezeichnungid;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.seriennummerid;
    var cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.preisnettoid;
    var cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.abschreibungZeitraumVonid;
    var cell8 = newRow.insertCell(7);
    cell8.innerHTML = data.abschreibungZeitraumBisid;
    var cell9 = newRow.insertCell(8);
    cell9.innerHTML = `<button onClick='onEdit(this)'>Edit</button> <button onClick='onDelete(this)'>Delete</button>`
}


//Edit the data
function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('statusid').value = selectedRow.cells[0].innerHTML;
    document.getElementById('anschaffVonid').value = selectedRow.cells[1].innerHTML;
    document.getElementById('anschaffBisid').value = selectedRow.cells[2].innerHTML;
    document.getElementById('inventarBezeichnungid').value = selectedRow.cells[3].innerHTML;
    document.getElementById('seriennummerid').value = selectedRow.cells[4].innerHTML;
    document.getElementById('preisnettoid').value = selectedRow.cells[5].innerHTML;
    document.getElementById('abschreibungZeitraumVonid').value = selectedRow.cells[6].innerHTML;
    document.getElementById('abschreibungZeitraumBisid').value = selectedRow.cells[7].innerHTML;
    function calcDatum{
    var datumone = document.getElementById('abschreibungZeitraumVonid').value;
    var datumtwo = document.getElementById('abschreibungZeitraumBisid').value;
    }
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.statusid;
    selectedRow.cells[1].innerHTML = formData.anschaffVonid;
    selectedRow.cells[2].innerHTML = formData.anschaffBisid;
    selectedRow.cells[3].innerHTML = formData.inventarBezeichnungid;
    selectedRow.cells[4].innerHTML = formData.seriennummerid;
    selectedRow.cells[5].innerHTML = formData.preisnettoid;
    selectedRow.cells[6].innerHTML = formData.abschreibungZeitraumVonid;
    selectedRow.cells[7].innerHTML = formData.abschreibungZeitraumBisid;
}

//Delete the data
function onDelete(td){
    if(confirm('Wollen Sie wirklich löschen?')){
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
    }
    resetForm();
}

//Reset the data
function resetForm(){
    document.getElementById('statusid').value = '';
    document.getElementById('anschaffVonid').value = '';
    document.getElementById('anschaffBisid').value = '';
    document.getElementById('inventarBezeichnungid').value = '';
    document.getElementById('seriennummerid').value = '';
    document.getElementById('preisnettoid').value = '';
    document.getElementById('abschreibungZeitraumVonid').value = '';
    document.getElementById('abschreibungZeitraumBisid').value = '';
}