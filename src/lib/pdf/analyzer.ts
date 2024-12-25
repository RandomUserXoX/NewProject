import { generateMistralResponse } from '../api/mistral/client';
import { type AnalysisResult } from '../types/analysis';

const PDF_ANALYSIS_PROMPT = `Analyze this PDF content and extract:
1. Main topics and key concepts
2. Important definitions and terminology
3. Core arguments or theories
4. Supporting evidence or examples
5. Practical applications or implications

Format as JSON:
{
  "topics": [
    {
      "title": "Topic name",
      "keyPoints": ["point 1", "point 2"],
      "importance": "Why this topic matters"
    }
  ],
  "terminology": [
    {
      "term": "Term name",
      "definition": "Clear definition",
      "context": "How/where this term is used"
    }
  ],
  "summary": "Brief overview of the content"
}`;

export async function analyzePDFContent(text: string): Promise<AnalysisResult> {
  try {
    const response = await generateMistralResponse(`${PDF_ANALYSIS_PROMPT}\n\nContent:\n${text}`);
    return JSON.parse(response.text);
  } catch (error) {
    console.error('PDF analysis failed:', error);
    throw new Error('Failed to analyze PDF content');
  }
}