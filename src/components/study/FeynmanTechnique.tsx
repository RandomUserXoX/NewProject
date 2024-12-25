import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { useStudyStore } from '../../store/studyStore';

interface FeynmanTechniqueProps {
  documentId: string;
  conceptTitle: string;
}

export function FeynmanTechnique({ documentId, conceptTitle }: FeynmanTechniqueProps) {
  const { feynmanNotes, saveFeynmanNote } = useStudyStore();
  const [note, setNote] = useState(feynmanNotes[documentId] || '');

  const handleSave = () => {
    saveFeynmanNote(documentId, note);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Feynman Technique</CardTitle>
        <CardDescription>
          Explain "{conceptTitle}" in your own words, as if teaching it to someone else.
          This helps identify gaps in your understanding.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-48 p-4 border rounded-md focus:ring-2 focus:ring-primary/50"
          placeholder="Start explaining the concept here..."
        />
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-600">Tips:</p>
          <ul className="list-disc list-inside text-sm text-gray-600">
            <li>Use simple language</li>
            <li>Include examples</li>
            <li>Identify areas where you're unsure</li>
          </ul>
        </div>
        <Button onClick={handleSave} className="mt-4">
          Save Notes
        </Button>
      </CardContent>
    </Card>
  );
}