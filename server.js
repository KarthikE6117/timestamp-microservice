var express = require('express');
var app = express(); 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  
app.use(express.static('public'));
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:time_string", function(req, res){
  const dateString = new Date(req.params.time_string);
  const unixobj = new Date(req.params.time_string * 1);

  
  if(isDate(dateString) === true){
    return res.json({unix: dateString.getTime(), utc: dateString.toUTCString()});
  }
  if(isDate(unixobj) === true){
    return res.json({unix: unixobj.getTime(), utc: unixobj.toUTCString()});
  }
  return res.json({error: "Invalid Date"});
  
  function isDate(date) {
    return (new Date(date) !== "Invalid Date" && !isNaN(new Date(date))) ? true : false;
  }  
});

app.get("/api/timestamp", function(req, res){
  var dateString = new Date();
  return res.json({unix: dateString.getTime(), utc: dateString.toUTCString()});
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});