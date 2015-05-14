function $q(selector){
    return document.querySelector(selector);
}

function util_array_to_html(array) {
    var html = "";
    for(var i = 0; i < array.length; i ++) {
        html += array[i];
    }
    return html;
}
