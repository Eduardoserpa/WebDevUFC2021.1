function postProduct() {
  var uri = `http://localhost:3000/product/`;
  var nome = $('#nome').val();
  var categoria = $('#categoria').val();
  var valor = $('#valor').val();
  var quantidade = $('#quantidade').val();

  var data = JSON.stringify({
      "nome": nome,
      "categoria": categoria,
      "valor": parseInt(valor),
      "estoque": parseInt(quantidade)
  });
  var req = new XMLHttpRequest();
  req.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
      console.log(this.responseText);
      new Promise(() =>{
          console.log('promise');
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

// $( "#btn-gravar" ).mouseover(function() {
//     console.log('teste');
//     var modal = $('#modal-comp');
//     modal.modal('show');
//   });

//   const fetchDataBtn = document.querySelector("#btn-gravar");
//   const getData = function () {
//     console.log('teste');
//     var modal = $('#modal-comp');
//     modal.modal('show');
//   };

//   fetchDataBtn.addEventListener("hover", getData);


// function postProduct() {

//     var uri = `http://localhost:3000/product/`;
//     var nome = $('#nome').val();
//     var categoria = $('#categoria').val();
//     var valor = $('#valor').val();
//     var quantidade = $('#quantidade').val();

//     var data = JSON.stringify({
//         "nome": nome,
//         "categoria": categoria,
//         "valor": parseInt(valor),
//         "estoque": parseInt(quantidade)
//     });
//     var req = new XMLHttpRequest();
//     req.addEventListener("readystatechange", function() {
//     if(this.readyState === 4) {
//         console.log(this.responseText);

//         new Promise(() =>{
//             console.log('promise');
//             var modal = $('#modal-comp');
//             modal.modal('show');
//         });
//     }
//     });
//     req.open('POST',uri,false);
//     req.setRequestHeader("Content-Type", "application/json"); 
//     req.setRequestHeader('Access-Control-Allow-Origin', '*');
//     req.setRequestHeader('Accept', '*/*');    
//     req.send(data);
// }