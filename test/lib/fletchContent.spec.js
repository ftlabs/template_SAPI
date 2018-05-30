const chai = require("chai");
const expect = chai.expect;
const nock = require("nock");
const subject = require("../../lib/fetchContent.js");
const responseBody = require("../fixtures/search/responseBody");
const searchFixture = require("../fixtures/search/searchResponse.json");

const CAPI_KEY = process.env.CAPI_KEY;

const defaultSearchTerm = { queryString: "John Dalli" };
const newsId = "70fc3c0e-1cb5-11e8-956a-43db76e69936";

describe("lib/fetchContent", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe("search", () => {
    context("constructing the request", () => {
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

      context("with errors", () => {
        it("result does not include sapiObj", async () => {
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
            .reply(500, {});
          const result = await subject.search(resultContext);
          expect(result.sapiObj).to.be.undefined;
        });
      });
    });
  });

  describe("getArticle", () => {
    context("for a 200 repsonse", () => {
      beforeEach(() => {
        nock("https://api.ft.com")
          .get(`/enrichedcontent/${newsId}?apiKey=${process.env.CAPI_KEY}`)
          .reply(200, newsFixture);
      });

      it("returns an object", () => {
        return subject.getArticle(newsId).then(res => {
          expect(nock.isDone()).to.be.true;
          expect(res.title).to.equal(
            "PSA chief demands fairness on emissions penalties"
          );
        });
      });
    });
  });
});
