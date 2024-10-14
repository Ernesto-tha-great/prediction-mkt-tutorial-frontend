import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import { marketAddress, marketAbi } from "../constants";
import { parseUnits } from "viem";

interface MarketModalProps {
  children: React.ReactNode;
}

const MarketModal = ({ children }: MarketModalProps) => {
  const [isCreatingMarket, setIsCreatingMarket] = useState(false);
  const { writeContract } = useWriteContract();
  const [newMarket, setNewMarket] = useState({
    cryptoPair: "",
    strikePrice: "",
    endTime: "",
    resolutionTime: "",
    pythPriceId: "",
  });

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
      //   fetchMarkets();
    } catch (error) {
      console.error("Error creating market:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
  );
};

export default MarketModal;
