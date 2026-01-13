import { useState } from "react";
// import { getScore } from "../utils/address";
import AddressInput from "../components/AddressInput";
import ScoreCard from "../components/ScoreCard";
import ErrorMessage from "../components/ErrorMessage";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

function Home() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simple wallet address validator
  const isValidAddress = (addr) => /^0x[a-fA-F0-9]{40}$/.test(addr);
  const handleCheck = async () => {
    if (!isValidAddress(address)) {
      setError("Please enter a valid wallet address.");
      setResult(null);
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/wallet/${address}`);

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Could not fetch wallet data. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 text-center" data-aos="fade-up">
      {/* Address input + submit */}
      <AddressInput
        address={address}
        setAddress={setAddress}
        onSubmit={handleCheck}
      />

      {/* Error message */}
      {error && <ErrorMessage message={error} />}

      {/* Loading */}
      {loading && <p className="mt-4">Loading...</p>}

      {/* Result */}
      {/* {result && (
        <ScoreCard
          score={result.score}
          band={result.band}
          factors={result.factors}
          summary={result.summary}
        />
      )} */}
      {result && (
        <pre className="mt-4 text-left bg-gray-100 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default Home;
