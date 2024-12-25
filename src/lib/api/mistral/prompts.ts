export const ANALYSIS_PROMPT = `Analyze this content and create a comprehensive framework that captures its essence. The framework should be thorough yet accessible, adapting to the content's complexity and structure.

First, evaluate the content based on:
1. Overall complexity of the subject matter
2. Number of distinct major topics or events
3. Depth of conceptual relationships
4. Content length and density

Then, create a framework that:
- Extracts the optimal number of key points based on your evaluation
- Ensures each point represents a significant concept, event, or idea
- Explains the importance of each point in the broader context
- Shows how points interconnect to form a complete understanding
- Provides a foundation for deeper study

Important: The number of key points should be determined by your analysis of the content's complexity and structure, not by a predetermined limit. Include as many points as needed to create a coherent framework while avoiding redundancy.

Format the response as JSON:
{
  "keyPoints": [
    {
      "point": "Main idea here",
      "significance": "Why this is important",
      "connections": ["Related point 1", "Related point 2"]
    }
  ],
  "biggerPicture": "Overall summary and context that explains how these points form a cohesive framework"
}`;