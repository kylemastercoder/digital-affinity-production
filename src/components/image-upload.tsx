"use client";

import { uploadToS3 } from "@/lib/s3";
import { Inbox, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "./ui/button";

const ImageUpload = ({ onImageUpload, defaultValue }: { onImageUpload: (url: string) => void, defaultValue: string; }) => {
  const [imageUrl, setImageUrl] = useState(defaultValue || "");
  const [uploadProgress, setUploadProgress] = useState(0);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg", ".jpeg"],
      "image/svg+xml": [".svg"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Please upload a smaller image.");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);

      try {
        for (let i = 0; i <= 100; i++) {
          setTimeout(() => setUploadProgress(i), i * 30);
        }

        const { url } = await uploadToS3(file);
        setUploadProgress(100);
        toast.success("Image uploaded successfully!");
        console.log(url);
        onImageUpload(url);
      } catch (error) {
        setUploadProgress(0);
        toast.error("Image upload failed.");
        console.log(error);
      }
    },
  });

  const handleRemoveImage = () => {
    setImageUrl("");
    setUploadProgress(0);
    toast.info("Image removed.");
    onImageUpload("");
  };

  return (
    <div className="rounded-md w-full mx-auto">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-md cursor-pointer bg-black py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {imageUrl ? (
          <div className="relative w-[280px] h-[150px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button
                variant="destructive"
                type="button"
                size="icon"
                onClick={handleRemoveImage}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <Image src={imageUrl} alt="Image" className="object-cover" fill />
          </div>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop your proof of payment here.</p>
          </>
        )}
      </div>

      {uploadProgress > 0 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-blue-500">
            {uploadProgress}% uploaded
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
