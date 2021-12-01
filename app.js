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
    const x = document.getElementById("hideDiv");
    var h =  parseInt(e.target.value);
    if (h <= limit && h > 0) {
        result.innerHTML = "GwG";

            if (x.style.display === "none"){
                x.style.display = "block";
            }

        console.log("before else: " + limit + " and " + h);
    }
    else if (h <= 0 ||  isNaN(h)) {
        console.log("after else if: " + limit + " and " + h);

            result.innerHTML ="Kein Wert";
            x.style.display = "none";
    }
    else {
        console.log("after else: " + limit + " and " + h);
        x.style.display = "none";
        result.innerHTML = "Abschreibfähig"
    }
}
source.addEventListener('input', inputHandler);
source.addEventListener('propertychange', inputHandler);

