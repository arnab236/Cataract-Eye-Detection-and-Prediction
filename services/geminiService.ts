import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, CataractSeverity } from "../types";

// Helper to convert file to base64
const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    hasCataract: { type: Type.BOOLEAN, description: "Whether cataract is detected" },
    confidence: { type: Type.NUMBER, description: "Confidence percentage (0-100)" },
    severity: { type: Type.STRING, enum: ["Healthy", "Mild", "Moderate", "Severe"], description: "Severity level" },
    opacityScore: { type: Type.STRING, description: "Clinical grade, e.g., 'Grade 2.5' or 'LOCS III Grade 4'" },
    type: { type: Type.STRING, description: "Type of cataract, e.g., 'Nuclear', 'Cortical', 'Posterior Subcapsular', 'Anterior', or 'None'" },
    recommendation: { type: Type.STRING, description: "Clinical recommendation for the patient" },
    reasoning: { type: Type.STRING, description: "Detailed explanation of visual findings supporting the diagnosis" },
  },
  required: ["hasCataract", "confidence", "severity", "opacityScore", "type", "recommendation", "reasoning"],
};

export const analyzeImage = async (file: File): Promise<AnalysisResult> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key not found");

    const ai = new GoogleGenAI({ apiKey });
    const imageBase64 = await fileToGenerativePart(file);

    const prompt = `
      You are an expert ophthalmologist AI specializing in cataract screening.
      
      **TASK:**
      Analyze the provided image to detect the presence and severity of cataracts. 
      The image may be:
      1. A **Retinal Fundus Image** (back of the eye).
      2. An **Anterior Segment Photograph** (front of the eye/pupil).

      **DIAGNOSTIC CRITERIA:**

      **CASE A: Fundus Image Analysis**
      - **Healthy:** Optic disc is sharp and distinct. Retinal vessels are crisp and clearly defined. Foveal reflex is present.
      - **Mild Cataract:** Slight blurring or haziness of the retinal vessels or optic disc margins. Detail is visible but softened (like a light fog).
      - **Moderate Cataract:** Significant blurring. Small vessels are obscured. Optic disc borders are hazy. The overall view appears "foggy" or washed out.
      - **Severe Cataract:** Fundus details are largely obscured or invisible. The red reflex is significantly darkened, dull, or absent.

      **CASE B: Anterior/External Eye Analysis**
      - **Healthy:** Pupil is black and clear. Iris texture is sharp. No cloudiness behind the pupil.
      - **Cataract Present:** Look for visible cloudiness, grayness, whiteness (leukocoria), or yellow/brown tint *within* the pupil area (behind the iris). 
      - **Severity Grading:** 
        - *Mild:* Faint cloudiness or small localized opacities.
        - *Moderate:* Distinct gray/white opacity covering a significant portion of the pupil.
        - *Severe:* Dense white or brown opacity completely obscuring the pupil (mature cataract).

      **OUTPUT RULES:**
      1. **Sensitivity:** Be sensitive to signs of pathology. If vessels look hazy or the pupil looks gray, flag it. Do not default to "Healthy" unless the image is crystal clear.
      2. **Non-Medical Images:** If the image is clearly NOT an eye (e.g., a face, landscape, object), return hasCataract: false, severity: "Healthy", and note it is a non-medical image in reasoning.
      3. **Confidence:** Provide a confidence score (0-100) based on image quality and clarity of signs.
      4. **Recommendation:** 
         - Mild: "Monitor annually. Update eyeglass prescription."
         - Moderate: "Consult ophthalmologist for potential surgery evaluation."
         - Severe: "Urgent ophthalmology referral for surgical intervention."

      Return the result purely in JSON format matching the schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          { inlineData: { mimeType: file.type, data: imageBase64 } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2, // Low temperature for consistent medical analysis
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const result = JSON.parse(text) as AnalysisResult;
    return result;

  } catch (error) {
    console.error("Analysis failed:", error);
    // Fallback error state
    return {
      hasCataract: false,
      confidence: 0,
      severity: CataractSeverity.Healthy,
      opacityScore: "N/A",
      type: "Error",
      recommendation: "System error during analysis. Please try again or check your internet connection.",
      reasoning: "The system could not process the image. Please ensure the API key is configured and the image is valid."
    };
  }
};