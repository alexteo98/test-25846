process.env.NODE_ENV= 'LOCAL'

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

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI_PROD : process.env.ENV == "TEST" ? process.env.DB_CLOUD_URI_TEST : process.env.DB_LOCAL_URI;

const API_ROUTE = '/ticketing/api'

describe('hello world test', () => {
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

describe('Insert and Remove test', () => {
  before(async () => {
    // before each test delete all users table data
    await UserModel.deleteMany({});
    await UserDetailsModel.deleteMany({});
  });

  const user = { email: "test", password: "test" }

  it("Insert new user into DB", done => {
    chai.request(app)
    .post(API_ROUTE)
    .send(user)
    .end( (err,res) => {
      expect(res).to.have.status(201);
      done();
    })
  })
  
  it("Delete user from DB", done => {
    chai.request(app)
    .delete(API_ROUTE)
    .send(user)
    .end( (err,res) => {
      expect(res).to.have.status(200);
      done();
    })
  })
})


describe('Empty DB Remove test', () => {
  before(async () => {
    // before each test delete all users table data
    await UserModel.deleteMany({});
    await UserDetailsModel.deleteMany({});
  });

  const user = { email: "test", password: "test" }
  
  it("Delete user from DB", done => {
    chai.request(app)
    .delete(API_ROUTE)
    .send(user)
    .end( (err,res) => {
      expect(res).to.have.status(403);
      done();
    })
  })
})

describe('Repeated Insert test', () => {
  before(async () => {
    // before each test delete all users table data
    await UserModel.deleteMany({});
    await UserDetailsModel.deleteMany({});
  });

  const user = { email: "test", password: "test" }
  
  it("Insert new user into DB", done => {
    chai.request(app)
    .post(API_ROUTE)
    .send(user)
    .end( (err,res) => {
      expect(res).to.have.status(201);
      done();
    })
  })

  it("Insert repeated user into DB", done => {
    chai.request(app)
    .post(API_ROUTE)
    .send(user)
    .end( (err,res) => {
      expect(res).to.have.status(400);
      done();
    })
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


