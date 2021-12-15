//einfache Validierung ob de Felder ausgefüllt oder nicht
(function() {
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();


//check all input validation
function inputValidation() {

    //Anschaffungsdatum validieren (muss nicht in zukunft sein)
    //Anschaffungsdatum als wert
    let purchaseDate = document.getElementById("idPurchaseDate").value;
    //jetztgen Datum
    let nowDate = new Date().toISOString().split('T')[0];

    console.log('purchase date is: ', purchaseDate);
    console.log('now is: ',nowDate);

    if (purchaseDate > nowDate){
        console.log('purchase date is bigger than now');
        let x = document.getElementById("idPurchaseDate").className;
        x = x.replace('is-invalid','');
        x = x.replace('is-valid','');
        x = x.trim();
        document.getElementById("idPurchaseDate").className = x + " is-invalid";
        document.getElementById("idPurchaseDateInvalid").innerText = "Das Datum legt in Zukunft!";
    }
    else if (purchaseDate == ''){
        let t = document.getElementById("idPurchaseDate").className;
        t = t.replace('is-invalid','');
        t = t.replace('is-valid','');
        t = t.trim();
        document.getElementById("idPurchaseDate").className = t + " is-invalid";
        document.getElementById("idPurchaseDateInvalid").innerText = "Das Datum ist leer!";
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
    let price = document.getElementById('validationPrice').value;
    //Show booking category
    if (price < 0){
        console.log('price is negative');
        let x = document.getElementById("validationPrice").className;
        x = x.replace('is-invalid','');
        x = x.replace('is-valid','');
        x = x.trim();
        document.getElementById("validationPrice").className = x + " is-invalid";
        document.getElementById("validationPriceInvalid").innerText = "Kein negativem Wert bitte!";
    }
    else {
        console.log('price is not negative');
        let y = document.getElementById("validationPrice").className;
        y = y.replace('is-invalid','');
        y = y.replace('is-valid','');
        y = y.trim();
        document.getElementById("validationPrice").className = y + " is-valid";
        document.getElementById("validationPriceValid").innerText = "Der Wert ist gültig!";
    }
}

//macht alle berechnungen auf eine Maske
function calcForm(){
    try {


        let purchaseDate = document.getElementById("idPurchaseDate").value;
        //let getMonth = new Date(purchaseDate);
        let inputMonthValue = parseInt(document.getElementById("depreciationInput").value);
        let d = new Date(purchaseDate);
        let currentMonth = d.getMonth();
        d.setMonth(currentMonth + inputMonthValue);
        console.log("d: ", d);
        let pd = new Date(purchaseDate);
        console.log('d: ',d.toISOString());
        document.getElementById("validationEndDate").value = d.toISOString().split('T')[0];
        let v = document.getElementById("validationEndDate").value;
        console.log('input Abgeschrieben am: ',v);

        //document.getElementById("validationEndDate").value = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDay();


        console.log(resultDate);
        if (pd.getTime() <= d.getTime()) {
            console.log("time: ", pd.getTime());
            console.log(currentMonth);


        } else {
            //return false;
        }
    } catch(e) {}
    //asking for a better solution!!
    //price value to changes div (bookingCategory)
    let price = document.getElementById('validationPrice').value;
    //Show booking category
    if (price <= 2000 && price >= 0){
        console.log('category: GWG');
        document.getElementById('formBookCategory').value = '--GWG--';
    }
    else {
        console.log('category: Abschribsfähig');
        document.getElementById('formBookCategory').value = '--Abschreibfähig--';
    }
}

//function to refresh form calculated hide and visibility
/*
DIESE Funktion macht nur folgend und sonst nichts!:
- Ein und Ausblenden von Designelementen. SONST NICHTS!
 */
function refreshForm(){
    console.log('refreshForm is on');

    //status ausgebucht
    let status = document.getElementById("formStatus").value;
    if (status == "Ausgebucht"){
        console.log('Datumabgebucht: ((vis))');
        document.getElementById("formEndDate").className = 'd-block';
    }
    else {
        console.log('Datumabgebucht: ((invis))');
        document.getElementById("formEndDate").className = 'd-none';
    }


    //price value to changes div (bookingCategory)
    let price = document.getElementById('validationPrice').value;
    //Show booking category
    if (price <= 2000 && price > 0){
        console.log('pricevis');

        document.getElementById("rowDepreciation").className = 'd-none';
    }
    else if (price <= 0 ){
        document.getElementById("rowDepreciation").className = 'd-none';
    }
    else {
        console.log('priceinvis');
        document.getElementById("rowDepreciation").className = 'd-block';
    }




}

