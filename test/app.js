process.env.NODE_ENV= 'test'

import chaihttp from 'chai-http';
import app from '../app.js';
import chai from 'chai';
import { HELLO_WORLD_STRING, SAMPLE_DELETE_STRING, SAMPLE_GET_STRING, SAMPLE_POST_STRING, SAMPLE_PUT_STRING } from '../constants.js';

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

describe("Testing API Calls", () => {
    describe("Testing GET requests", () => {
        it("should return default GET message", done => {
            chai.request(app)
            .get('/api')
            .end( (err,res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal(SAMPLE_GET_STRING);
                done();
            })
        })
    })

    describe("Testing POST requests", () => {
        it("should return default POST message", done => {
            chai.request(app)
            .post('/api')
            .end( (err,res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal(SAMPLE_POST_STRING);
                done();
            })
        })
    })

    describe("Testing PUT requests", () => {
        it("should return default PUT message", done => {
            chai.request(app)
            .put('/api')
            .end( (err,res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal(SAMPLE_PUT_STRING);
                done();
            })
        })
    })

    describe("Testing DELETE requests", () => {
        it("should return default DELETE message", done => {
            chai.request(app)
            .delete('/api')
            .end( (err,res) => {
                expect(res).to.have.status(200);
                expect(res.body.message).to.equal(SAMPLE_DELETE_STRING);
                done();
            })
        })
    })
})


