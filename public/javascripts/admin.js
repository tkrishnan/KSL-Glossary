$(function(){
    function applyTableStyling(el, ind, arr) {
        if (+el.data('row') % 2 === 0) {
            el.addClass('pure-table-odd');
        }
    }
    $('.table-row').each(function( index) {
        if (index % 2 === 0) {
            $(this).addClass('pure-table-odd');
        }
    });

    $('#upload-form').submit(function(e) {
        e.preventDefault();
        $.post()
    })
});