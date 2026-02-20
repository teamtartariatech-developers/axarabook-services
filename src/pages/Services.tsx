import { useState } from "react";
import { MapPin, Loader2, CalendarDays, Clock, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type FormState = {
  name: string;
  email: string;
  phone: string;
  location: string;
  serviceType: string;
  description: string;
  scheduleDate: string;
  scheduleTime: string;
  scheduleNow: boolean;
};

const serviceTypes = [
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil & Structural Engineering",
  "IT & Network Engineering",
  "HVAC Engineering",
  "Other",
];

const Services = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    location: "",
    serviceType: "",
    description: "",
    scheduleDate: "",
    scheduleTime: "",
    scheduleNow: true,
  });
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const getLiveLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }
    setLocating(true);
    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const address =
            data.display_name ||
            `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
          setForm((prev) => ({ ...prev, location: address }));
        } catch {
          setForm((prev) => ({
            ...prev,
            location: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
          }));
        }
        setLocating(false);
      },
      (err) => {
        setLocationError("Unable to retrieve your location. Please type it manually.");
        setLocating(false);
      }
    );
  };

  const validate = () => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Valid email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.serviceType) newErrors.serviceType = "Please select a service type";
    if (!form.scheduleNow) {
      if (!form.scheduleDate) newErrors.scheduleDate = "Please select a date";
      if (!form.scheduleTime) newErrors.scheduleTime = "Please select a time";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-muted">
          <div className="bg-background border border-border rounded-sm p-12 max-w-md w-full mx-4 text-center shadow-sm">
            <div className="w-16 h-16 bg-primary rounded-sm flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-2">
              Thank you, <strong>{form.name}</strong>. Your booking has been received.
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              {form.scheduleNow
                ? "We'll assign an available engineer and contact you shortly."
                : `Scheduled for ${form.scheduleDate} at ${form.scheduleTime}.`}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  name: "", email: "", phone: "", location: "",
                  serviceType: "", description: "", scheduleDate: "",
                  scheduleTime: "", scheduleNow: true,
                });
              }}
              className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-sm hover:opacity-90 transition-opacity"
            >
              Book Another
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Page Header */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-max section-padding py-16">
          <span className="text-xs uppercase tracking-widest opacity-50 block mb-3">Services</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Book an Engineer</h1>
          <p className="opacity-70 max-w-lg text-lg">
            Fill in your details below and we'll connect you with a verified engineer at your location.
          </p>
        </div>
      </section>

      {/* Form */}
      <main className="flex-1 bg-muted">
        <div className="container-max section-padding py-12">
          <div className="max-w-2xl mx-auto bg-background border border-border rounded-sm p-8 md:p-10 shadow-sm">
            <h2 className="text-xl font-bold mb-7 pb-4 border-b border-border">Your Details</h2>
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background ${errors.name ? "border-destructive" : "border-border"}`}
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background ${errors.email ? "border-destructive" : "border-border"}`}
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 234 567 8900"
                    className={`w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background ${errors.phone ? "border-destructive" : "border-border"}`}
                  />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Location <span className="text-destructive">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Type your address or use live location"
                    className={`flex-1 border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background ${errors.location ? "border-destructive" : "border-border"}`}
                  />
                  <button
                    type="button"
                    onClick={getLiveLocation}
                    disabled={locating}
                    className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-medium px-4 py-2.5 rounded-sm hover:opacity-90 transition-opacity disabled:opacity-60 whitespace-nowrap"
                  >
                    {locating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                    {locating ? "Locating…" : "Use My Location"}
                  </button>
                </div>
                {locationError && <p className="text-destructive text-xs mt-1">{locationError}</p>}
                {errors.location && <p className="text-destructive text-xs mt-1">{errors.location}</p>}
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Service Type <span className="text-destructive">*</span>
                </label>
                <select
                  name="serviceType"
                  value={form.serviceType}
                  onChange={handleChange}
                  className={`w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background ${errors.serviceType ? "border-destructive" : "border-border"}`}
                >
                  <option value="">Select engineering discipline…</option>
                  {serviceTypes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.serviceType && <p className="text-destructive text-xs mt-1">{errors.serviceType}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Describe Your Need <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Briefly describe the issue or project…"
                  className="w-full border border-border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
                />
              </div>

              {/* Scheduling */}
              <div className="border border-border rounded-sm p-5">
                <p className="font-semibold text-sm mb-4">When do you need the engineer?</p>
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="scheduleNow"
                      checked={form.scheduleNow === true}
                      onChange={() => setForm((p) => ({ ...p, scheduleNow: true }))}
                      className="accent-primary"
                    />
                    <span className="text-sm font-medium">As soon as possible</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="scheduleNow"
                      checked={form.scheduleNow === false}
                      onChange={() => setForm((p) => ({ ...p, scheduleNow: false }))}
                      className="accent-primary"
                    />
                    <span className="text-sm font-medium">Schedule a date & time</span>
                  </label>
                </div>

                {!form.scheduleNow && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5" /> Preferred Date
                      </label>
                      <input
                        type="date"
                        name="scheduleDate"
                        value={form.scheduleDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className={`w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background ${errors.scheduleDate ? "border-destructive" : "border-border"}`}
                      />
                      {errors.scheduleDate && <p className="text-destructive text-xs mt-1">{errors.scheduleDate}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Preferred Time
                      </label>
                      <input
                        type="time"
                        name="scheduleTime"
                        value={form.scheduleTime}
                        onChange={handleChange}
                        className={`w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background ${errors.scheduleTime ? "border-destructive" : "border-border"}`}
                      />
                      {errors.scheduleTime && <p className="text-destructive text-xs mt-1">{errors.scheduleTime}</p>}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-sm hover:opacity-90 transition-opacity text-base"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
