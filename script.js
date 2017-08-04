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
var nbPartie = 1;
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
    nbPartie = Math.max(isNaN(parseInt($("#Partie").val())) ? 1 : parseInt($("#Partie").val()), 1);
    //affichage dans le html
    $("#joueur1").html(joueur1);
    $("#joueur2").html(joueur2);
    $("#nbPartie").html(nbPartie);
})
//Creation du tableau
for (var i = 0; i < col; i++) {
    nbCol += "<div class='col-sm-4 case col-xs-4 case' data-colonne='" + i + "'></div>"
}
for (var i = 0; i < ligne; i++) {
    nbLigne += "<div class='row' data-ligne='" + i + "'>" + nbCol + "</div>"
}
$("#tableau").html(nbLigne)
//case a cliquer
$(".case").click(function () {
    //verifi le nombre de case cocher
    if (compteur <= 8 && partieEffectuer < nbPartie) {
        //recupere l'axe X et Y
        var choix2 = $(this).data("colonne");
        var choix1 = $(this).parent().data("ligne");
        // si le compteur est un nombre paire Joueur X joue et que la partie n'est pas terminer
        if ($(this).html() === "" && compteur % 2 === 0) {
            $(this).html("<img src = 'X.png'>");
            compteur++;
            tableauCroix.push("" + choix1 + choix2);
            $("#tour").html("Au tour de " + joueur2 + " (O)");
            //verifi la victoire de X et RAZ le talbeau
            if (verifiVictoire(tableauCroix) === true) {
                //afiche la victoire
                $("#textVictoire").html(joueur1 + " : victoire");
                $('#modalVictoire').modal('toggle');
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
                $("#textVictoire").html("Egalité !");
                $('#modalVictoire').modal('toggle');
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
            $(this).html("<img src = 'O.png'>");
            compteur++;
            tableauRond.push("" + choix1 + choix2);
            $("#tour").html("Au tour de " + joueur1 + " (X)");
            //verifi la victoire de O et RAZ le talbeau
            if (verifiVictoire(tableauRond) === true) {
                //afiche la victoire
                $("#textVictoire").html(joueur2 + " : victoire");
                $('#modalVictoire').modal('toggle');
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
                $("#textVictoire").html("Egalité !");
                $('#modalVictoire').modal('toggle');
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
            $("#textVictoire").html("cette case est déjà utilisé !");
            $('#modalVictoire').modal('toggle');
        }
    }
    //verifi si la partie et terminé
    if (partieEffectuer === nbPartie) {
        if (nbVictoireX === nbVictoireO) {
            gagnant = "égalité !";
        }
        if (nbVictoireX < nbVictoireO) {
            gagnant = "Le gagnant de la partie est : " + joueur2 + " (O)";
        }
        if (nbVictoireX > nbVictoireO) {
            gagnant = "Le gagnant de la partie est : " + joueur1 + " (X)";
        }
        //affiche le modal gagnant
        $('#modalVictoire').modal('hide');
        $("#textVictoireFinale").html("Partie terminé !<br />" + gagnant + "<br />Voulez vous faire une nouvelle partie ?");
        $('#modalVictoireFinal').modal('toggle');
    }
})
//RAZ pour nouvelle partie
$("#nvllePartie").click(function () {
    raz();
    $('#myModal').modal('toggle');
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
function raz() {
    tableauCroix = [];
    tableauRond = [];
    nbVictoireO = 0;
    nbVictoireX = 0;
    nbEgalite = 0;
    nbPartie = 1;
    compteur = 0;
    partieEffectuer = 0;
    $("#partieEffectuer").html(partieEffectuer)
    $("#nbVictoireX").html(nbVictoireX);
    $("#nbVictoireO").html(nbVictoireO);
    $("#nbEgalite").html(nbEgalite);
    $("#tour").html("Joueur aux X commence.");
    $("#nbPartie").html(nbPartie)
}
// ligne/colonne gagnante :
//ligne :       00 01 02 / 10 11 12 / 20 21 22
//colonne :     00 10 20 / 01 11 21 / 02 12 22
//diagonalle :  00 11 22 / 02 11 20
