import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  type CognitoUserSession,
  type ISignUpResult,
} from 'amazon-cognito-identity-js';
import { fetchAuthConfig, userPoolFrom } from './config';
import { storeCognitoSession } from './session';

async function cognitoUserFor(email: string): Promise<CognitoUser> {
  const config = await fetchAuthConfig();
  return new CognitoUser({
    Username: email.trim(),
    Pool: userPoolFrom(config),
  });
}

export async function signInWithPassword(
  email: string,
  password: string
): Promise<CognitoUserSession> {
  const user = await cognitoUserFor(email);
  const details = new AuthenticationDetails({
    Username: email.trim(),
    Password: password,
  });

  return new Promise((resolve, reject) => {
    user.authenticateUser(details, {
      onSuccess: (session) => {
        storeCognitoSession(session);
        resolve(session);
      },
      onFailure: reject,
      newPasswordRequired: () =>
        reject(
          new Error(
            'Password reset required. Check your email or contact support.'
          )
        ),
    });
  });
}

export async function signUpWithPassword(
  email: string,
  password: string
): Promise<ISignUpResult | undefined> {
  const config = await fetchAuthConfig();
  const pool = userPoolFrom(config);
  const attributes = [
    new CognitoUserAttribute({ Name: 'email', Value: email.trim() }),
  ];

  return new Promise((resolve, reject) => {
    pool.signUp(email.trim(), password, attributes, [], (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
}

export async function confirmSignUp(
  email: string,
  code: string
): Promise<void> {
  const user = await cognitoUserFor(email);

  return new Promise((resolve, reject) => {
    user.confirmRegistration(code.trim(), true, (err) =>
      err ? reject(err) : resolve()
    );
  });
}

export async function resendConfirmationCode(email: string): Promise<void> {
  const user = await cognitoUserFor(email);

  return new Promise((resolve, reject) => {
    user.resendConfirmationCode((err) => (err ? reject(err) : resolve()));
  });
}
