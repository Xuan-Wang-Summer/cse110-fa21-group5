const config = {
	setupFiles: ['<rootDir>/jest.setup.js'],
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/cypress/'],
	verbose: true
};

module.exports = config;
