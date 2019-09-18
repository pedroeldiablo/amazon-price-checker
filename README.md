# amazon-price-checker

Once cloned you need to set-up an account on sendgrid.com and create an .env file. 

Add your api key to the env file as SENDGRID_API_KEY, the sender email address as SEND_EMAIL and the recipient as RECIEVE_EMAIL 

To check prices run the follow command with the url and price in the appropriate positions `node parser.js the_amazon_url_for_the_product the_max_price_you_want_to_pay`
