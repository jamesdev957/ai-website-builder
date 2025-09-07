import { Request, Response } from 'express';
import { Website } from '../models/Website';
import { aiService } from '../services/aiService';
import { asyncHandler } from '../middleware/errorHandler';
import {
  GenerateSuggestedDetailsRequest,
  GenerateContentSectionRequest,
  UpdateSectionContentRequest,
  PublishWebsiteRequest,
  ChatBotMessageRequest
} from '@ai-website-builder/shared-types';

export const createWebsite = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, otherDetails } = req.body;

  const website = new Website({
    name,
    description,
    otherDetails,
    sections: []
  });

  const savedWebsite = await website.save();
  res.status(201).json(savedWebsite);
});

export const generateSuggestedDetails = asyncHandler(async (req: Request, res: Response) => {
  const { name, description }: GenerateSuggestedDetailsRequest = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  const suggestion = await aiService.generateSuggestedDetails(name, description);
  
  res.json({ suggestion });
});

export const generateContentSection = asyncHandler(async (req: Request, res: Response) => {
  const { websiteId, section }: GenerateContentSectionRequest = req.body;

  if (!websiteId || !section) {
    return res.status(400).json({ error: 'Website ID and section are required' });
  }

  const website = await Website.findById(websiteId);
  if (!website) {
    return res.status(404).json({ error: 'Website not found' });
  }

  const content = await aiService.generateSectionContent(
    website,
    section,
    website.sections
  );

  // Add section to website
  const existingSectionIndex = website.sections.findIndex(s => s.sectionName === section);
  if (existingSectionIndex >= 0) {
    website.sections[existingSectionIndex].content = content;
  } else {
    website.sections.push({
      sectionName: section,
      content,
      order: website.sections.length
    });
  }

  await website.save();

  res.json({ section, content });
});

export const updateSectionContent = asyncHandler(async (req: Request, res: Response) => {
  const { websiteId, sectionName, newContent }: UpdateSectionContentRequest = req.body;

  if (!websiteId || !sectionName || !newContent) {
    return res.status(400).json({ error: 'Website ID, section name, and new content are required' });
  }

  const website = await Website.findById(websiteId);
  if (!website) {
    return res.status(404).json({ error: 'Website not found' });
  }

  const sectionIndex = website.sections.findIndex(s => s.sectionName === sectionName);
  if (sectionIndex === -1) {
    return res.status(404).json({ error: 'Section not found' });
  }

  website.sections[sectionIndex].content = newContent;
  await website.save();

  res.json({ success: true });
});

export const publishWebsite = asyncHandler(async (req: Request, res: Response) => {
  const { websiteId }: PublishWebsiteRequest = req.body;

  if (!websiteId) {
    return res.status(400).json({ error: 'Website ID is required' });
  }

  const website = await Website.findById(websiteId);
  if (!website) {
    return res.status(404).json({ error: 'Website not found' });
  }

  website.status = 'published';
  await website.save();

  res.json({ success: true, status: 'published' });
});

export const chatBotMessage = asyncHandler(async (req: Request, res: Response) => {
  const { websiteId, message }: ChatBotMessageRequest = req.body;

  if (!websiteId || !message) {
    return res.status(400).json({ error: 'Website ID and message are required' });
  }

  const website = await Website.findById(websiteId);
  if (!website) {
    return res.status(404).json({ error: 'Website not found' });
  }

  const reply = await aiService.generateChatbotResponse(website, message);

  res.json({ reply });
});

export const getWebsite = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const website = await Website.findById(id);
  if (!website) {
    return res.status(404).json({ error: 'Website not found' });
  }

  res.json(website);
});

export const getAllWebsites = asyncHandler(async (req: Request, res: Response) => {
  const websites = await Website.find().sort({ createdAt: -1 });
  res.json(websites);
});