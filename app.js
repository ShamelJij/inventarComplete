var limitInput = document.getElementById('limitInput');
var source = document.getElementById('enettoPrice');
var result = document.getElementById('result');
var warning = document.getElementById('warning');
var limit;
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
    if (h <= limit) {
        result.innerHTML = "GwG";

            if (x.style.display === "none"){
                x.style.display = "block";
            }

        console.log("before else:" + limit + "and " + h);
    }
    else {
        console.log("after else:" + limit + "and " + h);
        if (h <= 0 || h === null) {
            result.innerHTML ="zero";
            x.style.display = "none";
        }
        else {
            x.style.display = "none";
            result.innerHTML = "Abschreibfähig"
        }
    }
}

source.addEventListener('input', inputHandler);
source.addEventListener('propertychange', inputHandler);