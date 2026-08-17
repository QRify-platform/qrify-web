export type AuthConfig = {
  region: string;
  userPoolId: string;
  clientId: string;
  domain: string;
  issuer: string;
};

export type AuthProfile = {
  sub?: string;
  email?: string;
  name?: string;
};

export type OauthTokens = {
  access_token: string;
  id_token: string;
  refresh_token?: string;
  token_type?: string;
  expires_in?: number;
};
