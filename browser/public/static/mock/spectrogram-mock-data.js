
export const spectrogramsMockData = { 
    spectrogram: [
        { 
            timestamp: "2022-02-09 15:36:49",
            baseline: "00",
            polarisation: "XX",
            phase: Array.from({length: 40}, () => Math.floor(Math.random() * 40))
        },
        { 
            timestamp: "2022-02-09 15:36:49",
            baseline: "11",
            polarisation: "XY",
            phase: Array.from({length: 40}, () => Math.floor(Math.random() * 40))
        },
        { 
            timestamp: "2022-02-09 15:36:49",
            baseline: "10",
            polarisation: "YY",
            phase: Array.from({length: 40}, () => Math.floor(Math.random() * 40))
        },

    ]
}

export const spectrogramMockData = spectrogramsMockData.spectrogram[0]
