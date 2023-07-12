import { initializeConnector } from "@web3-react/core"
import { MagicConnect } from "web3-react-magic"

// Initialize the MagicConnect connector
export const [magicConnect, hooks] = initializeConnector<MagicConnect>(
  (actions) =>
    new MagicConnect({
      actions,
      options: {
        apiKey: process.env.NEXT_PUBLIC_MAGICKEY,
        networkOptions: {
          rpcUrl: process.env.NEXT_PUBLIC_MUMBAI_RPC,
          chainId: 137,
        },
      },
    })
)
