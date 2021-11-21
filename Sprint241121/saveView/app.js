function save(){

    var new_data = document.getElementById('input').value;
    if(localStorage.getItem('data') == null){
        localStorage.setItem('data','[]');

    }
    var old_data = JSON.parse(localStorage.getItem('data'));
    old_data.push(new_data);
    localStorage.setItem('data', JSON.stringify(old_data));
}
    function view(){
        if (localStorage.getItem('data')!=null){
            document.getElementById('output').innerHTML = JSON.parse(localStorage.getItem('data'));
        }
}