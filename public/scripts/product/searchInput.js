function getProduct() {
    var codigo = $('#produto').val();
    var uri = `http://localhost:3000/product/${codigo}`;
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch(uri, requestOptions)
    .then(response => response.text())
    .then(result => {
        var resp = JSON.parse(result); 
        $('#produto').val(resp._id + ' - ' + resp.nome);
    })
    .catch(error => console.log('error', error));
}