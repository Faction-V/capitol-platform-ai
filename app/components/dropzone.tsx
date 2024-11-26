"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImageIcon } from "@/app/icons/image-icon";

export const Dropzone = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
