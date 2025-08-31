// import React, { useState } from "react";

// export default function FloodPredict() {
//   const [file, setFile] = useState<File | null>(null);
//   const [result, setResult] = useState<string>("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) return alert("Select an image first");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/predict/flood", {
//         method: "POST",
//         body: formData,
//       });
//       console.log("hello");
//       const data = await res.json();
//       // const data = await res.json();
//       if (data.alert) {
//         setResult("✅ Alert: " + data.alert);
//       } else if (data.error) {
//         setResult("❌ Error: " + data.error);
//       }
//     } catch (err) {
//       console.error(err);
//       setResult("❌ Error in prediction");
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "1rem",
//         maxWidth: "400px",
//         margin: "auto",
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//       }}
//     >
//       <h2 style={{ textAlign: "center" }}>Flood Detection</h2>
//       <input
//         type="file"
//         onChange={handleFileChange}
//         style={{ margin: "1rem 0", width: "100%" }}
//       />
//       <button
//         onClick={handleUpload}
//         style={{
//           width: "100%",
//           padding: "0.5rem",
//           backgroundColor: "#007bff",
//           color: "white",
//           border: "none",
//           borderRadius: "4px",
//         }}
//       >
//         Predict Flood
//       </button>
//       <p style={{ marginTop: "1rem", textAlign: "center", fontWeight: "bold" }}>
//         {result}
//       </p>
//     </div>
//   );
// }



import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, { useState } from "react";
import { Phone, MapPin, AlertTriangle, Users, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

export default function FloodPredict() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [showEmergencyInfo, setShowEmergencyInfo] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(""); // Clear previous result
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image first");
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await fetch("http://127.0.0.1:8000/predict/flood", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data.alert);
      
      // Show emergency info if flood risk detected
      if (data.alert && !data.alert.includes("❌")) {
        setShowEmergencyInfo(true);
      }
    } catch (err) {
      console.error(err);
      setResult("❌ Error in prediction");
    }
  };

  return (
    
    <div className="min-h-screen bg-background">
      <Header />
      
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        🌊 Flood Detection & Emergency Response
      </h2>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Main Upload Section */}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-100 file:text-blue-700
                       hover:file:bg-blue-200
                       mb-4"
          />
          
          {preview && (
            <div className="mb-4 text-center">
              <p className="mb-2 font-semibold">Selected Image:</p>
              <img
                src={preview}
                alt="preview"
                className="mx-auto max-h-64 rounded-lg shadow-md border"
              />
            </div>
          )}
          
          <button
            onClick={handleUpload}
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition duration-200 mb-4"
          >
            Predict Flood
          </button>
          
          {result && (
            <div className={`text-center p-3 rounded-lg ${
              result.includes("❌") 
                ? "bg-red-100 text-red-700" 
                : "bg-green-100 text-green-700"
            }`}>
              <p className="font-bold text-lg">{result}</p>
            </div>
          )}
        </div>

        {/* Emergency Information Toggle */}
        <div className="lg:border-l lg:pl-6">
          <button
            onClick={() => setShowEmergencyInfo(!showEmergencyInfo)}
            className="w-full flex items-center justify-between p-3 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 transition mb-4"
          >
            <span className="font-semibold flex items-center gap-2">
              <AlertTriangle size={20} />
              Emergency Information
            </span>
            {showEmergencyInfo ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {showEmergencyInfo && (
            <div className="space-y-4">
              {/* Quick Emergency Contacts */}
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <Phone size={18} />
                  Emergency Contacts
                </h3>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-red-700">Emergency Services:</span>
                    <span className="font-bold text-red-800">911</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-red-700">Flood Emergency Line:</span>
                    <span className="font-bold text-red-800">(555) FLOOD-911</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-red-700">Evacuation Hotline:</span>
                    <span className="font-bold text-red-800">(555) EVACUATE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-red-700">Local Emergency Mgmt:</span>
                    <span className="font-bold text-red-800">(555) RESPOND</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Emergency Information */}
      {showEmergencyInfo && (
        <div className="mt-6 space-y-6">
          {/* Evacuation Steps */}
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
              🚨 Evacuation Steps
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
              <div>
                <div className="font-semibold mb-2">Before Leaving:</div>
                <ul className="space-y-1">
                  <li>• Turn off utilities (gas, electricity, water)</li>
                  <li>• Grab emergency kit and documents</li>
                  <li>• Wear sturdy shoes and protective clothing</li>
                  <li>• Take medications and phone charger</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-2">During Evacuation:</div>
                <ul className="space-y-1">
                  <li>• Follow official evacuation routes only</li>
                  <li>• Stay together as a group</li>
                  <li>• Avoid walking/driving through water</li>
                  <li>• Check in at designated evacuation centers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Safety Measures */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
              🛡️ Safety Measures
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <div className="font-semibold mb-2">Water Safety:</div>
                <ul className="space-y-1">
                  <li>• 6 inches of water can knock you down</li>
                  <li>• 12 inches can carry away a vehicle</li>
                  <li>• Never walk in moving water</li>
                  <li>• Avoid downed power lines in water</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold mb-2">Indoor Safety:</div>
                <ul className="space-y-1">
                  <li>• Move to highest floor available</li>
                  <li>• Stay away from electrical outlets</li>
                  <li>• Use flashlight, not candles</li>
                  <li>• Signal for help from roof if needed</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Resources & Links */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
              📋 Emergency Resources
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <a href="#" className="flex items-center gap-2 text-green-700 hover:text-green-900 p-2 rounded hover:bg-green-100 transition">
                <MapPin size={16} />
                <span className="text-sm">Evacuation Route Maps</span>
                <ExternalLink size={14} />
              </a>
              <a href="#" className="flex items-center gap-2 text-green-700 hover:text-green-900 p-2 rounded hover:bg-green-100 transition">
                <Users size={16} />
                <span className="text-sm">Emergency Shelter Locations</span>
                <ExternalLink size={14} />
              </a>
              <a href="#" className="flex items-center gap-2 text-green-700 hover:text-green-900 p-2 rounded hover:bg-green-100 transition">
                <Phone size={16} />
                <span className="text-sm">Emergency Alert App</span>
                <ExternalLink size={14} />
              </a>
              <a href="#" className="flex items-center gap-2 text-green-700 hover:text-green-900 p-2 rounded hover:bg-green-100 transition">
                <AlertTriangle size={16} />
                <span className="text-sm">Emergency Kit Checklist</span>
                <ExternalLink size={14} />
              </a>
              <a href="#" className="flex items-center gap-2 text-green-700 hover:text-green-900 p-2 rounded hover:bg-green-100 transition">
                <MapPin size={16} />
                <span className="text-sm">Real-time Flood Monitoring</span>
                <ExternalLink size={14} />
              </a>
              <a href="#" className="flex items-center gap-2 text-green-700 hover:text-green-900 p-2 rounded hover:bg-green-100 transition">
                <Users size={16} />
                <span className="text-sm">Community Response Teams</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Response Team Information */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
              👥 Response Teams & Contacts
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="text-purple-700">
                  <div className="font-semibold">Local Fire Department</div>
                  <div>Emergency: 911</div>
                  <div>Non-Emergency: (555) FIRE-DEPT</div>
                </div>
                <div className="text-purple-700">
                  <div className="font-semibold">Emergency Management</div>
                  <div>Main Line: (555) EMERGENCY</div>
                  <div>Alerts: (555) ALERT-NOW</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-purple-700">
                  <div className="font-semibold">Red Cross Chapter</div>
                  <div>Disaster Relief: (555) RED-CROSS</div>
                  <div>Shelter Info: (555) SHELTER</div>
                </div>
                <div className="text-purple-700">
                  <div className="font-semibold">National Weather Service</div>
                  <div>Weather Info: (555) WEATHER</div>
                  <div>Flood Warnings: (555) FLOOD-WARN</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Reference Card */}
          <div className="bg-gray-100 p-4 rounded-lg border-2 border-gray-300">
            <h3 className="font-bold text-gray-800 mb-3 text-center">
              📱 Quick Reference - Save This Info
            </h3>
            <div className="bg-white p-3 rounded border text-sm text-center">
              <div className="font-bold text-red-600 mb-1">EMERGENCY: 911</div>
              <div className="text-gray-700">Flood Emergency: (555) FLOOD-911</div>
              <div className="text-gray-700">Evacuation Info: (555) EVACUATE</div>
              <div className="text-xs text-gray-500 mt-2">
                Screenshot or save this information to your phone
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}