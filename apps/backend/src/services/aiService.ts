import OpenAI from "openai";

class AIService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      baseURL: process.env.OLLAMA_BASE_URL || "http://localhost:11434/v1",
      apiKey: "ollama", // Ollama doesn't require a real API key
    });
  }

  async generateSuggestedDetails(
    name: string,
    description: string
  ): Promise<string> {
    try {
      const prompt = `
        Based on the website name "${name}" and description "${description}", 
        please provide detailed suggestions for additional content and features 
        that would enhance this website. Consider the target audience, key features, 
        unique selling points, and overall goals. Provide at least 300 words of 
        comprehensive suggestions.
      `;

      const response = await this.client.chat.completions.create({
        model: process.env.OLLAMA_MODEL || "llama3.1:8b",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const suggestion = response.choices[0]?.message?.content || "";

      if (suggestion.length < 300) {
        return this.getFallbackSuggestion(name, description);
      }

      return suggestion;
    } catch (error) {
      console.error("AI Service Error:", error);
      return this.getFallbackSuggestion(name, description);
    }
  }

  async generateSectionContent(
    websiteData: any,
    sectionName: string,
    previousSections: any[]
  ): Promise<string> {
    try {
      const contextualInfo = this.buildContextualPrompt(
        websiteData,
        previousSections
      );
      const newPrompt = `
        Generate a comprehensive React component for the "${sectionName}" section of a website. 
The output should meet the following requirements:

1. **React JSX**: The output should be valid JSX, ready to drop into a React component.
2. **Styling**: Use TailwindCSS utility classes for layout, spacing, typography, colors, and responsiveness. 
   Optionally, you can use MUI components for cards, buttons, grids, or typography where appropriate.
3. **Content**:
   - Include headings, subheadings, paragraphs, lists, buttons, and calls-to-action relevant to the section.
   - Include placeholder images using URLs like "https://picsum.photos/seed/{random}/400/300".
   - Content should be engaging, relevant to the website’s purpose, and consistent with the theme of previous sections.
4. **Interactivity**: If relevant, include interactive elements using MUI or React features (buttons, links, hover effects, etc.).
5. **Semantics & Accessibility**: Use semantic HTML/JSX and proper accessibility attributes (alt for images, aria labels for interactive elements).
6. **Data Handling**: Assume dynamic content may come from props or API calls (Axios), and include example placeholders.
7. **No extraneous text**: Output only the JSX code, do not explain or add commentary.

Example placeholders can include:
- "<img src="https://picsum.photos/seed/1/400/300" alt="Random image" />"
- "<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Click Me</button>"

The final component should be **production-ready**, fully styled, and modular.

      `;

      const prompt = `
        ${contextualInfo}
        
       ${newPrompt}
      `;

      const response = await this.client.chat.completions.create({
        model: process.env.OLLAMA_MODEL || "llama3.1:8b",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 1500,
      });

      return (
        response.choices[0]?.message?.content ||
        this.getFallbackSectionContent(sectionName)
      );
    } catch (error) {
      console.error("AI Section Generation Error:", error);
      return this.getFallbackSectionContent(sectionName);
    }
  }

  async generateChatbotResponse(
    websiteData: any,
    userMessage: string
  ): Promise<string> {
    try {
      const contextualInfo = this.buildContextualPrompt(
        websiteData,
        websiteData.sections
      );

      const prompt = `
        ${contextualInfo}
        
        User asked: "${userMessage}"
        
        As a helpful assistant for this website, provide a relevant and helpful response 
        based on the website's content and purpose. Be friendly and informative.
      `;

      const response = await this.client.chat.completions.create({
        model: process.env.OLLAMA_MODEL || "llama3.1:8b",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      });

      return (
        response.choices[0]?.message?.content ||
        "I apologize, but I'm having trouble processing your request right now. Please try again later."
      );
    } catch (error) {
      console.error("Chatbot Response Error:", error);
      return "I apologize, but I'm having trouble processing your request right now. Please try again later.";
    }
  }

  private buildContextualPrompt(websiteData: any, sections: any[]): string {
    let context = `
      Website Name: ${websiteData.name}
      Description: ${websiteData.description}
      Additional Details: ${websiteData.otherDetails}
    `;

    if (sections && sections.length > 0) {
      context += "\n\nPrevious sections generated:";
      sections.forEach((section, index) => {
        context += `\n${index + 1}. ${
          section.sectionName
        }: ${section.content.substring(0, 200)}...`;
      });
    }

    return context;
  }

  private getFallbackSuggestion(name: string, description: string): string {
    return `
      Based on your website "${name}" with the description "${description}", here are some comprehensive suggestions to enhance your online presence:

      **Content Strategy**: Consider adding detailed product or service pages that showcase your unique value proposition. Include customer testimonials, case studies, and success stories to build trust and credibility with your audience.

      **User Experience**: Implement intuitive navigation with clear call-to-action buttons throughout the site. Consider adding a search functionality and filters to help users find what they're looking for quickly.

      **Engagement Features**: Add an FAQ section addressing common customer questions, a blog section for sharing industry insights and updates, and social media integration to build community engagement.

      **Trust Building**: Include security badges, certifications, and clear privacy policies. Add team member profiles and company background information to personalize your brand.

      **Conversion Optimization**: Implement contact forms with multiple touchpoints, live chat support, and clear pricing information if applicable. Consider adding newsletter signup with valuable content incentives.

      **Mobile Optimization**: Ensure responsive design across all devices with fast loading times and touch-friendly navigation elements.

      **SEO Enhancement**: Optimize for relevant keywords in your industry, add meta descriptions, and ensure proper heading structure throughout your content.

      These suggestions will help create a comprehensive, user-friendly website that effectively communicates your value proposition and drives meaningful engagement with your target audience.
    `;
  }

  private getFallbackSectionContent(sectionName: string): string {
    const fallbacks: Record<string, string> = {
      "Interactive Hero Section": `
        <div class="hero-section">
          <h1>Welcome to Our Amazing Platform</h1>
          <p>Discover innovative solutions that transform the way you work and succeed in today's digital landscape.</p>
          <button class="cta-primary">Get Started</button>
          <button class="cta-secondary">Learn More</button>
        </div>
      `,
      "Stats / Metrics Section": `
        <div class="stats-section">
          <div class="stat-item">
            <h3>10,000+</h3>
            <p>Happy Customers</p>
          </div>
          <div class="stat-item">
            <h3>99.9%</h3>
            <p>Uptime Guarantee</p>
          </div>
          <div class="stat-item">
            <h3>24/7</h3>
            <p>Support Available</p>
          </div>
        </div>
      `,
      "Process / How It Works Section": `
        <div class="process-section">
          <h2>How It Works</h2>
          <div class="process-steps">
            <div class="step">
              <h3>1. Sign Up</h3>
              <p>Create your account in minutes with our simple registration process.</p>
            </div>
            <div class="step">
              <h3>2. Set Up</h3>
              <p>Configure your preferences and customize your experience.</p>
            </div>
            <div class="step">
              <h3>3. Start Using</h3>
              <p>Begin leveraging our platform to achieve your goals immediately.</p>
            </div>
          </div>
        </div>
      `,
    };

    return (
      fallbacks[sectionName] ||
      `
      <div class="section-content">
        <h2>${sectionName}</h2>
        <p>This section contains engaging content tailored to your website's needs. 
        The content will be professionally crafted to align with your brand and objectives.</p>
      </div>
    `
    );
  }
}

export const aiService = new AIService();
