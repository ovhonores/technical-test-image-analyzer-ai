import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class AnalyzeService {
  async getTagsFromImage(dataUrl: string) {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', 
              text: `Analyze the image and return a list of descriptive tags with confidence scores.
              Provide the response in JSON format as an array of objects with 'label' and 'confidence' fields. Do not include any additional text.  Review the image carefully before generating the tags. Must return JSON with this format: {"tags":[{"label": string, "confidence": number}]} `
            },
            {
              type: 'image_url',
              image_url: {
                url: dataUrl,
              },
            },
          ],
        },
      ],
    });
      
  if (
      response.choices[0] &&
      response.choices[0].message &&
      response.choices[0].message.content
    ) {
      return {
        data: response.choices[0].message.content
      }
    }
    return {
      error: 'Error retrieving tags from OpenAI'
    }
  }

  /**
   * 
   * @param file 
   * @returns JSON with analysis results
   */
  async analyzeImage(file: Express.Multer.File) {
    console.log(`Received file: ${file.originalname} (${file.mimetype})`);
    const base64Image = file.buffer.toString('base64');
    const dataUrl = `data:${file.mimetype};base64,${base64Image}`;
    const tagsResponse: any = await this.getTagsFromImage(dataUrl);
    console.log('Tags response from OpenAI:', tagsResponse);
    if (tagsResponse.error) {
      throw new Error(tagsResponse.error);
    }

    try {
      const tags = JSON.parse(tagsResponse.data.replace(/\n/g, '').replace('```json','').replace('```', '')).tags;
      return { tags };
    } catch (error) {
      console.error('Error parsing tags response', error);
      throw new Error('Error parsing tags from OpenAI response');
    }   
  }

}

export const analyzeService = new AnalyzeService();
