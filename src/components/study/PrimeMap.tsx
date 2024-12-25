import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { usePrimeMapStore } from '../../store/primeMapStore';
import { Brain, Network, ArrowRight, Lightbulb, AlertCircle } from 'lucide-react';

export function PrimeMap() {
  const { keyPoints, isLoading, error, cleanup } = usePrimeMapStore();
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  if (error) {
    return (
      <Card className="bg-destructive/10 border-destructive/20">
        <CardContent className="flex items-center space-x-2 p-4">
          <AlertCircle className="w-5 h-5 text-destructive" />
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary" />
        </div>
        <p className="mt-4 text-white text-lg">Analyzing document...</p>
        <p className="text-gray-400">Extracting key concepts and connections</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-white">
        <Network className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Concept Map</h2>
      </div>

      <div className="grid gap-4">
        {keyPoints.map((point) => (
          <Card 
            key={point.id}
            className={`transition-all duration-300 ${
              selectedPoint === point.id
                ? 'bg-white/10 border-primary'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
            onClick={() => setSelectedPoint(selectedPoint === point.id ? null : point.id)}
          >
            <CardHeader className="cursor-pointer">
              <CardTitle className="flex items-center text-white">
                <Lightbulb className={`w-5 h-5 mr-2 ${
                  selectedPoint === point.id ? 'text-primary' : 'text-gray-400'
                }`} />
                {point.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">{point.significance}</p>
              
              {selectedPoint === point.id && point.connections.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-primary mb-2">Connected Concepts:</p>
                  {point.connections.map((connectionId) => {
                    const connectedPoint = keyPoints.find(p => p.id === connectionId);
                    if (!connectedPoint) return null;
                    return (
                      <div 
                        key={connectionId}
                        className="flex items-center space-x-2 text-sm text-gray-300 pl-4"
                      >
                        <ArrowRight className="w-4 h-4 text-primary/60" />
                        <span>{connectedPoint.title}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {keyPoints.length === 0 && (
        <Card className="bg-white/5 border-white/10">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Brain className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-white text-lg">No key points extracted yet</p>
            <p className="text-gray-400">Upload a document to begin analysis</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}