import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Map, 
  Users, 
  Shield, 
  Smartphone, 
  BarChart3,
  Bell,
  Globe,
  Zap
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: AlertTriangle,
      title: "Real-Time Threat Detection",
      description: "Advanced AI monitoring for coastal hazards including storm surge, flooding, and erosion",
      badge: "AI Powered",
      color: "warning"
    },
    {
      icon: Map,
      title: "Interactive Risk Maps",
      description: "Live visualization of threat zones, evacuation routes, and safe areas with detailed overlays",
      badge: "Live Data",
      color: "primary"
    },
    {
      icon: Users,
      title: "Community Reporting",
      description: "Crowdsourced incident reporting with photo uploads and GPS location verification",
      badge: "Community",
      color: "success"
    },
    {
      icon: Shield,
      title: "Multi-Channel Alerts",
      description: "Instant notifications via SMS, app, email, and local emergency systems",
      badge: "Instant",
      color: "primary"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Optimized for emergency situations with offline capabilities and one-tap reporting",
      badge: "Offline Ready",
      color: "accent"
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Machine learning models predicting coastal risks up to 72 hours in advance",
      badge: "72h Forecast",
      color: "warning"
    },
    {
      icon: Bell,
      title: "Authority Dashboard",
      description: "Comprehensive control panel for emergency managers and local authorities",
      badge: "Admin Only",
      color: "destructive"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Accessible alerts and interface in multiple languages for diverse communities",
      badge: "Global",
      color: "success"
    },
    {
      icon: Zap,
      title: "Rapid Response",
      description: "Sub-2-minute alert delivery with automated escalation protocols",
      badge: "&lt;2min",
      color: "primary"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: "border-primary/20 hover:border-primary/40",
      warning: "border-warning/20 hover:border-warning/40",
      success: "border-success/20 hover:border-success/40",
      destructive: "border-destructive/20 hover:border-destructive/40",
      accent: "border-accent hover:border-accent/60"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="mb-4">
            Advanced Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Comprehensive Coastal
            <span className="block gradient-ocean bg-clip-text text-transparent">
              Protection System
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our cutting-edge platform combines real-time monitoring, predictive analytics, 
            and community engagement to keep coastal communities safe.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`transition-smooth hover:scale-105 hover:shadow-wave ${getColorClasses(feature.color)} animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-${feature.color}/10`}>
                    <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-card rounded-2xl p-8 shadow-ocean">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">15K+</div>
              <div className="text-sm text-muted-foreground">Protected Residents</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">2,847</div>
              <div className="text-sm text-muted-foreground">Alerts Sent</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Monitoring</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;