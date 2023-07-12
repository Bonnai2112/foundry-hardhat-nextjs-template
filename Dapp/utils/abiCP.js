export const contractCPABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_SETTLEMENTMANAGER",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "paymentsCompleted",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "stepId",
        "type": "uint256"
      }
    ],
    "name": "CreditStepPaid",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_baseNFT",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_wrapperNFT",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_creator",
        "type": "address"
      }
    ],
    "name": "ERC721WrapperCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_stepId",
        "type": "uint256"
      },
      {
        "internalType": "contract IERC721Metadata",
        "name": "_contractAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "payCreditStep",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "_order",
        "type": "bytes"
      },
      {
        "internalType": "bytes",
        "name": "_scoringData",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "subscribeToMultiplePayments",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "considerationToken",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "considerationIdentifier",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "considerationAmount",
            "type": "uint256"
          },
          {
            "internalType": "address payable",
            "name": "offerer",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "zone",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "offerToken",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "offerIdentifier",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "offerAmount",
            "type": "uint256"
          },
          {
            "internalType": "enum BasicOrderType",
            "name": "basicOrderType",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "startTime",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "endTime",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "zoneHash",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "salt",
            "type": "uint256"
          },
          {
            "internalType": "bytes32",
            "name": "offererConduitKey",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "fulfillerConduitKey",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "totalOriginalAdditionalRecipients",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "address payable",
                "name": "recipient",
                "type": "address"
              }
            ],
            "internalType": "struct AdditionalRecipient[]",
            "name": "additionalRecipients",
            "type": "tuple[]"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct BasicOrderParameters",
        "name": "_basicOrderParams",
        "type": "tuple"
      }
    ],
    "name": "encodeToBasicOrder",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256[]",
            "name": "bounds",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "nbBlockBetweenPayments",
            "type": "uint256"
          }
        ],
        "internalType": "struct DelegationManager.ScoringDataStruct",
        "name": "_scoringData",
        "type": "tuple"
      }
    ],
    "name": "encodeToScoringData",
    "outputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "payments",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "stepId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isPaid",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "wrappers",
    "outputs": [
      {
        "internalType": "address",
        "name": "addr",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isWrapper",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];