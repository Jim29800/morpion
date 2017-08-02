var col = 3;
var ligne = 3;
var nbLigne = "";
var nbCol = "";
for (var i = 0; i <col; i++) {
    nbCol += "<div class='col-sm-2' id='" + i + "'></div>"
}

for (var i = 0; i <ligne; i++) {
    nbLigne += "<div class='row' id='"+ i + "'>" + nbCol + "</div>"
}

$(".container").html(nbLigne)



// <div class="row">
//             <div class="col-sm-2">

//             </div>