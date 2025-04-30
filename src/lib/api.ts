/**
 * Utility functions for API calls, ensuring proper URL handling in both server and container environments
 */

// Define types for API responses
export interface PayloadApiResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

/**
 * Returns the base URL for API calls, prioritizing environment variables
 * @returns {string} The base URL to use for API calls
 */
export const getApiBaseUrl = () => {
  // Check if we're in a Docker environment (production)
  const inDocker = process.env.NEXT_PUBLIC_IN_DOCKER === 'true';
  
  // For server-side calls
  if (typeof window === 'undefined') {
    // In Docker container, use the service name for internal calls
    if (inDocker) {
      return 'http://web:3105';
    }
    // In local development server-side, use localhost
    return 'http://localhost:3105';
  }
  
  // For client-side calls, always use relative URLs to avoid CORS issues
  return '';
};

/**
 * Creates a properly formatted API URL with query parameters
 * @param {string} endpoint - The API endpoint (e.g., "/api/blog-posts")
 * @param {Record<string, any>} params - Query parameters
 * @returns {string} The formatted URL
 */
export const createApiUrl = (endpoint: string, params?: Record<string, any>) => {
  // Ensure endpoint starts with a slash
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // For client-side, use relative URLs
  if (typeof window !== 'undefined') {
    let url = path;
    
    // Add query parameters if provided
    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
      
      const queryString = queryParams.toString();
      if (queryString) {
        url = `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
      }
    }
    
    return url;
  }
  
  // For server-side, use the appropriate base URL
  const baseUrl = getApiBaseUrl();
  const url = new URL(`${baseUrl}${path}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
};

/**
 * Makes a fetch request with standardized error handling and configuration
 * @param {string} url - The URL to fetch
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<T>} The parsed JSON response
 */
export async function fetchApi<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(options.headers || {})
      },
      signal: AbortSignal.timeout(15000), // 15 second timeout
      ...options
    };

    // Handle both absolute and relative URLs appropriately
    let finalUrl = url;
    
    // If not an absolute URL and running on server-side in development, prepend localhost
    if (!url.startsWith('http') && typeof window === 'undefined') {
      finalUrl = `http://localhost:3105${url.startsWith('/') ? url : `/${url}`}`;
    }

    const response = await fetch(finalUrl, defaultOptions);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

// Import blog post type or define it here
import type { BlogPost } from '../payload-types';

// Function to fetch blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // Create a relative URL - this will work both client and server side
    const url = `/api/blog-posts?where[slug][equals]=${encodeURIComponent(slug)}`;

    // Specify the correct return type for the API response
    const res = await fetchApi<PayloadApiResponse<BlogPost>>(url, {
      cache: "no-store",
    });

    return res?.docs?.[0] || null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}