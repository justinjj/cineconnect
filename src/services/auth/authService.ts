import { signUp, confirmSignUp, signIn, getCurrentUser, fetchAuthSession, signOut } from "aws-amplify/auth";

export async function registerUser(
  email: string,
  password: string
) {
  return signUp({
    username: email,
    password,
  })
}

export async function confirmUserSignUp(
  email: string,
  confirmationCode: string
) {
  return confirmSignUp({
    username: email,
    confirmationCode,
  })
}

export async function loginUser(
  email: string,
  password: string,
) {
  return signIn({
    username: email,
    password,
  })
}

export async function getAuthenticatedUser() {
  return getCurrentUser();
}

export async function getCurrentAuthSession() {
  return fetchAuthSession();
}

export async function logoutUser() {
  return signOut();
}


