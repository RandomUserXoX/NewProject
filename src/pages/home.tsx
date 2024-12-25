import { Upload, BookOpen, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="relative min-h-screen gradient-bg">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center py-32">
          <p className="text-primary/90 font-medium mb-4">
            AI-Powered Tools & Proven Study Techniques with Personalized Insights
          </p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Learning reimagined,<br />The Fusion of AI and Learning Science
          </h1>
          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center">
            <Button size="lg" className="w-full sm:w-auto text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
              Start Learning Now
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-10 grid gap-8 md:grid-cols-3 pb-24">
          <Card className="backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10 transition-colors shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Upload className="h-6 w-6 mr-2 text-primary" />
                Upload & Prime
              </CardTitle>
              <CardDescription className="text-gray-300">
                Upload your study material and let AI create summaries and mind maps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/study?feature=prime">
                <Button variant="secondary" className="w-full bg-white/10 hover:bg-white/20 border border-primary/20">
                  Do Priming
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10 transition-colors shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Brain className="h-6 w-6 mr-2 text-primary" />
                Track Progress
              </CardTitle>
              <CardDescription className="text-gray-300">
                View your learning analytics and track your progress over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full bg-white/10 hover:bg-white/20 border border-primary/20">
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10 transition-colors shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <BookOpen className="h-6 w-6 mr-2 text-primary" />
                Study Session
              </CardTitle>
              <CardDescription className="text-gray-300">
                Start a focused study session with spaced repetition and active recall
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/study?feature=timer">
                <Button variant="secondary" className="w-full bg-white/10 hover:bg-white/20 border border-primary/20">
                  Begin Session
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}