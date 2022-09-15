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
      expect(res).to.have.status(201);
      done();
    })
  })

  it("Insert blank email user into DB", done => {
    chai.request(app)
    .post(API_ROUTE)
    .send(blankEmailUser)
    .end( (err,res) => {
      expect(res).to.have.status(400);
      done();
    })
  })

  it("Insert blank password user into DB", done => {
    chai.request(app)
    .post(API_ROUTE)
    .send(blankPasswordUser)
    .end( (err,res) => {
      expect(res).to.have.status(400);
      done();
    })
  })

  it("Insert blank email, password user into DB", done => {
    chai.request(app)
    .post(API_ROUTE)
    .send(blankEmailPasswordUser)
    .end( (err,res) => {
      expect(res).to.have.status(400);
      done();
    })
  })

  it("Insert missing email user into DB", done => {
    chai.request(app)
    .post(API_ROUTE)
    .send(missingEmailUser)
    .end( (err,res) => {
      expect(res).to.have.status(400);
      done();
    })
  })

  it("Insert missing password user into DB", done => {
    chai.request(app)
    .post(API_ROUTE)
    .send(missingPasswordUser)
    .end( (err,res) => {
      expect(res).to.have.status(400);
      done();
    })
  })

  it("Insert missing email, password user into DB", done => {
    chai.request(app)
    .post(API_ROUTE)
    .send(missingEmailPasswordUser)
    .end( (err,res) => {
      expect(res).to.have.status(400);
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
      expect(res).to.have.status(200);
      done();
    })
  })

  it("Delete blank email user from DB", done => {
    chai.request(app)
    .delete(API_ROUTE)
    .send(blankEmailUser)
    .end( (err,res) => {
      expect(res).to.have.status(400);
      done();
    })
  })

  it("Delete blank password user from DB", done => {
    chai.request(app)
    .delete(API_ROUTE)
    .send(blankPasswordUser)
    .end( (err,res) => {
      expect(res).to.have.status(400);
      done();
    })
  })

  it("Delete blank email,password user from DB", done => {
    chai.request(app)
    .delete(API_ROUTE)
    .send(blankEmailPasswordUser)
    .end( (err,res) => {
      expect(res).to.have.status(400);
      done();
    })
  })

  it("Delete missing email user from DB", done => {
    chai.request(app)
    .delete(API_ROUTE)
    .send(missingEmailUser)
    .end( (err,res) => {
      expect(res).to.have.status(400);
      done();
    })
  })

  it("Delete missing password user from DB", done => {
    chai.request(app)
    .delete(API_ROUTE)
    .send(missingPasswordUser)
    .end( (err,res) => {
      expect(res).to.have.status(400);
      done();
    })
  })

  it("Delete missing email,password user from DB", done => {
    chai.request(app)
    .delete(API_ROUTE)
    .send(missingEmailPasswordUser)
    .end( (err,res) => {
      expect(res).to.have.status(400);
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

describe ('Unsupported methods test', () => {
  it("/PATCH", done => {
    chai.request(app)
    .patch(API_ROUTE)
    .end( (err,res) => {
      expect(res).to.have.status(405)
      done()
    })
  })

  it("/COPY", done => {
    chai.request(app)
    .copy(API_ROUTE)
    .end( (err,res) => {
      expect(res).to.have.status(405)
      done()
    })
  })

  it("/OPTIONS", done => {
    chai.request(app)
    .options(API_ROUTE)
    .end( (err,res) => {
      expect(res).to.have.status(405)
      done()
    })
  })

  it("/LINK", done => {
    chai.request(app)
    .link(API_ROUTE)
    .end( (err,res) => {
      expect(res).to.have.status(405)
      done()
    })
  })

  it("/UNLINK", done => {
    chai.request(app)
    .unlink(API_ROUTE)
    .end( (err,res) => {
      expect(res).to.have.status(405)
      done()
    })
  })

  it("/PURGE", done => {
    chai.request(app)
    .purge(API_ROUTE)
    .end( (err,res) => {
      expect(res).to.have.status(405)
      done()
    })
  })

  it("/LOCK", done => {
    chai.request(app)
    .lock(API_ROUTE)
    .end( (err,res) => {
      expect(res).to.have.status(405)
      done()
    })
  })

  it("/UNLOCK", done => {
    chai.request(app)
    .unlock(API_ROUTE)
    .end( (err,res) => {
      expect(res).to.have.status(405)
      done()
    })
  })

  it("/PROPFIND", done => {
    chai.request(app)
    .propfind(API_ROUTE)
    .end( (err,res) => {
      expect(res).to.have.status(405)
      done()
    })
  })
})

