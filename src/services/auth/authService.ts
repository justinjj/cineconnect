import { 
  signUp, 
  confirmSignUp, 
  signIn, 
  getCurrentUser, 
  fetchAuthSession, 
  signOut,
  fetchUserAttributes,
} from "aws-amplify/auth";

export async function registerUser(
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
      }
    }
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

export async function getCurrentUserAttributes() {
  return fetchUserAttributes();
}

