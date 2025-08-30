import React, { useState } from "react";

export default function FloodPredict() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Select an image first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict/flood", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data.alert);
    } catch (err) {
      console.error(err);
      setResult("❌ Error in prediction");
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "400px", margin: "auto", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Flood Detection</h2>
      <input type="file" onChange={handleFileChange} style={{ margin: "1rem 0", width: "100%" }} />
      <button onClick={handleUpload} style={{ width: "100%", padding: "0.5rem", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px" }}>
        Predict Flood
      </button>
      <p style={{ marginTop: "1rem", textAlign: "center", fontWeight: "bold" }}>{result}</p>
    </div>
  );
}
