const chai = require("chai");
const expect = chai.expect;
const nock = require("nock");
const subject = require("../lib/fetchContent.js");
const responseBody = require("./fixtures/responseBody");
const searchFixture = require("./fixtures/searchResponse.json");

const CAPI_KEY = process.env.CAPI_KEY;
const defaultSearchTerm = { queryString: "John Dalli" };

describe("lib/fetchContent", () => {
  describe("search", () => {
    context("constructing the request", () => {
      afterEach(() => {
        nock.cleanAll();
      });

      it("requests the search api with a queryString", async () => {
        nock("http://api.ft.com")
          .post(`/content/search/v1?apiKey=${CAPI_KEY}`, responseBody.defualt)
          .reply(200, searchFixture);
        await subject.search(defaultSearchTerm);
        expect(nock.isDone()).to.be.true;
      });

      it("adds constraints to queryString", async () => {
        const constraintsSearchTerm = {
          ...defaultSearchTerm,
          constraints: ["TEST", "TEST2"]
        };
        nock("http://api.ft.com")
          .post(
            `/content/search/v1?apiKey=${CAPI_KEY}`,
            responseBody.constraints
          )
          .reply(200, searchFixture);
        await subject.search(constraintsSearchTerm);
        expect(nock.isDone()).to.be.true;
      });

      it("overrides default resultContext when supplied", async () => {
        const resultContext = {
          ...defaultSearchTerm,
          maxResults: 11,
          offset: 1
        };
        nock("http://api.ft.com")
          .post(
            `/content/search/v1?apiKey=${CAPI_KEY}`,
            responseBody.resultContext
          )
          .reply(200, searchFixture);
        await subject.search(resultContext);
        expect(nock.isDone()).to.be.true;
      });
    });
  });
});
