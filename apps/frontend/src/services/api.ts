import axios from "axios";
import {
  Website,
  GenerateSuggestedDetailsRequest,
  GenerateSuggestedDetailsResponse,
  GenerateContentSectionRequest,
  GenerateContentSectionResponse,
  UpdateSectionContentRequest,
  UpdateSectionContentResponse,
  PublishWebsiteRequest,
  PublishWebsiteResponse,
  ChatBotMessageRequest,
  ChatBotMessageResponse,
} from "@ai-website-builder/shared-types";

const api = axios.create({
  baseURL: "/api",
  timeout: 1500000, // 30 seconds for AI calls
});

export const websiteApi = {
  createWebsite: async (
    data: Omit<Website, "_id" | "sections" | "status">
  ): Promise<Website> => {
    const response = await api.post("/createWebsite", data);
    return response.data;
  },

  generateSuggestedDetails: async (
    data: GenerateSuggestedDetailsRequest
  ): Promise<GenerateSuggestedDetailsResponse> => {
    const response = await api.post("/generateSuggestedDetails", data);
    return response.data;
  },

  generateContentSection: async (
    data: GenerateContentSectionRequest
  ): Promise<GenerateContentSectionResponse> => {
    const response = await api.post("/generateContentSection", data);
    return response.data;
  },

  updateSectionContent: async (
    data: UpdateSectionContentRequest
  ): Promise<UpdateSectionContentResponse> => {
    const response = await api.post("/updateSectionContent", data);
    return response.data;
  },

  publishWebsite: async (
    data: PublishWebsiteRequest
  ): Promise<PublishWebsiteResponse> => {
    const response = await api.post("/publishWebsite", data);
    return response.data;
  },

  chatBotMessage: async (
    data: ChatBotMessageRequest
  ): Promise<ChatBotMessageResponse> => {
    const response = await api.post("/chatBotMessage", data);
    return response.data;
  },

  getWebsite: async (id: string): Promise<Website> => {
    const response = await api.get(`/website/${id}`);
    return response.data;
  },

  getAllWebsites: async (): Promise<Website[]> => {
    const response = await api.get("/websites");
    return response.data;
  },

  viewWebsite: async (websiteId: string) => {
    const response = await axios.get(`/view/${websiteId}`);
    return response.data;
  },
};

export default api;
