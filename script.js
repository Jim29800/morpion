//Creation du tableau
var col = 3;
var ligne = 3;
var nbLigne = "";
var nbCol = "";
var tableauCroix = []
var tableauRond = []
var compteur = 0
for (var i = 0; i < col; i++) {
    nbCol += "<div class='col-sm-2 case' data-colonne='" + i + "'></div>"
}

for (var i = 0; i < ligne; i++) {
    nbLigne += "<div class='row' data-ligne='" + i + "'>" + nbCol + "</div>"
}
$(".container").html(nbLigne)
//case a cliquer
$(".case").click(function () {
    var choix2 = $(this).data("colonne");
    var choix1 = $(this).parent().data("ligne");
    if ($(this).text() === "" && compteur % 2 === 0) {
        console.log("vide")
        $(this).text("X")
        compteur++
        tableauCroix.push("" + choix1 + choix2);
        console.log(tableauCroix)
    }
    else if ($(this).text() === "" && compteur % 2 === 1) {
        console.log("vide")
        $(this).text("O")
        compteur++
        tableauRond.push("" + choix1 + choix2);
        console.log(tableauRond)
    }
    else {
        console.log("plein")
    }
})
//condition de victoire


// ligne/colonne gagnante :
//ligne :       00 01 02 / 10 11 12 / 20 21 22
//colonne :     00 10 20 / 01 11 21 / 02 12 22
//diagonalle :  00 11 22 / 02 11 20

