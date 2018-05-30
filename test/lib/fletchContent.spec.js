const chai = require("chai");
const expect = chai.expect;
const nock = require("nock");
const subject = require("../../lib/fetchContent.js");
const responseBody = require("../fixtures/search/responseBody");
const searchTerm = require("../fixtures/search/searchTerm");
const searchFixture = require("../fixtures/search/searchResponse.json");
const newsFixture = require("../fixtures/getArticle/newsResponse.json");

const CAPI_KEY = process.env.CAPI_KEY;

const newsId = "70fc3c0e-1cb5-11e8-956a-43db76e69936";

describe("lib/fetchContent", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe("search", () => {
    context("for a 200 repsonse", () => {
      it("requests the search api with a queryString", async () => {
        nock("http://api.ft.com")
          .post(`/content/search/v1?apiKey=${CAPI_KEY}`, responseBody.defualt)
          .reply(200, searchFixture);
        const search = await subject.search(searchTerm.defualt);
        expect(nock.isDone()).to.be.true;
        expect(search.sapiObj).to.not.be.undefined;
      });

      it("adds constraints to queryString", async () => {
        nock("http://api.ft.com")
          .post(
            `/content/search/v1?apiKey=${CAPI_KEY}`,
            responseBody.constraints
          )
          .reply(200, searchFixture);
        const search = await await subject.search(searchTerm.constraints);
        expect(nock.isDone()).to.be.true;
        expect(search.sapiObj).to.not.be.undefined;
      });

      it("overrides default resultContext when supplied", async () => {
        nock("http://api.ft.com")
          .post(
            `/content/search/v1?apiKey=${CAPI_KEY}`,
            responseBody.resultContext
          )
          .reply(200, searchFixture);
        const search = await await subject.search(searchTerm.resultContext);
        expect(nock.isDone()).to.be.true;
        expect(search.sapiObj).to.not.be.undefined;
      });

      context("with errors", () => {
        it("result does not include sapiObj", async () => {
          nock("http://api.ft.com")
            .post(`/content/search/v1?apiKey=${CAPI_KEY}`, responseBody.defualt)
            .reply(500, {});
          const result = await subject.search(searchTerm.defualt);
          expect(result.sapiObj).to.be.undefined;
        });
      });
    });
  });

  describe("getArticle", () => {
    context("for a 200 repsonse", () => {
      beforeEach(() => {
        nock("http://api.ft.com")
          .get(`/enrichedcontent/${newsId}?apiKey=${CAPI_KEY}`)
          .reply(200, newsFixture);
      });

      it("returns an object", async () => {
        const article = await subject.getArticle(newsId);
        expect(nock.isDone()).to.be.true;
        expect(article.title).to.equal(
          "PSA chief demands fairness on emissions penalties"
        );
      });
    });

    context("error response", () => {
      beforeEach(() => {
        nock("http://api.ft.com")
          .get(`/enrichedcontent/${newsId}?apiKey=${process.env.CAPI_KEY}`)
          .reply(400, "Forbidden");
      });

      it("throws an error", async () => {
        try {
          const article = await subject.getArticle(newsId);
          expect.fail(
            null,
            `ERROR: fetch article for uuid=${newsId} status code=400`,
            "This should not have resolved"
          );
        } catch (err) {
          expect(err).to.equal(
            `ERROR: fetch article for uuid=${newsId} status code=400`
          );
        }
      });
    });
  });
});
