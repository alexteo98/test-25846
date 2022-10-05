process.env.NODE_ENV= 'LOCAL'

import chaihttp from 'chai-http';
import app from '../app.js';
import chai from 'chai';
import { CONFLICTING_USER_CODE, HELLO_WORLD_STRING } from '../constants.js';
import 'dotenv/config'
import { UserModel, UserDetailsModel } from '../model/user-model.js';

import mongoose from 'mongoose';
import { json } from 'express';
const { expect } = chai;
chai.use(chaihttp)

import {
  MISSING_CREDENTIALS_CODE,
  WRONG_CREDENTIALS_CODE,
  CREATED_CODE,
  OK_CODE,
  NOT_SUPPORTED_CODE
} from '../constants.js'

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI_PROD : process.env.ENV == "TEST" ? process.env.DB_CLOUD_URI_TEST : process.env.DB_LOCAL_URI;


describe('Users tests', () => {
  const API_ROUTE = '/users'

  describe('hello world test', () => {
    it("Display welcome message", done => {
      chai.request(app)
      .get('/')
      .end((err, res) => {
      expect(res).to.have.status(OK_CODE);
      expect(res.text).to.equal(HELLO_WORLD_STRING);
      done();
      });  
  })
  })

  describe('Insert test', () => {
    beforeEach(async () => {
      // before each test delete all users table data
      await UserModel.deleteMany({});
      await UserDetailsModel.deleteMany({});
    });

    after(async () => {
      await UserModel.deleteMany({});
      await UserDetailsModel.deleteMany({});
    })

    const user = { email: "test", password: "test" }
    const blankEmailUser = { email:"", password: "test" }
    const missingEmailUser = { password: "test" }
    const blankPasswordUser = { email:"test", password: "" }
    const missingPasswordUser = { email:"test"}
    const blankEmailPasswordUser = { email:"", password: "" }
    const missingEmailPasswordUser = { }

    it("Insert normal user into DB", done => {
      chai.request(app)
      .post(API_ROUTE)
      .send(user)
      .end( (err,res) => {
        expect(res).to.have.status(CREATED_CODE);
        done();
      })
    })

    it("Insert blank email user into DB", done => {
      chai.request(app)
      .post(API_ROUTE)
      .send(blankEmailUser)
      .end( (err,res) => {
        expect(res).to.have.status(MISSING_CREDENTIALS_CODE);
        done();
      })
    })

    it("Insert blank password user into DB", done => {
      chai.request(app)
      .post(API_ROUTE)
      .send(blankPasswordUser)
      .end( (err,res) => {
        expect(res).to.have.status(MISSING_CREDENTIALS_CODE);
        done();
      })
    })

    it("Insert blank email, password user into DB", done => {
      chai.request(app)
      .post(API_ROUTE)
      .send(blankEmailPasswordUser)
      .end( (err,res) => {
        expect(res).to.have.status(MISSING_CREDENTIALS_CODE);
        done();
      })
    })

    it("Insert missing email user into DB", done => {
      chai.request(app)
      .post(API_ROUTE)
      .send(missingEmailUser)
      .end( (err,res) => {
        expect(res).to.have.status(MISSING_CREDENTIALS_CODE);
        done();
      })
    })

    it("Insert missing password user into DB", done => {
      chai.request(app)
      .post(API_ROUTE)
      .send(missingPasswordUser)
      .end( (err,res) => {
        expect(res).to.have.status(MISSING_CREDENTIALS_CODE);
        done();
      })
    })

    it("Insert missing email, password user into DB", done => {
      chai.request(app)
      .post(API_ROUTE)
      .send(missingEmailPasswordUser)
      .end( (err,res) => {
        expect(res).to.have.status(MISSING_CREDENTIALS_CODE);
        done();
      })
    })
  })

  describe('Delete test', () => {
    const user = { email: "test", password: "test" }
    const blankEmailUser = { email:"", password: "test" }
    const missingEmailUser = { password: "test" }
    const blankPasswordUser = { email:"test", password: "" }
    const missingPasswordUser = { email:"test"}
    const blankEmailPasswordUser = { email:"", password: "" }
    const missingEmailPasswordUser = { }
    const wrongPasswordUser = { email:"test", password: "WRONG" }

    beforeEach(async () => {
      // before each test delete all users table data
      await UserModel.deleteMany({});
      await UserDetailsModel.deleteMany({});
      const user = UserModel({ email: "test", password: "test" })
      user.save()
    });

    after(async () => {
      await UserModel.deleteMany({});
      await UserDetailsModel.deleteMany({});
    })

    it("Delete normal user from DB", done => {
      chai.request(app)
      .delete(API_ROUTE)
      .send(user)
      .end( (err,res) => {
        expect(res).to.have.status(OK_CODE);
        done();
      })
    })

    it("Delete blank email user from DB", done => {
      chai.request(app)
      .delete(API_ROUTE)
      .send(blankEmailUser)
      .end( (err,res) => {
        expect(res).to.have.status(MISSING_CREDENTIALS_CODE);
        done();
      })
    })

    it("Delete blank password user from DB", done => {
      chai.request(app)
      .delete(API_ROUTE)
      .send(blankPasswordUser)
      .end( (err,res) => {
        expect(res).to.have.status(MISSING_CREDENTIALS_CODE);
        done();
      })
    })

    it("Delete blank email,password user from DB", done => {
      chai.request(app)
      .delete(API_ROUTE)
      .send(blankEmailPasswordUser)
      .end( (err,res) => {
        expect(res).to.have.status(MISSING_CREDENTIALS_CODE);
        done();
      })
    })

    it("Delete missing email user from DB", done => {
      chai.request(app)
      .delete(API_ROUTE)
      .send(missingEmailUser)
      .end( (err,res) => {
        expect(res).to.have.status(MISSING_CREDENTIALS_CODE);
        done();
      })
    })

    it("Delete missing password user from DB", done => {
      chai.request(app)
      .delete(API_ROUTE)
      .send(missingPasswordUser)
      .end( (err,res) => {
        expect(res).to.have.status(MISSING_CREDENTIALS_CODE);
        done();
      })
    })

    it("Delete missing email,password user from DB", done => {
      chai.request(app)
      .delete(API_ROUTE)
      .send(missingEmailPasswordUser)
      .end( (err,res) => {
        expect(res).to.have.status(MISSING_CREDENTIALS_CODE);
        done();
      })
    })

    it("Delete wrong password user from DB", done => {
      chai.request(app)
      .delete(API_ROUTE)
      .send(wrongPasswordUser)
      .end( (err,res) => {
        expect(res).to.have.status(WRONG_CREDENTIALS_CODE);
        done();
      })
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
        expect(res).to.have.status(CREATED_CODE);
        done();
      })
    })
    
    it("Delete user from DB", done => {
      chai.request(app)
      .delete(API_ROUTE)
      .send(user)
      .end( (err,res) => {
        expect(res).to.have.status(OK_CODE);
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
        expect(res).to.have.status(WRONG_CREDENTIALS_CODE);
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
        expect(res).to.have.status(CREATED_CODE);
        done();
      })
    })

    it("Insert repeated user into DB", done => {
      chai.request(app)
      .post(API_ROUTE)
      .send(user)
      .end( (err,res) => {
        expect(res).to.have.status(CONFLICTING_USER_CODE);
        done();
      })
    })
  })

  describe ('Unsupported methods test', () => {
    it("/PATCH", done => {
      chai.request(app)
      .patch(API_ROUTE)
      .end( (err,res) => {
        expect(res).to.have.status(NOT_SUPPORTED_CODE)
        done()
      })
    })

    it("/COPY", done => {
      chai.request(app)
      .copy(API_ROUTE)
      .end( (err,res) => {
        expect(res).to.have.status(NOT_SUPPORTED_CODE)
        done()
      })
    })

    it("/OPTIONS", done => {
      chai.request(app)
      .options(API_ROUTE)
      .end( (err,res) => {
        expect(res).to.have.status(NOT_SUPPORTED_CODE)
        done()
      })
    })

    it("/LINK", done => {
      chai.request(app)
      .link(API_ROUTE)
      .end( (err,res) => {
        expect(res).to.have.status(NOT_SUPPORTED_CODE)
        done()
      })
    })

    it("/UNLINK", done => {
      chai.request(app)
      .unlink(API_ROUTE)
      .end( (err,res) => {
        expect(res).to.have.status(NOT_SUPPORTED_CODE)
        done()
      })
    })

    it("/PURGE", done => {
      chai.request(app)
      .purge(API_ROUTE)
      .end( (err,res) => {
        expect(res).to.have.status(NOT_SUPPORTED_CODE)
        done()
      })
    })

    it("/LOCK", done => {
      chai.request(app)
      .lock(API_ROUTE)
      .end( (err,res) => {
        expect(res).to.have.status(NOT_SUPPORTED_CODE)
        done()
      })
    })

    it("/UNLOCK", done => {
      chai.request(app)
      .unlock(API_ROUTE)
      .end( (err,res) => {
        expect(res).to.have.status(NOT_SUPPORTED_CODE)
        done()
      })
    })

    it("/PROPFIND", done => {
      chai.request(app)
      .propfind(API_ROUTE)
      .end( (err,res) => {
        expect(res).to.have.status(NOT_SUPPORTED_CODE)
        done()
      })
    })
  })
})

describe ("User details tests", () => {
  const API_ROUTE = '/details'
  
  describe('Set User details test', () => {
    const user = { email: "test", phone: 111, address: "test"}
    const missingEmailUser = { email: "", phone: 111, address: "test"}
    const missingPhoneUser = { email: "test", phone: 111, address: "test"}
    const missingAddressUser = { email: "test", phone: 111, address: ""}

    beforeEach(async () => {
      // before each test delete all users table data
      await UserModel.deleteMany({});
      await UserDetailsModel.deleteMany({});
    });
  
    after(async () => {
      await UserModel.deleteMany({});
      await UserDetailsModel.deleteMany({});
    })
    
    it("Set normal user test", done => {
      chai.request(app)
      .put(API_ROUTE)
      .send(user)
      .end( (req,res) => {
        expect(res).to.have.status(CREATED_CODE)
        done()
      })
    })

    it("Set missing email user test", done => {
      chai.request(app)
      .put(API_ROUTE)
      .send(missingEmailUser)
      .end( (req,res) => {
        expect(res).to.have.status(MISSING_CREDENTIALS_CODE)
        done()
      })
    })

    it("Set missing phone user test", done => {
      chai.request(app)
      .put(API_ROUTE)
      .send(missingPhoneUser)
      .end( (req,res) => {
        expect(res).to.have.status(CREATED_CODE)
        done()
      })
    })

    it("Set missing address user test", done => {
      chai.request(app)
      .put(API_ROUTE)
      .send(missingAddressUser)
      .end( (req,res) => {
        expect(res).to.have.status(CREATED_CODE)
        done()
      })
    })

  })
})
