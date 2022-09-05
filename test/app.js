process.env.NODE_ENV= 'test'

import chaihttp from 'chai-http';
import app from '../app.js';
import chai from 'chai';
import { HELLO_WORLD_STRING } from '../constants.js';

const { expect } = chai;
chai.use(chaihttp)

describe("Hello World Test", () => {
    it("Display welcome message", done => {
   chai.request(app)
   .get('/')
   .end((err, res) => {
    expect(res).to.have.status(200);
    expect(res.text).to.equal(HELLO_WORLD_STRING);
    done();
   });
   });
});

