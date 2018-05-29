const constraints =
  '{"queryString":"\\"John Dalli\\" and TEST and TEST2","queryContext":{"curations":["ARTICLES","BLOGS"]},"resultContext":{"maxResults":"10","offset":"0","aspects":["title","lifecycle","location"],"sortOrder":"DESC","sortField":"lastPublishDateTime","facets":{"names":["people","organisations","topics"],"maxElements":-1}}}';

const defualt =
  '{"queryString":"John Dalli","queryContext":{"curations":["ARTICLES","BLOGS"]},"resultContext":{"maxResults":"10","offset":"0","aspects":["title","lifecycle","location"],"sortOrder":"DESC","sortField":"lastPublishDateTime","facets":{"names":["people","organisations","topics"],"maxElements":-1}}}';

module.exports = {
  constraints,
  defualt
};
