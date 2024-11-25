export const uploadAlbumToCloudinary = async (album, userId, biodataId) => {
  const processedImagesnew = Array.isArray(album) ? album : [album];
  const folderName = `KhandesiKoliVivah/${userId}_${biodataId}`;
  const uploadedPublicIds = []; // Initialize an empty array

  // console.log("Initial uploadedPublicIds:", uploadedPublicIds);

  for (const img of processedImagesnew) {
    if (img.startsWith("K")) {
      const individualIds = img.split(",").map((id) => id.trim());
      uploadedPublicIds.push(...individualIds);
    } else {
      const data = new FormData();
      data.append("file", { uri: img, name: "image.jpg", type: "image/jpeg" });
      data.append("upload_preset", "meadhikari");
      data.append("cloud_name", "sdchavan");
      data.append("folder", folderName);

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/sdchavan/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const result = await response.json();
        if (result.public_id) {
          uploadedPublicIds.push(result.public_id); // Push the new public ID
          //   console.log("Uploaded new public ID:", result.public_id);
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        Alert.alert(
          "Upload Error",
          "An error occurred while uploading images."
        );
        return null;
      }
    }
  }

  // console.log("Final uploadedPublicIds:", uploadedPublicIds);
  return uploadedPublicIds; // Return the array with all collected IDs
};
