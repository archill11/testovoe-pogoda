https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=28c53a3a2a9c652305b6ada6420b9b8d


fetch('https://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=28c53a3a2a9c652305b6ada6420b9b8d')
.then( function(response) { return response.json() } )
.then( function(data) { console.log(data.weather[0].description);console.log(data.main.temp);console.log(data.main.feels_like); } )
.catch( function() { console.log('error in cath') } )


fetch('https://www.cbr.ru/scripts/XML_daily.asp', {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  mode: 'no-cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/xml;charset=utf-8',
  }
  })
.then( function(response) { return response } )
.then( function(data) { 
  parser = new DOMParser();
  xmlDoc = parser.parseFromString(data,"text/xml");
  console.log(xmlDoc); 
} )
.catch( function() { console.log('error in cath') } )
