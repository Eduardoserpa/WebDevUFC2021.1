function postLogin(email, senha) {
    var uri = `http://localhost:3000/login/`;
    var req = new XMLHttpRequest();
    req.open('GET',uri,false);
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.setRequestHeader('Accept', '*/*');
    req.setRequestHeader("email", email.value);
    req.setRequestHeader("senha", senha.value);
    req.send();
    if (req.status === 200 || req.status === 304) {
        var response = req.responseText;
        var resp = JSON.parse(response); 
        console.log(resp);
        if(resp.exist === true){
            sessionStorage.setItem('id',resp.user._id);
            window.location.replace("/myProfile");
        }
        else{
            var modal = $('#myModal');
            modal.modal('show');
        }
    }
    else{
        $('#myModal').modal('show');
    }
}