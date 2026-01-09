"use client"

import { Brain, AlertCircle, Info, Activity, Shield, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function BrainTumorInfo() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-950 text-white pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm">
              <Info className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">Medical Information</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold">Understanding Brain Tumors</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Comprehensive information about different types of brain tumors, their characteristics, symptoms, and what you need to know
            </p>
          </div>

          {/* What is a Brain Tumor */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <h2 className="text-4xl font-bold">What is a Brain Tumor?</h2>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 space-y-4">
              <p className="text-lg text-slate-300 leading-relaxed">
                A brain tumor is an abnormal growth of cells within the brain or central spinal canal. These growths can be either benign (non-cancerous) or malignant (cancerous). Brain tumors are classified as primary (originating in the brain) or secondary (spread from other parts of the body).
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                The impact of a brain tumor depends on its type, location, and size. Even benign tumors can cause serious problems due to the limited space within the skull, which can lead to increased pressure on sensitive brain tissue.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                {
                  icon: Activity,
                  title: "Common Symptoms",
                  items: ["Headaches", "Seizures", "Vision problems", "Balance issues", "Cognitive changes"]
                },
                {
                  icon: Clock,
                  title: "Early Detection",
                  items: ["Regular check-ups", "MRI scans", "Neurological exams", "Symptom monitoring", "Medical consultation"]
                },
                {
                  icon: Shield,
                  title: "Risk Factors",
                  items: ["Age", "Radiation exposure", "Family history", "Genetic conditions", "Immune system disorders"]
                }
              ].map((card, idx) => {
                const Icon = card.icon
                return (
                  <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
                    <ul className="space-y-2">
                      {card.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-400">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Glioma */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold">G</span>
              </div>
              <h2 className="text-4xl font-bold">Glioma</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-red-400">Overview</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Gliomas are tumors that originate from glial cells, which provide support and protection for neurons in the brain and spinal cord. They are the most common type of primary brain tumor, accounting for about 33% of all brain tumors.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-red-400">Types & Grades</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <span className="font-semibold text-red-400 min-w-[120px]">Grade I-II:</span>
                      <span className="text-slate-300">Low-grade, slow-growing, better prognosis</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="font-semibold text-red-400 min-w-[120px]">Grade III-IV:</span>
                      <span className="text-slate-300">High-grade, fast-growing, more aggressive</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-red-400">Subtypes</h3>
                  <ul className="space-y-2">
                    {[
                      "Astrocytomas (most common)",
                      "Oligodendrogliomas",
                      "Ependymomas",
                      "Glioblastoma (Grade IV, most aggressive)"
                    ].map((type, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <span className="text-red-400 mt-1">•</span>
                        <span>{type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                  <h4 className="font-semibold text-lg mb-4 text-red-400">Common Symptoms</h4>
                  <ul className="space-y-3 text-sm">
                    {[
                      "Persistent headaches",
                      "Seizures",
                      "Nausea and vomiting",
                      "Memory problems",
                      "Personality changes",
                      "Speech difficulties"
                    ].map((symptom, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <span className="text-red-400">✓</span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                  <h4 className="font-semibold text-lg mb-2 text-red-400">Prevalence</h4>
                  <p className="text-3xl font-bold text-red-400 mb-2">33%</p>
                  <p className="text-sm text-slate-400">Of all primary brain tumors</p>
                </div>
              </div>
            </div>
          </section>

          {/* Meningioma */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold">M</span>
              </div>
              <h2 className="text-4xl font-bold">Meningioma</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-green-400">Overview</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Meningiomas are tumors that arise from the meninges, the protective membranes covering the brain and spinal cord. They are typically benign and slow-growing, making them the most common type of primary brain tumor in adults.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-green-400">Characteristics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "Growth Rate", value: "Usually slow" },
                      { label: "Benign Rate", value: "90% of cases" },
                      { label: "Recurrence", value: "10-20% after removal" },
                      { label: "Gender Ratio", value: "2:1 (Female:Male)" }
                    ].map((stat, i) => (
                      <div key={i} className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                        <p className="text-lg font-semibold text-green-400">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-green-400">Location</h3>
                  <p className="text-slate-300 leading-relaxed mb-3">
                    Meningiomas can occur anywhere along the meninges but are most commonly found in:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Convexity (outer surface of brain)",
                      "Parasagittal region (along midline)",
                      "Sphenoid ridge (skull base)",
                      "Olfactory groove (near nose)"
                    ].map((location, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <span className="text-green-400 mt-1">•</span>
                        <span>{location}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                  <h4 className="font-semibold text-lg mb-4 text-green-400">Common Symptoms</h4>
                  <ul className="space-y-3 text-sm">
                    {[
                      "Gradual headaches",
                      "Vision problems",
                      "Hearing loss",
                      "Memory loss",
                      "Weakness in limbs",
                      "Often asymptomatic"
                    ].map((symptom, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <span className="text-green-400">✓</span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                  <h4 className="font-semibold text-lg mb-2 text-green-400">Prevalence</h4>
                  <p className="text-3xl font-bold text-green-400 mb-2">38%</p>
                  <p className="text-sm text-slate-400">Of all primary brain tumors</p>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                  <h4 className="font-semibold text-lg mb-3 text-green-400">Prognosis</h4>
                  <p className="text-sm text-slate-300">
                    Generally excellent for benign meningiomas with complete surgical removal. 5-year survival rate exceeds 90%.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pituitary Tumor */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold">P</span>
              </div>
              <h2 className="text-4xl font-bold">Pituitary Tumor</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-purple-400">Overview</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Pituitary tumors, also called pituitary adenomas, are growths that develop in the pituitary gland, a pea-sized organ at the base of the brain. This gland controls hormone production, so tumors can significantly affect bodily functions. Most pituitary tumors are benign and don't spread beyond the skull.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-purple-400">Classification</h3>
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-lg p-5">
                      <h4 className="font-semibold text-purple-400 mb-2">By Size</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2 text-slate-300">
                          <span className="text-purple-400 font-semibold min-w-[140px]">Microadenomas:</span>
                          <span>Less than 10mm in diameter</span>
                        </li>
                        <li className="flex items-start gap-2 text-slate-300">
                          <span className="text-purple-400 font-semibold min-w-[140px]">Macroadenomas:</span>
                          <span>Greater than 10mm in diameter</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-5">
                      <h4 className="font-semibold text-purple-400 mb-2">By Function</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2 text-slate-300">
                          <span className="text-purple-400 font-semibold min-w-[140px]">Functioning:</span>
                          <span>Produce excess hormones (60% of cases)</span>
                        </li>
                        <li className="flex items-start gap-2 text-slate-300">
                          <span className="text-purple-400 font-semibold min-w-[140px]">Non-functioning:</span>
                          <span>Don't produce hormones (40% of cases)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-purple-400">Hormone Types</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Prolactinomas (most common)",
                      "Growth hormone tumors",
                      "ACTH-secreting tumors",
                      "TSH-secreting tumors"
                    ].map((type, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-300 bg-slate-800/30 rounded-lg p-3">
                        <span className="text-purple-400">•</span>
                        <span className="text-sm">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                  <h4 className="font-semibold text-lg mb-4 text-purple-400">Common Symptoms</h4>
                  <ul className="space-y-3 text-sm">
                    {[
                      "Vision problems",
                      "Hormonal imbalances",
                      "Headaches",
                      "Fatigue",
                      "Irregular periods",
                      "Weight changes"
                    ].map((symptom, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <span className="text-purple-400">✓</span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                  <h4 className="font-semibold text-lg mb-2 text-purple-400">Prevalence</h4>
                  <p className="text-3xl font-bold text-purple-400 mb-2">15%</p>
                  <p className="text-sm text-slate-400">Of all primary brain tumors</p>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                  <h4 className="font-semibold text-lg mb-3 text-purple-400">Treatment</h4>
                  <p className="text-sm text-slate-300">
                    Often treatable with medication, surgery, or radiation. Prognosis is generally favorable with appropriate treatment.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="space-y-6">
            <h2 className="text-4xl font-bold text-center mb-12">Quick Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-900/50 border border-slate-800">
                    <th className="p-4 text-left font-semibold">Characteristic</th>
                    <th className="p-4 text-left font-semibold text-red-400">Glioma</th>
                    <th className="p-4 text-left font-semibold text-green-400">Meningioma</th>
                    <th className="p-4 text-left font-semibold text-purple-400">Pituitary</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { 
                      feature: "Origin",
                      glioma: "Glial cells",
                      meningioma: "Meninges",
                      pituitary: "Pituitary gland"
                    },
                    { 
                      feature: "Malignancy",
                      glioma: "Can be malignant",
                      meningioma: "Usually benign",
                      pituitary: "Usually benign"
                    },
                    { 
                      feature: "Growth Rate",
                      glioma: "Variable (fast to slow)",
                      meningioma: "Usually slow",
                      pituitary: "Usually slow"
                    },
                    { 
                      feature: "Prevalence",
                      glioma: "33%",
                      meningioma: "38%",
                      pituitary: "15%"
                    },
                    { 
                      feature: "Treatment",
                      glioma: "Surgery, chemo, radiation",
                      meningioma: "Surgery, radiation",
                      pituitary: "Medication, surgery"
                    }
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-slate-800 hover:bg-slate-900/30 transition-colors">
                      <td className="p-4 font-medium text-slate-300">{row.feature}</td>
                      <td className="p-4 text-slate-400">{row.glioma}</td>
                      <td className="p-4 text-slate-400">{row.meningioma}</td>
                      <td className="p-4 text-slate-400">{row.pituitary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Important Notice */}
          <section className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-8">
            <div className="flex gap-4 items-start">
              <AlertCircle className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-amber-400">Important Medical Disclaimer</h3>
                <p className="text-slate-300 leading-relaxed">
                  This information is provided for educational purposes only and should not be used for self-diagnosis or as a substitute for professional medical advice. If you experience symptoms that concern you, please consult with a qualified healthcare provider immediately.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Brain tumors require proper diagnosis through imaging studies (MRI, CT scans) and often biopsy confirmation. Treatment plans should be developed in consultation with neurosurgeons, oncologists, and other specialists.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-blue-500/20 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Need Tumor Detection?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Our AI-powered system can help detect and classify brain tumors from MRI scans with 94.5% accuracy.
            </p>
            <button className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/50">
              Try Detection Tool
            </button>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto text-center text-slate-500">
          <p>© 2026 NeuroDetect. All rights reserved. This information is for educational purposes only.</p>
        </div>
      </footer>
    </>
  )
}