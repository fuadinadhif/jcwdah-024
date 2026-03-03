import React, { useState, useRef } from "react";
import { v4 as uuidV4 } from "uuid";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { apiClient } from "@/api/client";
import { API_ENDPOINTS } from "@/api/endpoints";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  name: string;
  rawFile: File;
  preview: string;
}

export default function CreateEventPage() {
  const [eventData, setEventData] = useState({
    title: "",
    location: "",
    price: 0,
  });
  const [singleFile, setSingleFile] = useState<UploadedFile | null>(null);
  const [multipleFile, setMultipleFile] = useState<UploadedFile[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleSingleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    // 1. Akan mengambil gambar pertama dari input file
    const selectedFile = event.target.files?.[0];

    // 2. Memastikan file yang diupload benar-benar ada
    if (selectedFile) {
      // 3. Validasi file size
      if (selectedFile.size > 1024 * 1024 * 10) {
        setError("File size must be less than 5 MB");
        return;
      }

      // 4. Validasi file type
      if (!selectedFile.type.startsWith("image/")) {
        setError("Please select an image");
        return;
      }

      // 5. Membuat object file reader
      const reader = new FileReader();

      // 6. Meminta reader untuk mengubah file format menjadi base64
      reader.readAsDataURL(selectedFile);

      // 7. onload akan dijalankan setelah reader selesai diproses
      reader.onload = (event) => {
        const preview = event.target?.result as string;

        setSingleFile({
          id: uuidV4(),
          name: selectedFile.name,
          rawFile: selectedFile,
          preview,
        });
      };
    }
  }

  async function handleSingleFileSubmit(event: React.SubmitEvent) {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", eventData.title);
      formData.append("location", eventData.location);
      formData.append("price", String(eventData.price));
      formData.append("singleImage", singleFile!.rawFile);

      await apiClient.post(API_ENDPOINTS.EVENTS.CREATE, formData, {
        headers: { "content-type": "multipart/form-data" },
      });

      toast.success("Event created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    }
  }

  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Single Upload</CardTitle>
          <CardDescription>Upload single image to the server</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSingleFileSubmit}>
            <input
              type="text"
              placeholder="Event title..."
              value={eventData.title}
              onChange={(event) =>
                setEventData({ ...eventData, title: event.target.value })
              }
            />
            <input
              type="text"
              placeholder="Event location..."
              value={eventData.location}
              onChange={(event) =>
                setEventData({ ...eventData, location: event.target.value })
              }
            />
            <input
              type="number"
              placeholder="Event price..."
              value={eventData.price}
              onChange={(event) =>
                setEventData({ ...eventData, price: +event.target.value })
              }
            />

            {singleFile ? (
              <div>
                <img
                  src={singleFile.preview || "/placeholder.svg"}
                  alt={singleFile.name}
                />
                <button
                  onClick={() => {
                    setSingleFile(null);
                  }}
                >
                  <X />
                </button>
              </div>
            ) : (
              <div onClick={() => inputRef.current?.click()}>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={inputRef}
                  onChange={handleSingleInputChange}
                />
                <Upload />
                <p>Drag and drop your image or click to browse</p>
                <p>PNG, JPEG, and JPG only. Up to 5MB</p>
              </div>
            )}

            {error && <p>{error}</p>}

            <button type="submit">Upload</button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
