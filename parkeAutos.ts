// Autos einparken
import { Parkhaus } from "./interfaces"

function parkeAutos(parkhaus: Parkhaus, anzahl: number) {
    console.log(' parke', anzahl, 'Autos!')
    // anzahl ist anzahl einfahrender autos
    let nochZuParken = anzahl
    // wir gehen die einzelnen etagen durch um autos zu parken
    // fangen bei erster(=0) etage an
    for (let k = 0; k < parkhaus.anzEtagen; k++) {
        // sind noch autos zu parken?
        if (nochZuParken > 0) {
            // wir holen uns die freien plätze in der aktuellen etage
            let freePlaces = parkhaus.etagen[k].plaetze.filter(pl => (pl.frei == true && pl.onlyLady == false))
            let anzFree = freePlaces.length
            console.log('  noch freie Plätze in Et', k + 1, ';', anzFree)
            if (anzFree == 0) {
                // keine freine plätze mehr in aktueller etage 
                console.log('  keine freien Plätze mehr für ', nochZuParken, 'Autos!')
                continue
            }
            if (anzFree >= nochZuParken) {
                // alle autos können geparkt werden in der aktuellen etage
                console.log(' parke ', nochZuParken, ' Autos in Etage:', k + 1)
                for (let i = 0; i < nochZuParken; i++) {
                    freePlaces[i].frei = false
                }
                nochZuParken = 0
            } else {
                // nicht alle autos können in der aktuellen etage geparkt werden
                // => parke so viele es geht, den rest dann in der nächsten etage
                console.log(' parke ', anzFree, ' Autos in aktueller Etage:')
                for (let i = 0; i < anzFree; i++) {
                    freePlaces[i].frei = false
                }
                nochZuParken = nochZuParken - anzFree
                console.log(' jetzt noch ', nochZuParken, ' Autos parken!')
            }
        }
    }
    if (nochZuParken != 0) {
        console.log('  konnte ', nochZuParken, 'Autos nicht mehr parken! Parkhaus ist voll!')
    }

}

export = parkeAutos 