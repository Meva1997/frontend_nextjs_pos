"use client";

import { uploadImage } from "@/actions/upload-image-action";
import { getImagePath } from "@/src/utils";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadProductImage({
  currentimage,
}: {
  currentimage?: string;
}) {
  const [image, setImage] = useState("");
  const onDrop = useCallback(async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });
    const image = await uploadImage(formData);
    setImage(image);
  }, []);
  const {
    getInputProps,
    getRootProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    accept: {
      "image/jpeg": [".jpg"],
      "image/png": [".png"],
    },
    onDrop,
  });

  return (
    <>
      <div className="space-y-1">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Product Image
        </label>
        <div
          {...getRootProps({
            className: `
            py-20 border-2 border-dashed  text-center 
            ${
              isDragActive
                ? "border-gray-900 text-gray-900 bg-gray-200 "
                : "border-gray-400 text-gray-400 bg-white"
            } 
            ${isDragReject ? "border-none bg-white" : "cursor-not-allowed"}
        `,
          })}
        >
          <input {...getInputProps()} />
          {isDragAccept && <p>Drop image</p>}
          {isDragReject && <p>Invalid file</p>}
          {!isDragActive && <p>Drag and drop an image here</p>}
        </div>
      </div>
      {image && (
        <div className="py-5 space-y-3">
          <p className="font-bold">Product image</p>
          <div className="w-[300px] h-[300px] relative">
            <Image
              src={image}
              alt="Product image"
              fill
              sizes="300px"
              className="object-cover w-auto h-auto"
            />
          </div>
        </div>
      )}
      {currentimage && !image && (
        <div className="py-5 space-y-3">
          <p className="font-bold">Current image</p>
          <div className="w-[300px] h-[300px] relative">
            <Image
              src={getImagePath(currentimage)}
              alt="Current product image"
              fill
              sizes="300px"
              className="object-cover w-auto h-auto"
            />
          </div>
        </div>
      )}

      <input
        type="hidden"
        name="image"
        defaultValue={image ? image : currentimage}
      />
    </>
  );
}
