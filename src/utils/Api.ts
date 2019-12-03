import { IApiResponse } from './Api.types';

/**
 * Gets the base url for APIs
 * This is mainly to easily change the base url outside the .env file
 */
function getBaseUrl() {
  return process.env.REACT_APP_BASE_URL;
}

class Api {
  /**
   * @public
   * @param url
   * @param headers
   */
  public static get = (url: string, headers?: string[][]) => Api.makeRequest('get', url, headers);

  /**
   * @public
   * @param url
   * @param body
   * @param headers
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static post = <T = Object>(url: string, body: T, headers?: string[][]) =>
    Api.makeRequest<T>('post', url, headers, body);

  /**
   * @public
   * @param url
   * @param body
   * @param headers
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static put = <T = Object>(url: string, body: T, headers?: string[][]) =>
    Api.makeRequest<T>('put', url, headers, body);

  /**
   * @public
   * @param url
   * @param headers
   */
  public static delete = (url: string, headers?: string[][]) => Api.makeRequest('delete', url, headers);

  /**
   * @protected
   * @param method
   * @param url
   * @param body
   * @param headers
   * @returns Promise<IApiResponse>
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  protected static makeRequest = async <T = Object>(
    method: string,
    url: string,
    headers?: string[][],
    body?: T,
  ): Promise<IApiResponse> => {
    // First, we need the current JWT token in all requests
    // TODO: Add the token cookie
    const token = '';

    /**
     * @fixme include polyfills for older browsers
     * Create a new headers object
     */
    const headersConfig = new Headers(headers);
    headersConfig.append('Content-Type', 'application/json');
    headersConfig.append('Authorization', `Bearer ${token}`);

    // Setup fetch request config, we pascalize object keys due to C# naming convention
    const config: RequestInit = {
      method,
      headers: headersConfig,
      body: body ? JSON.stringify(body) : undefined,
    };

    // Wait for the API response
    // process.env.REACT_APP_BASE_URL can be found in /env/.env.{env}
    const response: Response = await fetch(`${getBaseUrl()}/api/${url}`, config);
    const jsonResponse = await response.json();

    const apiResponse: IApiResponse = {
      status: response.status,
      result: jsonResponse.result,
      errors: jsonResponse.errors,
      errorMessage: jsonResponse.errorMessage || `${jsonResponse.errorMessage}` || jsonResponse.message,
    };

    return apiResponse;
  };
}

export default Api;
