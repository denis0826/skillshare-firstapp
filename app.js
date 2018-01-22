const https = require('https');



function displayTable(date, symbol, ask, bid, arb) {
  var newdate = new Date(date),
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  //22 Jan 2018 14:01
  console.log(`
    Date/Time Stamp \t\tSymbol\tASK\tBID\tARB(%)
    ${newdate.getDate()} ${months[newdate.getMonth()]} ${newdate.getFullYear()} ${newdate.getHours()}:${newdate.getMinutes()}\t${symbol}\t${parseFloat(ask).toFixed(2)}\t${parseFloat(bid).toFixed(2)}\t${arb}
    `);
}

function displayARB(askPrice, bidPrice) {
  return 100 * (askPrice - bidPrice) / bidPrice;
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
        displayTable(val.openTime, val.symbol, val.askPrice, val.bidPrice, arb);
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
    const arr2 = JSON.parse(data);

    let temp = [];

    console.log(`TYPE\tPRICE\t\tQTY`);

    const array1 = arr2.asks,
    array2 = arr2.bids;

  
    
    arrDepth1 = array1.sort().reverse();
    arrDepth2 = array2.sort().reverse();

    

    // function sortByValue(jsObj){
    //   var sortedArray = [];
    //     for(var i in jsObj){
    //       // Push each JSON Object entry in array by [value, key]
    //       sortedArray.push([jsObj[i], i]);
    //     }
    //     return sortedArray.sort().reverse();
    //   }

    // console.log(sortByValue(array1))
    // console.log(sortByValue(array2))

    arrDepth1.forEach(element => {
      console.log(`ASK\t${element[0]}\t${element[1]}`);
    });
    
    arrDepth2.forEach(element => {
      console.log(`BID\t${element[0]}\t${element[1]}`);
    });


  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});