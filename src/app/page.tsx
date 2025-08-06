"use client"
import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Building,
  Calendar,
  Network,
  Star,
  Users,
  Shield,
  Zap,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmailVerificationDialog } from "@/components/email-verification-dialog"

const categories = [
  { id: "tech", name: "Technology", count: 42 },
  { id: "finance", name: "Finance", count: 38 },
  { id: "retail", name: "Retail", count: 27 },
  { id: "manufacturing", name: "Manufacturing", count: 31 },
  { id: "consulting", name: "Consulting", count: 45 },
  { id: "marketing", name: "Marketing", count: 36 },
  { id: "education", name: "Education", count: 24 },
  { id: "healthcare", name: "Healthcare", count: 29 },
]

export default function Home() {
  const router = useRouter()
  const [showVerification, setShowVerification] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({
    members: 0,
    categories: 0,
    events: 0,
    verified: 0,
  })
  const observerRef = useRef(null)

  const animateCounter = (target, key, duration = 2000) => {
    const increment = target / (duration / 17)
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      setCounters(prev => ({ ...prev, [key]: Math.floor(current) }))
    }, 17)
  }

  useEffect(() => {
    setIsVisible(true)
    setTimeout(() => {
      animateCounter(250, "members")
      animateCounter(categories.length, "categories")
      animateCounter(8, "events")
      animateCounter(100, "verified")
    }, 500)
    if (typeof window !== "undefined") {
      observerRef.current = new window.IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-in")
            }
          })
        },
        { threshold: 0.1 }
      )
      setTimeout(() => {
        document.querySelectorAll(".scroll-animate").forEach(el =>
          observerRef.current?.observe(el)
        )
      }, 100)
    }
    return () => observerRef.current?.disconnect()
  }, [router])

  const handleDirectoryClick = e => {
    e.preventDefault()
    setShowVerification(true)
  }

  return (
    <>
      <style jsx global>{`
        body {
          font-family: "Poppins", sans-serif;
          margin: 0;
          background: linear-gradient(135deg, #fff7ed, #ffedd5);
          min-height: 100vh;
        }
        .scroll-animate { opacity: 0; transform: translateY(40px); transition: opacity 0.88s cubic-bezier(.4,0,.2,1), transform 0.9s cubic-bezier(.4,0,.2,1);}
        .animate-in { opacity: 1 !important; transform: translateY(0px) !important;}
        .glass-card { background: rgba(255,255,255,0.87); backdrop-filter: blur(10px); border: 1.3px solid rgba(255,155,50,0.2);}
        .gradient-text { background: linear-gradient(100deg, #ff8200, #f59e0b 70%, #fdba74); -webkit-background-clip: text; -webkit-text-fill-color: transparent;}
        .shimmer-text { background: linear-gradient(90deg, #ffad4b 10%, #fff1db 38%, #ff8200 62%, #ffad4b 99%); background-size: 400% 100%; animation: shimmer 2.3s infinite linear; -webkit-background-clip: text; -webkit-text-fill-color: transparent; display:inline-block;}
        @keyframes shimmer { 0% {background-position: -150% 0;} 100% {background-position: 350% 0;}}
        .pop-in { animation: popin .7s cubic-bezier(.23,1.3,.32,1.5) 1;}
        @keyframes popin { 0% {opacity:0; transform: scale(0.93) translateY(36px);} 75% {transform: scale(1.04) translateY(-7px);} 100%{opacity:1;transform: scale(1) translateY(0);}}
        .float-anim { animation: floatY 8s infinite linear; }
        @keyframes floatY { 0%,100%{transform:translateY(0);} 45%{transform:translateY(-15px);} 70%{transform:translateY(7px);} }
      `}</style>

      <div className="flex flex-col min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-100">
        <EmailVerificationDialog open={showVerification} onOpenChange={setShowVerification} />

        {/* HERO SPLIT */}
        <header className="relative flex flex-1 hero-split items-stretch justify-center pt-3 pb-0 bg-none">
          <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto">
            {/* Left: Big Saffron Flag */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative min-h-[340px] lg:min-h-[650px] py-10 lg:py-0">
              <img
                src="/Sanatan%20Dharma%20Flag%20Sticker%20by%20Surya%20Sharma.gif"
                alt="Saffron Hindu Flag"
                className="w-auto h-[220px] sm:h-[310px] md:h-[380px] lg:h-[540px] xl:h-[620px] max-w-full drop-shadow-2xl rounded-3xl object-contain float-anim"
                style={{ objectFit: "contain", marginLeft: 0, background: "rgba(255,255,255,0.02)" }}
              />
            </div>
            {/* --- Animated Modern Hero Right Section --- */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4 justify-center px-6 py-12 md:py-20 lg:pr-14 z-20">
              {/* floating badge */}
              <div className="glass-card inline-flex items-center gap-3 px-8 py-3 rounded-full shadow-md w-auto max-w-full mb-3 scroll-animate pop-in">
                <Star className="h-5 w-5 text-orange-500" />
                <span className="sm:text-xl text-lg font-semibold shimmer-text tracking-wide uppercase">
                  Hindu Business Community Network
                </span>
              </div>
              {/* Modern staggered heading and subtitle */}
              <div className="text-left flex flex-col gap-4">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight scroll-animate animate-in mb-1 pop-in">
                  <span className="text-gray-900 block">Sanatani Business<br className="hidden md:inline-block"/> Exchange Platform</span>
                </h1>
                {/* Modern tagline */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-block font-semibold text-orange-700 glass-card px-4 py-1 rounded-xl shadow pop-in" style={{ animationDelay: "0.23s" }}>
                    Go Local. Go Sanatani.
                  </span>
                  <span className="inline-block font-semibold text-orange-500 bg-orange-100/70 px-3 py-1 rounded-xl shadow pop-in" style={{animationDelay:"0.33s"}}>
                    Trusted. Verified. Connected.
                  </span>
                </div>
                <p className="text-xl text-gray-700 mt-3 scroll-animate animate-in pop-in" style={{ animationDelay: "0.1s" }}>
                  <span className="font-bold gradient-text">Empowering Dharmic entrepreneurs</span> to exchange business, referrals, and services. <br /> Collaborate. Grow. Uplift community prosperity.
                </p>
                <div className="italic text-gray-500 mt-3 text-lg scroll-animate animate-in pop-in" style={{animationDelay:"0.17s"}}>
                  “सत्यमेव जयते नानृतं” <br /> <span className="text-base not-italic">Let truth guide every transaction.</span>
                </div>
              </div>
              {/* Floating call-to-action glass card */}
              <div className="mt-6 mb-2 glass-card shadow-lg rounded-2xl flex flex-col md:flex-row gap-4 scroll-animate animate-in pop-in" style={{ animationDelay: "0.37s" }}>
                <Button
                  onClick={handleDirectoryClick}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition font-semibold text-lg"
                >
                  <span className="flex items-center gap-3">
                    <Globe className="h-5 w-5" />
                    Explore Directory
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-white/90 border-2 border-orange-400 text-orange-600 px-8 py-4 rounded-2xl shadow-lg hover:bg-orange-600 hover:text-white hover:border-orange-600 transition font-semibold text-lg"
                >
                  <Link href="/form">
                    <span className="flex items-center gap-3">
                      <Zap className="h-5 w-5" />
                      Join Network
                      <Network className="h-5 w-5" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* --- STATS SECTION --- */}
        <section className="py-16 bg-white/70 scroll-animate animate-in">
          <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-6xl">
            {[
              {
                num: counters.members,
                suffix: "+",
                label: "Active Members",
                icon: Users,
                colorFrom: "from-orange-400",
                colorTo: "to-orange-500",
              },
              {
                num: counters.categories,
                suffix: "+",
                label: "Business Categories",
                icon: Building,
                colorFrom: "from-orange-300",
                colorTo: "to-orange-400",
              },
              {
                num: counters.events,
                suffix: "+",
                label: "Meetups/Month",
                icon: Calendar,
                colorFrom: "from-amber-400",
                colorTo: "to-amber-500",
              },
              {
                num: counters.verified,
                suffix: "%",
                label: "Verified Businesses",
                icon: Shield,
                colorFrom: "from-amber-500",
                colorTo: "to-amber-600",
              },
            ].map((stat, idx) => {
              const IconComp = stat.icon
              return (
                <div
                  key={idx}
                  className="glass-card rounded-3xl p-7 shadow-lg hover:shadow-2xl transition transform hover:scale-105 animate-in"
                  style={{ transitionDelay: `${idx * 0.15}s` }}
                >
                  <div className={`mx-auto w-16 h-16 rounded-3xl bg-gradient-to-br ${stat.colorFrom} ${stat.colorTo} flex items-center justify-center mb-5 shadow-md`}>
                    <IconComp className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-extrabold text-gray-900 mb-1">
                    {stat.num.toLocaleString()}
                    {stat.suffix}
                  </div>
                  <p className="text-gray-700 font-medium">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* --- CATEGORIES SECTION --- */}
        <section className="py-24 bg-gradient-to-br from-orange-50 to-amber-50 scroll-animate animate-in">
          <div className="container mx-auto px-4 text-center mb-12">
            <Badge className="mb-6 px-4 py-2 glass-card text-orange-700 border-orange-200 rounded-full">
              🏷️ Browse by Category
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Find Sanatani Entrepreneurs by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              From technology to retail – connect with trusted community professionals.
            </p>
          </div>
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((c, i) => (
              <div
                key={c.id}
                className="glass-card p-8 rounded-3xl text-center cursor-pointer hover:bg-white/90 hover:scale-105 transition animate-in"
                style={{ transitionDelay: `${i * 80}ms` }}
                onClick={handleDirectoryClick}
              >
                <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg">
                  <Building className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold mb-2">{c.name}</h3>
                <p className="text-sm text-gray-500">{c.count} verified</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- FINAL CTA SECTION --- */}
        <section className="flex flex-col items-center justify-center py-24 w-full bg-gradient-to-br from-orange-50 via-white to-amber-100 px-8 lg:px-32">
          <div className="container mx-auto px-4 text-center max-w-3xl glass-card p-12 rounded-3xl backdrop-blur-sm relative">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Grow Your Business Network?
            </h2>
            <p className="text-lg mb-8">
              Join over <span className="font-semibold">250+ verified Sanatani entrepreneurs</span> and unlock unlimited opportunities across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={handleDirectoryClick}
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition"
              >
                Explore Sanatani Directory
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white/80 border-2 border-orange-500 text-orange-600 px-10 py-4 rounded-2xl shadow-xl hover:bg-orange-600 hover:text-white hover:border-orange-600 transition"
              >
                <Link href="/form">
                  <span className="flex items-center gap-3">
                    <Zap className="h-5 w-5" />
                    Join Network Now
                    <Network className="h-5 w-5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <footer className="py-12 bg-gray-100 text-center text-sm text-gray-500">
          © 2025 Hindu Business Community Network. All rights reserved.
        </footer>
      </div>
    </>
  )
}
