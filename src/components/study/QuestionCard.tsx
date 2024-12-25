import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Question } from '../../store/studyStore';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

export function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = () => {
    onAnswer(selectedAnswer);
    setShowFeedback(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        {question.type === 'multiple-choice' && (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === option ? 'default' : 'outline'}
                className="w-full justify-start"
                onClick={() => setSelectedAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        {question.type === 'fill-blank' && (
          <input
            type="text"
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Type your answer..."
          />
        )}

        <Button
          onClick={handleSubmit}
          className="mt-4 w-full"
          disabled={!selectedAnswer || showFeedback}
        >
          Submit Answer
        </Button>

        {showFeedback && (
          <div className={`mt-4 p-4 rounded ${
            selectedAnswer.toLowerCase() === question.correctAnswer.toLowerCase()
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {selectedAnswer.toLowerCase() === question.correctAnswer.toLowerCase()
              ? 'Correct! Well done!'
              : `Incorrect. The correct answer is: ${question.correctAnswer}`}
          </div>
        )}
      </CardContent>
    </Card>
  );
}