/** Runtime Cognito settings served by /api/auth/config. */
export type AuthConfig = {
  region: string;
  userPoolId: string;
  clientId: string;
  domain: string;
  issuer: string;
};

/** The signed-in user, decoded from the id token. */
export type AuthProfile = {
  sub?: string;
  email?: string;
  name?: string;
};

/** Token payload returned by the Cognito OAuth token endpoint. */
export type OauthTokens = {
  access_token: string;
  id_token: string;
  refresh_token?: string;
};
