var limitInput = document.getElementById('limitInput');
var source = document.getElementById('enettoPrice');
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

    var h =  parseInt(e.target.value);
    if (h <= limit && h > 0) {
        result.innerHTML = "GwG";
        statusDiv.style.display = "block";


        console.log("before else: " + limit + " and " + h);
    }
    else if (h <= 0 ||  isNaN(h)) {
        console.log("after else if: " + limit + " and " + h);

            result.innerHTML ="Kein Wert";
            statusDiv.style.display = "none";
    }
    else {
        console.log("after else: " + limit + " and " + h);
        result.innerHTML = "Abschreibfähig"
        statusDiv.style.display = "block";
    }
}
source.addEventListener('input', inputHandler);
source.addEventListener('propertychange', inputHandler);

