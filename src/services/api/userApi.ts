import { client } from "./client";

export async function getOrCreateMyProfile(
  name: string,
  email: string
) {
  const profiles = await getMyProfile();

  if (profiles.length > 0) {
    return profiles[0];
  }

  const { data, errors } =
    await client.models.UserProfile.create({
      name,
      email,
    });

  if (errors?.length) {
    throw new Error(errors[0].message);
  }

  return data;
}

export async function getMyProfile() {
  const { data, errors } =
    await client.models.UserProfile.list({});

  if (errors?.length) {
    throw new Error(errors[0].message);
  }

  return data;
}