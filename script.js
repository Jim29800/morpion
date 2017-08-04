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
var nbPartie = 0;
var partieEffectuer = 0;
var joueur1 = "Joueur 1";
var joueur2 = "Joueur 2";
var gagnant = "";

// affiche le modal
$('#myModal').modal('toggle')
//nom des joueurs
//nombre de parties
$("#valider").click(function () {
    joueur1 = $("#joueurX").val();
    joueur2 = $("#joueurO").val();
    nbPartie = Math.max(isNaN(parseInt($("#Partie").val())) ? 1: parseInt($("#Partie").val()),1);
    //affichage dans le html
    $("#joueur1").html(joueur1);
    $("#joueur2").html(joueur2);
    $("#nbPartie").html(nbPartie);

})
//Creation du tableau
for (var i = 0; i < col; i++) {
    nbCol += "<div class='col-sm-2 case col-xs-4 case' data-colonne='" + i + "'></div>"
}
for (var i = 0; i < ligne; i++) {
    nbLigne += "<div class='row' data-ligne='" + i + "'>" + nbCol + "</div>"
}
$(".container").html(nbLigne)
//case a cliquer
$(".case").click(function () {
    //verifi le nombre de case cocher
    if (compteur <= 8 && partieEffectuer < nbPartie) {
        //recupere l'axe X et Y
        var choix2 = $(this).data("colonne");
        var choix1 = $(this).parent().data("ligne");
        // si le compteur est un nombre paire Joueur X joue et que la partie n'est pas terminer
        if ($(this).html() === "" && compteur % 2 === 0) {
            // console.log("vide");
            $(this).html("<img src = 'X.png'>");
            compteur++;
            tableauCroix.push("" + choix1 + choix2);
            $("#tour").html("Au tour de " + joueur2 + " (O)");
            //verifi la victoire de X et RAZ le talbeau
            if (verifiVictoire(tableauCroix) === true) {
                setTimeout(function () { alert("Joueur aux X : victoire"); }, 100);
                nbVictoireX++;
                partieEffectuer++;
                $("#partieEffectuer").html(partieEffectuer)
                $("#nbVictoireX").html(nbVictoireX);
                compteur = 0;
                setTimeout(function () { $(".case").html("") }, 200)
                tableauCroix = [];
                tableauRond = [];
                $("#tour").html("Au tour de " + joueur1 + " (X)");
            }
            // Verifi que le tableau est rempli et donne une égalité
            else if (compteur === 9 && partieEffectuer < nbPartie) {
                setTimeout(function () { alert("Egalité"); }, 100);
                nbEgalite++;
                partieEffectuer++;
                $("#partieEffectuer").html(partieEffectuer);
                tableauCroix = [];
                tableauRond = [];
                $("#nbEgalite").html(nbEgalite);
                $(".case").html("");
                compteur = 0;
            }
        }
        // si le compteur est un nombre paire Joueur O joue et que la partie n'est pas terminer
        else if ($(this).html() === "" && compteur % 2 === 1) {
            // console.log("vide");
            $(this).html("<img src = 'O.png'>");
            compteur++;
            tableauRond.push("" + choix1 + choix2);
            $("#tour").html("Au tour de X " + joueur1);
            //verifi la victoire de O et RAZ le talbeau
            if (verifiVictoire(tableauRond) === true) {
                setTimeout(function () { alert("Joueur aux O : victoire"); }, 100);
                nbVictoireO++;
                partieEffectuer++;
                $("#partieEffectuer").html(partieEffectuer)
                $("#nbVictoireO").html(nbVictoireO);
                compteur = 0;
                setTimeout(function () { $(".case").html("") }, 200)
                tableauCroix = [];
                tableauRond = [];
            }
            else if (compteur === 9 && partieEffectuer < nbPartie) {
                setTimeout(function () { alert("Egalité"); }, 100);
                nbEgalite++;
                partieEffectuer++;
                $("#partieEffectuer").html(partieEffectuer);
                tableauCroix = [];
                tableauRond = [];
                $("#nbEgalite").html(nbEgalite);
                $(".case").html("");
                compteur = 0;
            }
        }
        else {
            alert("cette case est déjà utilisé")
        }
    }

    // defini le joueur gagnant quand la partie est terminer et RAZ tous
    else if (partieEffectuer == nbPartie) {
        if (nbVictoireX < nbVictoireO) {
            gagnant = "joueur aux O gagne : " + joueur2;
        }
        if (nbVictoireX > nbVictoireO) {
            gagnant = "joueur aux X gagne : " + joueur1;
        }
        if (nbVictoireX == nbVictoireO) {
            gagnant = "égalité !";
        }
        setTimeout(function () {
            if (confirm("Partie terminé," + gagnant + ", voulez vous faire une nouvelle partie ?")) {
                tableauCroix = [];
                tableauRond = [];
                nbVictoireO = 0;
                nbVictoireX = 0;
                nbEgalite = 0;
                nbPartie = 0;
                compteur = 0;
                partieEffectuer = 0;
                $("#partieEffectuer").html(partieEffectuer)
                $("#nbVictoireX").html(nbVictoireX);
                $("#nbVictoireO").html(nbVictoireO);
                $("#nbEgalite").html(nbEgalite);
                $("#tour").html("Joueur aux X commence.");
                $('#myModal').modal('toggle')
                $("#nbPartie").html(nbPartie)
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
