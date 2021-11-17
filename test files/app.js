
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
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.statusid;
    selectedRow.cells[1].innerHTML = formData.anschaffVonid;
    selectedRow.cells[2].innerHTML = formData.anschaffBisid;
    selectedRow.cells[3].innerHTML = formData.inventarBezeichnungid;
    selectedRow.cells[3].innerHTML = formData.seriennummerid;
    selectedRow.cells[3].innerHTML = formData.preisnettoid;
    selectedRow.cells[3].innerHTML = formData.abschreibungZeitraumVonid;
    selectedRow.cells[3].innerHTML = formData.abschreibungZeitraumBisid;
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










/*function insertNewInventar(inventarData){
    var table = document.getElementById("inventarTabelle").getElementsByTagName("tbody")[0];
    var inventarNewRaw = table.insertRow(table.length);
    inventarCell1 = inventarNewRaw.insertCell(0);
    inventarCell1.innerHTML = inventarData.status;
    inventarCell2 = inventarNewRaw.insertCell(1);
    inventarCell2.innerHTML = inventarData.anschaffVonid;
    inventarCell3 = inventarNewRaw.insertCell(2);
    inventarCell3.innerHTML = inventarData.anschaffBisid;
    inventarCell4 = inventarNewRaw.insertCell(3);
    inventarCell4.innerHTML = inventarData.inventarBezeichnungid;
    inventarCell5 = inventarNewRaw.insertCell(4);
    inventarCell5.innerHTML = inventarData.seriennummerid;
    inventarCell6 = inventarNewRaw.insertCell(5);
    inventarCell6.innerHTML = inventarData.preisnettoid;
    inventarCell7 = inventarNewRaw.insertCell(6);
    inventarCell7.innerHTML = inventarData.abschreibungZeitraumVonid;
    inventarCell8 = inventarNewRaw.insertCell(7);
    inventarCell8.innerHTML = inventarData.abschreibungZeitraumBisid;
    inventarCell9 = inventarNewRaw.insertCell(8);
    inventarCell9.innerHTML = "<button>Edit</button>";
    inventarCell10 = inventarNewRaw.insertCell(9);
    inventarCell10.innerHTML = "<button>Delete</button>"
}*/










/*function inventarSpeicher(){
    var inventarFormData = inventarReadFormData();
    insertNewInventar(inventarFormData);  
}

function inventarReadFormData(){
    var inventarFormData = {};
    inventarFormData ["statusid"] = document.getElementById("statusid").value;
    inventarFormData ["anschaffVonid"] = document.getElementById("anschaffVonid").value;
    inventarFormData ["anschaffBisid"] = document.getElementById("anschaffBisid").value;
    inventarFormData ["inventarBezeichnungid"] = document.getElementById("inventarBezeichnungid").value;
    inventarFormData ["seriennummerid"] = document.getElementById("seriennummerid").value;
    inventarFormData ["preisnettoid"] = document.getElementById("preisnettoid").value;
    inventarFormData ["abschreibungZeitraumVonid"] = document.getElementById("abschreibungZeitraumVonid").value;
    inventarFormData ["abschreibungZeitraumBisid"] = document.getElementById("abschreibungZeitraumBisid").value;
    return inventarFormData;
}

function insertNewInventar(inventarData){
    var table = document.getElementById("inventarTabelle").getElementsByTagName("tbody")[0];

    var inventarNewRaw = table.insertRow(table.length);
    inventarCell1 = inventarNewRaw.insertCell(0);
    inventarCell1.innerHTML = inventarData.status;
    inventarCell2 = inventarNewRaw.insertCell(1);
    inventarCell2.innerHTML = inventarData.anschaffVonid;
    inventarCell3 = inventarNewRaw.insertCell(2);
    inventarCell3.innerHTML = inventarData.anschaffBisid;
    inventarCell4 = inventarNewRaw.insertCell(3);
    inventarCell4.innerHTML = inventarData.inventarBezeichnungid;
    inventarCell5 = inventarNewRaw.insertCell(4);
    inventarCell5.innerHTML = inventarData.seriennummerid;
    inventarCell6 = inventarNewRaw.insertCell(5);
    inventarCell6.innerHTML = inventarData.preisnettoid;
    inventarCell7 = inventarNewRaw.insertCell(6);
    inventarCell7.innerHTML = inventarData.abschreibungZeitraumVonid;
    inventarCell8 = inventarNewRaw.insertCell(7);
    inventarCell8.innerHTML = inventarData.abschreibungZeitraumBisid;
    inventarCell9 = inventarNewRaw.insertCell(8);
    inventarCell9.innerHTML = "<button>Edit</button>";
    inventarCell10 = inventarNewRaw.insertCell(9);
    inventarCell10.innerHTML = "<button>Delete</button>"
}*/

/*
function inventarSpeicher(){
    var new_inventarSpeicher = document.getElementById('inventar-speicher').value;
    if(localStorage.getItem('inventarSpeicher') == null){
        localStorage.setItem('inventarSpeicher','[]');

    }
    var old_inventarSpeicher = JSON.parse(localStorage.getItem('inventarSpeicher'));
    old_inventarSpeicher.push(new_inventarSpeicher);
    localStorage.setItem('inventarSpeicher', JSON.stringify(old_inventarSpeicher));
}
function inventarTabelle(){
    if (localStorage.getItem('inventarSpeicher')!=null){
        document.getElementById('inventarZeigen').innerHTML = JSON.parse(localStorage.getItem('inventarSpeicher'));
    }
}




function save(){

    var new_data = document.getElementById('input').value;
    if(localStorage.getItem('data') == null){
        localStorage.setItem('data','[]');

    }
    var old_data = JSON.parse(localStorage.getItem('data'));
    old_data.push(new_data);
    localStorage.setItem('data', JSON.stringify(old_data));
}
    function view(){
        if (localStorage.getItem('data')!=null){
            document.getElementById('output').innerHTML = JSON.parse(localStorage.getItem('data'));
        }
}*/