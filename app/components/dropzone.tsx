"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImageIcon } from "@/app/icons/image-icon";
import { updateOrgLogo } from "../(platform)/organization/services/upload-org-logo";
import { toast } from "react-toastify";

interface DropzoneProps {
  setIsLoading: (isLoading: boolean) => void;
  handleUpload: (image: string) => void;
}

export const Dropzone = ({ handleUpload, setIsLoading }: DropzoneProps) => {
  const onDropAccepted = useCallback(async (acceptedFiles: File[]) => {
    setIsLoading(true);
    try {
      const result = await updateOrgLogo({ file: acceptedFiles[0] });
      handleUpload(result?.url);
      toast.success("Image was uploaded successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }

    setIsLoading(false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted,
  });

  return (
    <div
      {...getRootProps()}
      className="border rounded-md border-dashed bg-neutral-100 border-neutral-300 w-full py-5"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col gap-1 items-center justify-center">
        <ImageIcon size={24} />
        <div className="flex flex-col gap">
          <span className="text-center font-semibold">Drop an image here</span>
          <span className="text-center">40 x 40px</span>
          <span className="text-center text-neutral-500">
            or click to browse
          </span>
        </div>
      </div>
    </div>
  );
};
