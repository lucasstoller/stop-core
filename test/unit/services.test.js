'use strict';
require('dotenv').config();
var expect = require('expect.js');
var Token = require('../../app/utils/token');
var assert = require('assert');

describe('Tokens', function() {
    it('Generate token', function() {
        const tokenService = new Token();
        tokenService.generateToken({
            id: 1
        }).then((token) => {
            tokenService.validToken(token)
            .then((decode) => {
                assert.equal(1, decode.id);
            });
        });
    });

    it('Valid token', function() {
        const tokenService = new Token();
        tokenService.generateToken({
            id: 19
        }).then((token) => {
            tokenService.validToken(token)
            .then((decode) => {
                assert.equal(19, decode.id);
            });
        });
    });
});
