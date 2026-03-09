/**
 * Safe fetch wrapper to handle non-JSON responses and network errors.
 */
export async function safeFetch(url, options = {}) {
  // respect VITE_API_URL if provided so that the dev client can
  // point at a local worker/process. fall back to relative path.
  const base = import.meta.env.VITE_API_URL || '';
  try {
    const response = await fetch(base + url, options);
    const contentType = response.headers.get('content-type');
    
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // If not JSON, get the text body
      const text = await response.text();
      // If response is not OK, throw error with status
      if (!response.ok) {
        throw new Error(`Server Error (${response.status}): ${text.substring(0, 100)}`);
      }
      return text;
    }

    if (!response.ok) {
      if (response.status === 404) {
        // common when the vite dev server has no /api proxy
        throw new Error('API endpoint not found (404). Be sure the backend is running or set VITE_API_URL.');
      }
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error [${url}]:`, error);
    throw error;
  }
}
