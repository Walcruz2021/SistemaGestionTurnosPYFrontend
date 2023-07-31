export interface AuthResponse {
  body:{
    accessToken: string;
    refreshToken: string;
    user: User;
  }
}

export interface AuthResponseError {
  body: {
    error: string;
  };
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface AccessTokenResponse {
  statusCode: number;
  body: {
    accessToken: string;
  };
  error?: string;
}
