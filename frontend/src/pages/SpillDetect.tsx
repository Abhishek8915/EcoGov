import React, { useState } from "react";

type SpillResponse = {
  alert?: string;
  coverage_pct?: number;
  mask_base64?: string | null;
  overlay_base64?: string | null;
  error?: string;
};

export default function SpillDetect() {
  const [file, setFile] = useState<File | null>(null);
  const [res, setRes] = useState<SpillResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const onSubmit = async () => {
    if (!file) return alert("Select an image");
    setLoading(true);
    setRes(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("mode", "heuristic"); // keep same when you add cnn

      const r = await fetch("http://127.0.0.1:8000/detect/spill", {
        method: "POST",
        body: form,
      });
      const data: SpillResponse = await r.json();
      setRes(data);
    } catch (err) {
      console.error(err);
      setRes({ error: "Request failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 16 }}>
      <h2>Spill Detection</h2>
      <input type="file" accept="image/*" onChange={onChange} style={{ display: "block", margin: "12px 0" }} />
      <button
        onClick={onSubmit}
        style={{ padding: "8px 12px", background: "#0d6efd", color: "#fff", border: "none", borderRadius: 6 }}
      >
        {loading ? "Analyzing..." : "Analyze Image"}
      </button>

      {res && (
        <div style={{ marginTop: 16 }}>
          {res.error ? (
            <p style={{ color: "red" }}>{res.error}</p>
          ) : (
            <>
              <p style={{ fontWeight: 700, color: res.alert?.includes("Possible") ? "red" : "green" }}>
                {res.alert} {typeof res.coverage_pct === "number" ? `| Coverage: ${res.coverage_pct}%` : ""}
              </p>
              {res.overlay_base64 && (
                <div>
                  <h4>Detected Regions (overlay):</h4>
                  <img
                    src={`data:image/png;base64,${res.overlay_base64}`}
                    alt="overlay"
                    style={{ width: "100%", borderRadius: 8, border: "1px solid #ddd" }}
                  />
                </div>
              )}
              {res.mask_base64 && (
                <div style={{ marginTop: 12 }}>
                  <h4>Binary Mask:</h4>
                  <img
                    src={`data:image/png;base64,${res.mask_base64}`}
                    alt="mask"
                    style={{ width: "100%", borderRadius: 8, border: "1px solid #ddd" }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
