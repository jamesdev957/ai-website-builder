import mongoose, { Schema, Document } from 'mongoose';
import { Website as IWebsite, Section as ISection } from '@ai-website-builder/shared-types';

interface WebsiteDocument extends IWebsite, Document {}
interface SectionDocument extends ISection, Document {}

const SectionSchema = new Schema<SectionDocument>({
  sectionName: { type: String, required: true },
  content: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const WebsiteSchema = new Schema<WebsiteDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  otherDetails: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['draft', 'published'], 
    default: 'draft' 
  },
  sections: [SectionSchema]
}, { timestamps: true });

export const Website = mongoose.model<WebsiteDocument>('Website', WebsiteSchema);