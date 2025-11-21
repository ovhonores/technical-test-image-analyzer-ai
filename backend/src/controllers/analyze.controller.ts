import { Request, Response } from 'express';
import { analyzeService } from '../services/analyze.service';

class AnalyzeController {
  /**
   * 
   * @param req 
   * @param res 
   * @returns 
   */
  async handleAnalyze(req: Request, res: Response) {
    try {
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: 'Image file is missing' });
      }

      const result = await analyzeService.analyzeImage(file);

      return res.json(result);
    } catch (error) {
      console.error('Error processing analyze request', error);
      return res.status(500).json({ message: 'Error proccesing image. Please try again later.' });
    }
  }
}

export const analyzeController = new AnalyzeController();
