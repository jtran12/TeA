module.exports = {
  sendError: function (res, errorCode, errorMst) {
    var json = {"success" : "false", "error_code" : errorCode, "errorMst" : errorMst};
    res.status(errorCode).send(json);
  },
  sendData: function (res, data) {
    var json = {"success" : "true", "data" : data};
    res.send(json);
  }
};