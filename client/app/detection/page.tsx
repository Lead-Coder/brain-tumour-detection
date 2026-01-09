"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Upload, AlertCircle, CheckCircle } from "lucide-react"

interface AnalysisResult {
  status: "tumor" | "no_tumor"
  tumorType?: "Glioma" | "Meningioma" | "Pituitary"
  confidence: number
}

interface BackendResponse {
  tumour_detected: boolean
  tumour_type: "glioma" | "meningioma" | "pituitary" | "notumour"
  confidence: number
}

export default function Detection() {
  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (selectedFile: File | null) => {
    if (!selectedFile) return

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB")
      return
    }

    if (!["image/jpeg", "image/png"].includes(selectedFile.type)) {
      setError("Please upload a JPEG or PNG image")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target?.result as string)
      setFile(selectedFile)
      setError(null)
      setResult(null)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleFileSelect(e.dataTransfer.files[0])
  }

  const formatTumorType = (type: BackendResponse["tumour_type"]) => {
    if (type === "notumour") return undefined
    return type.charAt(0).toUpperCase() + type.slice(1) as
      | "Glioma"
      | "Meningioma"
      | "Pituitary"
  }

  const handleAnalyze = async () => {
    if (!file) return

    setAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await fetch("http://localhost:8000/api/predict/", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to analyze image")
      }

      const data: BackendResponse = await response.json()

      const formattedResult: AnalysisResult = data.tumour_detected
        ? {
            status: "tumor",
            tumorType: formatTumorType(data.tumour_type),
            confidence: Math.round(data.confidence),
          }
        : {
            status: "no_tumor",
            confidence: Math.round(data.confidence),
          }

      setResult(formattedResult)
    } catch {
      setError("Something went wrong while analyzing the image. Please try again.")
    } finally {
      setAnalyzing(false)
    }
  }

  const handleReset = () => {
    setImage(null)
    setFile(null)
    setResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">MRI Analysis</h1>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Upload your MRI image to analyze for brain tumors using our AI model
            </p>
          </div>

          {!image && (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-primary/30 rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <Upload className="w-16 h-16 mx-auto mb-4 text-primary/60" />
              <h3 className="text-xl font-semibold mb-2">Upload your MRI scan</h3>
              <p className="text-foreground/60 mb-4">
                Drag and drop or click to upload (JPEG, PNG)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                className="hidden"
              />
            </div>
          )}

          {image && (
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <img src={image} alt="MRI Scan" className="w-full h-96 object-contain" />
              </div>

              {!result && !analyzing && (
                <div className="flex gap-4">
                  <button
                    onClick={handleAnalyze}
                    className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
                  >
                    Analyze Image
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 px-6 py-3 bg-card border rounded-lg font-semibold"
                  >
                    Upload New Image
                  </button>
                </div>
              )}

              {analyzing && (
                <div className="flex flex-col items-center py-12">
                  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <p className="mt-4 font-semibold">Analyzing image...</p>
                </div>
              )}

              {result && (
                <div className="space-y-6">
                  <div
                    className={`rounded-xl p-8 border-2 ${
                      result.status === "no_tumor"
                        ? "border-green-500/30 bg-green-500/5"
                        : "border-amber-500/30 bg-amber-500/5"
                    }`}
                  >
                    <div className="flex gap-4">
                      {result.status === "no_tumor" ? (
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      ) : (
                        <AlertCircle className="w-8 h-8 text-amber-500" />
                      )}
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          {result.status === "no_tumor"
                            ? "No Tumor Detected"
                            : "Tumor Detected"}
                        </h3>
                        {result.status === "tumor" && result.tumorType && (
                          <p className="text-foreground/70">
                            Detected type: {result.tumorType}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl border bg-card">
                    <p className="text-sm text-foreground/60 mb-2">Confidence</p>
                    <p className="text-4xl font-bold text-primary">
                      {result.confidence}%
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
                  >
                    Analyze Another Image
                  </button>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
