import { useState, useEffect, useRef } from 'react'
import Web3 from 'web3'
import Head from 'next/head'
import TransactionGroup from '@/components/TransactionGroup/transactionGroup'
import usePrice from '@/util/usePrice'
import Cat from '../components/Cat/Cat'

export default function Home() {
  const [hashList, setHashList] = useState([])
  const {price,error} = usePrice()

  var web3 = new Web3(process.env.WEB3_KEY);
  let subscription = useRef()
  useEffect(() => {
    subscription.current = web3.eth.subscribe('newBlockHeaders')
    .on("data", function(blockHeader){
      console.log("incoming DATA!", blockHeader)
      web3.eth.getBlock(blockHeader.hash).then(block => {
        console.log("BLOCK",block)
        let transactionGroup = []
        for(let b of block.transactions){
          web3.eth.getTransaction(b)
          .then(res => {
            transactionGroup.push(res)
          })
          .catch(err => {
            // If transaction retrieval fails,
            // We push a special object to the transactionGroup for display
            transactionGroup.push({
              from: "SERVER FAIL",
              txNumber: b
            })
          })
        }

        // Now that we have all the data
        // Let's create a normalized node-block with only the values we need

        const nodeBlock = {
          transactionGroup,
          hash: block.hash,
          number: block.number,
          size: block.size,
          timestamp: block.timestamp,
          gasUsed: block.gasUsed
        }
        // Add latest node-block to the FRONT of the list of existing blocks
        setHashList(prev => [nodeBlock, ...prev])
      })

    })
    .on("error", console.error);
    
    // When component un-mounts we unsubscribe from subscription
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

  if(hashList.length < 2){
    return (
    <>
      <div className='text-4xl mt-20 ml-10'>CAT IS LISTENING..</div>
      <div className='text-2xl  ml-32'>FOR THE NEWEST BLOCK</div>
      <Cat/>
    </>)
  }

  return (
    <>
      <Head>
        <title>BlockFeed</title>
        <meta name="description" content="Display transaction data for latest Node" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
      <div className='flex h-20 px-12 items-center justify-between shadow-lg'>
        <div className='flex justify-between gap-2 items-center w-32'>
          <span>cat</span>
          <Cat/>
          <span>scan</span>
        </div>
        <div>
          <span className="text-xl">Ethereum: </span>
          <span className="text-2xl font-semibold">${price.toFixed(2)}</span>
        </div>
      </div>
      
      <main className='flex mt-24 justify-center h-screen'>
        <div className='flex flex-col items-center w-[85%]'>
          {
            // I'm grabbing the newest 7 blocks for display
            // I want to avoid having hundreds of blocks on a single page since it hurts re-paint
            hashList.slice(0,8).map(tx => {
              return (
                <TransactionGroup price={price} group={tx} w3={web3}/>
              )
            })
          }
        </div>
      </main>
      </div>
    </>
  )
}
