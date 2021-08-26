
$(document).ready(function () {
    var uri = 'http://localhost:3000/user/';
    fetch(uri, { method: 'GET', mode: 'cors', redirect: 'follow' })
        .then(response => response.text())
        .then(result => {
            criarTabela(result);
        })
        .catch(error => console.log('error', error));
});

function criarTabela(data) {
    var container = $('#my-container'),
        table = $('<table>').addClass('table');
    var tr_head = $('<tr>');
    tr_head.append('<th>' + 'Código' + '</th>');
    tr_head.append('<th>' + 'Nome' + '</th>');
    tr_head.append('<th>' + 'Função' + '</th>');
    tr_head.append('<th>' + 'Email' + '</th>');
    tr_head.append('<th>' + 'Ações' + '</th>');
    table.append(tr_head);

    var array = JSON.parse(data);
    array.forEach(function (user) {
        var tr = $('<tr>');
        ['_id','nome', 'tipo', 'email'].forEach(function (attr) {
            tr.append('<td>' + user[attr] + '</td>');
        });
        tr.append(
            '<td>' +                        
                '<button type="submit" class="btn btn-warning btn-lg btn-table" onClick="editarUser()">Editar</button>' +
                '<button type="submit" class="btn btn-primary btn-lg btn-table" onClick="excluirUser()">Excluir</button>' +
            '</td>'
        );
        table.append(tr);
    });

    container.append(table);
}

function excluirUser(){
    console.log('ok1 ' + event.target.parentNode.parentNode.childNodes[0]);

    var id =  event.target.parentNode.parentNode.childNodes[0].innerText;
    console.log('ok ' + id);
    sessionStorage.setItem('id-delete-user',id);
    $('#myModal').modal('show');
}

function deleteUser() {
    var id = sessionStorage.getItem('id-delete-user');
    console.log('session ' + id);
    var uri = `http://localhost:3000/user/` + id;

    var req = new XMLHttpRequest();
    req.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            new Promise(() =>{
                $('#modal-comp').modal('show');
                
            });
        }
    });
    req.open("DELETE", uri);
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.setRequestHeader('Accept', '*/*');    
    req.send();
    setTimeout(function(){ window.location.reload(); }, 2500);
    
}

$('#modal-comp').on('hidden.bs.modal', function () {
    window.location.reload();
});

function editarUser(){
    var id =  event.target.parentNode.parentNode.childNodes[0].innerText;
    sessionStorage.setItem('id-editar-user',id);
    window.location.replace('/editUser?id=' + id);
}