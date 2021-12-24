//saving in localStorage
function saveInventory(){
/*
    function getInputInventoy(){
        let fromInput = {};
        fromInput ["FormStatus"] = document.getElementById("idFormStatus").value;
        fromInput ["label"] = document.getElementById("idLabel").value;
        fromInput ["serialNumber"] = document.getElementById("idSerialNumber").value;
        fromInput ["type"] = document.getElementById("idType").value;
        fromInput ["purchaseDate"] = document.getElementById("idPurchaseDate").value;
        fromInput ["iprice"] = document.getElementById("idPrice").value;
        fromInput ["formBookCategory"] = document.getElementById("formBookCategory").value;
        fromInput ["deprecation"] = document.getElementById("idDepreciationInput").value;
        fromInput ["validationEndDate"] = document.getElementById("idDepreciationInput").value;
        return fromInput;
    }
    console.log("fromInput: ",fromInput);*/
    //showing the table incase it's not visible
    let inventoryTable = document.getElementById('inventoryTable');
    inventoryTable.className += "d-block";
    //getting input into localStorage

    console.log("save button");
    //status
    let formStatus = document.getElementById("idFormStatus").value;
    let label = document.getElementById("idLabel").value;
    let serialNumber = document.getElementById("idSerialNumber").value;
    let type = document.getElementById("idType").value;
    let purchaseDate = document.getElementById("idPurchaseDate").value;
    //price
    let iprice = document.getElementById("idPrice").value;
    //bookingCategory
    let formBookCategory = document.getElementById("formBookCategory").value;
    let deprecation = document.getElementById("idDepreciationInput").value;
    let validationEndDate = document.getElementById("idDepreciationInput").value;

    const inventoryList = {
        formStatus: formStatus,
        label: label,
        serialNumber: serialNumber,
        type: type,
        purchaseDate: purchaseDate,
        iprice: iprice,
        formBookCategory: formBookCategory,
        deprecationInput: deprecation,
        validationEndDate: validationEndDate,
    }
   /* for (let i = 0; i < inventoryList ; i ++){

    }*/
    //not finished
    if (localStorage.getItem(inventoryList) != 0){
        console.log("INNNNNventory");

    window.localStorage.setItem('Inventory', JSON.stringify(inventoryList));
    let itemList = [inventoryList];
    console.log(inventoryList);
    console.log("the list",itemList);
    //let inventoryList = [];
    let inventoryList = JSON.parse(localStorage.getItem('Inventory'));
    let size = Object.keys(oldInventory).length;
    console.log("size is: ", size);

    let t = '<tbody>';
    for(let i = 0; i < itemList.length; i++){
        t+= '<tr>';
        t+= '<td class="ml-4">' + itemList[i].formStatus + '</td>';
        t+= '<td class="ml-4">' + itemList[i].label + '</td>';
        t+= '<td class="ml-4">' + itemList[i].serialNumber + '</td>';
        t+= '<td class="ml-4">' + itemList[i].type + '</td>';
        t+= '<td class="ml-4">' + itemList[i].purchaseDate + '</td>';
        t+= '<td class="ml-4">' + itemList[i].iprice + '</td>';
        t+= '<td class="ml-4">' + itemList[i].formBookCategory + '</td>';
        t+= '<td class="ml-4">' + itemList[i].deprecationInput + '</td>';
        t+= '<td class="ml-4">' + itemList[i].validationEndDate + '</td>';
        t+='</tr>';

    }
    t+= '</tbody>';
    document.getElementById('inventoryTable').innerHTML= t;
    }
}

function showInventory() {
    let oldInventory = JSON.parse(localStorage.getItem('Inventory'));
    let itemList = [oldInventory];
    console.log(oldInventory);
    console.log("the list",itemList);
    let t = '<tbody>';
    for(let i = 0; i < itemList.length; i++){
        t+= '<tr>';
        t+= '<td class="ml-4">' + itemList[i].formStatus + '</td>';
        t+= '<td class="ml-4">' + itemList[i].label + '</td>';
        t+= '<td class="ml-4">' + itemList[i].serialNumber + '</td>';
        t+= '<td class="ml-4">' + itemList[i].type + '</td>';
        t+= '<td class="ml-4">' + itemList[i].purchaseDate + '</td>';
        t+= '<td class="ml-4">' + itemList[i].iprice + '</td>';
        t+= '<td class="ml-4">' + itemList[i].formBookCategory + '</td>';
        t+= '<td class="ml-4">' + itemList[i].deprecationInput + '</td>';
        t+= '<td class="ml-4">' + itemList[i].validationEndDate + '</td>';
        t+='</tr>';

    }
    t+= '</tbody>';
    document.getElementById('inventoryTable').innerHTML= t;
}
function dateChangeHandler(){
    let g = document.getElementById("idPurchaseDate").className;
    g = g.replace('is-invalid','');
    g = g.replace('is-valid','');
    g = g.trim();
    document.getElementById("idPurchaseDate").className = g + " is-invalid";
    document.getElementById("idPurchaseDateInvalid").innerText = "jetzt Brechnen drucken!";
}

// Konvertieren von Eingaben in das richtige Format
// Bsp Trim bei Textfeldern

function inputTranslation() {
    // "Bezeichnung", "Seriennummer", "Typ" die vorferen und hinteren Leerzeichen entfernen
    //Bezeichnung
    let label = document.getElementById('idLabel').value;

    label = label.replace(/\s+/g," ");
    label = label.trim();
    console.log('trimmed Bezeichnung: ',label);
    document.getElementById('idLabel').value = label;
    //seriennummer
    let serialNumber = document.getElementById('idSerialNumber').value;

    serialNumber = serialNumber.replace(/\s+/g," ");
    console.log('Serial Number after replace: ',serialNumber);
    serialNumber = serialNumber.trim();
    console.log('trimmed serial NUmber: ',serialNumber);

    document.getElementById('idSerialNumber').value = serialNumber;
    //typ
    let type = document.getElementById('idType').value;
    console.log('trimmed Type: ',type);
    type = type.replace(/\s+/g," ");
    type = type.trim();
    console.log('result type: ',type);
    document.getElementById('idType').value = type;
    // Formatieren des Preises im Format: x.xxx,xx
}

function initInventory(){
    let inventoryTable = document.getElementById('inventoryTable');
    //inventoryList
    let inventoryList = JSON.parse(localStorage.getItem('Inventory'));
    if (!inventoryList || inventoryList.length == 0){
        inventoryTable.className = 'd-block' ;
        console.log('table is empty');
    }
    else {
        console.log('building a new row');
        //insertNewRecord(data);
        showInventory();
            console.log("show Inventory");


    }
}

function resetInventory() {
    let inventoryTable = document.getElementById('inventoryTable');
    localStorage.removeItem('Inventory');
    inventoryTable.className = 'd-none'
}
//check all input validation
function inputValidation() {

    //variable for refresh function for the return
    let ret = true;
    //Anschaffungsdatum validieren (muss nicht in zukunft sein)
    //Anschaffungsdatum als wert
    let purchaseDate = document.getElementById("idPurchaseDate").value;
    //jetztgen Datum
    let nowDate = new Date().toISOString().split('T')[0];

    console.log('purchase date is: ', Number(purchaseDate));
    console.log('now is: ',nowDate);

    if (purchaseDate > nowDate){
        console.log('purchase date is bigger than now');
        let x = document.getElementById("idPurchaseDate").className;
        x = x.replace('is-invalid','');
        x = x.replace('is-valid','');
        x = x.trim();
        document.getElementById("idPurchaseDate").className = x + " is-invalid";
        document.getElementById("idPurchaseDateInvalid").innerText = "Das Datum legt in Zukunft!";
        ret = false;
    }
    else if (purchaseDate == ''){
        let t = document.getElementById("idPurchaseDate").className;
        t = t.replace('is-invalid','');
        t = t.replace('is-valid','');
        t = t.trim();
        document.getElementById("idPurchaseDate").className = t + " is-invalid";
        document.getElementById("idPurchaseDateInvalid").innerText = "Das Datum ist leer!";
        ret = false;
    }
    else {
        console.log('purchase date is smaller than now');
        let y = document.getElementById("idPurchaseDate").className;
        y = y.replace('is-invalid','');
        y = y.replace('is-valid','');
        y = y.trim();
        document.getElementById("idPurchaseDate").className = y + " is-valid";
        document.getElementById("idPurchaseDateValid").innerText = "Das Datum ist gültig!";
    }
    //price validation muss nicht negatives Wert haben
    let price = document.getElementById('idPrice').value;
    //parsing input to number without zeros on the left
    price = Number(price);
    document.getElementById('idPrice').value = price;
    console.log('the price is: ', price);
    //Show booking category
    if (price < 0){
        console.log('price is negative');
        let x = document.getElementById("idPrice").className;
        x = x.replace('is-invalid','');
        x = x.replace('is-valid','');
        x = x.trim();
        document.getElementById("idPrice").className = x + " is-invalid";
        document.getElementById("idPriceInvalid").innerText = "Kein negativem Wert bitte!";
        ret = false;
    }
    else {
        console.log('price is not negative');
        let y = document.getElementById("idPrice").className;
        y = y.replace('is-invalid','');
        y = y.replace('is-valid','');
        y = y.trim();
        document.getElementById("idPrice").className = y + " is-valid";
        document.getElementById("idPriceValid").innerText = "Der Wert ist gültig!";
    }
    //deprecation validation idDepreciationInput
    //deprecation validation muss nicht negatives Wert haben
    let deprecation = document.getElementById('idDepreciationInput').value;
    //Show booking category
    if (deprecation < 0){
        console.log('deprecation is negative');
        let x = document.getElementById("idDepreciationInput").className;
        x = x.replace('is-invalid','');
        x = x.replace('is-valid','');
        x = x.trim();
        document.getElementById("idDepreciationInput").className = x + " is-invalid";
        document.getElementById("idDepreciationInputIsInValid").innerText = "Kein negativem Wert bitte!";
        ret = false;
    }
    else {
        console.log('deprecation is not negative');
        let y = document.getElementById("idDepreciationInput").className;
        y = y.replace('is-invalid','');
        y = y.replace('is-valid','');
        y = y.trim();
        document.getElementById("idDepreciationInput").className = y + " is-valid";
        document.getElementById("idDepreciationInputIsValid").innerText = "Der Wert ist gültig!";

    }
    //validating the label input not to be empty
    let labelInput = document.getElementById('idLabel').value;
    if(labelInput == ''){
        let l = document.getElementById("idLabel").className;
        l = l.replace('is-invalid','');
        l = l.replace('is-valid','');
        l = l.trim();
        document.getElementById("idLabel").className = l + " is-invalid";
        document.getElementById("idLabelIsInvalid").innerText = "leer!";
        //optional
        //ret = false;
    }
    else {
        let lv = document.getElementById("idLabel").className;
        lv = lv.replace('is-invalid','');
        lv = lv.replace('is-valid','');
        lv = lv.trim();
        document.getElementById("idLabel").className = lv + " is-valid";
        document.getElementById("idLabelIsValid").innerText = "Eingabe ist gültig";
        console.log('labelInput is not empty');
        //optional
        //ret = true;
    }
    //validating the label input not to be empty
    let serialNumber = document.getElementById('idSerialNumber').value;
    if(serialNumber == ''){
        let sn = document.getElementById("idSerialNumber").className;
        sn = sn.replace('is-invalid','');
        sn = sn.replace('is-valid','');
        sn = sn.trim();
        document.getElementById("idSerialNumber").className = sn + " is-invalid";
        document.getElementById("idSerialNumberIsInValid").innerText = "leer!";
        //optional
        //ret = false;
    }
    else {
        let snv = document.getElementById("idSerialNumber").className;
        snv = snv.replace('is-invalid','');
        snv = snv.replace('is-valid','');
        snv = snv.trim();
        document.getElementById("idSerialNumber").className = snv + " is-valid";
        document.getElementById("idSerialNumberIsValid").innerText = "Eingabe ist gültig";
        console.log('serialnumber is not empty');
        //optional
        //ret = true;
    }
    //validating the label input not to be empty
    let inventoryType = document.getElementById('idType').value;
    if( inventoryType == ''){
        let it = document.getElementById("idType").className;
        it = it.replace('is-invalid','');
        it = it.replace('is-valid','');
        it = it.trim();
        document.getElementById("idType").className = it + " is-invalid";
        document.getElementById("idTypeIsInValid").innerText = "leer!";
        //optional
        //ret = false;
    }
    else {
        let itv = document.getElementById("idType").className;
        itv = itv.replace('is-invalid','');
        itv = itv.replace('is-valid','');
        itv = itv.trim();
        document.getElementById("idType").className = itv + " is-valid";
        document.getElementById("idTypeIsValid").innerText = "Eingabe ist gültig";
        console.log('Type is not empty');
        //optional
        //ret = true;
    }
    console.log('ret is: ',ret);
    return ret;
}

//macht alle berechnungen auf eine Maske
function calcForm(){
        let purchaseDate = document.getElementById("idPurchaseDate").value;
        //let getMonth = new Date(purchaseDate);
        let inputMonthValue = parseInt(document.getElementById("idDepreciationInput").value);
        let d = new Date(purchaseDate);
        let currentMonth = d.getMonth();
        d.setMonth(currentMonth + inputMonthValue);
        console.log("d: ", d);
        let pd = new Date(purchaseDate);
        console.log('d: ',d.toISOString());
        document.getElementById("validationEndDate").value = d.toISOString().split('T')[0];
        let ved = document.getElementById("validationEndDate").value;
        console.log('validationEndDate is: ',ved);
        let v = document.getElementById("validationEndDate").value;
        console.log('input Abgeschrieben am: ',v);

        //document.getElementById("validationEndDate").value = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDay();

        if (pd.getTime() <= d.getTime()) {
            console.log("time: ", pd.getTime());
            console.log(currentMonth);


        } else {
            console.log('resultDate is else!!?');
            //return false;
        }
    //asking for a better solution!!
    //price value to changes div (bookingCategory)
    let price = document.getElementById('idPrice').value;
    //Show booking category
    if (price <= 2000 && price >= 0){
        console.log('category: GWG');
        document.getElementById('formBookCategory').value = 'GWG';
    }
    else {
        console.log('category: Abschribsfähig');
        document.getElementById('formBookCategory').value = 'Abschreibfähig';
    }
}

//function to refresh form calculated hide and visibility
/*
DIESE Funktion macht nur folgend und sonst nichts!:
- Ein und Ausblenden von Designelementen. SONST NICHTS!
 */
function refreshForm(){
    console.log('refreshForm is on');
    initInventory();

    //status ausgebucht
    let status = document.getElementById("idFormStatus").value;
    if (status == "Ausgebucht"){
        console.log('Datumabgebucht: ((vis))');
        document.getElementById("formEndDate").className = 'd-block';
    }
    else {
        console.log('Datumabgebucht: ((invis))');
        document.getElementById("formEndDate").className = 'd-none';
    }


    //price value to changes div (bookingCategory)
    let price = document.getElementById('idPrice').value;
    //Show booking category
    if (price <= 2000 && price > 0){
        console.log('pricevis');

        document.getElementById("deprecationInputGroup").className = 'd-none';
        document.getElementById("validationEndDateGroup").className = 'd-none';
    }
    else if (price <= 0 ){
        document.getElementById("deprecationInputGroup").className = 'd-none';
        document.getElementById("validationEndDateGroup").className = 'd-none';

    }
    else {
        console.log('priceinvis');
        document.getElementById("deprecationInputGroup").className = 'd-block';
        document.getElementById("validationEndDateGroup").className = 'd-block';

    }
}
//this is for the speichern button!
function refresh(){
    refreshForm();
    inputTranslation();
    if (inputValidation()){
        calcForm()
        return true;
    }
    else {
        return false;
    }

}