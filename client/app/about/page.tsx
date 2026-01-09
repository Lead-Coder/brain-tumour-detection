"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">About BrainTrust</h1>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto text-balance">
              Revolutionizing brain tumor detection through advanced artificial intelligence
            </p>
          </div>

          {/* Project Overview */}
          <section className="space-y-6 animate-slide-up">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-foreground/70 leading-relaxed">
              BrainTrust is dedicated to transforming medical diagnostics through cutting-edge artificial intelligence.
              Our mission is to provide healthcare professionals with a powerful tool that enhances accuracy, speeds up
              diagnosis, and ultimately improves patient outcomes.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              By leveraging state-of-the-art machine learning algorithms trained on thousands of verified MRI scans,
              we've created a system that can detect and classify brain tumors with remarkable precision and
              reliability.
            </p>
          </section>

          {/* Technology */}
          <section className="space-y-6 animate-slide-up">
            <h2 className="text-3xl font-bold">Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Deep Learning Model",
                  description:
                    "Built on state-of-the-art convolutional neural networks trained on 50,000+ verified MRI scans",
                },
                {
                  title: "Real-time Analysis",
                  description: "Process and analyze images in 2-3 seconds for immediate clinical decision support",
                },
                {
                  title: "Multi-class Classification",
                  description: "Accurately identifies Glioma, Meningioma, Pituitary tumors, and normal cases",
                },
                {
                  title: "Confidence Scoring",
                  description: "Provides detailed confidence metrics to support clinical judgment",
                },
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-foreground/60 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Performance */}
          <section className="space-y-6 animate-slide-up">
            <h2 className="text-3xl font-bold">Performance & Accuracy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Overall Accuracy", value: "98.5%" },
                { label: "Sensitivity", value: "97.2%" },
                { label: "Specificity", value: "99.1%" },
              ].map((stat, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-border bg-card text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-foreground/60">{stat.label}</div>
                </div>
              ))}
            </div>
            <p className="text-foreground/70 leading-relaxed">
              Our model has been validated across multiple independent datasets and consistently demonstrates high
              performance in detecting and classifying brain tumors. These metrics reflect rigorous testing on a diverse
              patient population.
            </p>
          </section>

          {/* Key Features */}
          <section className="space-y-6 animate-slide-up">
            <h2 className="text-3xl font-bold">Key Features</h2>
            <div className="space-y-4">
              {[
                "HIPAA compliant with enterprise-grade security",
                "Support for JPEG and PNG image formats",
                "Instant analysis results with confidence scores",
                "Four-class tumor classification system",
                "User-friendly interface for medical professionals",
                "Detailed reporting and result documentation",
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 items-start animate-slide-up"
                  style={{ animationDelay: `${(idx + 1) * 0.05}s` }}
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Medical Disclaimer */}
          <section className="space-y-6 animate-slide-up">
            <h2 className="text-3xl font-bold">Medical Disclaimer</h2>
            <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex gap-4 items-start">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-3">
                  <p className="font-semibold text-foreground">Important Notice</p>
                  <p className="text-foreground/80 leading-relaxed">
                    BrainTrust is a clinical decision support tool and should not be used as a replacement for
                    professional medical advice, diagnosis, or treatment. The results provided by this system are for
                    informational purposes only.
                  </p>
                  <p className="text-foreground/80 leading-relaxed">
                    All diagnostic findings must be reviewed and confirmed by qualified medical professionals.
                    BrainTrust does not assume responsibility for the misuse of analysis results or any adverse outcomes
                    resulting from its use.
                  </p>
                  <p className="text-foreground/80 leading-relaxed">
                    Users must comply with all applicable laws and regulations, including those related to medical data
                    privacy (HIPAA) and patient confidentiality.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Dataset Information */}
          <section className="space-y-6 animate-slide-up">
            <h2 className="text-3xl font-bold">Dataset & Training</h2>
            <p className="text-foreground/70 leading-relaxed">
              Our AI model was trained and validated on a comprehensive dataset of 50,000+ MRI brain scans, including
              cases verified by experienced neuroradiologists. The dataset includes:
            </p>
            <ul className="space-y-2 text-foreground/70">
              {[
                "15,000+ cases of Glioma tumors",
                "10,000+ cases of Meningioma tumors",
                "8,000+ cases of Pituitary tumors",
                "17,000+ normal (non-tumor) cases",
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <span className="text-primary font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Contact Section */}
          <section className="space-y-6 animate-slide-up bg-card rounded-xl p-8 border border-border">
            <h2 className="text-3xl font-bold">Get In Touch</h2>
            <p className="text-foreground/70">
              Have questions or want to learn more about BrainTrust? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:info@braintrust.ai"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all text-center"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="px-6 py-3 bg-background border border-border rounded-lg font-semibold hover:bg-muted transition-all text-center"
              >
                Documentation
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
