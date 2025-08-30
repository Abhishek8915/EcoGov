import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, AlertTriangle, Map } from "lucide-react";
import { Link } from "react-router-dom";
import coastalHero from "@/assets/coastal-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${coastalHero})` }}
      />
      
      {/* Overlay with gradient */}
      <div className="absolute inset-0 gradient-hero opacity-80" />
      
      {/* Animated wave overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
        <div className="absolute bottom-0 w-full h-full gradient-wave wave-animation" />
        <div className="absolute bottom-0 w-full h-full gradient-wave wave-slow opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20">
            <Shield className="h-4 w-4 text-white mr-2" />
            <span className="text-white text-sm font-medium">Advanced Coastal Monitoring</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
            Protecting Our
            <span className="block gradient-ocean bg-clip-text text-transparent">
              Coastal Communities
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Real-time threat detection, community alerts, and emergency response coordination 
            for safer coastal living.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-smooth">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/80">Monitoring</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-smooth">
              <div className="text-3xl font-bold text-white mb-2">15K+</div>
              <div className="text-white/80">Protected Residents</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-smooth">
              <div className="text-3xl font-bold text-white mb-2">&lt;2min</div>
              <div className="text-white/80">Alert Response</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/dashboard">
              <Button variant="hero" size="lg" className="float-animation">
                <Map className="h-5 w-5 mr-2" />
                View Live Dashboard
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            
            <Link to="/alerts">
              <Button variant="hero" size="lg" className="float-animation">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Check Active Alerts
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="pt-8 text-white/60 text-sm">
            <p>Trusted by local authorities • Powered by advanced AI • ISO 27001 certified</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;