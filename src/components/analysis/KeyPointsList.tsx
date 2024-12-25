import { type KeyPoint } from '../../lib/types/analysis';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface KeyPointsListProps {
  points: KeyPoint[];
  connections: Array<[string, string]>;
}

export function KeyPointsList({ points, connections }: KeyPointsListProps) {
  return (
    <div className="space-y-4">
      {points.map((point) => (
        <Card key={point.id}>
          <CardHeader>
            <CardTitle className="text-lg">Key Point {point.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{point.content}</p>
            <div className="mt-2">
              {connections
                .filter(([from, to]) => from === point.id || to === point.id)
                .map(([from, to]) => (
                  <div key={`${from}-${to}`} className="text-sm text-gray-500">
                    Connected to Point {from === point.id ? to : from}
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}