function inventarSpeicher(){
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
}

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