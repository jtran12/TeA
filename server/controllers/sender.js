module.exports = {
  sendError(res, errorCode, errorMst) {
    var json = {"success" : "false", "error_code" : errorCode, "errorMst" : errorMst};
    res.status(errorCode).send(json);
  },
  sendData(res, data) {
    var json = {"success" : "true", "data" : data};
    res.send(json);
  }
};
