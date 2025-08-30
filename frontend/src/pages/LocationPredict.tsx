import React, { useState } from "react";

interface LocationPrediction {
  latitude: number;
  longitude: number;
  features: Record<string, number>;
  risk_score: number;
  alert: string;
  error?: string;
}

export default function LocationPredict() {
  const [lat, setLat] = useState<string>("");
  const [lon, setLon] = useState<string>("");
  const [result, setResult] = useState<LocationPrediction | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!lat || !lon) return alert("Enter latitude and longitude");

    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/predict/location?lat=${latNum}&lon=${lonNum}`
      );
      const data: LocationPrediction = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({
        error: "❌ Failed to fetch prediction",
      } as LocationPrediction);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "1rem",
        maxWidth: "500px",
        margin: "auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Location Risk Prediction</h2>
      <input
        type="number"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}
      />
      <input
        type="number"
        placeholder="Longitude"
        value={lon}
        onChange={(e) => setLon(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", margin: "0.5rem 0" }}
      />
      <button
        onClick={handlePredict}
        style={{
          width: "100%",
          padding: "0.5rem",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        {loading ? "Predicting..." : "Predict Risk"}
      </button>

      {result && (
        <div style={{ marginTop: "1rem" }}>
          {result.error ? (
            <p style={{ color: "red" }}>{result.error}</p>
          ) : (
            <div>
              <p
                style={{
                  color: result.alert.includes("High") ? "red" : "green",
                  fontWeight: "bold",
                }}
              >
                <b>Alert:</b> {result.alert}
              </p>
              <p>
                <b>Risk Score:</b> {result.risk_score?.toFixed(3)}
              </p>
              <h4>Features:</h4>
              <ul>
                {Object.entries(result.features || {}).map(([k, v]) => (
                  <li key={k}>
                    <b>{k}:</b> {v}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
