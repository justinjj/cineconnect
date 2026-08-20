import {
  confirmSignUp,
  fetchUserAttributes,
  getCurrentUser,
  resendSignUpCode,
  signIn,
  signOut,
  signUp,
} from "aws-amplify/auth";

export async function login(
  email: string,
  password: string
) {
  return signIn({
    username: email,
    password,
  });
}

export async function register(
  name: string,
  email: string,
  password: string
) {
  return signUp({
    username: email,
    password,
    options: {
      userAttributes: {
        name,
        email,
      },
    },
  });
}

export async function confirmRegistration(
  email: string,
  code: string
) {
  return confirmSignUp({
    username: email,
    confirmationCode: code,
  });
}

export async function resendConfirmationCode(
  email: string
) {
  return resendSignUpCode({
    username: email,
  });
}

export async function getCurrentAuthenticatedUser() {
  return getCurrentUser();
}

export async function getCurrentUserAttributes() {
  return fetchUserAttributes();
}

export async function logout() {
  return signOut();
}