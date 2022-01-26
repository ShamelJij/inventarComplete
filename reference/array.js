let l_name = "michael";
let letters = /^[a-zA-Z]*$/;
if (l_name == '' || !letters.test(l_name)){
    console.log('not working');
}else{
    console.log('working');
}