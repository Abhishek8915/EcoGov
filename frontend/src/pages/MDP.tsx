import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Footer from "@/components/Footer";
import axios from "axios";
import Header from "@/components/Header";

type LatLng = { lat: number; lng: number };

interface PredictionResponse {
  category: number;
  features: number[];
  probabilities?: number[];
}

const CATEGORY_COLORS = [
  "#16a34a",
  "#86efac",
  "#fef08a",
  "#f59e0b",
  "#fb923c",
  "#f43f5e",
  "#ef4444",
];

function MapClickHandler({ onMapClick }: { onMapClick: (p: LatLng) => void }) {
  useMapEvents({
    click(e: any) {
      const lat = Number(e?.latlng?.lat);
      const lng = Number(e?.latlng?.lng);
      if (Number.isFinite(lat) && Number.isFinite(lng)) {
        onMapClick({ lat, lng });
      }
    },
  });
  return null;
}

export default function MapPredict() {
  const defaultCenter: LatLng = { lat: 13.0827, lng: 80.2707 };
  const [clickPos, setClickPos] = useState<LatLng | null>(null);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);
  const themeColor = "#2563eb";

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const runPredict = async (pos: LatLng) => {
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const res = await axios.post<PredictionResponse>("/api/predict", { lat: pos.lat, lng: pos.lng }, { timeout: 8000 });
      const data = res?.data;
      const cat = Number.isFinite(data?.category) ? Math.trunc(data.category) : 1;
      const category = Math.min(7, Math.max(1, cat));
      const features = Array.isArray(data?.features) ? data.features.slice(0, 7).map((v) => {
        const n = Number(v) || 0;
        return Math.max(0, Math.min(1, n));
      }) : Array.from({ length: 7 }, () => 0);
      const probabilities = Array.isArray(data?.probabilities) ? data.probabilities.slice(0, 7).map((v) => { const n = Number(v) || 0; return Math.max(0, Math.min(1, n)); }) : undefined;
      if (mounted.current) {
        setPrediction({ category, features, probabilities });
      }
    } catch (err) {
      if (mounted.current) {
        const mockCategory = Math.ceil(Math.random() * 7);
        const mockFeatures = Array.from({ length: 7 }, () => Math.round(Math.random() * 100) / 100);
        setPrediction({ category: mockCategory, features: mockFeatures, probabilities: Array.from({ length: 7 }, () => Math.random()) });
        setError("Backend unreachable — showing mock result");
      }
    } finally {
      if (mounted.current) setLoading(false);
    }
  };

  const handleMapClick = (p: LatLng) => {
    setClickPos(p);
    runPredict(p);
  };

  const currentColor = prediction ? CATEGORY_COLORS[Math.max(0, Math.min(6, prediction.category - 1))] : "#0ea5e9";

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <div className="flex-1 rounded-md overflow-hidden shadow h-[60vh] lg:h-[80vh]">
          <MapContainer center={[defaultCenter.lat, defaultCenter.lng]} zoom={8} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
            <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapClickHandler onMapClick={handleMapClick} />
            {clickPos && (
              <CircleMarker center={[clickPos.lat, clickPos.lng]} radius={10} pathOptions={{ color: currentColor, fillColor: currentColor, fillOpacity: 0.8 }}>
                <Popup>
                  <div className="text-sm">
                    <div>
                      <strong>Lat:</strong> {clickPos.lat.toFixed(6)}
                    </div>
                    <div>
                      <strong>Lng:</strong> {clickPos.lng.toFixed(6)}
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            )}
          </MapContainer>
        </div>

        <aside className="w-full lg:w-96 bg-white dark:bg-slate-900 rounded-md shadow p-4 flex flex-col gap-4">
          <h2 className="text-lg font-semibold" style={{ color: themeColor }}>
            Prediction details
          </h2>

          <div>
            <div className="text-sm text-slate-500">Clicked coordinates</div>
            <div className="font-mono">{clickPos ? `${clickPos.lat.toFixed(6)}, ${clickPos.lng.toFixed(6)}` : "Click on the map"}</div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-500">Risk Category</div>
              <div className="text-sm">{loading ? "Predicting..." : prediction ? `#${prediction.category}` : "-"}</div>
            </div>

            <div className="mt-2 h-12 flex items-center">
              <div className="w-4 h-4 rounded mr-2" style={{ background: currentColor }} />
              <div className="text-sm">
                {prediction ? (["Very Low", "Low", "Moderate", "Elevated", "High", "Very High", "Critical"][Math.max(0, Math.min(6, prediction.category - 1))] ?? "Unknown") : "—"}
              </div>
            </div>

            {error && <div className="text-xs text-amber-600 mt-2">{error}</div>}
          </div>

          <div className="flex-1 overflow-auto">
            <h3 className="text-sm font-medium">Model features (7)</h3>
            <div className="mt-2 space-y-3">
              {prediction ? (
                prediction.features.map((v, i) => {
                  const pct = Math.max(0, Math.min(1, Number(v))) * 100;
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-xs">
                        <div>Feature {i + 1}</div>
                        <div>{(pct).toFixed(1)}%</div>
                      </div>
                      <div className="w-full bg-slate-100 rounded h-2">
                        <div className="h-2 rounded" style={{ width: `${Math.max(4, pct)}%`, background: themeColor }} />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-sm text-slate-500">No prediction yet — click on the map to run model</div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 py-2 rounded border" onClick={() => clickPos && runPredict(clickPos)} disabled={!clickPos || loading} style={{ borderColor: themeColor, color: themeColor }}>
              {loading ? "Running..." : "Re-run"}
            </button>

            <button
              className="py-2 px-3 rounded bg-slate-100"
              onClick={() => {
                setClickPos(null);
                setPrediction(null);
                setError(null);
              }}
            >
              Clear
            </button>
          </div>

          <div className="text-xs text-slate-400">
            Tip: map click sends lat/lng to your backend at <code>/api/predict</code>. Response shape: <code>{`{category:number, features:number[7]}`}</code>
          </div>
        </aside>
      </div>
    </>
  );
}
