"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImageIcon } from "@/app/icons/image-icon";
import { updateOrgLogo } from "../(admin)/organization/services/upload-org-logo";

const handleImageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  // try {
  //   const response = await axios.post(
  //     "http://a1ab86825a553444a99225e96a91e174-1009329405.us-east-1.elb.amazonaws.com/api/v1/org/logo",
  //     formData,
  //   );
  //   // Handle the enhanced image response here
  //   console.log("Enhanced image:", response.data);
  //   // Update state or display the enhanced image
  // } catch (error) {
  //   console.error("Error enhancing image:", error);
  // }

  await updateOrgLogo({ formData });
};

export const Dropzone = () => {
  const onDrop = useCallback(() => {
    // Do something with the files
  }, []);
  const onDropAccepted = useCallback(async (acceptedFiles: File[]) => {
    const result = await handleImageUpload(acceptedFiles[0]);
    console.log("result", result);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropAccepted,
  });

  return (
    <div
      {...getRootProps()}
      className="border rounded-md border-dashed bg-neutral-100 border-neutral-300 w-full py-5"
    >
      <input {...getInputProps()} />
      {/*{isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}*/}
      <div className="flex flex-col gap-1 items-center justify-center">
        <ImageIcon size={24} />
        <div className="flex flex-col gap">
          <span className="text-center font-semibold">Drop an image here</span>
          <span className="text-center text-neutral-500">
            or click to browse
          </span>
        </div>
      </div>
    </div>
  );
};
