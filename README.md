# Writeup

## How does your solution work?
> I used Web3js along with React(NextJS). I let React bundle up my html/css/js for display and I used Web3 to subscribe (from the browser) to the endpoint you provided. The subscription listens for an in-coming header representing the latest ethereum block. I used the methods made available by Web3 to take the hash associated with the header block, get the block, get the transactions, and finally display them.

## How many hours did this take you?
> 20 hours.
6 hours for research and experimentation.
14 hours for coding, documentation, and deployment.

## What went well? What went poorly?
> Let's start with what went poorly. Initially I skimmed the requirements and did not read the part about "YOU MUST USE AN ETHERUM NODE". I ended up wasting time getting credentials for Etherscan and playing with their api in postman. Upon second reading of the requirements I realized I needed something else.
This leads me to the part about "What wen't well". Googling around for ways to subscribe to an incoming ethereum block, I found the Web3js library. It had everything I needed. The subscription method, block getter, transaction getter and even some utils for converting wei to ether. 

## What did you have trouble with/how did you solve it?
> At first, my subscription was giving me duplicates of the same data. My initial subscription code was written following the example provided in the Web3 docs. Then I realized that the ".on" listener was returning data along with the callback function provided in the subscription initialization. The callback was the source for my duplicate data. Since I didn't need it, I deleted it and let the .on listener do the work. Also, for some reason, the very first block that my subscription would respond to appeared empty. So my UI would always start with an empty block followed by correctly populated blocks. To solve, I would check if the block had more than zero transactions before displaying it. 

## What would you add to your solution if you had more time?
> I would definitely rewrite my Ethereum price getter/helper function. I'd come up with a more elegant solution to get the very latest ethereum price everytime a new block comes in.. But even then, I wouldn't be able to use the latest price with the current block. I'd have to wait 12 seconds before applying it the the next block.. I'd also investigate some more robust error handling since my current catch blocks are simplistic. 

[Link to Live Demo](https://live-transaction-feed.vercel.app/)
