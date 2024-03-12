// kleines Parkhaus Projekt

import ausparkenAutos from "./ausparkenAutos"

const myprompt = require('prompt-sync')({ sigint: true })
const parkeAutos = require("./parkeAutos")

// Parkhaus definieren
// Parkhaus: 
//      starzeit, aktuelleZeit, preisProMinute
//      mit etagen mit 
//          plätzen in den etagen
//              mit einfahrtzeit/ausfahrtzeit

// interfaces
interface Parkhaus {
    anzEtagen: number,
    plaetzeProEtage: number,
    etagen: Etage[],
    aktuelleZeit: number,
    preisProMin: number
}

interface Etage {
    anzPlaetze: number,
    plaetze: Platz[],
}

interface Platz {
    nummer: number,
    frei: boolean,
    startZeit: number,
    endZeit: number,
    onlyLady: boolean
}

// Variables
let parkhaus: Parkhaus

// funktions
function makeParkhaus(): Parkhaus {
    let anzEtagen = 2
    let anzPlaetze = 20

    // parkhaus deklarieren (default)
    let parkhaus: Parkhaus = {
        anzEtagen: anzEtagen,
        plaetzeProEtage: anzPlaetze,
        aktuelleZeit: 800,
        preisProMin: 1,
        etagen: []
    }
    // Parkhaus mit Etagen und Stellplätze pro Etage bestücken
    for (let et = 0; et < parkhaus.anzEtagen; et++) {
        // default etage definieren
        let etage: Etage = { anzPlaetze: parkhaus.plaetzeProEtage, plaetze: [], }
        // etage hinzufügen
        parkhaus.etagen.push(etage)
        parkhaus.etagen[et].anzPlaetze = parkhaus.plaetzeProEtage

        // pro etage jetzt stellplätze hinzufügen
        for (let k = 0; k < parkhaus.plaetzeProEtage; k++) {
            let platz = {
                nummer: et * parkhaus.plaetzeProEtage + k + 1,
                frei: true,
                startZeit: 800,
                endZeit: 0,
                onlyLady: false
            }
            // console.log('et | platzNr:',et, k, platz.nummer)
            // nur etage 0 die ersten 7 plätze für Ladies!
            if (et == 0 && platz.nummer <= 7) {
                platz.onlyLady = true
            }
            // platz hinzufügen
            parkhaus.etagen[et].plaetze.push(platz)
        }
    }
    return parkhaus
}

function statusParkhaus(ph: Parkhaus): void {
    //    ^   ^1  ^   ^  2^   ^   ^3  ^   ^  4^        5^
    //123456789012345678901234567890123456789012345678901234567890
    //  ---------------------------------------------------------
    //  | x | - | - | - | x | x | - | - | - | - | Etage 2 (11-20)
    //  | x | - | - | - | x | x | - | - | - | - | Etage 2 ( 1-10)
    //  ---------------------------------------------------------
    //  | - | x | - | w | x | x | x | x | - | - | Etage 1 (11-20)
    //  | w | w | - | w | x | x | x | x | - | - | Etage 1 (11-20)
    //  ---------------------------------------------------------
    //    | x | w | - | ==> x:belegt, w:Lady(belegt), -:frei

    let line = '---------------------------------------------------------'
    console.log(line)
    // baue EtagenZeile
    let etLine = ''
    for (let et = 0; et < parkhaus.anzEtagen; et++) {
        for (let etzei = 0; etzei < parkhaus.plaetzeProEtage / 10; etzei++) {
            etLine = '| '
            for (let pl = 0; pl < 10; pl++) {
                if (parkhaus.etagen[et].plaetze[pl + etzei * 10].frei) {
                    etLine += '- | '
                } else {
                    etLine += 'x | '
                }
            }
            etLine += ' Etage ' + (et + 1) +
                ' (' + ((etzei * 10 + 1) + (et * parkhaus.plaetzeProEtage)) +
                '-' + ((etzei * 10 + 10) + (et * parkhaus.plaetzeProEtage)) + ')'
            console.log(etLine)
        }
    }
}



parkhaus = makeParkhaus()
// console.log(parkhaus)
statusParkhaus(parkhaus)
console.log('\n Jetzt Autos parken!')
parkeAutos(parkhaus, 17)
statusParkhaus(parkhaus)

ausparkenAutos(parkhaus, 3)
statusParkhaus(parkhaus)

parkeAutos(parkhaus, 9)
statusParkhaus(parkhaus)

ausparkenAutos(parkhaus, 22)
statusParkhaus(parkhaus)


parkeAutos(parkhaus, 3)
statusParkhaus(parkhaus)


// Ende