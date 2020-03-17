const index = function(req, res) {
  res.render('index', { title: 'Express-oh!' });
};
const foo = (req, res) => { res.render('foo'); };

module.exports = { index, foo };
