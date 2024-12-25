import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface SignificancePanelProps {
  significance: string;
}

export function SignificancePanel({ significance }: SignificancePanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Significance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{significance}</p>
      </CardContent>
    </Card>
  );
}