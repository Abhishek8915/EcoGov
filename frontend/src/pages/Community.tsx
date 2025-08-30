import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  Camera, 
  MapPin, 
  Send, 
  Star,
  Trophy,
  Heart,
  MessageSquare,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import React, { useRef, useState } from "react";

const Community = () => {
  const reports = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "SJ",
      location: "North Beach",
      report: "Unusual wave patterns near the pier, seems like the tide is coming in faster than usual",
      time: "5 min ago",
      verified: true,
      likes: 12,
      comments: 3,
      priority: "medium"
    },
    {
      id: 2,
      user: "Mike Rodriguez",
      avatar: "MR",
      location: "Marina District",
      report: "Storm drain overflow causing flooding in parking lot. Water level rising quickly.",
      time: "20 min ago",
      verified: true,
      likes: 8,
      comments: 5,
      priority: "high"
    },
    {
      id: 3,
      user: "Emma Chen",
      avatar: "EC",
      location: "Coastal Walk",
      report: "Beautiful sunset today! Also noticed some minor erosion near the walking path.",
      time: "2 hours ago",
      verified: false,
      likes: 24,
      comments: 8,
      priority: "low"
    }
  ];

  const topReporters = [
    { name: "Sarah Johnson", reports: 47, points: 340, badge: "Gold" },
    { name: "Mike Rodriguez", reports: 33, points: 245, badge: "Silver" },
    { name: "Emma Chen", reports: 28, points: 198, badge: "Bronze" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Gold': return 'bg-yellow-500';
      case 'Silver': return 'bg-gray-400';
      case 'Bronze': return 'bg-orange-500';
      default: return 'bg-gray-400';
    }
  };

  // Add state for form fields and success message
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [successMsg, setSuccessMsg] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedFiles(fileNames);
    }
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ...submit logic here...
    setTitle("");
    setLocation("");
    setDescription("");
    setUploadedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setSuccessMsg("Report submitted successfully!");
    setTimeout(() => setSuccessMsg(""), 3000); // Hide after 3 seconds
  };

  // Add modal state
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  // Example: full leaderboard data
  const fullLeaderboard = [
    ...topReporters,
    { name: "Priya Patel", reports: 22, points: 160, badge: "Bronze" },
    { name: "John Lee", reports: 18, points: 120, badge: "Bronze" },
    { name: "Amit Singh", reports: 15, points: 100, badge: "Bronze" },
    // Add more as needed
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Community Hub
          </h1>
          <p className="text-muted-foreground">
            Join our coastal community in reporting and monitoring local conditions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Form */}
          <Card className="lg:col-span-2 shadow-ocean">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Submit a Report
              </CardTitle>
              <CardDescription>
                Help keep our community safe by reporting coastal conditions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <Input 
                    placeholder="Report title (e.g., 'High waves at North Beach')" 
                    className="text-lg"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input 
                        placeholder="Location" 
                        className="w-full"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                      />
                    </div>
                    <Button variant="wave" size="icon" type="button">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>

                  <Textarea 
                    placeholder="Describe what you're observing... (weather conditions, water levels, erosion, etc.)"
                    rows={4}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />

                  <div className="flex items-center justify-between p-4 border border-dashed border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Camera className="h-6 w-6 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Add Photos</p>
                        <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                      </div>
                    </div>
                    <Button variant="secondary" type="button" onClick={handleBrowseClick}>Browse Files</Button>
                    <input
                      type="file"
                      multiple
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>
                  {/* Show uploaded file names */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      <span className="font-medium">Uploaded:</span>
                      <ul className="list-disc ml-5">
                        {uploadedFiles.map((name, idx) => (
                          <li key={idx}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm text-muted-foreground">GPS location will be automatically added</span>
                    </div>
                    <Button variant="hero">
                      <Send className="h-4 w-4 mr-2" />
                      Submit Report
                    </Button>
                  </div>
                </div>
              </form>

              {/* Success message */}
              {successMsg && (
                <div className="mt-4 p-3 rounded-lg bg-success/10 text-success">
                  {successMsg}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Community Leaderboard */}
          <Card className="shadow-wave">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Top Contributors
              </CardTitle>
              <CardDescription>This month's most active reporters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topReporters.map((reporter, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 transition-smooth">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{reporter.name}</p>
                    <p className="text-xs text-muted-foreground">{reporter.reports} reports • {reporter.points} points</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full ${getBadgeColor(reporter.badge)}`} />
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <Button variant="wave" className="w-full" onClick={() => setLeaderboardOpen(true)}>
                  <Star className="h-4 w-4 mr-2" />
                  View Full Leaderboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Community Reports */}
        <Card className="mt-8 shadow-wave">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Community Reports
            </CardTitle>
            <CardDescription>Latest observations from our coastal community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {reports.map((report, index) => (
              <div 
                key={report.id} 
                className="p-4 border rounded-lg hover:bg-accent/5 transition-smooth animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {report.avatar}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{report.user}</span>
                        {report.verified && (
                        <Badge variant="secondary" className="text-xs bg-success/10 text-success border-success/20">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        <Badge variant={getPriorityColor(report.priority) as any} className="text-xs">
                          {report.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{report.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {report.location}
                    </div>
                    
                    <p className="text-sm leading-relaxed">{report.report}</p>
                    
                    <div className="flex items-center gap-4 pt-2">
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-smooth">
                        <Heart className="h-4 w-4" />
                        {report.likes}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-smooth">
                        <MessageSquare className="h-4 w-4" />
                        {report.comments}
                      </button>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Gamification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="shadow-wave hover:shadow-ocean transition-smooth">
            <CardHeader className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Join the Community</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Become part of our coastal monitoring network
              </p>
              <Button variant="hero" className="w-full">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-wave hover:shadow-ocean transition-smooth">
            <CardHeader className="text-center">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
                <Star className="h-6 w-6 text-success" />
              </div>
              <CardTitle>Earn Rewards</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Get points and badges for your contributions
              </p>
              <Button variant="wave" className="w-full bg-success text-success-foreground hover:bg-success/90">
                View Rewards
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-wave hover:shadow-ocean transition-smooth">
            <CardHeader className="text-center">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-2">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
              <CardTitle>Stay Alert</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Get notified about threats in your area
              </p>
              <Button variant="alert" className="w-full">
                Enable Alerts
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Modal */}
        {leaderboardOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Full Leaderboard
              </h2>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {fullLeaderboard.map((reporter, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 rounded hover:bg-accent/5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{reporter.name}</p>
                      <p className="text-xs text-muted-foreground">{reporter.reports} reports • {reporter.points} points</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full ${getBadgeColor(reporter.badge)}`} />
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="secondary" onClick={() => setLeaderboardOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};


export default Community;
