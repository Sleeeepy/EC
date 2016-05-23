var cheerio = require('cheerio'),
    request = require('request');

var url = 'http://sports.williamhill.com/bet/en-gb/betting/t/9392/Euro+2016.html';
//url ='https://sports.ladbrokes.com/en-gb/betting/football/euro-2016/'
parseMatches(url);

function parseMatches(url,callback){

  request(url, function (error, response, html) {
    //console.log(html)
    if (!error && response.statusCode == 200) {
      var odds= []
      var $ = cheerio.load(html);
      //console.log($('#tup_mkt_grp_tbl_UC_9d8a08d4b13c912153e27659829a27ad').html())
      $('#tup_mkt_grp_tbl_UC_9d8a08d4b13c912153e27659829a27ad').each(function() {
        //console.log($(this))
          $(this).find('.eventprice').each(function(){
          odds.push($(this).html().trim())
          })
      })
console.log(odds.map(function(odd){return odd.split('/')}))
    }
  })
}
