/*
  Handler function to attempt to multiple payment of an NFT from the opensea
*/



export async function requestSubscribeToMultiplePayments(address, contract, provider, encodedBasicOrder, encodedScoringData, price) {
  try {
    // Use Promise.all() to execute multiple promises concurrently and retrieve their results
    const [balance, gas, gasPrice] = await Promise.all([
      provider.getBalance(address),
      contract.methods.subscribeToMultiplePayments(encodedBasicOrder, encodedScoringData, price).estimateGas({ from: address }), provider.getGasPrice(),
    ])

    // Log info to the console
    console.log("Address:", address)
    console.log("Balance:", balance.toString())
    console.log(`Estimated gas: ${gas}`)
    console.log("Gas price:", gasPrice.toString())

    // Calculate the estimated transaction cost based on gas and gas price
     const transactionCost = gasPrice.mul(gas)
    console.log("Transaction cost:", transactionCost.toString())

    // If the balance is less than the transaction cost, display an alert and return
    if (balance.lt(transactionCost)) {
      alert("Insufficient funds to cover the gas fee")
      return
    }

    // Send the minting transaction and listen for the transaction hash
    const receipt = await contract.methods
      .subscribeToMultiplePayments(encodedBasicOrder, encodedScoringData, price)
      .send({
        from: address,
        gas,
      })
      .on("transactionHash", (hash) => {
        console.log("Transaction hash:", hash)
      })

    // Log the transaction receipt to the console
    console.log("Transaction receipt:", receipt)
    return receipt

  } catch (error) {
    console.error(error)
    return false
  }
}

export async function requestToPayCreditStep(address, contract, provider, stepId, contractAddress, tokenId, settlementAmount) {
  try {
    // Use Promise.all() to execute multiple promises concurrently and retrieve their results
    const [balance, gas, gasPrice] = await Promise.all([
      provider.getBalance(address),
      contract.methods.payCreditStep(stepId, contractAddress, tokenId).estimateGas({ from: address, value: settlementAmount }),
      provider.getGasPrice(),
    ])

    // Log info to the console
    console.log("Address:", address)
    console.log("Balance:", balance.toString())
    console.log(`Estimated gas: ${gas}`)
    console.log("Gas price:", gasPrice.toString())

    // Calculate the estimated transaction cost based on gas and gas price
    const transactionCost = gasPrice.mul(gas)
    console.log("Transaction cost:", transactionCost.toString())

    // If the balance is less than the transaction cost, display an alert and return
    if (balance.lt(transactionCost)) {
      alert("Insufficient funds to cover the gas fee")
      return
    }

    // Send the minting transaction and listen for the transaction hash
    const receipt = contract.methods.payCreditStep(stepId, contractAddress, tokenId).
    send({
        from: address,
        gas,
        value: settlementAmount
      })
      .on("transactionHash", (hash) => {
        console.log("Transaction hash:", hash)
      })

    // Log the transaction receipt to the console
    console.log("Transaction receipt:", receipt)
    return receipt

  } catch (error) {
    console.error(error)
    return false
  }
}

export async function encodeToBasicOrder(address, contract, provider, basicOrder) {
  try {
    // Use Promise.all() to execute multiple promises concurrently and retrieve their results
    const [balance, gas, gasPrice] = await Promise.all([
      provider.getBalance(address),
      contract.methods.encodeToBasicOrder(
        basicOrder
      ).estimateGas({ from: address }),
      provider.getGasPrice(),
    ])

    // Log info to the console
    console.log("Address:", address)
    console.log("Balance:", balance.toString())
    console.log(`Encoded Basic Order Data ${gas}`)
    console.log("Gas price:", gasPrice.toString())

    // Calculate the estimated transaction cost based on gas and gas price
    const transactionCost = gasPrice.mul(gas)
    console.log("Transaction cost:", transactionCost.toString())

    // If the balance is less than the transaction cost, display an alert and return
    if (balance.lt(transactionCost)) {
      alert("Insufficient funds to cover the gas fee")
      return
    }

    // Send the minting transaction and listen for the transaction hash
    const receipt = await contract.methods
      .encodeToBasicOrder(basicOrder).call()
     /*  .send({
        from: address,
        gas,
      }) */
      /* .on("transactionHash", (hash) => {
        console.log("Transaction hash:", hash)
      }) */

    // Log the transaction receipt to the console
    console.log("Transaction receipt:", receipt)
    return receipt

  } catch (error) {
    console.error(error)
    return false
  }
}

export async function encodeToScoringAPIData(address, contract, provider, scoringAPIData) {
  try {
    // Use Promise.all() to execute multiple promises concurrently and retrieve their results
    const [balance, gas, gasPrice] = await Promise.all([
      provider.getBalance(address),
      contract.methods.encodeToScoringData(
        scoringAPIData
      ).estimateGas({ from: address }),
      provider.getGasPrice(),
    ])

    // Log info to the console
    console.log("Address:", address)
    console.log("Balance:", balance.toString())
    console.log(`Encoded scoring API data ${gas}`)
    console.log("Gas price:", gasPrice.toString())

    // Calculate the estimated transaction cost based on gas and gas price
    const transactionCost = gasPrice.mul(gas)
    console.log("Transaction cost:", transactionCost.toString())

    // If the balance is less than the transaction cost, display an alert and return
    if (balance.lt(transactionCost)) {
      alert("Insufficient funds to cover the gas fee")
      return
    }

    // Send the minting transaction and listen for the transaction hash
    const receipt = await contract.methods
      .encodeToScoringData(scoringAPIData).call()
     /*  .send({
        from: address,
        gas,
      }) */
      /* .on("transactionHash", (hash) => {
        console.log("Transaction hash:", hash)
      }) */

    // Log the transaction receipt to the console
    console.log("Transaction receipt:", receipt)
    return receipt

  } catch (error) {
    console.error(error)
    return false
  }
}