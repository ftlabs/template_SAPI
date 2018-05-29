const chai = require("chai");
const expect = chai.expect;
const nock = require("nock");
const subject = require("../lib/fetchContent.js");
const responseBody = require("./fixtures/responseBody");
const searchFixture = require("./fixtures/searchResponse.json");

const CAPI_KEY = process.env.CAPI_KEY;
const defaultSearchTerm = { queryString: "John Dalli" };

describe("lib/fetchContent", () => {
  context("constructing the request", () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it("requests the search api with a queryString", done => {
      nock("http://api.ft.com")
        .post(`/content/search/v1?apiKey=${CAPI_KEY}`, responseBody.defualt)
        .reply(200, searchFixture);
      subject.search(defaultSearchTerm).then(data => {
        expect(nock.isDone()).to.be.true;
        done();
      });
    });

    it("adds constraints to queryString", done => {
      const constraintsSearchTerm = {
        ...defaultSearchTerm,
        constraints: ["TEST", "TEST2"]
      };
      nock("http://api.ft.com")
        .post(`/content/search/v1?apiKey=${CAPI_KEY}`, responseBody.constraints)
        .reply(200, searchFixture);
      subject.search(constraintsSearchTerm).then(data => {
        expect(nock.isDone()).to.be.true;
        done();
      });
    });
  });
});
