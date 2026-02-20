import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, Star, Wrench, Cpu, Zap, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImg from "@/assets/hero-engineer.jpg";

const features = [
  {
    icon: Shield,
    title: "Verified Engineers",
    desc: "Every engineer on axara22 is credential-verified with degree validation and background checks.",
  },
  {
    icon: Clock,
    title: "On-Demand Booking",
    desc: "Book an engineer within hours. Schedule ahead or get same-day availability.",
  },
  {
    icon: Star,
    title: "Rated Professionals",
    desc: "View ratings and reviews from past clients to make confident, informed decisions.",
  },
];

const services = [
  { icon: Cpu, label: "Electrical Engineering" },
  { icon: Wrench, label: "Mechanical Engineering" },
  { icon: Zap, label: "Civil & Structural" },
  { icon: Shield, label: "IT & Network Engineering" },
];

const stats = [
  { value: "2,400+", label: "Certified Engineers" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "150+", label: "Cities Covered" },
  { value: "24/7", label: "Support Available" },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="relative container-max section-padding py-24 md:py-36">
          <div className="max-w-2xl">
            <span className="inline-block border border-primary-foreground/30 text-primary-foreground/80 text-xs uppercase tracking-widest px-3 py-1 mb-6">
              Trusted Engineering Platform
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Book Verified Engineers,{" "}
              <span className="underline decoration-2 underline-offset-4">Instantly.</span>
            </h1>
            <p className="text-lg md:text-xl opacity-75 mb-10 leading-relaxed max-w-xl">
              axara22 connects you with certified, degree-verified engineers across disciplines — on your schedule, at your location.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-semibold px-7 py-3 rounded-sm hover:opacity-90 transition-opacity"
              >
                Book an Engineer <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 border border-primary-foreground/40 text-primary-foreground font-semibold px-7 py-3 rounded-sm hover:bg-navy-light transition-colors"
              >
                Register as Engineer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-foreground text-background">
        <div className="container-max section-padding py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold mb-1">{s.value}</div>
                <div className="text-sm opacity-50 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-background">
        <div className="container-max section-padding">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why axara22?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              We built the most trusted engineer-booking platform with rigorous verification and seamless booking.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="border border-border p-8 rounded-sm hover:border-primary transition-colors group"
              >
                <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-sm mb-5 group-hover:scale-105 transition-transform">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-xl mb-3">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-muted">
        <div className="container-max section-padding">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Engineering Disciplines</h2>
              <p className="text-muted-foreground">Find specialists across every engineering field.</p>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
              Book Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((s) => (
              <div
                key={s.label}
                className="bg-background border border-border p-6 rounded-sm text-center hover:border-primary hover:shadow-sm transition-all cursor-pointer"
              >
                <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <p className="font-semibold text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-background">
        <div className="container-max section-padding">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Submit Your Request", desc: "Fill in your details and describe your engineering need." },
              { step: "02", title: "We Match You", desc: "axara22 identifies the right verified engineer for your project." },
              { step: "03", title: "Engineer Arrives", desc: "Your certified engineer visits at your scheduled time." },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="text-5xl font-bold text-border leading-none select-none">{item.step}</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-max section-padding py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">Ready to Get Started?</h2>
          <p className="opacity-70 mb-8 max-w-md mx-auto">
            Book a verified engineer today or join our growing network of certified professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-semibold px-8 py-3 rounded-sm hover:opacity-90 transition-opacity"
            >
              Book an Engineer <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 border border-primary-foreground/40 text-primary-foreground font-semibold px-8 py-3 rounded-sm hover:bg-navy-light transition-colors"
            >
              Register as Engineer
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
