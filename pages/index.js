import { useState, useEffect, useRef } from 'react'
import Web3 from 'web3'
import Head from 'next/head'
import TransactionGroup from '@/components/TransactionGroup/transactionGroup'
import usePrice from '@/util/usePrice'

export default function Home() {
  const [hashList, setHashList] = useState([])
  const {price,error} = usePrice()

  var web3 = new Web3(process.env.NEXT_PUBLIC_WEB3_KEY);
  let subscription = useRef()
  useEffect(() => {
    subscription.current = web3.eth.subscribe('newBlockHeaders')
    .on("data", function(blockHeader){
      console.log("incoming DATA!", blockHeader)
      web3.eth.getBlock(blockHeader.hash).then(block => {
        console.log("BLOCK",block)
        let transactionGroup = []
        for(let b of block.transactions){
          web3.eth.getTransaction(b).then(res => {
            transactionGroup.push(res)
          })
        }
        const nodeBlock = {
          transactionGroup,
          hash: block.hash,
          number: block.number,
          size: block.size,
          timestamp: block.timestamp,
          gasUsed: block.gasUsed
        }
        setHashList(prev => [nodeBlock, ...prev])

      })
      // web3.eth.getTransactionFromBlock(blockHeader.hash, 0).then(blockResults => {
      //   web3.eth
      //   console.log(blockResults)
      // })
      
    })
    .on("error", console.error);
    
    // unsubscribes the subscription
    return () => {
      subscription.current.unsubscribe(function(error, success){
        if(error){
          console.error(error)
        }
        if (success) {
            console.log('Successfully unsubscribed!');
        }
      });
    }
  },[])
  return (
    <>
      <Head>
        <title>BlockFeed</title>
        <meta name="description" content="Display transaction data for latest Node" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex mt-24 justify-center h-screen'>
        <div className='flex flex-col items-center w-[80%]'>
          <h1 className="text-3xl font-bold underline">Ethereum is: ${price}</h1>
          {
            hashList.map(tx => {
              return (
                <TransactionGroup price={price} group={tx} w3={web3}/>
              )
            })
          }
        </div>

      </main>
    </>
  )
}
