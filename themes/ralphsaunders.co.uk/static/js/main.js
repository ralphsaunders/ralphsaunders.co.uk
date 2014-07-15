var ajaxReq = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onload = function() {
        callback(this.responseText);
    };
};

window.onload = function() {
    ajaxReq('../data/log.txt', function(response) {
        document.getElementsByClassName('log')[0].innerHTML = response;
    });
}
