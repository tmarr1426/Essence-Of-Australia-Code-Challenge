/**
 * api.ts (src/api/api.ts)
 *
 * Central Axios configuration for backend communication.
 *
 * Responsibilities:
 * - Creates reusable Axios instance
 * - Defines API base URL
 * - Configures shared request settings
 * - Provides centralized API configuration
 *
 * Notes:
 * - All API requests should use this instance
 * - Environment variables should be used for deployment configuration
 */

import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;