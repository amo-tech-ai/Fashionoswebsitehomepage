/**
 * API Layer - Barrel Export
 * 
 * Clean imports for all API functionality:
 * import { assistantAPI } from '@/lib/api';
 */

export { assistantAPI, sendChatMessage, getChatHistory, runAutomation } from './assistant';
export type { ChatMessage, ChatRequest, ChatResponse, AutomationResult } from './assistant';

export { API_CONFIG, API_ENDPOINTS, API_ERRORS } from './config';

export default assistantAPI;
