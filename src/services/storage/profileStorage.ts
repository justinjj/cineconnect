import { uploadData, getUrl } from "aws-amplify/storage";

const PROFILE_KEY = "profile.png";

export async function uploadProfilePicture(file: File) {
  const result = await uploadData({
    path: ({ identityId }) =>
      `private/${identityId}/${PROFILE_KEY}`,
    data: file,
    options: {
      contentType: file.type,
    },
  }).result;

  return result;
}

export async function getProfilePictureUrl() {
  const result = await getUrl({
    path: ({ identityId }) =>
      `private/${identityId}/${PROFILE_KEY}`,
  });

  return result.url.toString();
}