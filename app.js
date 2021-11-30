const source = document.getElementById('enettoPrice');
const result = document.getElementById('result');
const warning = document.getElementById('warning');
const limitInput = document.getElementById('limitInput');
var limit;
source.addEventListener('focus', (event) => {
    warning.style.display = "block";
});
limitInput.addEventListener('blur', (event) => {
     limit = limitInput.value ;
     console.log(limit);
});
const inputHandler = function(e) {
    const x = document.getElementById("hideDiv");
    const h =  e.target.value;
    if (h <= limit && h > 0) {
        result.innerHTML = "GwG";

            if (x.style.display === "none"){
                x.style.display = "block";
            }
    }
    else {
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