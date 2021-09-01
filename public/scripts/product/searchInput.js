codigo = "";

function getProduct() {
    var codigo = $('#produto').val();
    if(codigo){
        var uri = `http://localhost:3000/product/${codigo}`;
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(uri, requestOptions)
        .then(response => response.text())
        .then(result => {
            var resp = JSON.parse(result); 
            if(resp._id != undefined && resp.nome != undefined){
                $('#produto').val(resp._id + ' - ' + resp.nome);
                codigo = resp._id;
            }
        })
        .catch(error => console.log('error', error));
    }
}