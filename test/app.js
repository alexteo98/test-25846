process.env.NODE_ENV= 'TEST'

import chaihttp from 'chai-http';
import app from '../app.js';
import chai from 'chai';
import { HELLO_WORLD_STRING, SAMPLE_DELETE_STRING, SAMPLE_GET_STRING, SAMPLE_POST_STRING, SAMPLE_PUT_STRING } from '../constants.js';
import 'dotenv/config'
import { UserModel, UserDetailsModel } from '../model/user-model.js';

import mongoose from 'mongoose';
import { json } from 'express';
const { expect } = chai;
chai.use(chaihttp)

let mongoDB = process.env.DB_CLOUD_URI_TEST

describe('api test', () => {
    before(async () => {
        // before each test delete all users table data
        await UserModel.deleteMany({});
        await UserDetailsModel.deleteMany({});
      });

    it("Display welcome message", done => {
           chai.request(app)
           .get('/')
           .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.text).to.equal(HELLO_WORLD_STRING);
            done();
           });  
        })
})

// describe("Hello World Test", () => {
//     it("Display welcome message", done => {
//    chai.request(app)
//    .get('/')
//    .end((err, res) => {
//     expect(res).to.have.status(200);
//     expect(res.text).to.equal(HELLO_WORLD_STRING);
//     done();
//    });
//    });
// });

// describe("Testing API Calls", () => {
//     const apiRoute = '/ticketing/api'
//     describe("Testing GET requests", () => {
//         it("should return default GET message", done => {
//             chai.request(app)
//             .get(apiRoute)
//             .end( (err,res) => {
//                 expect(res).to.have.status(200);
//                 expect(res.body.message).to.equal(SAMPLE_GET_STRING);
//                 done();
//             })
//         })
//     })

//     describe("Testing POST requests", () => {
//         it("should return default POST message", done => {
//             chai.request(app)
//             .post(apiRoute)
//             .end( (err,res) => {
//                 expect(res).to.have.status(200);
//                 expect(res.body.message).to.equal(SAMPLE_POST_STRING);
//                 done();
//             })
//         })
//     })

//     describe("Testing PUT requests", () => {
//         it("should return default PUT message", done => {
//             chai.request(app)
//             .put(apiRoute)
//             .end( (err,res) => {
//                 expect(res).to.have.status(200);
//                 expect(res.body.message).to.equal(SAMPLE_PUT_STRING);
//                 done();
//             })
//         })
//     })

//     describe("Testing DELETE requests", () => {
//         it("should return default DELETE message", done => {
//             chai.request(app)
//             .delete(apiRoute)
//             .end( (err,res) => {
//                 expect(res).to.have.status(200);
//                 expect(res.body.message).to.equal(SAMPLE_DELETE_STRING);
//                 done();
//             })
//         })
//     })
// })


