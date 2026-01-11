"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { ArrowRight, Zap, Shield, TrendingUp, Link as LinkIcon } from "lucide-react"
import { Navbar } from "@/components/navbar"

// Three.js Brain Component
function ThreeBrain() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    
    const container = mountRef.current
    const size = Math.min(container.clientWidth, container.clientHeight)
    renderer.setSize(size, size)
    container.appendChild(renderer.domElement)

    const brainGroup = new THREE.Group()
    
    // Create realistic brain hemisphere shape
    const brainGeometry = new THREE.SphereGeometry(1.8, 64, 64)
    const positions = brainGeometry.attributes.position
    
    // Deform sphere to look like brain with wrinkles
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const z = positions.getZ(i)
      
      // Create brain-like wrinkles using noise
      const noise = Math.sin(x * 4) * Math.cos(y * 4) * Math.sin(z * 4) * 0.15
      const noise2 = Math.sin(x * 8) * Math.cos(y * 8) * 0.08
      
      positions.setXYZ(
        i,
        x * (1 + noise + noise2),
        y * (1 + noise + noise2),
        z * (1 + noise + noise2)
      )
    }
    
    brainGeometry.computeVertexNormals()
    
    // Brain material with glowing effect
    const brainMaterial = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.4,
      shininess: 30,
      transparent: true,
      opacity: 0.9
    })
    
    const brain = new THREE.Mesh(brainGeometry, brainMaterial)
    brainGroup.add(brain)
    
    // Add wireframe overlay for detail
    const wireframeGeometry = new THREE.SphereGeometry(1.85, 32, 32)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    })
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial)
    brainGroup.add(wireframe)

    // Neural connection lines
    const lineGroup = new THREE.Group()
    for (let i = 0; i < 40; i++) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3
        ),
        new THREE.Vector3(
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3
        )
      ])
      
      const lineGeometry = new THREE.TubeGeometry(curve, 20, 0.01, 8, false)
      const lineMaterial = new THREE.MeshBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.3
      })
      
      const line = new THREE.Mesh(lineGeometry, lineMaterial)
      lineGroup.add(line)
    }
    brainGroup.add(lineGroup)

    // Glowing particles around brain
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 200
    const posArray = new Float32Array(particlesCount * 3)
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 6
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    })
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    brainGroup.add(particlesMesh)

    // Energy rings
    for(let i = 0; i < 2; i++) {
      const ringGeometry = new THREE.TorusGeometry(2.5 + i * 0.4, 0.015, 16, 100)
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: i === 0 ? 0x3b82f6 : 0x8b5cf6,
        transparent: true,
        opacity: 0.4
      })
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.rotation.x = Math.PI / 2 + i * 0.2
      ring.rotation.y = i * 0.3
      brainGroup.add(ring)
    }

    scene.add(brainGroup)

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)
    
    const pointLight1 = new THREE.PointLight(0x3b82f6, 1.5)
    pointLight1.position.set(3, 3, 3)
    scene.add(pointLight1)
    
    const pointLight2 = new THREE.PointLight(0x8b5cf6, 1)
    pointLight2.position.set(-3, -3, -2)
    scene.add(pointLight2)

    camera.position.z = 5

    // Animation
    let time = 0
    function animate() {
      requestAnimationFrame(animate)
      time += 0.005

      // Smooth rotation
      brainGroup.rotation.y = time * 0.4
      brainGroup.rotation.x = Math.sin(time * 0.3) * 0.1

      // Gentle pulsing
      const scale = 1 + Math.sin(time * 1.5) * 0.03
      brain.scale.setScalar(scale)

      // Rotate wireframe separately
      wireframe.rotation.y = time * 0.2
      wireframe.rotation.z = time * 0.1

      // Animate neural lines
      lineGroup.rotation.y = -time * 0.15
      lineGroup.rotation.x = Math.sin(time) * 0.1

      // Particle movement
      const positions = particlesGeometry.attributes.position.array as Float32Array
      for(let i = 0; i < particlesCount; i++) {
        const i3 = i * 3
        positions[i3] += Math.sin(time + i) * 0.001
        positions[i3 + 1] += Math.cos(time + i * 0.5) * 0.001
        positions[i3 + 2] += Math.sin(time * 0.5 + i) * 0.001
      }
      particlesGeometry.attributes.position.needsUpdate = true

      // Lights pulsing
      pointLight1.intensity = 1.5 + Math.sin(time * 2) * 0.3
      pointLight2.intensity = 1 + Math.cos(time * 1.5) * 0.3

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      container.removeChild(renderer.domElement)
      brainGeometry.dispose()
      brainMaterial.dispose()
      wireframeGeometry.dispose()
      wireframeMaterial.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="w-full h-full" />
}

// Floating Card Component
function FloatingCard({ delay = 0, children, className = "" }: { delay?: number, children: React.ReactNode, className?: string }) {
  return (
    <div 
      className={`animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; opacity: 0; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
      `}</style>
      <Navbar />
      <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-10 pb-20 px-4 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8 animate-fade-in px-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <span className="text-sm font-medium">AI-Powered Detection</span>
                </div>

                <h1 className="text-6xl sm:text-7xl font-bold leading-tight">
                  Brain Tumor Detection Made{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-glow">
                    Smart
                  </span>
                </h1>

                <p className="text-xl text-slate-400 max-w-lg">
                  Harness the power of artificial intelligence to detect and classify brain tumors with unprecedented
                  accuracy. Fast, reliable, and designed for medical professionals.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/detection" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105">
                    Start Detection
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                  </Link>
                  <Link href="/info" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-semibold transition-all">
                    Learn More
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                  {[
                    { value: "94.5%", label: "Accuracy Rate" },
                    { value: "50K+", label: "Scans Analyzed" },
                    { value: "1.5s", label: "Avg Time" }
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center p-4 bg-slate-900/50 rounded-xl border border-slate-800 backdrop-blur-sm">
                      <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
                      <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - 3D Brain */}
              <div className="relative h-[600px] animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ThreeBrain />
                </div>
                
                {/* Floating Info Cards */}
                <FloatingCard delay={0} className="absolute top-20 -left-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Secure Processing</div>
                      <div className="text-xs text-slate-400">HIPAA Compliant</div>
                    </div>
                  </div>
                </FloatingCard>

                <FloatingCard delay={1} className="absolute bottom-32 -right-4 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Real-time Results</div>
                      <div className="text-xs text-slate-400">Instant Analysis</div>
                    </div>
                  </div>
                </FloatingCard>

                <FloatingCard delay={0.5} className="absolute top-32 right-8 bg-slate-900/90 backdrop-blur-sm border border-slate-700 rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">High Accuracy</div>
                      <div className="text-xs text-slate-400">94.5% Precision</div>
                    </div>
                  </div>
                </FloatingCard>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-20 animate-slide-up">
              <h2 className="text-5xl font-bold mb-6">Key Features</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Everything you need for accurate and efficient brain tumor detection
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Analyze MRI scans in seconds, not hours. Get results when you need them most.",
                  color: "blue"
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "HIPAA compliant with end-to-end encryption for patient data protection.",
                  color: "green"
                },
                {
                  icon: TrendingUp,
                  title: "High Accuracy",
                  description: "State-of-the-art AI model trained on thousands of verified scans.",
                  color: "purple"
                },
              ].map((feature, idx) => {
                const Icon = feature.icon
                const colorMap = {
                  blue: "from-blue-500 to-cyan-500",
                  green: "from-green-500 to-emerald-500",
                  purple: "from-purple-500 to-pink-500"
                }
                return (
                  <div
                    key={idx}
                    className="group relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-slide-up backdrop-blur-sm"
                    style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[feature.color as keyof typeof colorMap]} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                    <div className={`w-16 h-16 bg-gradient-to-br ${colorMap[feature.color as keyof typeof colorMap]} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 animate-slide-up">
              <h2 className="text-5xl font-bold mb-6">How It Works</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Three simple steps to get your analysis results
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              {/* Connection Line */}
              <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 hidden md:block" />

              <div className="space-y-16">
                {[
                  {
                    step: "01",
                    title: "Upload Your Image",
                    description: "Select and upload your MRI scan in JPEG or PNG format",
                    icon: "📤"
                  },
                  {
                    step: "02",
                    title: "AI Analysis",
                    description: "Our advanced model analyzes the image and detects tumor presence",
                    icon: "🧠"
                  },
                  {
                    step: "03",
                    title: "Get Results",
                    description: "Receive detailed results with classification and confidence scores",
                    icon: "📊"
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-8 animate-slide-up relative"
                    style={{ animationDelay: `${(idx + 1) * 0.15}s` }}
                  >
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/50">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1 pt-2 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all hover:-translate-y-1">
                      <div className="text-4xl mb-4">{item.icon}</div>
                      <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                      <p className="text-slate-400 text-lg">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4">
          <div className="max-w-5xl mx-auto relative animate-slide-up">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-3xl blur-3xl opacity-20" />
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
              <div className="relative z-10">
                <h2 className="text-5xl font-bold mb-6">Ready to Get Started?</h2>
                <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                  Upload your MRI scan now and experience the power of AI-driven brain tumor detection.
                </p>
                <button className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl font-semibold text-lg transition-all hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105">
                  Start Analyzing Now
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 py-12 px-4">
          <div className="max-w-7xl mx-auto text-center text-slate-500">
            <p>© 2026 NeuroDetect. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  )
}