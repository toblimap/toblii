/**
 * Safe fetch wrapper to handle non-JSON responses and network errors.
 */
export async function safeFetch(url, options = {}) {
  try {
    const response = await fetch(url, options);
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
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error [${url}]:`, error);
    throw error;
  }
}
