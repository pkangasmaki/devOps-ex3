//When requested, returns content of the file created by OBSE

var http = require('http')
fs = require('fs')

http.createServer(function (req, res) {
  fs.readFile('../httpserv/data.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err)
    } else {
      console.log(JSON.parse(data))
      res.write(data)
    }
    res.end()
  })
}).listen(8080);
