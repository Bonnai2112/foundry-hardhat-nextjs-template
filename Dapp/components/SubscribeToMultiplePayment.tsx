import { Button, HStack, Link, Text, Spinner } from "@chakra-ui/react"
import { useState } from "react"
import { Contract } from "web3-eth-contract"
import { LinkIcon } from "@chakra-ui/icons"
import { encodeToBasicOrder, encodeToScoringAPIData, requestSubscribeToMultiplePayments } from "../utils/utils"
import type { Web3ReactHooks } from "@web3-react/core"

type SubcribeButtonProps = {
  accounts: string[]
  contract: Contract | null
  provider: ReturnType<Web3ReactHooks["useProvider"]>
  basicOrder: {}
  scoringData: {}
  price: string
  setSubscribed: (a: boolean) => void;
}

const SubscribeToMultiplePayment = ({ accounts, contract, provider, basicOrder, scoringData, price, setSubscribed }: SubcribeButtonProps) => {
  // State to keep track of transaction hash
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  // State to keep track of loading status
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  // Format orderBasic data
  const formatBasicOrder =  () => {
    return Object.values(basicOrder).map(value => {
      if(typeof value === 'object'){
        return value.map(v => {
          return [v.amount, v.recipient]
        })
      } else {
        return value
      }
    })
  }

  // Format scoringAPI data
  const formatScoringAPIData = () => {
    return Object.values(scoringData).map(value => {
      return value
    })
  }

  // Function to request NFT subscribe
  const requestToSubscribePayments = async () => {
    const formattedBasicData = formatBasicOrder()
    if (contract && accounts.length > 0) {
      setIsLoading(true)
      const encodedBasicOrder = await encodeToBasicOrder(accounts[0], contract, provider, formattedBasicData)
      setIsLoading(false)

      const formattedScoringAPI = formatScoringAPIData()
      setIsLoading(true)
      const encodedScoringData = await encodeToScoringAPIData(accounts[0], contract, provider, formattedScoringAPI)
      setIsLoading(false)

      setIsLoading(true)
      // Call the subscription function and wait for the result
      const res = await requestSubscribeToMultiplePayments(accounts[0], contract, provider, encodedBasicOrder, encodedScoringData, price)
      setIsLoading(false)
      setSubscribed(true)
      setTransactionHash(res?.transactionHash)
      if (!res) {
        console.log("subcribtion failed (or was canceled by the user).")
        return
      } 
    }
  }

  // Display Etherscan link once transactionHash is available
  // Using Etherscan since OpenSea doesn't currently support Sepolia
  const etherscanLink = transactionHash ? (
    <HStack>
      <Text>Etherscan</Text>
      <Link
        href={`https://mumbai.polygonscan.com/tx/${transactionHash}`}
        isExternal
        _hover={{ color: "blue.600" }}
      >
        <LinkIcon />
      </Link>
      
    </HStack>
  ) : null


  return (
    <>
      {/* subscribe button */}
      <Button onClick={requestToSubscribePayments}>
        Subscribe to multiple payments
      </Button>
      {/* Spinner while loading */}
      {isLoading ? <Spinner /> : null}
      {/* Etherscan link */}
      {etherscanLink}
    </>
  )
}

export default SubscribeToMultiplePayment
