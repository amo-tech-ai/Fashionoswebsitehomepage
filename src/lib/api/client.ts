/**
 * API Client Utilities
 * Simple fetch wrappers for API calls (no auth yet)
 */

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * GET request
 */
export async function apiGet<T = any>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`/api${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new APIError(
        error.message || 'API request failed',
        response.status,
        error
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) throw error;
    throw new APIError('Network error', 0, error);
  }
}

/**
 * POST request
 */
export async function apiPost<T = any>(endpoint: string, data: any): Promise<T> {
  try {
    const response = await fetch(`/api${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new APIError(
        error.message || 'API request failed',
        response.status,
        error
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) throw error;
    throw new APIError('Network error', 0, error);
  }
}

/**
 * PUT request
 */
export async function apiPut<T = any>(endpoint: string, data: any): Promise<T> {
  try {
    const response = await fetch(`/api${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new APIError(
        error.message || 'API request failed',
        response.status,
        error
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) throw error;
    throw new APIError('Network error', 0, error);
  }
}

/**
 * DELETE request
 */
export async function apiDelete<T = any>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`/api${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new APIError(
        error.message || 'API request failed',
        response.status,
        error
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) throw error;
    throw new APIError('Network error', 0, error);
  }
}
