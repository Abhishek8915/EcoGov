import { Link } from "react-router-dom";
import { Waves, Mail, Phone, MapPin, Shield, AlertTriangle, Users, Map } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Waves className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-lg font-bold text-foreground">Coastal Watch Pro</h3>
                <p className="text-sm text-muted-foreground">Threat Alert System</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Advanced coastal monitoring and threat detection system protecting communities worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-smooth text-sm">
                Home
              </Link>
              <Link to="/dashboard" className="block text-muted-foreground hover:text-primary transition-smooth text-sm">
                Dashboard
              </Link>
              <Link to="/alerts" className="block text-muted-foreground hover:text-primary transition-smooth text-sm">
                Active Alerts
              </Link>
              <Link to="/community" className="block text-muted-foreground hover:text-primary transition-smooth text-sm">
                Community
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Services</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>24/7 Monitoring</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <AlertTriangle className="h-4 w-4" />
                <span>Real-time Alerts</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Map className="h-4 w-4" />
                <span>Risk Assessment</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Community Reports</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Emergency Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 911-WAVE</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>alerts@coastalwatch.pro</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Emergency Operations Center</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 Coastal Watch Pro. All rights reserved. ISO 27001 certified.
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-smooth">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-smooth">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-smooth">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;