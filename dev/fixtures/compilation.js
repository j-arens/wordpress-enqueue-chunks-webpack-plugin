module.exports = {
    chunkGroups: [
        {
            name: 'c1',
            chunks: [
                {
                    name: 'c1',
                    hash: '123',
                    files: ['nice-job.bundle.js'],
                },
                {
                    name: 'c2',
                    hash: '456',
                    files: ['great-work.bundle.js'],
                }
            ]
        },
        {
            name: 'c3',
            chunks: [
                {
                    name: 'c3',
                    hash: '789',
                    files: ['excellent-effort.bundle.js'],
                },
                {
                    name: 'c4',
                    hash: '101112',
                    files: ['first-place.bundle.js'],
                }
            ],
        },
    ],
};
