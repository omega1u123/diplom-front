import { ErrorMessages } from "@/utils/formMessages";
import { toast } from "react-toastify";

export const uploadFileToMinio = async (file: File, url: string) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!response.ok) {
      toast.info(`${ErrorMessages.ADS_FILE_UPLOAD_FILED}: ${file.name}`);
    }
  } catch (error) {
    console.error(`${ErrorMessages.ADS_FILE_UPLOAD_ERROR}: ${error}`);
    throw error;
  }
};
