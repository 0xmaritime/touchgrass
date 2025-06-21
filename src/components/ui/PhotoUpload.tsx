import React, { useState, useRef } from 'react';
import { Camera, X } from 'lucide-react';

interface PhotoUploadProps {
  onPhotoUpload: (file: File) => void;
  currentPhotoUrl?: string;
  label?: string;
  description?: string;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  onPhotoUpload,
  currentPhotoUrl,
  label = 'Upload Photo',
  description = 'PNG, JPG, GIF up to 10MB',
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhotoUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onPhotoUpload(file);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the input
    }
    // Optionally, notify parent that photo has been removed
    // onPhotoUpload(null); // Or a specific "remove" action
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        {previewUrl ? (
          <div className="relative w-full h-48 flex items-center justify-center">
            <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain rounded-md" />
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-1 text-center">
            <Camera className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  accept="image/png, image/jpeg, image/gif"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
};
