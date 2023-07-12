import { VStack } from "@chakra-ui/react"

import { useWeb3React } from "@web3-react/core"
import { useContractCP } from "../utils/useContractCP"

import { Status } from "../components/Status"
import { Accounts } from "../components/Accounts"
import WalletButton from "../components/WalletButton"
import ConnectButton from "../components/ConnectButton"
import DisconnectButton from "../components/DisconnectButton"
import SearchNFT from "../components/SearchNFT"

export default function Home() {
  // Get variables from Web3react context using the useWeb3React hook
  const {
    connector,
    accounts,
    isActive,
    ENSNames,
    chainId,
    isActivating,
    provider,
  } = useWeb3React()

  // Get the NFT minting contract instance if Web3React is active
  const contractCP = useContractCP(isActive, connector)

  return (
    <VStack justifyContent="center" alignItems="center" height="100vh">
      <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      <Status isActivating={isActivating} isActive={isActive} />
      {isActive ? (
        <VStack alignItems="center" justifyContent="center">
          <DisconnectButton connector={connector} />
          <WalletButton connector={connector} />
          <SearchNFT
            accounts={accounts}
            contract={contractCP}
            provider={provider}
          />
        </VStack>
      ) : (
        <ConnectButton />
      )}
    </VStack>
  )
}
