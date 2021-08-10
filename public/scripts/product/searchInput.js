function getProduct() {
    var codigo = $('#produto').val();
    var uri = `http://localhost:3000/product/${codigo}`;
    var req = new XMLHttpRequest();
    req.open('GET',uri,false);
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.setRequestHeader('Accept', '*/*');
    req.send();
    if (req.status === 200 || req.status === 304) {
        var response = req.responseText;
        var resp = JSON.parse(response); 
        $('#produto').val(resp._id + ' - ' + resp.nome);
    }
    else{
        $('#myModal').modal('show');
    }
}