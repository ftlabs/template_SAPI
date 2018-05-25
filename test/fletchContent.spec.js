const chai = require("chai");
const expect = chai.expect;
const nock = require("nock");
const subject = require("../lib/fetchContent.js");
const searchFixture = require("./fixtures/searchResponse.json");

const CAPI_KEY = process.env.CAPI_KEY;
const searchTerm = { queryString: "John Dalli", testParam: "test" };

const requestBody =
  '{"queryString":"John Dalli","queryContext":{"curations":["ARTICLES","BLOGS"]},"resultContext":{"maxResults":"10","offset":"0","aspects":["title","lifecycle","location"],"sortOrder":"DESC","sortField":"lastPublishDateTime","facets":{"names":["people","organisations","topics"],"maxElements":-1}}}';

describe("lib/fetchContent", () => {
  context("for a 200 response", () => {
    beforeEach(() => {
      nock("http://api.ft.com")
        .post(`/content/search/v1?apiKey=${CAPI_KEY}`, requestBody)
        .reply(200, searchFixture);
    });

    it("makes a request to the search api", () => {
      subject.search(searchTerm).then(data => {
        expect(nock.isDone()).to.be.true;
        nock.cleanAll();
      });
    });
  });
});
