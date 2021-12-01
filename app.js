var limitInput = document.getElementById('limitInput');
var source = document.getElementById('nPrice');
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

    var nPriceValue =  parseInt(e.target.value);
    if (nPriceValue <= limit && nPriceValue > 0) {
        result.innerHTML = "GwG";
        statusDiv.style.display = "block";


        console.log("before else: " + limit + " and " + nPriceValue);
    }
    else if (nPriceValue <= 0 ||  isNaN(nPriceValue)) {
        console.log("after else if: " + limit + " and " + nPriceValue);

            result.innerHTML ="Kein Wert";
            statusDiv.style.display = "none";
    }
    else {
        console.log("after else: " + limit + " and " + nPriceValue);
        result.innerHTML = "Abschreibfähig"
        statusDiv.style.display = "block";
    }
}
source.addEventListener('input', inputHandler);
source.addEventListener('propertychange', inputHandler);

