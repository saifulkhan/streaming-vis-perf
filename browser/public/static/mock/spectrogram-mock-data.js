
export const spectrogramsMockData = { 
    spectrogram: [
        { 
            timestamp: "2022-02-09 15:36:49",
            baseline: "0",
            polarisation: "XX",
            phase: Array.from({length: 10}, () => Math.floor(Math.random() * 360))
        },
        { 
            timestamp: "2022-02-09 15:36:49",
            baseline: "1",
            polarisation: "XY",
            phase: Array.from({length: 20}, () => Math.floor(Math.random() * 360))
        },
        { 
            timestamp: "2022-02-09 15:36:49",
            baseline: "2",
            polarisation: "YY",
            phase: Array.from({length: 30}, () => Math.floor(Math.random() * 360))
        },
        { 
            timestamp: "2022-02-09 15:36:49",
            baseline: "3",
            polarisation: "YX",
            phase: Array.from({length: 30}, () => Math.floor(Math.random() * 360))
        },
        { 
            timestamp: "2022-02-09 15:36:49",
            baseline: "4",
            polarisation: "XX",
            phase: Array.from({length: 30}, () => Math.floor(Math.random() * 360))
        },

    ]
}