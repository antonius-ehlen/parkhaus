export {Parkhaus,Etage,Platz }
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
