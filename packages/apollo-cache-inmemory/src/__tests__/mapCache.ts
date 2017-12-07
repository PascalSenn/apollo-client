jest.mock('../object-cache', () => {
  const { MapCache, getMapCacheFactory } = require('../map-cache');
  return {
    ObjectCache: MapCache,
    getObjectCacheFactory: getMapCacheFactory,
  };
});

describe('MapCache', () => {
  // simply re-runs all the tests
  // with the alternative implementation of the cache
  require('./objectCache');
  require('./cache');
  require('./diffAgainstStore');
  require('./fragmentMatcher');
  require('./readFromStore');
  require('./diffAgainstStore');
  require('./roundtrip');
  require('./writeToStore');
});
