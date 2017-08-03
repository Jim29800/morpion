//Creation du tableau
var col = 3;
var ligne = 3;
var nbLigne = "";
var nbCol = "";
var tableauCroix = [];
var tableauRond = [];
var compteur = 0;
var nbVictoireX = 0;
var nbVictoireO = 0;
var nbEgalite = 0;
var nbPartie;
var partieEffectuer = 0;
nbPartie = parseInt(prompt("Combien de partie voulez vous faire ?"));

for (var i = 0; i < col; i++) {
    nbCol += "<div class='col-sm-2 case col-xs-4 case' data-colonne='" + i + "'></div>"
}

for (var i = 0; i < ligne; i++) {
    nbLigne += "<div class='row' data-ligne='" + i + "'>" + nbCol + "</div>"
}
$(".container").html(nbLigne)
$("#RAZ").click(function () {
    $(".case").html("")
    tableauCroix = [];
    tableauRond = [];
});
//case a cliquer
$(".case").click(function () {
    if (compteur < 8 && partieEffectuer < nbPartie) {
        var choix2 = $(this).data("colonne");
        var choix1 = $(this).parent().data("ligne");
        if ($(this).text() === "" && compteur % 2 === 0) {
            console.log("vide");
            $(this).text("X");
            compteur++;
            tableauCroix.push("" + choix1 + choix2);
            $("#tour").html("Au tour de 0");
            //console.log(tableauCroix)
            if (verifiVictoire(tableauCroix) === true) {
                setTimeout(function () { alert("Joueur au X : victoire"); }, 100);
                nbVictoireX++;
                partieEffectuer++;
                $("#nbVictoireX").html(nbVictoireX);
                compteur = 0;
                setTimeout(function () { $(".case").html("") }, 200)
                tableauCroix = [];
                tableauRond = [];
            }
        }
        else if ($(this).text() === "" && compteur % 2 === 1) {
            console.log("vide");
            $(this).text("O");
            compteur++;
            tableauRond.push("" + choix1 + choix2);
            $("#tour").html("Au tour de X");
            //console.log(tableauRond)
            if (verifiVictoire(tableauRond) === true) {
                setTimeout(function () { alert("Joueur au O : victoire"); }, 100);
                nbVictoireO++;
                partieEffectuer++;
                $("#nbVictoireO").html(nbVictoireO);
                compteur = 0;
                setTimeout(function () { $(".case").html("") }, 200)
                tableauCroix = [];
                tableauRond = [];
            }
        }
        else {
            alert("cette case est déjà utilisé")
        }
    }
    else if (compteur < 9 && partieEffectuer < nbPartie) {
        nbEgalite++;
        partieEffectuer++;
        tableauCroix = [];
        tableauRond = [];
        $("#nbEgalite").html(nbEgalite);
        $(".case").html("");
        compteur = 0;
    }
    else if (partieEffectuer == nbPartie) {
        setTimeout(function () {
            if (confirm("Partie terminé, voulez vous faire une nouvelle partie ?")) {
                tableauCroix = [];
                tableauRond = [];
                nbVictoireO = 0;
                nbVictoireX = 0;
                nbEgalite = 0;
                nbPartie = 0;
                compteur = 0;
                $("#nbVictoireX").html(nbVictoireX);
                $("#nbVictoireO").html(nbVictoireO);
                $("#nbEgalite").html(nbEgalite);
                partieEffectuer = 0;
                nbPartie = parseInt(prompt("Combien de partie voulez vous faire ?"));
            }

        }, 100);
    }
})
//condition de victoire
function verifiVictoire(choixjoueur) {
    var l0 = 0;
    var l1 = 0;
    var l2 = 0;
    var c0 = 0;
    var c1 = 0;
    var c2 = 0;
    var d0 = 0;
    var d1 = 0;
    for (var i = 0; i < choixjoueur.length; i++) {
        if (choixjoueur[i] == "00" || choixjoueur[i] == "01" || choixjoueur[i] == "02") {
            l0++
            console.log(l0)
        }
        if (choixjoueur[i] == "10" || choixjoueur[i] == "11" || choixjoueur[i] == "12") {
            l1++
        }
        if (choixjoueur[i] == "20" || choixjoueur[i] == "21" || choixjoueur[i] == "22") {
            l2++
        }
        if (choixjoueur[i] == "00" || choixjoueur[i] == "10" || choixjoueur[i] == "20") {
            c0++
        }
        if (choixjoueur[i] == "01" || choixjoueur[i] == "11" || choixjoueur[i] == "21") {
            c1++
        }
        if (choixjoueur[i] == "02" || choixjoueur[i] == "12" || choixjoueur[i] == "22") {
            c2++
        }
        if (choixjoueur[i] == "00" || choixjoueur[i] == "11" || choixjoueur[i] == "22") {
            d0++
        }
        if (choixjoueur[i] == "02" || choixjoueur[i] == "11" || choixjoueur[i] == "20") {
            d1++
        }
    }
    if (l0 === 3 || l1 === 3 || l2 === 3 || c0 === 3 || c1 === 3 || c2 === 3 || d0 === 3 || d1 === 3) {
        return true
    }
}

// ligne/colonne gagnante :
//ligne :       00 01 02 / 10 11 12 / 20 21 22
//colonne :     00 10 20 / 01 11 21 / 02 12 22
//diagonalle :  00 11 22 / 02 11 20


