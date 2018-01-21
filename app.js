const https = require('https');

const api1 = 'https://api.binance.com/api/v1/time';
const api2 = 'https://api.binance.com/api/v1/ticker/24hr';
const api3 = 'https://api.binance.com/api/v1/ticker/allPrices';

https.get(api3, function(res) {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {

    //API 1
    // console.log(`${api1} = ${JSON.parse(data).serverTime}`);

    // API 2
    // const arr = JSON.parse(data);
    // const ticker = arr.map((val, i) => {
    //   console.log(`${val.symbol} = ${val.lastPrice}`);
    // });

    // API 3
    const arr = JSON.parse(data);
    const allPrices = arr.map((val, i) => {
      console.log(`${val.symbol} = ${val.price}`);
    });


  })

}).on("error", (err) => {
  console.log("Error: " + err.message);
});