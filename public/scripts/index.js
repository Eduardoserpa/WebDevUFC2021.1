document.addEventListener('DOMContentLoaded', function() {
    var stream = document.querySelector('.gallery__stream');
    var items = document.querySelectorAll('.gallery__item');
    
    var prev = document.querySelector('.gallery__prev');
    prev.addEventListener('click', function() {
      stream.insertBefore(items[items.length - 1], items[0]);
      items = document.querySelectorAll('.gallery__item');
    });
    
    var next = document.querySelector('.gallery__next');
    next.addEventListener('click', function() {
      stream.appendChild(items[0]);
      items = document.querySelectorAll('.gallery__item');
    });
  });


$(document).ready(() =>{
    fetch('http://localhost:3000/product/imagens', {method: 'GET', mode: 'cors', redirect: 'follow'})
    .then(response => response.text())
    .then(result => {
        criarGaleria(result);
    })
    .catch(error => console.log('error', error));
});

function criarGaleria(data){
    var array = JSON.parse(data);
    var count = 1;
    array.forEach(function(product) {
        var classname = `gallery__item bg-${count}`;
        var uri =  (`http://localhost:3000/${product.productImage}`).replace('\\','/');
        d = document.createElement('div');
        $(d).addClass(classname)
        .css('backgroundImage', `url(${uri})`)
        .appendTo($("#gallery__stream"));
        count ++;
    });
}