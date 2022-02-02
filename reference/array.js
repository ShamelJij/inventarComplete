/*
let l_name = "michael";
let letters = /^[a-zA-ZäöüÄÖÜß]*$/;
if (l_name == '' || !letters.test(l_name)){
    console.log('not working');
}else{
    console.log('working');
}
let a = [[2,4],[3,5],[4,6],[5,7],[6,8],[7,9],[8,10],[9,11],[10,12],[11,13]];
for (var i = 0, j = 9; i <= 9; i++, j--) {
    console.log('a[' + i + '][' + j + '] = ' + a[i][j]);
}
*/
class Some{
    static sPrint(somestring){
        console.log(somestring);
    }
}
Some.sPrint('some other example');