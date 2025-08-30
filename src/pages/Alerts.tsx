// import Header from "@/components/Header";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { 
//   AlertTriangle, 
//   Search, 
//   Filter, 
//   MapPin, 
//   Clock, 
//   Eye,
//   Bell,
//   Waves,
//   CloudRain,
//   Wind
// } from "lucide-react";

// const Alerts = () => {
//   const alerts = [
//     {
//       id: 1,
//       title: "High Tide Flood Warning",
//       description: "Coastal flooding expected in low-lying areas during high tide cycle",
//       location: "North Beach District",
//       severity: "high",
//       time: "2 minutes ago",
//       status: "Active",
//       type: "flooding",
//       icon: Waves,
//       confidence: 94
//     },
//     {
//       id: 2,
//       title: "Coastal Erosion Alert",
//       description: "Accelerated erosion detected along the shoreline near pier structures",
//       location: "Pier Area - Section B",
//       severity: "medium",
//       time: "15 minutes ago",
//       status: "Monitoring",
//       type: "erosion",
//       icon: AlertTriangle,
//       confidence: 87
//     },
//     {
//       id: 3,
//       title: "Storm Watch Advisory",
//       description: "Potential storm system approaching, monitor for updates",
//       location: "Downtown Waterfront",
//       severity: "low",
//       time: "1 hour ago",
//       status: "Advisory",
//       type: "weather",
//       icon: CloudRain,
//       confidence: 72
//     },
//     {
//       id: 4,
//       title: "Wind Speed Warning",
//       description: "Sustained winds exceeding safe levels for coastal activities",
//       location: "Marina District",
//       severity: "medium",
//       time: "3 hours ago",
//       status: "Active",
//       type: "weather",
//       icon: Wind,
//       confidence: 91
//     }
//   ];

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case 'high': return 'destructive';
//       case 'medium': return 'warning';
//       case 'low': return 'secondary';
//       default: return 'secondary';
//     }
//   };

//   const getSeverityBg = (severity: string) => {
//     switch (severity) {
//       case 'high': return 'bg-destructive/10 border-destructive/20';
//       case 'medium': return 'bg-warning/10 border-warning/20';
//       case 'low': return 'bg-secondary/10 border-secondary/20';
//       default: return 'bg-secondary/10 border-secondary/20';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Page Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
//             <Bell className="h-8 w-8 text-primary" />
//             Active Alerts & Warnings
//           </h1>
//           <p className="text-muted-foreground">
//             Real-time coastal threat notifications and emergency advisories
//           </p>
//         </div>

//         {/* Alert Summary */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <Card className="shadow-alert">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-sm font-medium text-destructive">High Priority</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-destructive mb-1">1</div>
//               <p className="text-xs text-muted-foreground">Requires immediate action</p>
//             </CardContent>
//           </Card>

//           <Card className="shadow-wave">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-sm font-medium text-warning">Medium Priority</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-warning mb-1">2</div>
//               <p className="text-xs text-muted-foreground">Monitor closely</p>
//             </CardContent>
//           </Card>

//           <Card className="shadow-wave">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-sm font-medium">Low Priority</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold mb-1">1</div>
//               <p className="text-xs text-muted-foreground">Advisory only</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Filters */}
//         <Card className="mb-8 shadow-wave">
//           <CardHeader>
//             <CardTitle className="text-lg">Filter Alerts</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input 
//                     placeholder="Search by location, type, or description..." 
//                     className="pl-10"
//                   />
//                 </div>
//               </div>
//               <Button variant="wave">
//                 <Filter className="h-4 w-4 mr-2" />
//                 Filter Options
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Alerts List */}
//         <div className="space-y-6">
//           {alerts.map((alert, index) => (
//             <Card 
//               key={alert.id} 
//               className={`transition-smooth hover:scale-[1.02] hover:shadow-ocean ${getSeverityBg(alert.severity)} animate-fade-in`}
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               <CardHeader>
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start gap-4">
//                     <div className={`p-3 rounded-lg bg-${getSeverityColor(alert.severity)}/10 border border-${getSeverityColor(alert.severity)}/20`}>
//                       <alert.icon className={`h-6 w-6 text-${getSeverityColor(alert.severity)}`} />
//                     </div>
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-3">
//                         <CardTitle className="text-xl">{alert.title}</CardTitle>
//                         <Badge variant={getSeverityColor(alert.severity) as any} className="pulse-glow">
//                           {alert.severity.toUpperCase()}
//                         </Badge>
//                       </div>
//                       <CardDescription className="text-base">
//                         {alert.description}
//                       </CardDescription>
//                     </div>
//                   </div>
//                   <div className="text-right space-y-1">
//                     <div className="text-sm text-muted-foreground flex items-center justify-end">
//                       <Clock className="h-3 w-3 mr-1" />
//                       {alert.time}
//                     </div>
//                     <Badge variant="outline" className="text-xs">
//                       {alert.confidence}% confidence
//                     </Badge>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center text-sm text-muted-foreground">
//                       <MapPin className="h-4 w-4 mr-1" />
//                       {alert.location}
//                     </div>
//                     <Badge variant="secondary" className="text-xs">
//                       {alert.status}
//                     </Badge>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button variant="wave" size="sm">
//                       <Eye className="h-4 w-4 mr-2" />
//                       View Details
//                     </Button>
//                     <Button variant="hero" size="sm">
//                       Take Action
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Emergency Actions */}
//         <Card className="mt-8 shadow-ocean">
//           <CardHeader>
//             <CardTitle className="text-xl text-destructive flex items-center gap-2">
//               <AlertTriangle className="h-6 w-6" />
//               Emergency Response
//             </CardTitle>
//             <CardDescription>
//               Quick access to emergency protocols and contact information
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <Button variant="alert" className="h-16 flex-col">
//                 <Bell className="h-6 w-6 mb-1" />
//                 Send Emergency Alert
//               </Button>
//               <Button variant="hero" className="h-16 flex-col">
//                 <MapPin className="h-6 w-6 mb-1" />
//                 Evacuation Routes
//               </Button>
//               <Button variant="wave" className="h-16 flex-col">
//                 <AlertTriangle className="h-6 w-6 mb-1" />
//                 Contact Authorities
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// };

// export default Alerts;

import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Eye,
  Bell,
  Waves,
  CloudRain,
  Wind
} from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const Alerts = () => {
  const { toast } = useToast();

  const [selectedAlert, setSelectedAlert] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const alerts = [
    {
      id: 1,
      title: "High Tide Flood Warning",
      description: "Coastal flooding expected in low-lying areas during high tide cycle",
      location: "North Beach District",
      severity: "high",
      time: "2 minutes ago",
      status: "Active",
      type: "flooding",
      icon: Waves,
      confidence: 94
    },
    {
      id: 2,
      title: "Coastal Erosion Alert",
      description: "Accelerated erosion detected along the shoreline near pier structures",
      location: "Pier Area - Section B",
      severity: "medium",
      time: "15 minutes ago",
      status: "Monitoring",
      type: "erosion",
      icon: AlertTriangle,
      confidence: 87
    },
    {
      id: 3,
      title: "Storm Watch Advisory",
      description: "Potential storm system approaching, monitor for updates",
      location: "Downtown Waterfront",
      severity: "low",
      time: "1 hour ago",
      status: "Advisory",
      type: "weather",
      icon: CloudRain,
      confidence: 72
    },
    {
      id: 4,
      title: "Wind Speed Warning",
      description: "Sustained winds exceeding safe levels for coastal activities",
      location: "Marina District",
      severity: "medium",
      time: "3 hours ago",
      status: "Active",
      type: "weather",
      icon: Wind,
      confidence: 91
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive/10 border-destructive/20';
      case 'medium': return 'bg-warning/10 border-warning/20';
      case 'low': return 'bg-secondary/10 border-secondary/20';
      default: return 'bg-secondary/10 border-secondary/20';
    }
  };

  const handleViewDetails = (alert: any) => {
    setSelectedAlert(alert);
    setIsDialogOpen(true);
  };

  const handleTakeAction = () => {
    toast({
      title: "Action Taken",
      description: "Message forwarded to higher authority ✅",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            Active Alerts & Warnings
          </h1>
          <p className="text-muted-foreground">
            Real-time coastal threat notifications and emergency advisories
          </p>
        </div>

        {/* Alerts List */}
        <div className="space-y-6">
          {alerts.map((alert, index) => (
            <Card 
              key={alert.id} 
              className={`transition-smooth hover:scale-[1.02] hover:shadow-ocean ${getSeverityBg(alert.severity)} animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-${getSeverityColor(alert.severity)}/10 border border-${getSeverityColor(alert.severity)}/20`}>
                      <alert.icon className={`h-6 w-6 text-${getSeverityColor(alert.severity)}`} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-xl">{alert.title}</CardTitle>
                        <Badge variant={getSeverityColor(alert.severity) as any} className="pulse-glow">
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">
                        {alert.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm text-muted-foreground flex items-center justify-end">
                      <Clock className="h-3 w-3 mr-1" />
                      {alert.time}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {alert.confidence}% confidence
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {alert.location}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {alert.status}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="wave" size="sm" onClick={() => handleViewDetails(alert)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="hero" size="sm" onClick={handleTakeAction}>
                      Take Action
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedAlert?.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <p><strong>Description:</strong> {selectedAlert?.description}</p>
              <p><strong>Location:</strong> {selectedAlert?.location}</p>
              <p><strong>Severity:</strong> {selectedAlert?.severity.toUpperCase()}</p>
              <p><strong>Status:</strong> {selectedAlert?.status}</p>
              <p><strong>Confidence:</strong> {selectedAlert?.confidence}%</p>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Alerts;
