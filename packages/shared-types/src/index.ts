export interface Website {
  name: string;
  description: string;
  otherDetails: string;
  status: "draft" | "published";
  sections: Section[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Section {
  sectionName: string;
  content: string;
  order?: number;
}

export interface GenerateSuggestedDetailsRequest {
  name: string;
  description: string;
}

export interface GenerateSuggestedDetailsResponse {
  suggestion: string;
}

export interface GenerateContentSectionRequest {
  websiteId: string;
  section: string;
}

export interface GenerateContentSectionResponse {
  section: string;
  content: string;
}

export interface UpdateSectionContentRequest {
  websiteId: string;
  sectionName: string;
  newContent: string;
}

export interface UpdateSectionContentResponse {
  success: boolean;
}

export interface PublishWebsiteRequest {
  websiteId: string;
}

export interface PublishWebsiteResponse {
  success: boolean;
  status: "published";
}

export interface ChatBotMessageRequest {
  websiteId: string;
  message: string;
}

export interface ChatBotMessageResponse {
  reply: string;
}

export const AVAILABLE_SECTIONS = [
  "AI Chatbot Widget Section",
  "Interactive Hero Section",
  "Stats / Metrics Section",
  "Process / How It Works Section",
  "Call-to-Action Banner Section",
  "Blog / Resources Section",
  "Integration / Partners Section",
  "Download App Section",
  "Events / Webinar Section",
  "Community / Forum Section",
  "Careers Section",
  "Legal / Compliance Section",
  "Dark Mode Toggle Section",
] as const;

export type SectionType = (typeof AVAILABLE_SECTIONS)[number];
