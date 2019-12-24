/* eslint-disable import/no-extraneous-dependencies */
const glob = require('glob');
const CLIEngine = require('eslint').CLIEngine;
const assert = require('chai').assert;

const paths = glob.sync('src');
const engine = new CLIEngine({
    envs: ['node', 'mocha'],
    useEslintrc: true,
});

const results = engine.executeOnFiles(paths).results;

describe('Checking ESLint', () => {
    results.forEach(result => generateTest(result));
});

function generateTest(result) {
    const { filePath, messages } = result;

    it(`validates ${filePath}`, () => {
        if (messages.length > 0) {
            assert.fail(false, true, formatMessages(messages));
        }
    });
}

function formatMessages(messages) {
    const errors = messages.map(message => `${message.line}:${message.column} ${message.message.slice(0, -1)} - ${message.ruleId}\n`);

    return `\n${errors.join('')}`;
}
