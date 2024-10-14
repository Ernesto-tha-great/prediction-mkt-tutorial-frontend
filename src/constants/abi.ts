export const marketAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_paymentToken",
        type: "address",
        internalType: "address",
      },
      { name: "_pythOracle", type: "address", internalType: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "FEE_PERCENTAGE",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "buyShares",
    inputs: [
      { name: "_marketId", type: "uint256", internalType: "uint256" },
      { name: "_isYes", type: "bool", internalType: "bool" },
      { name: "_amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "claimRewards",
    inputs: [{ name: "_marketId", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createMarket",
    inputs: [
      { name: "_cryptoPair", type: "string", internalType: "string" },
      {
        name: "_strikePrice",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "_endTime", type: "uint256", internalType: "uint256" },
      {
        name: "_resolutionTime",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "_pythPriceId", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getMarketDetails",
    inputs: [{ name: "_marketId", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "cryptoPair", type: "string", internalType: "string" },
      { name: "strikePrice", type: "uint256", internalType: "uint256" },
      { name: "endTime", type: "uint256", internalType: "uint256" },
      {
        name: "resolutionTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "totalYesShares",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "totalNoShares",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "resolved", type: "bool", internalType: "bool" },
      { name: "outcome", type: "bool", internalType: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUserPosition",
    inputs: [
      { name: "_marketId", type: "uint256", internalType: "uint256" },
      { name: "_user", type: "address", internalType: "address" },
    ],
    outputs: [
      { name: "yesShares", type: "uint256", internalType: "uint256" },
      { name: "noShares", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "marketCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "markets",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "id", type: "uint256", internalType: "uint256" },
      { name: "cryptoPair", type: "string", internalType: "string" },
      { name: "strikePrice", type: "uint256", internalType: "uint256" },
      { name: "endTime", type: "uint256", internalType: "uint256" },
      {
        name: "resolutionTime",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "pythPriceId", type: "bytes32", internalType: "bytes32" },
      {
        name: "totalYesShares",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "totalNoShares",
        type: "uint256",
        internalType: "uint256",
      },
      { name: "resolved", type: "bool", internalType: "bool" },
      { name: "outcome", type: "bool", internalType: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "paymentToken",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IERC20" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pythOracle",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IPyth" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "resolveMarket",
    inputs: [
      { name: "_marketId", type: "uint256", internalType: "uint256" },
      {
        name: "_pythUpdateData",
        type: "bytes[]",
        internalType: "bytes[]",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "sellShares",
    inputs: [
      { name: "_marketId", type: "uint256", internalType: "uint256" },
      { name: "_isYes", type: "bool", internalType: "bool" },
      { name: "_amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "userPositions",
    inputs: [
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "address", internalType: "address" },
    ],
    outputs: [
      { name: "yesShares", type: "uint256", internalType: "uint256" },
      { name: "noShares", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "MarketCreated",
    inputs: [
      {
        name: "marketId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "cryptoPair",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "strikePrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "endTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "resolutionTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MarketResolved",
    inputs: [
      {
        name: "marketId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "outcome",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
      {
        name: "resolutionPrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RewardsClaimed",
    inputs: [
      {
        name: "marketId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "user",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SharesBought",
    inputs: [
      {
        name: "marketId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "buyer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "isYes",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SharesSold",
    inputs: [
      {
        name: "marketId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "seller",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "isYes",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "ReentrancyGuardReentrantCall", inputs: [] },
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [{ name: "token", type: "address", internalType: "address" }],
  },
];
