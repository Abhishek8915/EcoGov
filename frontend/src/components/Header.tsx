import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Waves, AlertTriangle, Map, Users, Home, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  const handleReportIssue = () => {
    toast({
      title: "Report Issue",
      description: "Redirecting to community reporting page...",
    });
    // Small delay for user feedback then redirect
    setTimeout(() => {
      window.location.href = "/community";
    }, 1000);
  };

  const handleEmergencyAlert = () => {
    toast({
      title: "🚨 Emergency Alert Activated",
      description: "Emergency services have been notified. Please follow local evacuation procedures.",
      variant: "destructive",
    });
    // In a real app, this would trigger emergency protocols
    console.log("EMERGENCY ALERT TRIGGERED - Notifying authorities...");
  };

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: Map },
    { name: "Alerts", href: "/alerts", icon: AlertTriangle },
    { name: "Community", href: "/community", icon: Users },
    { name: "FloodPredict", href: "/FloodPredict", icon: Users },
    { name: "LocationPredict", href: "/LocationPredict", icon: Users},
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Waves className="h-8 w-8 text-primary transition-smooth group-hover:scale-110" />
              <div className="absolute inset-0 wave-animation opacity-30">
                <Waves className="h-8 w-8 text-accent" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-ocean bg-clip-text text-transparent">
                Coastal Watch Pro
              </h1>
              <p className="text-xs text-muted-foreground">Threat Alert System</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  isActive(item.href)
                    ? "text-primary bg-accent/20"
                    : "text-muted-foreground hover:text-primary hover:bg-accent/10"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="wave" size="sm" onClick={handleReportIssue}>
              Report Issue
            </Button>
            <Button variant="hero" size="sm" onClick={handleEmergencyAlert}>
              Emergency Alert
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border/40 mt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    isActive(item.href)
                      ? "text-primary bg-accent/20"
                      : "text-muted-foreground hover:text-primary hover:bg-accent/10"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Button variant="wave" className="w-full" onClick={handleReportIssue}>
                  Report Issue
                </Button>
                <Button variant="hero" className="w-full" onClick={handleEmergencyAlert}>
                  Emergency Alert
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;