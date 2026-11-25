function genererNombre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function demanderTentative(min, max) {
    let saisie = prompt(
        `Devinez le nombre entre ${min} et ${max}`
    );

    while (saisie !== null) {
        const nombre = Number(saisie);

        if (saisie.trim() === "") {
            console.log("Vous n'avez rien saisi !");
        }
        else if (
            !Number.isInteger(nombre) ||
            nombre < min ||
            nombre > max
        ) {
            console.log("Saisie invalide !");
        }
        else {
            return nombre;
        }

        saisie = prompt("Réessayez !");
    }

    return null;
}

function verifierTentative(tentative, nombreSecret) {
    if (tentative === nombreSecret) {
        return "trouve";
    }
    else if (tentative < nombreSecret) {
        return "bas";
    }
    else {
        return "haut";
    }
}

function donnerProximite(tentative, nombreSecret) {
    const ecart = Math.abs(tentative - nombreSecret);

    if (ecart <= 3) {
        return "Brûlant 🔥";
    }
    else if (ecart <= 10) {
        return "Chaud ♨️";
    }
    else if (ecart <= 20) {
        return "Tiède 🌤️";
    }
    else if (ecart <= 40) {
        return "Froid ❄️";
    }
    else {
        return "Glacial 🥶";
    }
}

function afficherResultat(resultat) {
    if (resultat === "trouve") {
        console.log("Bravo ! Tu as gagné ! 🎉");
    }
    else if (resultat === "bas") {
        console.log("📈 Trop bas ! Essaie plus grand.");
    }
    else {
        console.log("📉 Trop haut ! Essaie plus petit.");
    }
}

function afficherBilan(statistiques) {
    console.log("\n==========================");
    console.log("      BILAN DE LA PARTIE");
    console.log("==========================");

    console.log("\nHistorique des tentatives :");

    for (let i = 0; i < statistiques.historique.length; i++) {
        console.log(
            "Tour " + (i + 1) + " : " +
            statistiques.historique[i]
        );
    }

    const duree = Math.floor(
        (statistiques.tempsFin - statistiques.tempsDebut) / 1000
    );

    console.log("\nStatistiques :");
    console.log("Nombre secret : " + statistiques.nombreSecret);
    console.log("Tentatives : " + statistiques.nombreTentatives);
    console.log("Meilleure tentative : " + statistiques.meilleureTentative);
    console.log("Durée : " + duree + " secondes");

    if (statistiques.aGagne) {
        console.log("\nVictoire ! 🏆");
    }
    else {
        console.log("\nPartie abandonnée.");
    }

    console.log("==========================");
}

function jouer() {
    let continuerAJouer = true;

    while (continuerAJouer) {

        console.log("=== JEU DE DEVINETTES ===");

        const choixNiveau = prompt(
            "Choisissez un niveau :\n" +
            "1 : Facile (1 à 50)\n" +
            "2 : Moyen (1 à 100)\n" +
            "3 : Difficile (1 à 200)"
        );

        if (choixNiveau === null) {
            break;
        }

        let borneMax;
        let nomNiveau;

        if (choixNiveau === "1") {
            borneMax = 50;
            nomNiveau = "Facile";
        }
        else if (choixNiveau === "3") {
            borneMax = 200;
            nomNiveau = "Difficile";
        }
        else {
            borneMax = 100;
            nomNiveau = "Moyen";
        }

        const nombreSecret = genererNombre(1, borneMax);

        const historique = [];
        const tempsDebut = Date.now();

        let nombreTentatives = 0;
        let aGagne = false;

        console.log("Niveau sélectionné : " + nomNiveau);

        while (!aGagne) {

            const tentative = demanderTentative(1, borneMax);

            if (tentative === null) {
                break;
            }

            historique.push(tentative);
            nombreTentatives++;

            const resultat = verifierTentative(
                tentative,
                nombreSecret
            );

            afficherResultat(resultat);

            if (resultat === "trouve") {
                aGagne = true;
            }
            else {
                console.log(
                    donnerProximite(tentative, nombreSecret)
                );
            }
        }

        const statistiques = {
            nombreSecret: nombreSecret,
            nombreTentatives: nombreTentatives,
            historique: historique,
            tempsDebut: tempsDebut,
            tempsFin: Date.now(),
            aGagne: aGagne,
            meilleureTentative: "Aucune"
        };

        let plusPetitEcart = Infinity;

        for (let i = 0; i < historique.length; i++) {

            const ecart = Math.abs(
                historique[i] - nombreSecret
            );

            if (ecart < plusPetitEcart) {
                plusPetitEcart = ecart;
                statistiques.meilleureTentative = historique[i];
            }
        }

        afficherBilan(statistiques);

        const reponse = prompt("Voulez-vous rejouer ? Tapez oui.");

        if (reponse === null || reponse.toLowerCase() !== "oui") {
            continuerAJouer = false;
            console.log("Merci d'avoir joué ! 👋");
        }
    }
}

jouer();