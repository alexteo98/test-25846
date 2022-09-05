process.env.NODE_ENV= 'test'

const chaihttp = require('chai-http')
const chai = require('chai')
const app = require('../app.js')

const { expect } = chai;
chai.use(chaihttp)

describe("Hello World Test", () => {
    it("Display welcome message", done => {
   chai.request(app)
   .get('/api')
   .end((err, res) => {
   //expect(res).to.have.status(200);
   console.log(res);
    done();
   });
   });
});
