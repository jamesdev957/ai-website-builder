import { Request, Response } from 'express';
import { Website } from '../models/Website';
import { asyncHandler } from '../middleware/errorHandler';

export const viewWebsite = asyncHandler(async (req: Request, res: Response) => {
  const { websiteId } = req.params;

  const website = await Website.findById(websiteId);

  if (!website) {
    return res.status(404).json({ 
      error: 'Website Not Found',
      message: 'The requested website could not be found.' 
    });
  }

  if (website.status === 'draft') {
    return res.json({
      status: 'coming_soon',
      message: 'Coming Soon',
      description: 'This website is currently under development and will be available soon.'
    });
  }

  res.json({
    status: 'published',
    website
  });
});