//Creation du tableau
var col = 3;
var ligne = 3;
var nbLigne = "";
var nbCol = "";
for (var i = 0; i < col; i++) {
    nbCol += "<div class='col-sm-2 case' data-colonne='" + i + "'></div>"
}

for (var i = 0; i < ligne; i++) {
    nbLigne += "<div class='row' data-ligne='" + i + "'>" + nbCol + "</div>"
}
$(".container").html(nbLigne)
//case a cliquer
var compteur = 0
$(".case").click(function () {
    // var choix2 = $(this).data("colonne");
    // var choix1 = $(this).parent().data("ligne");
    // console.log("Ligne : " + choix1 + " colone : " + choix2)
    if ($(this).text() === "" && compteur%2 === 0){
        console.log("vide")
        $(this).text("X")
        compteur ++
    }
    else if ($(this).text() === "" && compteur%2 === 1){
        console.log("vide")
        $(this).text("O")
        compteur ++
    }
    else{
        console.log("plein")
    }
})

