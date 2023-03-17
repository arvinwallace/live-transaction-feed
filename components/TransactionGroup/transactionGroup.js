
function TransactionGroup ({group, w3, price}) {

  // For some reason, the first group is always empty.
  // This may happen when the subscription is initialized 
  if(group.transactionGroup.length === 0) return null

  return (
    <div className="border-slate-400 mt-10 mb-20 w-full">
      <div className="px-10 py-5 bg-slate-200">
        <div className="flex justify-between py-1">
          <h3>Number: {group.number}</h3>
          <h3>Hash: {group.hash}</h3>
          <h3>Transactions: {group.transactionGroup.length}</h3>
        </div>
        <div className="flex justify-between py-1">
          <h3>Timestamp: {group.timestamp}</h3>
          <h3>Size: {group.size}</h3>
          <h3>Gas: {group.gasUsed}</h3>
        </div>
      </div>

    <div className="border min-h-[600px] max-h-[600px] overflow-scroll p-5">

      {
        group.transactionGroup.map(tx => {
          return(
            <div className='w-full flex justify-between'>
            <p className=' w-[30%]'>FROM: {tx.from}</p>
            <p className=' w-[30%]'>TO: {tx.to}</p>
            <p className=' w-[20%]'>
              Value: {(parseFloat(tx.value) / 10 ** 18)} Eth</p>
            <p className=' w-[10%]'>USD: ${(w3.utils.fromWei(tx.value, 'ether') * price).toFixed(2)}</p>
          </div>
          )
        })
      }
    </div>
    </div>
  )
}

export default TransactionGroup