function postLogin(email, senha) {
    var uri = `http://localhost:3000/login/`;
    var req = new XMLHttpRequest();
    req.open('GET',uri,false);
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.setRequestHeader('Accept', '*/*');
    req.setRequestHeader("email", email.value);
    req.setRequestHeader("senha", senha.value);
    req.send();
    console.log(req.status)
    
    if (req.status === 200 || req.status === 304) {
        var response = req.responseText;
        var resp = JSON.parse(response); 
        if(resp.exist === true){
            document.cookie = `user=${resp.user.tipo}`;
            sessionStorage.setItem('id',resp.user._id);
            window.location.replace("/myProfile");
        }
        else{
            var modal = $('#myModal');
            modal.modal('show');
        }
    }
    else{
        console.log("3")
        $('#myModal').modal('show');
    }
}