import { generateMistralResponse } from '../api/mistral/client';
import type { KeyNote } from '../types/study';

const KEYNOTE_PROMPT = `Create comprehensive study notes from this content. Include:
1. Main concepts and their explanations
2. Key relationships between ideas
3. Examples and applications
4. Review questions

Format as JSON:
{
  "mainConcepts": [
    {
      "concept": "Concept name",
      "explanation": "Clear explanation",
      "examples": ["example 1", "example 2"],
      "relatedConcepts": ["related 1", "related 2"]
    }
  ],
  "reviewQuestions": [
    {
      "question": "Question text",
      "answer": "Correct answer",
      "explanation": "Why this is correct"
    }
  ]
}`;

export async function generateKeyNotes(content: string): Promise<KeyNote> {
  try {
    const response = await generateMistralResponse(`${KEYNOTE_PROMPT}\n\nContent:\n${content}`);
    return JSON.parse(response.text);
  } catch (error) {
    console.error('Keynote generation failed:', error);
    throw new Error('Failed to generate study notes');
  }
}