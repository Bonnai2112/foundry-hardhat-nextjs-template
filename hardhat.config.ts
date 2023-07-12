import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import "@truffle/dashboard-hardhat-plugin";
import "xdeployer";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-contract-sizer";
import "hardhat-abi-exporter";
import fs from "fs";
import "hardhat-preprocessor";

dotenv.config();

function getRemappings() {
  return fs
    .readFileSync("remappings.txt", "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => line.trim().split("="));
}


task("accounts", "Prints the list of accounts", async (_, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task(
  "balances",
  "Prints the list of accounts and their balances",
  async (_, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
      console.log(
        account.address +
        " " +
        (await hre.ethers.provider.getBalance(account.address))
      );
    }
  }
);

const config: HardhatUserConfig = {
  paths: {
    sources: "./contracts/src",
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
    },
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
      chainId: 31337,
      hardfork: "merge",
      forking: {
        url: process.env.ETH_MAINNET_URL || "",
        // The Hardhat network will by default fork from the latest mainnet block
        // To pin the block number, specify it below
        // You will need access to a node with archival data for this to work!
        // blockNumber: 14743877,
        // If you want to do some forking, set `enabled` to true
        enabled: false,
      },
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    "truffle-dashboard": {
      url: "http://localhost:24012/rpc",
      timeout: 0,
    },
    goerli: {
      chainId: 5,
      url: process.env.ETH_GOERLI_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mumbai: {
      chainId: 80001,
      url: process.env.POLYGON_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    polygonZkEVMTestnet: {
      chainId: 1442,
      url: process.env.POLYGON_ZKEVM_TESTNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    polygon: {
      chainId: 137,
      url: process.env.POLYGON_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    polygonZkEVMMain: {
      chainId: 1101,
      url: process.env.POLYGON_ZKEVM_MAINNET_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  xdeploy: {
    // Change this name to the name of your main contract
    // Does not necessarily have to match the contract file name
    contract: "SeaportSettlementManager",

    // Change to `undefined` if your constructor does not have any input arguments
    constructorArgsPath: "./deploy-args.ts",

    // The salt must be the same for each EVM chain for which you want to have a single contract address
    // Change the salt if you are doing a re-deployment with the same codebase
    salt: process.env.SALT,

    // This is your wallet's private key
    signer: process.env.PRIVATE_KEY,

    // Use the network names specified here: https://github.com/pcaversaccio/xdeployer#configuration
    // Use `localhost` or `hardhat` for local testing
    networks: [/* "hardhat", "goerli",  "polygon",*/ "mumbai"],

    // Use the matching env URL with your chosen RPC in the `.env` file
    rpcUrls: [
      /* "hardhat",
      process.env.ETH_SEPOLIA_TESTNET_URL,
      process.env.BSC_TESTNET_URL, 
      process.env.POLYGON_MAINNET_URL,*/
      process.env.POLYGON_TESTNET_URL,
    ],

    // Maximum limit is 15 * 10 ** 6 or 15,000,000. If the deployments are failing, try increasing this number
    // However, keep in mind that this costs money in a production environment!
    gasLimit: 1.2 * 10 ** 6,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
    strict: true,
    only: [],
    except: [],
  },
  abiExporter: {
    path: "./abis",
    runOnCompile: true,
    clear: true,
    flat: false,
    only: [],
    spacing: 2,
    pretty: true,
  },
  etherscan: {
    apiKey: {
      // For Goerli
      goerli: process.env.ETHERSCAN_API_KEY || "",
      // For Polygon testnets & mainnets
      polygon: process.env.POLYGON_API_KEY || "",
      polygonZkEVM: process.env.POLYGON_ZKEVM_API_KEY || "",
      polygonMumbai: process.env.POLYGON_API_KEY || "",
      polygonZkEVMTestnet: process.env.POLYGON_ZKEVM_API_KEY || "",
    },
    customChains: [
      {
        network: "polygonZkEVM",
        chainId: 1101,
        urls: {
          apiURL: "https://api-zkevm.polygonscan.com/api",
          browserURL: "https://zkevm.polygonscan.com",
        },
      },
      {
        network: "polygonZkEVMTestnet",
        chainId: 1442,
        urls: {
          apiURL: "https://api-testnet-zkevm.polygonscan.com/api",
          browserURL: "https://testnet-zkevm.polygonscan.com",
        },
      },
    ],
  },
  tenderly: {
    username: "MyAwesomeUsername",
    project: "super-awesome-project",
    forkNetwork: "",
    privateVerification: false,
    deploymentsDir: "deployments_tenderly",
  },
  // This fully resolves paths for imports in the ./lib directory for Hardhat
  preprocess: {
    eachLine: (hre) => ({
      transform: (line: string) => {
        if (line.match(/^\s*import /i)) {
          getRemappings().forEach(([find, replace]) => {
            if (line.match(find)) {
              line = line.replace(find, replace);
            }
          });
        }
        return line;
      },
    }),
  },

};

export default config;
