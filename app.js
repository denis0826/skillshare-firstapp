const https = require('https');



function displayTable(date, symbol, ask, bid, arb) {
  var newdate = new Date(date),
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  //22 Jan 2018 14:01
  console.log(`
    Date/Time Stamp       Symbol   ASK   BID  	ARB(%)
    ${newdate.getDate()} ${months[newdate.getMonth()]} ${newdate.getFullYear()} ${newdate.getHours()}:${newdate.getMinutes()}  ${symbol} ${parseFloat(ask).toFixed(2)} ${parseFloat(bid).toFixed(2)} ${arb}
    `);
}

function displayARB(askPrice, bidPrice) {
  return (askPrice - bidPrice) / bidPrice;
}

function displayDepth(type, price, qty) {
  console.log(`
    TYPE	    PRICE    QTY
    ${type} ${price} ${qty}
    `);
} 

const api2 = 'https://api.binance.com/api/v1/ticker/24hr';
https.get(api2, function(res) {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {

    // API 2
    const arr = JSON.parse(data);
    const ticker = arr.filter((val) => {
      if(val.symbol === 'ADXBNB'){
        const arb = displayARB(val.askPrice, val.bidPrice);
        displayTable(val.openTime, val.symbol, val.askQty, val.bidQty, arb);
        return true;
      }
    });

  })

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

const api3 = 'https://api.binance.com/api/v1/depth';
const apiSymbol = 'ADXBNB';
const apilimit = 5;

https.get(`${api3}?symbol=${apiSymbol}&limit=${apilimit}`, function(res) {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    // API 3
    const arr = JSON.parse(data);

    console.log(`TYPE	    PRICE    QTY`);

    const asksDepth = arr.asks.forEach(element => {
      console.log(`ASK ${element[0]} ${element[1]}`);
    });
    const bidsDepth = arr.bids.forEach(element => {
      console.log(`BID ${element[0]} ${element[1]}`);
    });

    //TO DO 
    //PUSH THE ARRAY INTO temp so I can sort


  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});