import Markets from "@/components/Markets";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Crypto Prediction Markets
      </h1>
      <Markets />
    </main>
  );
}
