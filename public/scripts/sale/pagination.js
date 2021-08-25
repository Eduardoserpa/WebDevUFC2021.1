export function criarPagination(pageIndex, pageCount, hasPreviousPage, hasNextPage){
    $("#PreviousPage").prop('disabled', !hasPreviousPage);
    $("#NextPage").prop('disabled', !hasNextPage);
    
    var pagination = $('.pagesbtn');
    linha = $('<ul>').addClass('pagination');

    var count = 1;
    while(count <= pageCount){
        var classe = '';
        if(count == pageIndex){
            classe = 'active';
        }
        var li = $('<li>');
        li.append(`<a href="#" id="Page${count}">${count}</a>`)
        .addClass(classe);
        linha.append(li);        
        count ++;
    }
    pagination.append(linha);
}