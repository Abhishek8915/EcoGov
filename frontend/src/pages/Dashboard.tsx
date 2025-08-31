// import React, { useState, useRef, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { 
//   AlertTriangle, 
//   Map, 
//   Activity, 
//   Users, 
//   Eye,
//   TrendingUp,
//   MapPin,
//   Clock,
//   X,
//   ZoomIn,
//   ZoomOut,
//   Maximize2
// } from "lucide-react";

// const Dashboard = () => {
//   const [selectedAlert, setSelectedAlert] = useState<any>(null);
//   const [showFullMap, setShowFullMap] = useState<boolean>(false);
//   const [mapZoom, setMapZoom] = useState<number>(1);
//   const [mapPosition, setMapPosition] = useState<{x: number, y: number}>({x: 0, y: 0});
//   const [isDragging, setIsDragging] = useState<boolean>(false);
//   const [dragStart, setDragStart] = useState<{x: number, y: number}>({x: 0, y: 0});
//   const [actionMessage, setActionMessage] = useState<string>("");
//   const mapRef = useRef<HTMLDivElement>(null);

//   const alerts = [
//     {
//       id: 1,
//       type: "High Tide Warning",
//       location: "North Beach District",
//       severity: "high",
//       time: "2 min ago",
//       status: "Active",
//       coordinates: { x: 25, y: 30 }
//     },
//     {
//       id: 2,
//       type: "Coastal Erosion",
//       location: "Pier Area",
//       severity: "medium",
//       time: "15 min ago",
//       status: "Monitoring",
//       coordinates: { x: 60, y: 45 }
//     },
//     {
//       id: 3,
//       type: "Storm Watch",
//       location: "Downtown Waterfront",
//       severity: "low",
//       time: "1 hour ago",
//       status: "Advisory",
//       coordinates: { x: 40, y: 70 }
//     }
//   ];

//   const monitoringStations = [
//     { id: 1, name: "Station Alpha", coordinates: { x: 20, y: 25 }, status: "online" },
//     { id: 2, name: "Station Beta", coordinates: { x: 55, y: 40 }, status: "online" },
//     { id: 3, name: "Station Gamma", coordinates: { x: 75, y: 60 }, status: "maintenance" },
//     { id: 4, name: "Station Delta", coordinates: { x: 35, y: 75 }, status: "online" }
//   ];

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case 'high': return 'destructive';
//       case 'medium': return 'warning';
//       case 'low': return 'secondary';
//       default: return 'secondary';
//     }
//   };

//   const handleMapMouseDown = (e: React.MouseEvent) => {
//     setIsDragging(true);
//     setDragStart({
//       x: e.clientX - mapPosition.x,
//       y: e.clientY - mapPosition.y
//     });
//   };

//   const handleMapMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging) return;
//     setMapPosition({
//       x: e.clientX - dragStart.x,
//       y: e.clientY - dragStart.y
//     });
//   };

//   const handleMapMouseUp = () => {
//     setIsDragging(false);
//   };

//   const zoomIn = () => {
//     setMapZoom(prev => Math.min(prev + 0.3, 3));
//   };
  
//   const zoomOut = () => {
//     setMapZoom(prev => Math.max(prev - 0.3, 0.5));
//   };
  
//   const resetMap = () => {
//     setMapZoom(1);
//     setMapPosition({x: 0, y: 0});
//   };

//   const handleSendAlert = () => {
//     setActionMessage("🚨 Alert sent successfully to all community members!");
//     setTimeout(() => setActionMessage(""), 3000);
//   };

//   const handleCommunityHub = () => {
//     setActionMessage("👥 You have entered the Community Hub!");
//     setTimeout(() => setActionMessage(""), 3000);
//   };

//   const handleUpdateMap = () => {
//     setActionMessage("🗺️ Map data updated successfully!");
//     setTimeout(() => setActionMessage(""), 3000);
//   };

//   const handleSystemHealth = () => {
//     setActionMessage("⚡ System health check completed - All systems operational!");
//     setTimeout(() => setActionMessage(""), 3000);
//   };

//   const InteractiveMap = ({ isFullScreen = false }) => (
//     <div 
//       className={`relative bg-gradient-to-br from-blue-100 via-blue-50 to-green-50 rounded-lg overflow-hidden ${
//         isFullScreen ? 'h-full' : 'h-96'
//       }`}
//       ref={mapRef}
//       onMouseDown={handleMapMouseDown}
//       onMouseMove={handleMapMouseMove}
//       onMouseUp={handleMapMouseUp}
//       onMouseLeave={handleMapMouseUp}
//       style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
//     >
//       {/* Map Content */}
//       <div 
//         className="absolute inset-0 transition-transform duration-200"
//         style={{
//           transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapZoom})`
//         }}
//       >
//         {/* Coastal Line */}
//         <svg className="absolute inset-0 w-full h-full">
//           <path
//             d="M 50 20 Q 200 50 350 80 Q 400 120 380 200 Q 350 280 300 320 Q 200 350 100 330 Q 50 300 40 250 Q 30 180 50 120 Q 70 80 50 20"
//             stroke="#2563eb"
//             strokeWidth="3"
//             fill="none"
//             className="drop-shadow-md"
//           />
//           {/* Water areas */}
//           <path
//             d="M 0 0 L 50 20 Q 200 50 350 80 Q 400 120 380 200 Q 350 280 300 320 Q 200 350 100 330 Q 50 300 40 250 Q 30 180 50 120 Q 70 80 50 20 L 0 0"
//             fill="rgba(59, 130, 246, 0.2)"
//           />
//         </svg>

//         {/* Threat Markers */}
//         {alerts.map((alert) => (
//           <div
//             key={alert.id}
//             className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group`}
//             style={{
//               left: `${alert.coordinates.x}%`,
//               top: `${alert.coordinates.y}%`
//             }}
//             onClick={() => setSelectedAlert(alert)}
//           >
//             <div className={`w-4 h-4 rounded-full animate-pulse ${
//               alert.severity === 'high' ? 'bg-red-500' :
//               alert.severity === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
//             }`} />
//             <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//               {alert.type} - {alert.location}
//             </div>
//           </div>
//         ))}

//         {/* Monitoring Stations */}
//         {monitoringStations.map((station) => (
//           <div
//             key={station.id}
//             className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
//             style={{
//               left: `${station.coordinates.x}%`,
//               top: `${station.coordinates.y}%`
//             }}
//           >
//             <div className={`w-3 h-3 rounded-full border-2 ${
//               station.status === 'online' ? 'bg-green-400 border-green-600' : 
//               'bg-gray-400 border-gray-600'
//             }`} />
//             <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//               {station.name} - {station.status}
//             </div>
//           </div>
//         ))}

//         {/* Cities/Landmarks */}
//         <div className="absolute" style={{ left: '30%', top: '40%' }}>
//           <div className="w-2 h-2 bg-gray-700 rounded-sm" />
//           <span className="absolute left-3 top-0 text-xs font-medium text-gray-700 whitespace-nowrap">
//             Downtown
//           </span>
//         </div>
//         <div className="absolute" style={{ left: '65%', top: '55%' }}>
//           <div className="w-2 h-2 bg-gray-700 rounded-sm" />
//           <span className="absolute left-3 top-0 text-xs font-medium text-gray-700 whitespace-nowrap">
//             Harbor District
//           </span>
//         </div>
//       </div>

//       {/* Map Controls */}
//       <div className="absolute top-4 right-4 flex flex-col gap-2">
//         <Button
//           variant="secondary"
//           size="sm"
//           onClick={zoomIn}
//           className="w-8 h-8 p-0"
//         >
//           <ZoomIn className="h-4 w-4" />
//         </Button>
//         <Button
//           variant="secondary"
//           size="sm"
//           onClick={zoomOut}
//           className="w-8 h-8 p-0"
//         >
//           <ZoomOut className="h-4 w-4" />
//         </Button>
//         <Button
//           variant="secondary"
//           size="sm"
//           onClick={resetMap}
//           className="w-8 h-8 p-0 text-xs"
//         >
//           R
//         </Button>
//       </div>

//       {/* Map Legend */}
//       <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg text-xs">
//         <div className="font-semibold mb-2">Legend</div>
//         <div className="space-y-1">
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-red-500 rounded-full" />
//             <span>High Risk</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-orange-500 rounded-full" />
//             <span>Medium Risk</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-yellow-500 rounded-full" />
//             <span>Low Risk</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-green-400 border-2 border-green-600 rounded-full" />
//             <span>Monitor Station</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-background">
//       <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Page Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold mb-2">Coastal Monitoring Dashboard</h1>
//           <p className="text-muted-foreground">Real-time threat monitoring and alert management</p>
//         </div>

//         {/* Stats Overview */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <Card className="shadow-lg hover:shadow-xl transition-all">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
//               <AlertTriangle className="h-4 w-4 text-red-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-red-500">3</div>
//               <p className="text-xs text-gray-500">+1 from yesterday</p>
//             </CardContent>
//           </Card>

//           <Card className="shadow-lg hover:shadow-xl transition-all">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Protected Areas</CardTitle>
//               <Map className="h-4 w-4 text-blue-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-blue-600">12</div>
//               <p className="text-xs text-gray-500">Zones monitored</p>
//             </CardContent>
//           </Card>

//           <Card className="shadow-lg hover:shadow-xl transition-all">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">System Status</CardTitle>
//               <Activity className="h-4 w-4 text-green-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-green-500">Online</div>
//               <p className="text-xs text-gray-500">99.9% uptime</p>
//             </CardContent>
//           </Card>

//           <Card className="shadow-lg hover:shadow-xl transition-all">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Community Reports</CardTitle>
//               <Users className="h-4 w-4 text-purple-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">47</div>
//               <p className="text-xs text-gray-500">This week</p>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Interactive Map */}
//           <Card className="lg:col-span-2 shadow-xl">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <CardTitle className="flex items-center gap-2">
//                     <Map className="h-5 w-5" />
//                     Coastal Threat Map
//                   </CardTitle>
//                   <CardDescription>
//                     Interactive map showing current threats and monitoring stations
//                   </CardDescription>
//                 </div>
//                 <Button 
//                   variant="outline" 
//                   size="sm"
//                   onClick={() => setShowFullMap(true)}
//                   className="flex items-center gap-2"
//                 >
//                   <Eye className="h-4 w-4" />
//                   View Full Map
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <InteractiveMap />
//             </CardContent>
//           </Card>

//           {/* Active Alerts */}
//           <Card className="shadow-lg">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <AlertTriangle className="h-5 w-5" />
//                 Active Alerts
//               </CardTitle>
//               <CardDescription>Recent threat notifications</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {alerts.map((alert) => (
//                 <div key={alert.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-all">
//                   <div className="flex items-start justify-between mb-2">
//                     <Badge variant={getSeverityColor(alert.severity) as any}>
//                       {alert.severity.toUpperCase()}
//                     </Badge>
//                     <span className="text-xs text-gray-500 flex items-center">
//                       <Clock className="h-3 w-3 mr-1" />
//                       {alert.time}
//                     </span>
//                   </div>
//                   <h4 className="font-semibold mb-1">{alert.type}</h4>
//                   <p className="text-sm text-gray-600 flex items-center">
//                     <MapPin className="h-3 w-3 mr-1" />
//                     {alert.location}
//                   </p>
//                   <div className="mt-2 flex justify-between items-center">
//                     <span className="text-xs bg-gray-100 px-2 py-1 rounded">
//                       {alert.status}
//                     </span>
//                     <Button 
//                       variant="ghost" 
//                       size="sm"
//                       onClick={() => setSelectedAlert(alert)}
//                     >
//                       View Details
//                     </Button>
//                   </div>
//                 </div>
//               ))}
              
//               <Button variant="default" className="w-full">
//                 <TrendingUp className="h-4 w-4 mr-2" />
//                 View All Alerts
//               </Button>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Quick Actions */}
//         <Card className="mt-8 shadow-lg">
//           <CardHeader>
//             <CardTitle>Quick Actions</CardTitle>
//             <CardDescription>Emergency response and system management</CardDescription>
//           </CardHeader>
//           <CardContent>
//             {/* Action Message Display */}
//             {actionMessage && (
//               <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded-lg text-blue-800 text-center font-medium">
//                 {actionMessage}
//               </div>
//             )}
            
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <Button 
//                 variant="destructive" 
//                 className="h-auto p-4 flex-col hover:bg-red-600 transition-all"
//                 onClick={handleSendAlert}
//               >
//                 <AlertTriangle className="h-6 w-6 mb-2" />
//                 <span>Send Alert</span>
//               </Button>
//               <Button 
//                 variant="default" 
//                 className="h-auto p-4 flex-col hover:bg-blue-600 transition-all"
//                 onClick={handleUpdateMap}
//               >
//                 <Map className="h-6 w-6 mb-2" />
//                 <span>Update Map</span>
//               </Button>
//               <Button 
//                 variant="outline" 
//                 className="h-auto p-4 flex-col hover:bg-purple-50 hover:border-purple-300 transition-all"
//                 onClick={handleCommunityHub}
//               >
//                 <Users className="h-6 w-6 mb-2" />
//                 <span>Community Hub</span>
//               </Button>
//               <Button 
//                 variant="secondary" 
//                 className="h-auto p-4 flex-col hover:bg-green-100 transition-all"
//                 onClick={handleSystemHealth}
//               >
//                 <Activity className="h-6 w-6 mb-2" />
//                 <span>System Health</span>
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </main>

//       {/* Full Screen Map Modal */}
//       {showFullMap && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-2xl w-[95vw] h-[90vh] relative">
//             <div className="flex items-center justify-between p-4 border-b">
//               <h3 className="text-xl font-bold flex items-center gap-2">
//                 <Map className="h-6 w-6" />
//                 Full Coastal Threat Map
//               </h3>
//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setShowFullMap(false)}
//                   className="flex items-center gap-2"
//                 >
//                   <Maximize2 className="h-4 w-4" />
//                   Exit Full Screen
//                 </Button>
//                 <button 
//                   onClick={() => setShowFullMap(false)} 
//                   className="text-gray-500 hover:text-gray-700 p-1"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//             <div className="p-4 h-full">
//               <InteractiveMap isFullScreen={true} />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal for Alert Details */}
//       {selectedAlert && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
//             <button 
//               onClick={() => setSelectedAlert(null)} 
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//             >
//               <X className="h-5 w-5" />
//             </button>
//             <div className="flex items-center gap-2 mb-3">
//               <Badge variant={getSeverityColor(selectedAlert.severity) as any}>
//                 {selectedAlert.severity.toUpperCase()}
//               </Badge>
//               <span className="text-sm text-gray-500">{selectedAlert.time}</span>
//             </div>
//             <h3 className="text-lg font-bold mb-3">{selectedAlert.type}</h3>
//             <p className="text-gray-700 mb-2">
//               <strong>Location:</strong> {selectedAlert.location}
//             </p>
//             <p className="text-gray-700 mb-2">
//               <strong>Status:</strong> {selectedAlert.status}
//             </p>
//             <p className="text-gray-700 mb-4">
//               ⚠️ This threat requires immediate attention. Follow evacuation procedures 
//               and contact emergency services if in affected area.
//             </p>
//             <div className="flex gap-2">
//               <Button onClick={() => setSelectedAlert(null)}>Close</Button>
//               <Button variant="destructive" size="sm">
//                 Contact Emergency
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Map, 
  Activity, 
  Users, 
  Eye,
  TrendingUp,
  MapPin,
  Clock,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2
} from "lucide-react";

const Dashboard = () => {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [showFullMap, setShowFullMap] = useState<boolean>(false);
  const [mapZoom, setMapZoom] = useState<number>(1);
  const [mapPosition, setMapPosition] = useState<{x: number, y: number}>({x: 0, y: 0});
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{x: number, y: number}>({x: 0, y: 0});
  const [actionMessage, setActionMessage] = useState<string>("");
  const mapRef = useRef<HTMLDivElement>(null);

  const alerts = [
    {
      id: 1,
      type: "High Tide Warning",
      location: "North Beach District",
      severity: "high",
      time: "2 min ago",
      status: "Active",
      coordinates: { x: 25, y: 30 }
    },
    {
      id: 2,
      type: "Coastal Erosion",
      location: "Pier Area",
      severity: "medium",
      time: "15 min ago",
      status: "Monitoring",
      coordinates: { x: 60, y: 45 }
    },
    {
      id: 3,
      type: "Storm Watch",
      location: "Downtown Waterfront",
      severity: "low",
      time: "1 hour ago",
      status: "Advisory",
      coordinates: { x: 40, y: 70 }
    }
  ];

  const monitoringStations = [
    { id: 1, name: "Station Alpha", coordinates: { x: 20, y: 25 }, status: "online" },
    { id: 2, name: "Station Beta", coordinates: { x: 55, y: 40 }, status: "online" },
    { id: 3, name: "Station Gamma", coordinates: { x: 75, y: 60 }, status: "maintenance" },
    { id: 4, name: "Station Delta", coordinates: { x: 35, y: 75 }, status: "online" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const handleMapMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - mapPosition.x,
      y: e.clientY - mapPosition.y
    });
  };

  const handleMapMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setMapPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMapMouseUp = () => {
    setIsDragging(false);
  };

  const zoomIn = () => {
    setMapZoom(prev => Math.min(prev + 0.3, 3));
  };
  
  const zoomOut = () => {
    setMapZoom(prev => Math.max(prev - 0.3, 0.5));
  };
  
  const resetMap = () => {
    setMapZoom(1);
    setMapPosition({x: 0, y: 0});
  };

  const handleSendAlert = () => {
    setActionMessage("🚨 Alert sent successfully to all community members!");
    setTimeout(() => setActionMessage(""), 3000);
  };

  const handleCommunityHub = () => {
    setActionMessage("👥 You have entered the Community Hub!");
    setTimeout(() => setActionMessage(""), 3000);
  };

  const handleUpdateMap = () => {
    setActionMessage("🗺️ Map data updated successfully!");
    setTimeout(() => setActionMessage(""), 3000);
  };

  const handleSystemHealth = () => {
    setActionMessage("⚡ System health check completed - All systems operational!");
    setTimeout(() => setActionMessage(""), 3000);
  };

  const InteractiveMap = ({ isFullScreen = false }) => (
    <div 
      className={`relative bg-gradient-to-br from-blue-100 via-blue-50 to-green-50 rounded-lg overflow-hidden ${
        isFullScreen ? 'h-full' : 'h-96'
      }`}
      ref={mapRef}
      onMouseDown={handleMapMouseDown}
      onMouseMove={handleMapMouseMove}
      onMouseUp={handleMapMouseUp}
      onMouseLeave={handleMapMouseUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Map Content */}
      <div 
        className="absolute inset-0 transition-transform duration-200"
        style={{
          transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${mapZoom})`
        }}
      >
        {/* Coastal Line */}
        <svg className="absolute inset-0 w-full h-full">
          <path
            d="M 50 20 Q 200 50 350 80 Q 400 120 380 200 Q 350 280 300 320 Q 200 350 100 330 Q 50 300 40 250 Q 30 180 50 120 Q 70 80 50 20"
            stroke="#2563eb"
            strokeWidth="3"
            fill="none"
            className="drop-shadow-md"
          />
          {/* Water areas */}
          <path
            d="M 0 0 L 50 20 Q 200 50 350 80 Q 400 120 380 200 Q 350 280 300 320 Q 200 350 100 330 Q 50 300 40 250 Q 30 180 50 120 Q 70 80 50 20 L 0 0"
            fill="rgba(59, 130, 246, 0.2)"
          />
        </svg>

        {/* Threat Markers */}
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group`}
            style={{
              left: `${alert.coordinates.x}%`,
              top: `${alert.coordinates.y}%`
            }}
            onClick={() => setSelectedAlert(alert)}
          >
            <div className={`w-4 h-4 rounded-full animate-pulse ${
              alert.severity === 'high' ? 'bg-red-500' :
              alert.severity === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
            }`} />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {alert.type} - {alert.location}
            </div>
          </div>
        ))}

        {/* Monitoring Stations */}
        {monitoringStations.map((station) => (
          <div
            key={station.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${station.coordinates.x}%`,
              top: `${station.coordinates.y}%`
            }}
          >
            <div className={`w-3 h-3 rounded-full border-2 ${
              station.status === 'online' ? 'bg-green-400 border-green-600' : 
              'bg-gray-400 border-gray-600'
            }`} />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {station.name} - {station.status}
            </div>
          </div>
        ))}

        {/* Cities/Landmarks */}
        <div className="absolute" style={{ left: '30%', top: '40%' }}>
          <div className="w-2 h-2 bg-gray-700 rounded-sm" />
          <span className="absolute left-3 top-0 text-xs font-medium text-gray-700 whitespace-nowrap">
            Downtown
          </span>
        </div>
        <div className="absolute" style={{ left: '65%', top: '55%' }}>
          <div className="w-2 h-2 bg-gray-700 rounded-sm" />
          <span className="absolute left-3 top-0 text-xs font-medium text-gray-700 whitespace-nowrap">
            Harbor District
          </span>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={zoomIn}
          className="w-8 h-8 p-0"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={zoomOut}
          className="w-8 h-8 p-0"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={resetMap}
          className="w-8 h-8 p-0 text-xs"
        >
          R
        </Button>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg text-xs">
        <div className="font-semibold mb-2">Legend</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span>High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full" />
            <span>Medium Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span>Low Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 border-2 border-green-600 rounded-full" />
            <span>Monitor Station</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Coastal Monitoring Dashboard</h1>
          <p className="text-muted-foreground">Real-time threat monitoring and alert management</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">3</div>
              <p className="text-xs text-gray-500">+1 from yesterday</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Protected Areas</CardTitle>
              <Map className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">12</div>
              <p className="text-xs text-gray-500">Zones monitored</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">Online</div>
              <p className="text-xs text-gray-500">99.9% uptime</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Reports</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-gray-500">This week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Map */}
          <Card className="lg:col-span-2 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5" />
                    Coastal Threat Map
                  </CardTitle>
                  <CardDescription>
                    Interactive map showing current threats and monitoring stations
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowFullMap(true)}
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  View Full Map
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <InteractiveMap />
            </CardContent>
          </Card>

          {/* Active Alerts */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Active Alerts
              </CardTitle>
              <CardDescription>Recent threat notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={getSeverityColor(alert.severity) as any}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {alert.time}
                    </span>
                  </div>
                  <h4 className="font-semibold mb-1">{alert.type}</h4>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {alert.location}
                  </p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {alert.status}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedAlert(alert)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="default" className="w-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                View All Alerts
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Emergency response and system management</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Action Message Display */}
            {actionMessage && (
              <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded-lg text-blue-800 text-center font-medium">
                {actionMessage}
              </div>
            )}
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="destructive" 
                className="h-auto p-4 flex-col hover:bg-red-600 transition-all"
                onClick={handleSendAlert}
              >
                <AlertTriangle className="h-6 w-6 mb-2" />
                <span>Send Alert</span>
              </Button>
              <Button 
                variant="default" 
                className="h-auto p-4 flex-col hover:bg-blue-600 transition-all"
                onClick={handleUpdateMap}
              >
                <Map className="h-6 w-6 mb-2" />
                <span>Update Map</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex-col hover:bg-purple-50 hover:border-purple-300 transition-all"
                onClick={handleCommunityHub}
              >
                <Users className="h-6 w-6 mb-2" />
                <span>Community Hub</span>
              </Button>
              <Button 
                variant="secondary" 
                className="h-auto p-4 flex-col hover:bg-green-100 transition-all"
                onClick={handleSystemHealth}
              >
                <Activity className="h-6 w-6 mb-2" />
                <span>System Health</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Full Screen Map Modal */}
      {showFullMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-[95vw] h-[90vh] relative">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Map className="h-6 w-6" />
                Full Coastal Threat Map
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFullMap(false)}
                  className="flex items-center gap-2"
                >
                  <Maximize2 className="h-4 w-4" />
                  Exit Full Screen
                </Button>
                <button 
                  onClick={() => setShowFullMap(false)} 
                  className="text-gray-500 hover:text-gray-700 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-4 h-full">
              <InteractiveMap isFullScreen={true} />
            </div>
          </div>
        </div>
      )}

      {/* Modal for Alert Details */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <button 
              onClick={() => setSelectedAlert(null)} 
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant={getSeverityColor(selectedAlert.severity) as any}>
                {selectedAlert.severity.toUpperCase()}
              </Badge>
              <span className="text-sm text-gray-500">{selectedAlert.time}</span>
            </div>
            <h3 className="text-lg font-bold mb-3">{selectedAlert.type}</h3>
            <p className="text-gray-700 mb-2">
              <strong>Location:</strong> {selectedAlert.location}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Status:</strong> {selectedAlert.status}
            </p>
            <p className="text-gray-700 mb-4">
              ⚠️ This threat requires immediate attention. Follow evacuation procedures 
              and contact emergency services if in affected area.
            </p>
            <div className="flex gap-2">
              <Button onClick={() => setSelectedAlert(null)}>Close</Button>
              <Button variant="destructive" size="sm">
                Contact Emergency
              </Button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Dashboard;