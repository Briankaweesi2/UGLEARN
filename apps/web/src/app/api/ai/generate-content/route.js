import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { type, subject, grade_level, topic, difficulty, language = 'en' } = body;

    if (!type || !subject || !grade_level || !topic) {
      return Response.json({ 
        error: "Type, subject, grade level, and topic are required" 
      }, { status: 400 });
    }

    let systemPrompt = "";
    let userPrompt = "";

    switch (type) {
      case 'lesson':
        systemPrompt = `You are an expert educator creating curriculum-aligned content for Uganda's National Curriculum. Create engaging, age-appropriate lessons that follow pedagogical best practices.`;
        userPrompt = `Create a comprehensive lesson on "${topic}" for ${subject} at ${grade_level} level. 
        
        The lesson should include:
        1. Learning objectives (3-4 clear, measurable goals)
        2. Introduction (engaging hook to capture student interest)
        3. Main content (detailed explanation with examples)
        4. Activities (2-3 interactive exercises)
        5. Summary (key takeaways)
        6. Assessment questions (3-5 questions to check understanding)
        
        Difficulty level: ${difficulty || 'medium'}
        Language: ${language === 'en' ? 'English' : 'Local language with English translations'}
        
        Make it culturally relevant to Uganda and include real-world examples students can relate to.`;
        break;

      case 'quiz':
        systemPrompt = `You are an expert educator creating assessment questions aligned with Uganda's National Curriculum. Create fair, clear, and educationally sound questions.`;
        userPrompt = `Create a quiz with 10 questions on "${topic}" for ${subject} at ${grade_level} level.
        
        Include:
        - 6 multiple choice questions (4 options each)
        - 2 true/false questions  
        - 2 short answer questions
        
        For each question provide:
        - The question text
        - Answer options (for multiple choice)
        - Correct answer
        - Brief explanation of why the answer is correct
        
        Difficulty level: ${difficulty || 'medium'}
        Language: ${language === 'en' ? 'English' : 'Local language with English translations'}
        
        Ensure questions test understanding, not just memorization.`;
        break;

      case 'explanation':
        systemPrompt = `You are a patient tutor helping students understand difficult concepts. Explain things clearly and simply.`;
        userPrompt = `Explain "${topic}" in ${subject} for a ${grade_level} student who is struggling to understand.
        
        Use:
        - Simple, clear language
        - Step-by-step breakdown
        - Analogies and examples from everyday life in Uganda
        - Visual descriptions where helpful
        
        Difficulty level: ${difficulty || 'medium'}
        Language: ${language === 'en' ? 'English' : 'Local language with English translations'}`;
        break;

      case 'practice':
        systemPrompt = `You are creating practice exercises to help students master concepts through repetition and application.`;
        userPrompt = `Create 8 practice problems for "${topic}" in ${subject} at ${grade_level} level.
        
        Include:
        - 4 basic problems (applying the concept directly)
        - 3 intermediate problems (requiring some reasoning)
        - 1 challenging problem (requiring creative application)
        
        For each problem provide:
        - Clear problem statement
        - Step-by-step solution
        - Tips for solving similar problems
        
        Difficulty level: ${difficulty || 'medium'}
        Language: ${language === 'en' ? 'English' : 'Local language with English translations'}`;
        break;

      default:
        return Response.json({ error: "Invalid content type" }, { status: 400 });
    }

    // Call ChatGPT API
    const response = await fetch('/integrations/chat-gpt/conversationgpt4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate content');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content generated');
    }

    return Response.json({ 
      content,
      type,
      subject,
      grade_level,
      topic,
      difficulty,
      language
    });

  } catch (error) {
    console.error("Error generating content:", error);
    return Response.json({ 
      error: "Failed to generate content. Please try again." 
    }, { status: 500 });
  }
}