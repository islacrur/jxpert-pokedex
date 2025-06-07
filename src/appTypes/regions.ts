export const REGIONS = {
    kanto: { regionStart: 0, regionEnd: 151 },
    johto: { regionStart: 151, regionEnd: 251 },
    hoenn: { regionStart: 251, regionEnd: 386 },
    sinnoh: { regionStart: 386, regionEnd: 494 },
    unova: { regionStart: 494, regionEnd: 649 },
    kalos: { regionStart: 649, regionEnd: 721 },
    alola: { regionStart: 721, regionEnd: 809 },
    galar: { regionStart: 809, regionEnd: 905 },
    paldea: { regionStart: 905, regionEnd: 1025 },
} as const

export type Region = keyof typeof REGIONS
