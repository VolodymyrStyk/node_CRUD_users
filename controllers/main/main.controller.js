module.exports = (req, res) => {
  res.send('<h1>Main Page</h1>'
            + '<h3>Working Links:</h3>'
            + '<p><a href="/users">/users</a></p>'
            + '<p><a href="/auth">/auth</a></p>');
  res.end();
};
