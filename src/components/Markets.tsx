"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useReadContract,
  useDisconnect,
  useWriteContract,
} from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { marketAddress, marketAbi } from "../constants";
import Market from "./Market";
import { parseUnits } from "viem";

const Markets = () => {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const [markets, setMarkets] = useState<Array<object>>([]);
  const [isCreatingMarket, setIsCreatingMarket] = useState(false);
  const [newMarket, setNewMarket] = useState({
    cryptoPair: "",
    strikePrice: "",
    endTime: "",
    resolutionTime: "",
    pythPriceId: "",
  });

  const { data: marketCount } = useReadContract({
    address: marketAddress,
    abi: marketAbi,
    functionName: "marketCount",
  });

  const { writeContract } = useWriteContract();

  const fetchMarkets = async () => {
    if (marketCount) {
      const fetchedMarkets = [];
      for (let i = 1; i <= Number(marketCount); i++) {
        const marketData = await useReadContract({
          address: marketAddress,
          abi: marketAbi,
          functionName: "getMarketDetails",
          args: [i],
        });
        fetchedMarkets.push({ id: i, ...marketData });
      }
      setMarkets(fetchedMarkets);
    }
  };

  useEffect(() => {
    fetchMarkets();
  }, [marketCount]);

  const handleCreateMarket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await writeContract({
        address: marketAddress,
        abi: marketAbi,
        functionName: "createMarket",
        args: [
          newMarket.cryptoPair,
          parseUnits(newMarket.strikePrice, 18),
          Math.floor(new Date(newMarket.endTime).getTime() / 1000),
          Math.floor(new Date(newMarket.resolutionTime).getTime() / 1000),
          newMarket.pythPriceId,
        ],
      });
      setIsCreatingMarket(false);
      setNewMarket({
        cryptoPair: "",
        strikePrice: "",
        endTime: "",
        resolutionTime: "",
        pythPriceId: "",
      });
      fetchMarkets();
    } catch (error) {
      console.error("Error creating market:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* user connect */}
      {isConnected ? (
        <div className="mb-8 flex justify-between items-center">
          <p className="text-lg">
            Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
          <button
            onClick={() => disconnect()}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={() => open()}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg mb-8 transition duration-300"
        >
          Connect Wallet
        </button>
      )}

      <h2 className="text-3xl font-bold mb-6">Prediction Markets</h2>

      {markets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((market, index) => (
            <Market key={index} market={market} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl mb-4">No active markets at the moment.</p>
          {isConnected && (
            <button
              onClick={() => setIsCreatingMarket(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Create a New Market
            </button>
          )}
        </div>
      )}

      {/* MODAL  */}
      {isCreatingMarket && (
        <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Create New Market</h3>
            <form onSubmit={handleCreateMarket}>
              <input
                type="text"
                placeholder="Crypto Pair (e.g., BTC/USD)"
                value={newMarket.cryptoPair}
                onChange={(e) =>
                  setNewMarket({ ...newMarket, cryptoPair: e.target.value })
                }
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="number"
                placeholder="Strike Price"
                value={newMarket.strikePrice}
                onChange={(e) =>
                  setNewMarket({ ...newMarket, strikePrice: e.target.value })
                }
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="datetime-local"
                placeholder="End Time"
                value={newMarket.endTime}
                onChange={(e) =>
                  setNewMarket({ ...newMarket, endTime: e.target.value })
                }
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="datetime-local"
                placeholder="Resolution Time"
                value={newMarket.resolutionTime}
                onChange={(e) =>
                  setNewMarket({ ...newMarket, resolutionTime: e.target.value })
                }
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Pyth Price ID"
                value={newMarket.pythPriceId}
                onChange={(e) =>
                  setNewMarket({ ...newMarket, pythPriceId: e.target.value })
                }
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsCreatingMarket(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Create Market
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Markets;
