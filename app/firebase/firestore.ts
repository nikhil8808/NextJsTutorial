import { storage } from "./index"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

export const storeImage = async (file: any): Promise<string> => {
  try {
    const storageRef = ref(
      storage,
      `images/${Date.now()}-${file.name}`
    )

    await uploadBytes(storageRef, file)

    const downloadURL = await getDownloadURL(storageRef)
    return downloadURL
  } catch (error) {
    console.error("Image upload failed:", error)
    throw error
  }
}
