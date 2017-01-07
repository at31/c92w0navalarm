var express = require('express');
var router = express.Router();
var cj=require("../cronjob/tjob");
var mess=require("../message/message");
var fs=require("fs");

var data={servers:[]};

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.send("200");
});


/* GET home page. */
router.get('/test', function(req, res, next) {
  res.json({data:"hi java bro )"});
});

router.get('/stop', function(req, res, next) {
  cj.stop();
  
  res.send('200');
});

router.get('/start', function(req, res, next) {
  cj.start();
  
  res.send('200');
});

router.post('/test', function(req, res, next) {

  mess.sendData(req.body);
  res.json({data:"hi java post bro )"});
  
    data.servers.push(req.body);
    
    console.log(req.body.sequenceLast);
    console.log(req.body.sequenceCounter);
  	
  	if(req.body.sequenceLast){
  	    var str=JSON.stringify(data);
  	    fs.writeFile('./public/stamp.json', str, function (err) {
			  if (err) return console.log(err);
			  console.log('stamp.json created');
			  data={servers:[]};
		  }); 
  	}
  
});


module.exports = router;
