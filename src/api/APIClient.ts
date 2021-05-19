import axios from 'axios';

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export class APIClient implements NetworkClient {
  static instance = new APIClient();

  baseURL: string = 'https://www.anapioficeandfire.com';
  timeout: number = 15 * 1000;

  request<U extends APIResponse>(request: APIRequest<U>): Promise<U> {
    const isRead = request.method === HTTPMethod.GET;

    return new Promise<U>((resolve, reject) => {
      axios
        .request({
          url: request.path,
          method: request.method,
          params: isRead && request.params,
          data: !isRead && request.params,
          // withCredentials: true,
          timeout: this.timeout,
          baseURL: request.baseURL || this.baseURL,
          headers: this.createHeaders(),
        })
        .then((data) => {
          const response = request.parse
            ? request.parse(data)
            : this.parse<U>(data);
          resolve(response);
        })
        .catch((err) => {
          const apiError = this.normalizeError(err);
          reject(apiError);
        });
    });
  }

  private parse<U extends APIResponse>(data: any): U {
    return data;
  }

  // axios 오류를 APIError로 변환
  private normalizeError(error: any): APIError {
    return {
      status: error.response && error.response.status,
      message: error.message,
      raw: error,
    };
  }

  // header 생성
  private createHeaders(): any {
    return {};
  }
}

export interface APIError {
  message: string;
  status: number;
  raw: Error;
}

export interface APIRequest<R extends APIResponse> {
  response: R | undefined;
  path: string;
  method: HTTPMethod;
  params?: any;
  baseURL?: string;
  parse?: (data: any) => R;
}

export interface APIResponse {}
export interface NetworkClient {}
