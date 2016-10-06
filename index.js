var express      = require('express');
var request      = require('request');
var cheerio      = require('cheerio');
var fs           = require('fs');
var hbs          = require('hbs');

var app          = express();

app.listen(3000, function(){
  console.log("Mystery Science Port 3000");
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render("index");
});

app.get('/scrape/:search', function(req, res){

  // console.log(req.params);
  let searchString = req.params.search;
  console.log(searchString);

  let url = "http://www.metal-archives.com/search?searchString=" + searchString + "&type=band_name";

  request(url, function(error, response, html){
    if(!error){
      // must be $ for
      let $ = cheerio.load(html);

      $("tr").children().each(function(){
        console.log( $(this).text() );
      })


      let band, genre, country;
      let json = { band : "", genre : "", country : ""};

      // fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      //   console.log('Write Success for output.json');
      //   if (err){
      //     console.log(err);
      //   }
      // })
      res.send( $.html() );
    }

  }) ;

})
