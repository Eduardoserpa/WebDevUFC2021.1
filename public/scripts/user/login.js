function postLogin(email, senha) {
    var uri = `http://localhost:3000/login/`;
    var req = new XMLHttpRequest();
    req.open('GET',uri,false);
    req.setRequestHeader("email", email.value);
    req.setRequestHeader("senha", senha.value);
    req.send();
    if (req.status === 200 || req.status === 304) {
        var response = req.responseText;
        var resp = JSON.parse(response); 
        console.log(resp);
        if(resp.exist === true){
            window.location.replace("/myProfile?id=" + resp.user._id);
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