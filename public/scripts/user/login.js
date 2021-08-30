function postLogin(email, senha) {
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Accept", "*/*");
    myHeaders.append("email", email.value);
    myHeaders.append("senha", senha.value);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch("http://localhost:3000/login/", requestOptions)
    .then(response => response.text())
    .then(result => {
        var resp = JSON.parse(result); 
        if(resp.exist === true){
            document.cookie = `user=${resp.user.tipo}`;
            sessionStorage.setItem('id',resp.user._id);
            window.location.replace("/myProfile");
        }
        else{
            // $('#myModal').modal('show');
            $('#modal-comp').modal('show');
        }
    })
    .catch(error => $('#myModal').modal('show'));
}