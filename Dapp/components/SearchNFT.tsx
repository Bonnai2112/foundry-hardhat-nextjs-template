import { useState, useRef } from "react"
import { HStack, Box, VStack, Input, Button, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot } from "@chakra-ui/react"
import { Contract } from "web3-eth-contract"
import type { Web3Reacthooks } from "@web3-react/core"
import axios from 'axios';
import SubscribeToMultiplePayment from "./SubscribeToMultiplePayment";
import { ethers, formatEther } from 'ethers'
import { BigNumber } from 'bignumber.js';
import { requestToPayCreditStep } from "../utils/utils"

type SearchNFTProps = {
  accounts: string[]
  contract: Contract | null
  provider: ReturnType<Web3Reacthooks["useProvider"]>
}

// Component to test signing a message with the connected wallet
const SearchNFT = ({ accounts, contract, provider }: SearchNFTProps) => {
  // Initialize state for message and signature
  const [urlNFT, setUrlNFT] = useState("")
  const [chain, setChain] = useState("")
  const [contractAddress, setContractAddress] = useState("")
  const [tokenId, setTokenId] = useState("")
  const [listings, setListings] = useState({})
  const [subscribed, setSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)

  /**
   * Data from scoring API mocked 
   * @notice bounds is a dynamic array that contains the amounts of the steps to be paid for the acquisition of the NFT
   * @notice nbBlocks represent the number of blocks between each payment
   * 
   */
  const [scoringData, setscoringData] = useState({ bounds: ["3333333333000000", "3333333333000000", "5333333344000000", "7333333333000000"], nbBlocs: 5760 })
  // State to keep track of loading status

  // Initialize a ref for the input field
  const inputref = useRef(null)

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Handle input change
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlNFT(e.target.value)
  }

  const payCreditStep = async (stepId, settlementAmount) => {
    if (contract && accounts.length > 0) {
      // Call the subscription function and wait for the result
      setIsLoading(true)
      const res = await requestToPayCreditStep(accounts[0], contract, provider, stepId, `${listings?.input_data?.parameters?.offerToken}`, `${listings?.input_data?.parameters?.offerIdentifier}`, settlementAmount)
      setIsLoading(false)
      setTransactionHash(res?.transactionHash)
      if (!res) {
        console.log("credit payment failed (or was canceled by the user).")
        return
      }
    }
  }

  const payCreditStepButton = (stepId, settlementAmount) => subscribed ? (
    <Td>
      <Button onClick={async () => await payCreditStep(stepId, settlementAmount)} /* isDisabled={!subscribed} */>
        Pay
      </Button>
    </Td>
  ) : null

  const subscribe = async () => {
    if (accounts && accounts.length > 0) {
      try {
        const urlFormatted = new URL(urlNFT)
        const pathParam = urlFormatted.pathname.split('/')
        setChain(pathParam[2])
        setContractAddress(pathParam[3])
        setTokenId(pathParam[4])
        const listingUrl = `https://testnets-api.opensea.io/v2/orders/${chain}/seaport/listings?asset_contract_address=${contractAddress}&token_ids=${tokenId}&limit=1`
        const listings = await axios.get(listingUrl)

        // await 1 second to avoid that opensea Request was throttled. Expected available in 1 second.
        await delay(1000)

        // get fulfillement data of listing
        const data = {
          listing: {
            hash: listings?.data?.orders[0]?.order_hash,
            chain: chain,
            protocol_address: "0x00000000000001ad428e4906aE43D8F9852d0dD6"
          },
          fulfiller: {
            address: "0x6f10411CB4A5Ff7BCfe61Cf338aaebE7016AB698"
          }
        }
        const fulfillementdata = await axios.post('https://testnets-api.opensea.io/v2/listings/fulfillment_data', data, {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })

        setListings(fulfillementdata?.data?.fulfillment_data.transaction)

      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <HStack justifyContent="flex-start" alignItems="flex-start">
      <Box

        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        padding="10px"
      >
        <VStack>
          <Input
            ref={inputref}
            value={urlNFT}
            placeholder="Entrer url..."
            onChange={handleInput}

          />
          <Button onClick={subscribe} isDisabled={!urlNFT}>
            Conditions
          </Button>
        </VStack>

        {!!listings.value ? (
          <VStack alignItems="center" justifyContent="center">
            <TableContainer>
              <Table variant='simple'>
                <Tbody>
                  <Tr>
                    <Td>Price (Matic)</Td>
                    <Td isNumeric>{formatEther(`${listings?.value}`)}</Td>
                  </Tr>
                  <Tr>
                    <Td>NFT address</Td>
                    <Td isNumeric>{listings?.input_data?.parameters?.offerToken}</Td>
                  </Tr>
                  <Tr>
                    <Td>NFT ID</Td>
                    <Td isNumeric>{listings?.input_data?.parameters?.offerIdentifier}</Td>
                  </Tr>
                  {scoringData.bounds.map((payment, index) => {
                    return (
                      <Tr key={index}>
                        <Td>Settlment N° {index}</Td>
                        <Td isNumeric>{formatEther(`${payment}`)}</Td>
                        {payCreditStepButton(`${index}`, `${payment}`)}
                      </Tr>
                    )
                  })}
                  <Tr>
                    <Td>Initial payment</Td>
                    <Td isNumeric>0.0011111111222</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <SubscribeToMultiplePayment
              accounts={accounts}
              contract={contract}
              provider={provider}
              basicOrder={listings?.input_data?.parameters}
              scoringData={scoringData}
              price={`${listings?.value}`}
              setSubscribed={setSubscribed}
            />
          </VStack>
        ) : <span></span>}
      </Box>
    </HStack>
  )
}

export default SearchNFT
