require('dotenv').config()
const sgMail =require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const senderEmail = process.env.SEND_EMAIL
const receiverEmail = process.env.RECIEVE_EMAIL

const nightmare = require('nightmare')()

const args = process.argv.slice(2)
const url = args[0]
const minPrice = args[1]

async function checkPrice() {
    console.log(receiverEmail)
    console.log(senderEmail)
    try {
        const priceString = 
            await nightmare
            .goto(url)
            .wait("#priceblock_ourprice")
            .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
            .end()
        const priceNumber = parseFloat(priceString.replace('£', '')); 
        console.log(priceNumber)
       
        

        if(priceNumber < minPrice) {
            await sendEmail('Price is low',
            `The price on ${url} has dropped below ${minPrice}`
            )
        }
    } catch (err) {
        sendEmail('Amazon Price Checker Error',
            err.message
            )
            throw err

    }
}

checkPrice()

function sendEmail(subject, body) {
    const email = {
        to: receiverEmail ,
        from: senderEmail,
        subject: subject,
        text: body, 
        html: body
    }

    console.log(email);

    return sgMail.send(email)
}
