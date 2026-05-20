"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImageUploaderProps {
  value?: string | string[]
  onChange: (value: string | string[]) => void
  multiple?: boolean
  maxFiles?: number
  maxSize?: number // in MB
  folder?: string // upload folder (projects, services, etc.)
}

export function ImageUploader({
  value,
  onChange,
  multiple = false,
  maxFiles = 10,
  maxSize = 10,
  folder = "projects",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const currentImages = Array.isArray(value)
    ? value.filter(v => v) // Filter out empty strings
    : value
    ? [value]
    : []

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", folder)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        return result.url
      } else {
        throw new Error(result.message || "Yükleme başarısız")
      }
    } catch (err) {
      console.error("Upload error:", err)
      throw err
    }
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null)
      setUploading(true)
      setUploadProgress(0)

      try {
        // Validate file sizes
        for (const file of acceptedFiles) {
          if (file.size > maxSize * 1024 * 1024) {
            setError(`Dosya boyutu ${maxSize}MB'dan küçük olmalıdır`)
            setUploading(false)
            return
          }
        }

        // Upload files one by one
        const uploadedUrls: string[] = []
        for (let i = 0; i < acceptedFiles.length; i++) {
          const file = acceptedFiles[i]
          const url = await uploadFile(file)
          if (url) {
            uploadedUrls.push(url)
          }
          setUploadProgress(Math.round(((i + 1) / acceptedFiles.length) * 100))
        }

        if (uploadedUrls.length > 0) {
          if (multiple) {
            onChange([...currentImages, ...uploadedUrls])
          } else {
            onChange(uploadedUrls[0])
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Yükleme başarısız oldu")
      } finally {
        setUploading(false)
        setUploadProgress(0)
      }
    },
    [currentImages, multiple, onChange, maxSize, folder]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    multiple,
    maxFiles: multiple ? maxFiles : 1,
    disabled: uploading,
  })

  const removeImage = (index: number) => {
    if (multiple) {
      const newImages = currentImages.filter((_, i) => i !== index)
      onChange(newImages)
    } else {
      onChange("")
    }
  }

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 mb-4 text-blue-500 animate-spin" />
            <p className="text-blue-600">Yükleniyor... {uploadProgress}%</p>
          </div>
        ) : isDragActive ? (
          <>
            <Upload className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <p className="text-blue-600">Dosyayı buraya bırakın...</p>
          </>
        ) : (
          <div>
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-2">
              Resim yüklemek için tıklayın veya sürükleyin
            </p>
            <p className="text-sm text-gray-400">
              PNG, JPG, GIF, WEBP (max {maxSize}MB)
            </p>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
          {error}
        </div>
      )}

      {/* Preview */}
      {currentImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentImages.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border">
                {url ? (
                  <Image
                    src={url}
                    alt={`Upload ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                    unoptimized={url.startsWith("/uploads")}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-300" />
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
                onClick={() => removeImage(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
