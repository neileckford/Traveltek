
function distinctList(data){
    // create distinct surnames array
    var distinct = [];

    $.each(data, function(key, value){
        if(distinct.indexOf(value.name.last) < 0) {
            distinct.push(value.name.last);
        }
    });

    return distinct;
}

function sortDesc(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
}

function sortAsc(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function formatList(item) {
    var listItem = document.createElement("li"),
        anchor = document.createElement("a");
    listItem.setAttribute("class", "nearStation");
    listItem.setAttribute("id", item.lastName);
    anchor.setAttribute("href", "#rail");
    anchor.setAttribute("id", "railFeed");
    anchor.innerText = item.lastName + " - " + item.number;
    listItem.innerHTML = anchor.outerHTML;

    return listItem.outerHTML;
}