const chai = require("chai");
const expect = require("chai").expect;
const nock = require("nock");
const subject = require("../lib/fetchContent.js");

const SAPI_PATH = "http://api.ft.com/content/search/v1";
const CAPI_KEY = process.env.CAPI_KEY;

describe("lib/fetchContent", () => {
  beforeEach(() => {
    nock("http://api.ft.com/")
      .get(`${SAPI_PATH}?apiKey=${CAPI_KEY}`)
      .reply(200, {});
  });
});
