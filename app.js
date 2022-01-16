
let min = 1;
let max = 100;

function getRanNum1(min, max) {
    
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomNumber1 = Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    document.getElementById('randomNum1').value = randomNumber1;
    document.getElementById('num1').innerText = randomNumber1;
    document.getElementById('mnum1').innerText = randomNumber1;
    return randomNumber1; 
  } 
   

  function getRanNum2(min, max) {
    
    
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomNumber2 = Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    document.getElementById('randomNum2').value = randomNumber2;
    document.getElementById('num2').innerText = randomNumber2;
    document.getElementById('mnum2').innerText = randomNumber2;
    return randomNumber2; 
  } 

  function percent(num1,num2) {
      num1 = getRanNum1(min, max);
      num2 = getRanNum2(min, max);
        
    let result = num2 * num1 /100;
        return result;

  }

   function showNum(){
       let value = percent(getRanNum1(min, max),getRanNum2(min, max));
        document.getElementById('showResult').value = value;
        document.getElementById('num3').innerText = value;
        document.getElementById('mnum3').innerText = value;
        document.getElementById('mnum4').innerText = value * 100;
        

   }