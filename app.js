const source = document.getElementById('enettoPrice');
const result = document.getElementById('result');

const inputHandler = function(e) {
    var x = document.getElementById("hideDiv");
    if (e.target.value <= 1000) {
        result.innerHTML = "GwG";

            if (x.style.display = "none"){
                x.style.display = "block";
            }
    }
    else {
        x.style.display = "none";
        result.innerHTML = "Abschreibfähig"
    }
}

source.addEventListener('input', inputHandler);
source.addEventListener('propertychange', inputHandler);