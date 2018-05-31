const sinon = require("sinon");
const chai = require("chai");
const chaiHttp = require("chai-http");
const proxyquire = require("proxyquire");
const app = require("../../index");
const expect = chai.expect;
chai.use(chaiHttp);

const sandbox = sinon.sandbox.create();

const capiStub = {
  getByUuid: sandbox.spy(),
  searchByTerm: sandbox.spy()
};

const subject = proxyquire("../../routes/articles", {
  "../modules/Article": capiStub
});

describe("Article routes", () => {
  describe("search", () => {
    it("Should respond with http: 200", done => {
      chai
        .request(app)
        .get("/articles/articles/search/test")
        .end((err, res) => {
          expect(res).to.have.status(200);
          //   expect(capiStub.searchByTerm.calledOnce).to.be.true;
          done();
        });
    });
  });
});
