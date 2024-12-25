import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useUploadStore, type UploadedContent } from '../../store/uploadStore';
import { Button } from '../ui/button';
import { Brain, List } from 'lucide-react';

export function DocumentView() {
  const { activeDocument, processDocument } = useUploadStore();

  if (!activeDocument) {
    return null;
  }

  const handleProcess = () => {
    processDocument(activeDocument.id);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{activeDocument.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-sm text-gray-600">{activeDocument.content}</p>
          </div>
          {!activeDocument.summary && (
            <Button onClick={handleProcess} className="mt-4">
              <Brain className="w-4 h-4 mr-2" />
              Generate Summary
            </Button>
          )}
        </CardContent>
      </Card>

      {activeDocument.summary && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2 text-primary" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{activeDocument.summary}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <List className="w-5 h-5 mr-2 text-primary" />
                Key Concepts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {activeDocument.keywords?.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}