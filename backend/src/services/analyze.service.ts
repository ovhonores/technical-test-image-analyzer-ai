class AnalyzeService {
  /**
   * 
   * @param file 
   * @returns JSON with analysis results
   */
  async analyzeImage(file: Express.Multer.File) {
    console.log(`Received file: ${file.originalname} (${file.mimetype})`);

    return {
      tags: [
        { label: 'Example', confidence: 0.99 },
      ],
    };
  }
}

export const analyzeService = new AnalyzeService();
