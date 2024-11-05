import { useRef, useState, useEffect } from "react";
// import { useDropzone } from "react-dropzone";
import { ArrowUpOnSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Image } from "..";
import { cn } from "@/utils";

const API = '';
interface FileUploadProps {
  onChange: (files: File[], urls: string[]) => void;
  initialUrls?: string[]; // Array of initial file URLs from the server
}

export const FileUpload = ({ onChange, initialUrls = [] }: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [urls, setUrls] = useState<string[]>(initialUrls);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Whenever the files or URLs change, trigger the onChange handler
  useEffect(() => {
    onChange(files, urls);
  }, [files, urls, onChange]);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]); // Add new files
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  const handleRemoveUrl = (urlToRemove: string) => {
    setUrls((prevUrls) => prevUrls.filter((url) => url !== urlToRemove));
  };

  // const { getRootProps, isDragActive } = useDropzone({
  //   multiple: true, // Allow multiple file uploads
  //   noClick: true,
  //   onDrop: handleFileChange,
  //   onDropRejected: (error: any) => console.log(error),
  // });

  return (
    <div className="w-full" >
      <div className="p-10 group/file block rounded-lg w-full relative overflow-hidden">
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col">
          <div
            className={`flex w-full ${
              files.length || urls.length
                ? "justify-between items-center"
                : "justify-center items-center"
            } transition-all duration-150`}
          >
            <div
              className={`flex flex-col ${
                files.length || urls.length
                  ? "justify-start items-start"
                  : "justify-center items-center"
              } transition-all duration-150`}
            >
              <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
                Upload file
              </p>
              <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
                Drag or drop your files here or click to upload
              </p>
            </div>
            {(files.length > 0 || urls.length > 0) && (
              <div
                className="relative z-40 bg-white dark:bg-neutral-900 flex items-center cursor-pointer justify-center h-16 w-16 max-w-[8rem] rounded-md shadow-[0px_10px_50px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:file:scale-105"
                onClick={handleClick}
              >
                <ArrowUpOnSquareIcon className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
              </div>
            )}
          </div>

          {/* File and URL Preview */}
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {/* Render URLs first (existing images) */}
            {urls.length > 0 &&
              urls.map((url, idx) => (
                <div
                  key={`url-${idx}`}
                  className={cn(
                    "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md shadow-sm transition-transform duration-300"
                  )}
                >
                  <div className="flex relative">
                    {/* Image Preview */}
                    <div className="relative group">
                      <Image
                        src={`${API}/image/${url}`}
                        alt={`File ${idx}`}
                        width={320}
                        height={320}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <button
                        type="button"
                        className="absolute hidden group-hover:block bg-red-500 hover:bg-red-700 top-3 right-7 focus:outline-none rounded-md p-2"
                        onClick={() => handleRemoveUrl(url)}
                      >
                        <XCircleIcon className="h-6 w-6" />
                      </button>
                    </div>

                    {/* Fallback Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between w-full items-center gap-4">
                        {/* Use URL as file name */}
                        <p className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs">
                          {url.split("/").pop()}{" "}
                          {/* Extract the file name from URL */}
                        </p>
                        {/* Placeholder for file size */}
                        <p className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input">
                          ~1 MB {/* Default or estimated file size */}
                        </p>
                      </div>

                      <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                        {/* Placeholder file type */}
                        <p className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 ">
                          image/jpeg {/* Placeholder file type */}
                        </p>
                        {/* Mock last modified date (use a timestamp or dynamic date) */}
                        <p>Uploaded {new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {/* Render new files */}
            {files.length > 0 &&
              files.map((file, idx) => (
                <div
                  key={`file-${idx}`}
                  className={cn(
                    "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md shadow-sm transition-transform duration-300"
                  )}
                >
                  <div className="flex relative">
                    {file.type.startsWith("image/") && (
                      <div className="relative group">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          width={320}
                          height={320}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <button
                          type="button"
                          className="absolute hidden group-hover:block bg-red-500 hover:bg-red-700 top-3 right-7 focus:outline-none rounded-md p-2"
                          onClick={() => handleRemoveFile(file)}
                        >
                          <XCircleIcon className="h-6 w-6" />
                        </button>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between w-full items-center gap-4">
                        <p className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs">
                          {file.name}
                        </p>
                        <p className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                      <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                        <p className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800">
                          {file.type}
                        </p>
                        <p>
                          modified{" "}
                          {new Date(file.lastModified).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {/* Empty Upload Box */}
            {!files.length && !urls.length && (
              <div
                onClick={handleClick}
                className={cn(
                  "relative z-40 bg-white dark:bg-neutral-900 flex items-center cursor-pointer justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md shadow-[0px_10px_50px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:file:scale-105"
                )}
              >
                {/* {isDragActive ? (
                  <p className="text-neutral-600 flex flex-col items-center">
                    Drop it
                    <ArrowUpOnSquareIcon className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </p>
                ) : (
                  <ArrowUpOnSquareIcon className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )} */}
                (
                <ArrowUpOnSquareIcon className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// GridPattern component remains unchanged
export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
