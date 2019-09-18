const nightmare = require('nightmare')();

async function checkPrice() {
    const priceString = 
        await nightmare
        .goto("https://www.amazon.co.uk/Dr-Prepare-Stainless-Steel-BPA-Free-Leak-Proof/dp/B07QMQ7SLV/")
        .wait("#priceblock_ourprice")
        .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
        .end()
    const priceNumber = parseFloat(priceString.replace('£', '')); 

    if(priceNumber < 10) {
        console.log("It is cheap")
    } else {
        console.log("It is expensive")
    }
}

checkPrice()
