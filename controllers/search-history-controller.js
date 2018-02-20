const SearchHistory = require('../models/search-history');

/**
 * @description Handles request for user search history
 *
 * @api {GET} /search/history
 * @apiSuccess 200 {SearchHistory} The collection of saved search queries.
 * @apiError 500 {server error} Problem finding all saved search queries.
 */
exports.getSearchHistory = (appReq, appRes) => {
  SearchHistory.find({ user: appReq.userId }).then((searchHistory) => {
    appRes.status(200).send({ searchHistory });
  }, (e) => {
    appRes.status(500).send(e);
  });
};

/**
 * @description Handle request for getting a specified number of recently
 *  saved queries
 *
 * @api {GET} /search/history/recent/:num
 * @apiSuccess 200 {searchHistory} The requested recent num search queries.
 * @apiError 500 {server error} Server error
 * @apiError 404 {request error} Invalid req.params.num
 *
 * @param {String} appReq.params.num - Number of most recent saved queries to return.
 */
exports.getRecent = (appReq, appRes) => {
  const num = parseInt(appReq.params.num);
  if (isNaN(num)) {
    return appRes.status(404).send({
      error: 'Invalid params passed.',
      param: appReq.params.num,
      parsedInt: num
    });
  }

  SearchHistory.find({ user: appReq.userId })
    .sort({save_date: 'desc'})
    .then((result) => {
      const searchHistory = result.slice(0, num);
      appRes.send({ searchHistory });
  }, (err) => {
    appRes.status(500).send(err);
  });
};

/**
 * @description Handles request to save a search query if not already in db
 *
 * @api {POST} /search/history/:query
 * @apiSuccess 200 {searchHistory} The document representing the saved query.
 * @apiError 500 {server error} Problem saving the requested pin.
 *
 * @param {string} appReq.params.query - the string query to save
 */
exports.postQuery = (appReq, appRes) => {
  const saveQuery = {
    query: appReq.params.query,
    user: appReq.userId
  }

  const update = {
    lastModified: true,
    $currentDate : {
      save_date: {$type: 'date'},
    },
  }

  const options = {
    new: true, // return modified doc instead of original
    upsert: true, // create if doesn't exist

  }

  SearchHistory.findOneAndUpdate(saveQuery, update, options,
    (err, searchHistory) => {
      if (err) {
        return appRes.status(500).send(err);
      }

      return appRes.status(200).send({searchHistory});
    });
};

/**
 * @description Handles request to delete all saved search history
 *
 * @api {DELETE} /search/history
 * @apiSuccess 200 {success} Sucessfully deleted all search history data
 * @apiError 500 {server error}
 */
exports.deleteSearchHistory = (appReq, appRes) => {
  SearchHistory.remove({ user: appReq.userId }).then(() => {
    appRes.status(200).send({ success: true });
  }).catch((err) => {
    appRes.status(500).send({
      error: err,
      success: false,
    });
  });
};
