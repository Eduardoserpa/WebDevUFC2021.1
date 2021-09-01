function putSale() {
    var uri = `http://localhost:3000/sale/`;

    var user = $('#user').val();
    var date = $('#date').val();
    var id = $('#_id').val();
    var products = $('#products').val();
    uri.append(id);
    window.alert(uri);

    var data = JSON.stringify({
        "user": user,
        "date": date,
        "products": products
    });
    var req = new XMLHttpRequest();
    req.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            new Promise(() =>{
                var modal = $('#modal-comp');
                modal.modal('show');
            });    
        }
    });
    req.open("PUT",uri,false);
    req.setRequestHeader("Content-Type", "application/json"); 
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.setRequestHeader('Accept', '*/*');    
    req.send(data);
}

function deleteSale() {
    var uri = `http://localhost:3000/sale/`;
    var id = $('#_id').val();
    uri.append(id);
    var req = new XMLHttpRequest();
    req.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            new Promise(() =>{
                var modal = $('#modal-comp');
                modal.modal('show');
            });    
        }
    });
    req.open("DELETE",uri,false);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.setRequestHeader('Accept', '*/*');
}