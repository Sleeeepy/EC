var cheerio = require('cheerio'),
    request = require('request');

var url = 'http://sports.williamhill.com/bet/en-gb/betting/t/9392/Euro+2016.html';
//url ='https://sports.ladbrokes.com/en-gb/betting/football/euro-2016/'
parseMatches(url);


function parseMatches(url,callback){

  request(url, function (error, response, html) {
    //console.log(html)
    if (!error && response.statusCode === 200) {
      var odds= []
      var $ = cheerio.load(html);
      //console.log($('#tup_mkt_grp_tbl_UC_9d8a08d4b13c912153e27659829a27ad').html())
      $('#tup_mkt_grp_tbl_UC_9d8a08d4b13c912153e27659829a27ad').each(function() {
        console.log('==================================================')
        //console.log($(this).html())
          $(this).find('.eventprice').each(function(){

          odds.push(parseOdds($(this).html().trim()))
          })
      })
console.log(JSON.stringify(odds,null,2), odds.length)
    }
  })
}

function parseOdds(odds){
  if(odds==="EVS"){odds ='1/1';}
  odds=odds.split('/')
  odds = odds.map(function(num){return Number(num)});
  var p = odds[1]/(odds[0]+odds[1]),
      spread = 100*p;

  return {odds:odds, p:p,spread:spread}
}
