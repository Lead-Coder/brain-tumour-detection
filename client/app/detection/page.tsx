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

const tumorTypes = ["Glioma", "Meningioma", "Pituitary"]

export default function Detection() {
  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (selectedFile: File | null) => {
    if (!selectedFile) return

    // Validate file
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
    const droppedFile = e.dataTransfer.files[0]
    handleFileSelect(droppedFile)
  }

  const handleAnalyze = async () => {
    if (!file) return

    setAnalyzing(true)
    setError(null)

    // Simulate API call with timeout
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate mock result
    const hasTumor = Math.random() > 0.3
    const mockResult: AnalysisResult = hasTumor
      ? {
          status: "tumor",
          tumorType: tumorTypes[Math.floor(Math.random() * tumorTypes.length)] as any,
          confidence: Math.round((0.85 + Math.random() * 0.15) * 100),
        }
      : {
          status: "no_tumor",
          confidence: Math.round((0.9 + Math.random() * 0.1) * 100),
        }

    setResult(mockResult)
    setAnalyzing(false)
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
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">MRI Analysis</h1>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto text-balance">
              Upload your MRI image to analyze for brain tumors using our advanced AI model
            </p>
          </div>

          <div className="space-y-8">
            {/* Upload Area */}
            {!image && (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-primary/30 rounded-xl p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all animate-slide-up"
              >
                <Upload className="w-16 h-16 mx-auto mb-4 text-primary/60" />
                <h3 className="text-xl font-semibold mb-2">Upload your MRI scan</h3>
                <p className="text-foreground/60 mb-4">
                  Drag and drop your image or click to browse (JPEG, PNG - max 5MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                  className="hidden"
                  aria-label="Upload MRI image"
                />
              </div>
            )}

            {/* Image Preview */}
            {image && (
              <div className="space-y-6 animate-slide-up">
                <div className="relative rounded-xl overflow-hidden border border-border bg-card p-6">
                  <img
                    src={image || "/placeholder.svg"}
                    alt="MRI Scan"
                    className="w-full h-96 object-contain rounded-lg"
                  />
                </div>

                {/* Analysis Section */}
                {!result && !analyzing && (
                  <div className="flex gap-4">
                    <button
                      onClick={handleAnalyze}
                      className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:shadow-lg"
                    >
                      Analyze Image
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 px-6 py-3 bg-card border border-border rounded-lg font-semibold hover:bg-muted transition-all"
                    >
                      Upload New Image
                    </button>
                  </div>
                )}

                {/* Loading State */}
                {analyzing && (
                  <div className="flex flex-col items-center justify-center gap-4 py-12 animate-pulse">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
                      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin" />
                    </div>
                    <p className="text-lg font-semibold">Analyzing your scan...</p>
                    <p className="text-foreground/60">This typically takes 2-3 seconds</p>
                  </div>
                )}

                {/* Results */}
                {result && (
                  <div className="space-y-6 animate-slide-up">
                    {/* Status Card */}
                    <div
                      className={`rounded-xl p-8 border-2 ${
                        result.status === "no_tumor"
                          ? "border-green-500/30 bg-green-500/5"
                          : "border-amber-500/30 bg-amber-500/5"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {result.status === "no_tumor" ? (
                          <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
                        ) : (
                          <AlertCircle className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" />
                        )}
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-2">
                            {result.status === "no_tumor" ? "No Tumor Detected" : "Tumor Detected"}
                          </h3>
                          <p className="text-foreground/70">
                            {result.status === "no_tumor"
                              ? "The analysis indicates no tumor is present in the scan."
                              : `A ${result.tumorType} tumor has been identified. Please consult with a medical professional for further evaluation.`}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Results */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Confidence Score */}
                      <div className="p-6 rounded-xl border border-border bg-card">
                        <p className="text-foreground/60 text-sm font-medium mb-2">Confidence Score</p>
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-4xl font-bold text-primary">{result.confidence}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${result.confidence}%` }}
                          />
                        </div>
                      </div>

                      {/* Tumor Type */}
                      {result.tumorType && (
                        <div className="p-6 rounded-xl border border-border bg-card">
                          <p className="text-foreground/60 text-sm font-medium mb-2">Classification</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-primary">{result.tumorType}</span>
                          </div>
                          <p className="text-foreground/60 text-sm mt-3">Type identified from tumor characteristics</p>
                        </div>
                      )}
                    </div>

                    {/* Medical Disclaimer */}
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <p className="text-sm text-foreground/70">
                        <strong>Important:</strong> This analysis is for informational purposes only and should not be
                        used as a substitute for professional medical advice. Please consult with a qualified healthcare
                        provider for proper diagnosis and treatment.
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button
                        onClick={handleReset}
                        className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
                      >
                        Analyze Another Image
                      </button>
                      <button
                        onClick={() => {
                          const link = document.createElement("a")
                          link.href = image
                          link.download = "mri-analysis-result.txt"
                          link.click()
                        }}
                        className="flex-1 px-6 py-3 bg-card border border-border rounded-lg font-semibold hover:bg-muted transition-all"
                      >
                        Download Results
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex gap-3 animate-slide-up">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
