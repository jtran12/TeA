exports.getIndex = function (req, res) {
  res.sendFile('views/index/index.html', {root : appRoot});
};
