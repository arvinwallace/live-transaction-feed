
function TransactionGroup({ group, w3, price }) {

  // For some reason, the first group is always empty.
  // This may happen when the subscription is initialized 
  if (group.transactionGroup.length === 0) return null

  return (
    <div className="border-slate-400 mb-20 w-full">
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
            if (tx.from === "SERVER FAIL") return (
              <div style={{ backgroundColor: "red" }} className='p-2 w-full flex justify-between'>
                <h2>Transaction : {tx.txNumber}</h2>
                <h2>SERVER FAILURE</h2>
              </div>
            )
            // Convert wei to ether
            const converted = w3.utils.fromWei(tx.value, 'ether')
            return (
              <div className='p-2 w-full flex flex-col xl:flex-row   border bottom-3 justify-between'>
                <div className=' w-[30%]'>
                  <p className="font-semibold">FROM:</p>
                  <p>{tx.from}</p>
                </div>
                <div className=' w-[30%]'>
                  <p className="font-semibold">TO:</p>
                  <p>{tx.to}</p>
                </div>
                <p className=' font-semibold w-[20%]'>
                  Value: {converted} Eth</p>
                <p className=' font-semibold w-[10%]'>USD: ${(converted * price).toFixed(2)}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default TransactionGroup