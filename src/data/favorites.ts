export interface Favorite {
    title: string
    tvmazeId: number
    year?: string
}

export const favorites: Favorite[] = [
    { title: 'The Mentalist',          tvmazeId: 116,  year: '2008' },
    { title: 'Agents of S.H.I.E.L.D', tvmazeId: 31,   year: '2013' },
    { title: 'Breaking Bad',           tvmazeId: 169,  year: '2008' },
    { title: 'Prison Break',           tvmazeId: 541,  year: '2005' },
    { title: 'Better Call Saul',       tvmazeId: 618,  year: '2015' },
    { title: 'Sherlock',               tvmazeId: 335,  year: '2010' },
]
