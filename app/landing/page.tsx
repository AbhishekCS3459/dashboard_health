"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Eye, Menu, Moon, Sun, X, Check, ArrowRight, Phone, Mail, MapPin } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ColourfulText from "@/components/ui/colourful-text"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import ThreeDMarqueeDemo from "@/components/3d-marquee-demo"

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Handle scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const stats = [
    { value: "50K+", label: "Patients Served" },
    { value: "25+", label: "Specialist Doctors" },
    { value: "15+", label: "Services Offered" },
    { value: "99%", label: "Patient Satisfaction" },
  ]

  const features = [
    {
      title: "Advanced Diagnostics",
      description: "State-of-the-art equipment for accurate eye examinations and diagnosis",
      icon: "/images/service-icons/diagnostics.png",
    },
    {
      title: "Pediatric Eye Care",
      description: "Specialized care for children's vision problems and eye health",
      icon: "/images/service-icons/pediatric.png",
    },
    {
      title: "Laser Surgery",
      description: "Modern laser-based treatments for various eye conditions",
      icon: "/images/service-icons/laser.png",
    },
    {
      title: "Vision Correction",
      description: "Comprehensive solutions for refractive errors and vision problems",
      icon: "/images/service-icons/vision.png",
    },
    {
      title: "Cataract Treatment",
      description: "Advanced cataract surgery with premium lens options",
      icon: "/images/service-icons/cataract.png",
    },
    {
      title: "Glaucoma Management",
      description: "Complete care and management for glaucoma patients",
      icon: "/images/service-icons/glaucoma.png",
    },
  ]

  const testimonials = [
    {
      quote:
        "The care I received at Sci-I Clinic was exceptional. The doctors took the time to explain everything clearly and made me feel comfortable throughout the entire process.",
      author: "Priya Sharma",
      role: "Patient",
      rating: 5,
    },
    {
      quote:
        "After years of vision problems, the team at Sci-I Clinic provided a solution that changed my life. I can now see clearly without glasses for the first time in decades.",
      author: "Rajesh Kumar",
      role: "Patient",
      rating: 5,
    },
    {
      quote:
        "The pediatric eye care team was amazing with my child. They made the whole experience fun and stress-free, and my daughter's vision has improved significantly.",
      author: "Ananya Reddy",
      role: "Parent",
      rating: 5,
    },
  ]

  const doctors = [
    {
      name: "Dr. Mehta",
      specialty: "Retina Specialist",
      image: "/placeholder.svg?height=300&width=300",
      description: "Expert in retinal diseases and treatments with over 15 years of experience.",
    },
    {
      name: "Dr. Gupta",
      specialty: "Cornea Specialist",
      image: "/placeholder.svg?height=300&width=300",
      description: "Specializes in corneal transplants and refractive surgeries.",
    },
    {
      name: "Dr. Shah",
      specialty: "Glaucoma Specialist",
      image: "/placeholder.svg?height=300&width=300",
      description: "Leading expert in glaucoma management and surgical interventions.",
    },
    {
      name: "Dr. Patel",
      specialty: "Pediatric Ophthalmologist",
      image: "/placeholder.svg?height=300&width=300",
      description: "Dedicated to providing eye care for children of all ages.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
          isScrolled ? "bg-background/95 shadow-sm" : "bg-transparent",
        )}
      >
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Sci-I Clinic</span>
          </div>

          <div className="hidden md:flex md:items-center md:gap-6">
            <nav className="flex gap-6">
              <Link href="#services" className="text-sm font-medium transition-colors hover:text-primary">
                Services
              </Link>
              <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
                About Us
              </Link>
              <Link href="#doctors" className="text-sm font-medium transition-colors hover:text-primary">
                Our Doctors
              </Link>
              <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
                Testimonials
              </Link>
              <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">Sci-I Clinic</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="mt-8 flex flex-col gap-6">
                  <Link
                    href="#services"
                    className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Services</span>
                  </Link>
                  <Link
                    href="#about"
                    className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>About Us</span>
                  </Link>
                  <Link
                    href="#doctors"
                    className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Our Doctors</span>
                  </Link>
                  <Link
                    href="#testimonials"
                    className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Testimonials</span>
                  </Link>
                  <Link
                    href="#contact"
                    className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Contact</span>
                  </Link>
                  <div className="mt-4">
                    <Button asChild className="w-full">
                      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                        Login
                      </Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4 animate-fade-up">
              <div className="space-y-2">
                <Badge className="inline-block mb-2 bg-primary/10 text-primary border-none">
                  Leading Eye Hospital in India
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-balance">
                  <ColourfulText text="Advanced" /> Eye Care for Your Vision
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  State-of-the-art technology and expert doctors to provide comprehensive eye care for all ages.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="gap-1 font-semibold">
                  <Link href="/login">
                    Book Appointment
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#services">Explore Services</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-1 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-2xl font-bold md:text-3xl text-primary">{stat.value}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-square rounded-full bg-gradient-to-b from-primary/20 to-primary/5 flex items-center justify-center animate-fade-in overflow-hidden">
                <Image
                  src="https://www.4sighthealth.com/wp-content/uploads/2021/03/Untitled-design-2021-03-10T172408.882.png"
                  alt="Healthcare professionals with medical equipment"
                  width={600}
                  height={600}
                  className="w-full h-full object-contain sm:object-cover rounded-full animate-floating"
                  style={{
                    animation: "float 6s ease-in-out infinite",
                  }}
                />
                <style jsx global>{`
                  @keyframes float {
                    0% {
                      transform: translateY(0px);
                    }
                    50% {
                      transform: translateY(-20px);
                    }
                    100% {
                      transform: translateY(0px);
                    }
                  }
                  
                  @media (max-width: 640px) {
                    @keyframes float {
                      0% {
                        transform: translateY(0px);
                      }
                      50% {
                        transform: translateY(-10px);
                      }
                      100% {
                        transform: translateY(0px);
                      }
                    }
                  }
                `}</style>
              </div>
            </div>
          </div>
        </div>

        {/* Background element */}
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"></div>
      </section>

      {/* 3D Marquee section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-3 mb-12 animate-fade-up">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our <ColourfulText text="Gallery" />
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Take a look at our state-of-the-art facilities and equipment
            </p>
          </div>
          <ThreeDMarqueeDemo />
        </div>
      </section>

      {/* Features/Services section */}
      <section id="services" className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-3 mb-12 animate-fade-up">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our <ColourfulText text="Services" />
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Comprehensive eye care solutions for all your vision needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <CardContainer key={index} className="w-full" containerClassName="py-0">
                <CardBody
                  className={cn(
                    "relative flex flex-col p-6 bg-background rounded-xl border border-border/50 card-hover transition-all group animate-fade-in h-full w-full",
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardItem
                    translateZ="40"
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
                  >
                    <Image
                      src={feature.icon || "/placeholder.svg"}
                      alt={feature.title}
                      width={24}
                      height={24}
                      className="text-primary"
                    />
                  </CardItem>
                  <CardItem translateZ="50" className="mb-2 text-xl font-bold">
                    {feature.title}
                  </CardItem>
                  <CardItem translateZ="60" className="text-muted-foreground">
                    {feature.description}
                  </CardItem>
                  <CardItem translateZ="70" className="mt-4 pt-2">
                    <Button variant="link" className="px-0 group-hover:text-primary">
                      Learn more{" "}
                      <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardItem>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>

      {/* About section */}
      <section id="about" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 animate-fade-up">
              <div className="space-y-2">
                <Badge className="inline-block mb-2 bg-primary/10 text-primary border-none">About Sci-I Clinic</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Excellence in <ColourfulText text="Eye Care" /> Since 2005
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Sci-I Clinic was founded with a vision to provide world-class eye care services to patients of all
                  ages. Our team of expert ophthalmologists and state-of-the-art equipment ensure the highest quality
                  care.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Expert Doctors</h3>
                    <p className="text-muted-foreground">
                      Our team includes specialists in various fields of ophthalmology
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Modern Technology</h3>
                    <p className="text-muted-foreground">We use the latest equipment for diagnosis and treatment</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Patient-Centered Care</h3>
                    <p className="text-muted-foreground">
                      We prioritize patient comfort and satisfaction in everything we do
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end animate-fade-in">
              <CardContainer className="w-full" containerClassName="py-0">
                <CardBody className="overflow-hidden rounded-xl shadow-lg w-full max-w-[600px] aspect-video">
                  <CardItem translateZ="100">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2fP8ndltAwNWx8aIUlZiFrD3a5TvFQ.png"
                      alt="Medical heart with stethoscope and nurse cap"
                      width={600}
                      height={400}
                      className="w-full h-full object-contain"
                    />
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors section */}
      <section id="doctors" className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-3 mb-12 animate-fade-up">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Meet Our <ColourfulText text="Specialists" />
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our team of experienced ophthalmologists are dedicated to providing the best eye care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor, index) => (
              <CardContainer key={index} className="w-full" containerClassName="py-0">
                <CardBody
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in w-full"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardItem translateZ="50" className="aspect-square w-full overflow-hidden">
                    <img
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </CardItem>
                  <CardItem translateZ="60" className="p-6">
                    <h3 className="text-xl font-bold">{doctor.name}</h3>
                    <p className="text-sm text-primary font-medium mb-2">{doctor.specialty}</p>
                    <p className="text-sm text-muted-foreground">{doctor.description}</p>
                    <Button variant="outline" className="w-full mt-4">
                      View Profile
                    </Button>
                  </CardItem>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section id="testimonials" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-3 mb-12 animate-fade-up">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What Our <ColourfulText text="Patients" /> Say
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Hear from those who have experienced our care
            </p>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="all">All Reviews</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="top">Top Rated</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <CardContainer key={index} className="w-full" containerClassName="py-0">
                    <CardBody
                      className="bg-background animate-fade-in w-full"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <CardContent className="p-6">
                        <CardItem translateZ="20" className="flex mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </CardItem>
                        <CardItem translateZ="40" className="text-lg mb-4 italic">
                          {testimonial.quote}
                        </CardItem>
                        <CardItem translateZ="30" className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {testimonial.author.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </CardItem>
                      </CardContent>
                    </CardBody>
                  </CardContainer>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.slice(0, 2).map((testimonial, index) => (
                  <CardContainer key={index} className="w-full" containerClassName="py-0">
                    <CardBody
                      className="bg-background animate-fade-in w-full"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <CardContent className="p-6">
                        <CardItem translateZ="20" className="flex mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </CardItem>
                        <CardItem translateZ="40" className="text-lg mb-4 italic">
                          {testimonial.quote}
                        </CardItem>
                        <CardItem translateZ="30" className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {testimonial.author.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </CardItem>
                      </CardContent>
                    </CardBody>
                  </CardContainer>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="top" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials
                  .filter((t) => t.rating === 5)
                  .map((testimonial, index) => (
                    <CardContainer key={index} className="w-full" containerClassName="py-0">
                      <CardBody
                        className="bg-background animate-fade-in w-full"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <CardContent className="p-6">
                          <CardItem translateZ="20" className="flex mb-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </CardItem>
                          <CardItem translateZ="40" className="text-lg mb-4 italic">
                            {testimonial.quote}
                          </CardItem>
                          <CardItem translateZ="30" className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                              {testimonial.author.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <p className="font-medium">{testimonial.author}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </CardItem>
                        </CardContent>
                      </CardBody>
                    </CardContainer>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg">
              View All Testimonials
            </Button>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fade-up">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Experience the <ColourfulText text="Best Eye Care" />?
              </h2>
              <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                Book an appointment today and take the first step towards better vision
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link href="/login">
                  Book Appointment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground/20 hover:bg-primary-foreground/10"
              >
                <Link href="#contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 animate-fade-up">
              <div className="space-y-2">
                <Badge className="inline-block mb-2 bg-primary/10 text-primary border-none">Get in Touch</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  <ColourfulText text="Contact" /> Us
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Have questions or need to schedule an appointment? Reach out to us using any of the methods below.
                </p>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Visit Us</h3>
                    <p className="text-muted-foreground">
                      123 Eye Care Street, Medical District
                      <br />
                      Mumbai, India 400001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Call Us</h3>
                    <p className="text-muted-foreground">
                      +91 98765 43210
                      <br />
                      Monday to Saturday, 9am to 6pm
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Email Us</h3>
                    <p className="text-muted-foreground">
                      contact@sci-i-clinic.com
                      <br />
                      appointments@sci-i-clinic.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <CardContainer className="w-full" containerClassName="py-0">
              <CardBody className="rounded-lg border bg-card p-6 shadow-sm animate-fade-in w-full">
                <CardItem translateZ="30" className="text-xl font-bold mb-4">
                  Send us a Message
                </CardItem>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <CardItem translateZ="20" className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Your name"
                      />
                    </CardItem>
                    <CardItem translateZ="20" className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Your email"
                      />
                    </CardItem>
                  </div>
                  <CardItem translateZ="20" className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input
                      id="subject"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Message subject"
                    />
                  </CardItem>
                  <CardItem translateZ="20" className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your message"
                    ></textarea>
                  </CardItem>
                  <CardItem translateZ="40">
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </CardItem>
                </form>
              </CardBody>
            </CardContainer>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 md:py-16 border-t border-border/40 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">Sci-I Clinic</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Providing advanced eye care solutions with a focus on patient satisfaction and comfort.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#doctors" className="text-muted-foreground hover:text-primary transition-colors">
                    Our Doctors
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">123 Eye Care Street, Medical District</li>
                <li className="text-muted-foreground">Mumbai, India 400001</li>
                <li className="text-muted-foreground">contact@sci-i-clinic.com</li>
                <li className="text-muted-foreground">+91 98765 43210</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Follow Us</h3>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-border/40 pt-8 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Sci-I Clinic. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
