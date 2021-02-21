const express = require('express');
const https = require('https');
const body_parser = require('body-parser');
const app = express();
app.use(body_parser.urlencoded({extended: true}));

app.get('/',function(req,res){
  res.sendFile(__dirname+'/weather.html')
})
app.post('/',function(req,res){
  const sora = req.body.cityname;
  const apikey = 'dd437ac86376884dd97209cf0d5e546b';
  const units = 'metric'
  const url = 'https://api.openweathermap.org/data/2.5/find?q='+sora+'&units='+units+'&appid='+apikey
  https.get(url,function(response){
    response.on('data',function(data){
      const weatherdata = JSON.parse(data)
      const temp = weatherdata.list[0].main.temp
      const city = weatherdata.list[0].name
      const icon = weatherdata.list[0].weather[0].icon
      const icon_url = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'
      res.write('<h1>Temperatura '+city+ ' shaheri ucin.</h1>');
      res.write('<p>Temperatura shuwagt: '+temp+ ' gradus Selsiy.</p>');
      res.write("<img src="+icon_url+">");
      res.send();
    });
  });
})
app.listen(process.env.PORT || 8080,function(){
  console.log('server 8080 de bashlady');
});
