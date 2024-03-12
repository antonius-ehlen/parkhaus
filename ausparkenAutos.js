"use strict";
function ausparkenAutos(parkhaus, anzahl) {
    console.log(' ausparken von', anzahl, 'Autos!');
    // anzahl ist anzahl aufahrender autos
    let belegtePlaetze = [];
    let gefunden;
    for (let et = 0; et < parkhaus.anzEtagen; et++) {
        // sammele alle belegten Plätze pro Etage ein
        // belegtePlaetze.concat(parkhaus.etagen[et].plaetze.filter(pl => pl.frei == false))
        belegtePlaetze = (parkhaus.etagen[et].plaetze.filter(pl => pl.frei == false));
        console.log('belegt in Etage', et, belegtePlaetze.length);
        if (anzahl < belegtePlaetze.length) {
            for (let raus = 0; raus < anzahl; raus++) {
                belegtePlaetze[raus].frei = true;
            }
            break;
        }
        else {
            // eine Etage reicht nicht um anzahl Autos auszuparken
            for (let raus = 0; raus < belegtePlaetze.length; raus++) {
                belegtePlaetze[raus].frei = true;
            }
            anzahl = anzahl - belegtePlaetze.length;
            belegtePlaetze = [];
        }
    }
    // console.log(belegtePlaetze)
}
module.exports = ausparkenAutos;
