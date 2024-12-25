import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AnalysisResponse } from '../types/analysis';
import { generateFallbackAnalysis } from '../analysis/fallbackAnalyzer';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function analyzeWithGemini(text: string): Promise<AnalysisResponse> {
  if (!API_KEY) {
    console.warn('Gemini API key not found');
    return generateFallbackAnalysis(text);
  }

  const prompt = `Analyze this text and provide:
1. Key points (maximum 5) with their significance
2. How these points connect to each other
3. A brief overview of the bigger picture

Format the response as a JSON object with this exact structure:
{
  "keyPoints": [
    {
      "point": "Main idea here",
      "significance": "Why this is important",
      "connections": ["Related point 1", "Related point 2"]
    }
  ],
  "biggerPicture": "Overall summary and context"
}

Text to analyze:
${text.slice(0, 1000)}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const parsed = JSON.parse(text);
      if (isValidAnalysisResponse(parsed)) {
        return parsed;
      }
    } catch (parseError) {
      console.warn('Failed to parse Gemini response:', parseError);
    }

    return generateFallbackAnalysis(text);
  } catch (error) {
    console.warn('Gemini API error:', error);
    return generateFallbackAnalysis(text);
  }
}

function isValidAnalysisResponse(data: any): data is AnalysisResponse {
  return (
    data &&
    Array.isArray(data.keyPoints) &&
    data.keyPoints.every((point: any) => 
      typeof point.point === 'string' &&
      typeof point.significance === 'string' &&
      Array.isArray(point.connections)
    ) &&
    typeof data.biggerPicture === 'string'
  );
}