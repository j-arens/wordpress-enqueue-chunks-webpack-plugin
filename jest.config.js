module.exports = {
    moduleFileExtensions: [
        'js',
        'ts'
    ],
    testMatch: [
        '<rootDir>/src/__tests__/*.(js|ts)'
    ],
    testPathIgnorePatterns: [
        '/node_modules/'
    ],
    transform: {
        '\\.ts$': '<rootDir>/dev/jest/preprocessor.js',
    },
};
