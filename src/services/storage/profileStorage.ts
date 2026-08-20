import { getUrl, uploadData } from "aws-amplify/storage";

export async function uploadProfilePicture(file: File) {
  const key = "profile.png";

  return uploadData({
    path: ({ identityId }) =>
      `private/${identityId}/${key}`,
    data: file,
    options: {
      contentType: file.type,
    },
  }).result;
}

export async function getProfilePictureUrl() {
  const result = await getUrl({
    path: ({ identityId }) =>
      `private/${identityId}/profile.png`,
  });

  return result.url.toString();
}