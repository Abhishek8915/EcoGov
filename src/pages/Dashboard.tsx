import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Clock
} from "lucide-react";

const Dashboard = () => {
  const alerts = [
    {
      id: 1,
      type: "High Tide Warning",
      location: "North Beach District",
      severity: "high",
      time: "2 min ago",
      status: "Active"
    },
    {
      id: 2,
      type: "Coastal Erosion",
      location: "Pier Area",
      severity: "medium",
      time: "15 min ago",
      status: "Monitoring"
    },
    {
      id: 3,
      type: "Storm Watch",
      location: "Downtown Waterfront",
      severity: "low",
      time: "1 hour ago",
      status: "Advisory"
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
          <Card className="shadow-wave hover:shadow-ocean transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">3</div>
              <p className="text-xs text-muted-foreground">+1 from yesterday</p>
            </CardContent>
          </Card>

          <Card className="shadow-wave hover:shadow-ocean transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Protected Areas</CardTitle>
              <Map className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">12</div>
              <p className="text-xs text-muted-foreground">Zones monitored</p>
            </CardContent>
          </Card>

          <Card className="shadow-wave hover:shadow-ocean transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Activity className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">Online</div>
              <p className="text-xs text-muted-foreground">99.9% uptime</p>
            </CardContent>
          </Card>

          <Card className="shadow-wave hover:shadow-ocean transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Reports</CardTitle>
              <Users className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Map Placeholder */}
          <Card className="lg:col-span-2 shadow-ocean">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Coastal Threat Map
              </CardTitle>
              <CardDescription>
                Interactive map showing current threats and monitoring stations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gradient-wave rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="text-center space-y-4">
                  <Map className="h-16 w-16 text-primary mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold">Interactive Map</h3>
                    <p className="text-muted-foreground">Map integration will be implemented here</p>
                  </div>
                  <Button variant="hero">
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Map
                  </Button>
                </div>
                {/* Animated elements to simulate map activity */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-destructive rounded-full pulse-glow" />
                <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-warning rounded-full animate-pulse" />
                <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-success rounded-full animate-pulse" />
              </div>
            </CardContent>
          </Card>

          {/* Active Alerts */}
          <Card className="shadow-wave">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Active Alerts
              </CardTitle>
              <CardDescription>Recent threat notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 border rounded-lg hover:bg-accent/5 transition-smooth">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={getSeverityColor(alert.severity) as any}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {alert.time}
                    </span>
                  </div>
                  <h4 className="font-semibold mb-1">{alert.type}</h4>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {alert.location}
                  </p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs bg-accent/20 px-2 py-1 rounded">
                      {alert.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="wave" className="w-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                View All Alerts
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 shadow-wave">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Emergency response and system management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="alert" className="h-auto p-4 flex-col">
                <AlertTriangle className="h-6 w-6 mb-2" />
                <span>Send Alert</span>
              </Button>
              <Button variant="hero" className="h-auto p-4 flex-col">
                <Map className="h-6 w-6 mb-2" />
                <span>Update Map</span>
              </Button>
              <Button variant="wave" className="h-auto p-4 flex-col">
                <Users className="h-6 w-6 mb-2" />
                <span>Community Hub</span>
              </Button>
              <Button variant="secondary" className="h-auto p-4 flex-col">
                <Activity className="h-6 w-6 mb-2" />
                <span>System Health</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;