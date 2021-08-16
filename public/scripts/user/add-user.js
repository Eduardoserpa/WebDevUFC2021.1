const form = document.getElementById("newForm");

form.addEventListener("submit", function (e) {
    e.preventDefault()
})

function postUser() {
    var uri = `http://localhost:3000/user/`;
    var nome = $('#nome').val();
    var email = $('#email').val();
    var senha1 = $('#senha1').val();
    var senha2 = $('#senha2').val();
    var tipo = 'admin';

    if(validarNome(nome)){
        if(validarSenha(senha1,senha2)){
            var data = JSON.stringify({
                "nome": nome,
                "email": email,
                "senha": senha1,
                "tipo": tipo
            });
            
            var req = new XMLHttpRequest();
            req.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                let teste = JSON.parse(this.responseText);
                if(teste.message ===  'Usuário cadastrado com sucesso!'){
                    let alerta = document.getElementById("loginHelp");
                    alerta.innerHTML = 'Usuário cadastrado com sucesso!';
                    setTimeout(function(){ window.location.replace("/login"); }, 2000);
                    
                }                
                new Promise(() =>{
                    var modal = $('#modal-comp');
                    modal.modal('show');
                });    }
            });
            req.open('POST',uri,false);
            req.setRequestHeader("Content-Type", "application/json"); 
            req.setRequestHeader('Access-Control-Allow-Origin', '*');
            req.setRequestHeader('Accept', '*/*');    
            req.send(data);
           
        }
    }


}

function validarNome(nome){
    if(nome===null || nome ==='' || nome.length <6){
        alert("O nome do usuário deve possuir no mínimo 6 caracteres.");
        return false;
    }
    return true;

}

function validarSenha(senha1, senha2){
    if(senha1===null || senha1 ==='' || senha1.length < 6 ||
        senha2===null || senha2 ==='' || senha2.length < 6 ||
        senha2 !== senha1){
        alert("Confira as senhas! A senha deve possuir no mínimo 6 caracteres.");
        return false;
    }
    return true;
  }

function validarSenha1(){
  let senha1 = $('#senha1').val();
  let textoSenha = document.getElementById('verSenha1')
  if(senha1 === null || senha1 ==='' || senha1.length <6){
    textoSenha.innerText = `A senha deve possuir no mínimo 6 caracteres.`
  }else{
    textoSenha.innerText = '';
  }
}

function validarSenha2(){
    let senha1 = $('#senha1').val();
    let senha2 = $('#senha2').val();
    let textoSenha = document.getElementById('verSenha2')

    if(senha2 !== senha1){
        textoSenha.innerText = `As senhas devem ser as mesmas!`
    }else{
        textoSenha.innerText = '';
    }
  }