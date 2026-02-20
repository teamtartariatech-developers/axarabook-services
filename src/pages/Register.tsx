import { useState, useRef } from "react";
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LEGAL_AGREEMENT = `AXARA22 ENGINEER REGISTRATION AGREEMENT

Last Updated: January 2024

IMPORTANT — PLEASE READ CAREFULLY

By registering as an engineer on the axara22 platform ("Platform"), you agree to be bound by this Agreement. If you do not agree to these terms, do not proceed with registration.

1. IDENTITY AND CREDENTIAL VERIFICATION

1.1 You confirm that all information provided during registration is accurate, complete, and truthful.
1.2 You acknowledge that axara22 will conduct verification checks on your submitted academic credentials, including degree certificates and any other qualifications.
1.3 You confirm that any degree, certificate, or qualification document you upload is genuine, has not been altered or forged, and was awarded to you personally.
1.4 Submission of fraudulent, altered, or misrepresented documents constitutes grounds for immediate and permanent removal from the platform and may be reported to appropriate legal authorities.

2. PROHIBITION ON FRAUDULENT CONDUCT

2.1 You must not impersonate any other person or engineer.
2.2 You must not submit another person's credentials as your own.
2.3 You must not fabricate or falsify any engineering qualifications, work experience, or certifications.
2.4 axara22 reserves the right to cross-verify your credentials with issuing institutions at any time.

3. PROFESSIONAL CONDUCT

3.1 You agree to conduct all services booked through the platform in a professional, ethical, and lawful manner.
3.2 You accept responsibility for any harm, damage, or liability arising from negligent or fraudulent services rendered.
3.3 You must carry valid professional indemnity insurance where required by law.

4. DATA AND PRIVACY

4.1 Your submitted documents and personal data will be stored securely and processed in accordance with axara22's Privacy Policy.
4.2 You consent to axara22 verifying your credentials with relevant licensing bodies or educational institutions.

5. TERMINATION

5.1 axara22 reserves the right to suspend or permanently remove your account if any breach of this agreement is detected, including but not limited to submission of fraudulent credentials.
5.2 Legal action may be pursued against individuals found to have submitted forged documents.

6. GOVERNING LAW

This Agreement shall be governed by and construed in accordance with applicable law. Any disputes arising from this Agreement shall be subject to the exclusive jurisdiction of the relevant courts.

BY CLICKING "I AGREE" BELOW, YOU CONFIRM THAT:
— You have read and understood this entire agreement.
— All submitted credentials are genuine and belong to you.
— You understand the legal consequences of submitting false information.`;

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  discipline: string;
  licenseNumber: string;
  yearsExperience: string;
  city: string;
  country: string;
};

const disciplines = [
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Structural Engineering",
  "IT & Network Engineering",
  "HVAC Engineering",
  "Chemical Engineering",
  "Software Engineering",
  "Other",
];

const Register = () => {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    discipline: "",
    licenseNumber: "",
    yearsExperience: "",
    city: "",
    country: "",
  });
  const [degreeFile, setDegreeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [showLegal, setShowLegal] = useState(false);
  const [agreed, setAgreed] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setFileError("Only PDF files are accepted.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setFileError("File must be under 10MB.");
      return;
    }
    setFileError("");
    setDegreeFile(file);
  };

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.discipline) e.discipline = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.country.trim()) e.country = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!degreeFile) {
      setFileError("Please upload your degree certificate (PDF).");
      return;
    }
    if (agreed !== true) {
      setShowLegal(true);
      return;
    }
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
            <h2 className="text-2xl font-bold mb-3">Application Submitted</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-2">
              Thank you, <strong>{form.firstName}</strong>. Your engineer registration is under review.
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              We'll verify your credentials and notify you at <strong>{form.email}</strong> within 2–3 business days.
            </p>
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
          <span className="text-xs uppercase tracking-widest opacity-50 block mb-3">For Professionals</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Engineer Registration</h1>
          <p className="opacity-70 max-w-lg text-lg">
            Join axara22 as a verified engineer. Complete the form and upload your credentials for review.
          </p>
        </div>
      </section>

      {/* Form */}
      <main className="flex-1 bg-muted">
        <div className="container-max section-padding py-12">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-background border border-border rounded-sm p-8 md:p-10 shadow-sm">
              <h2 className="text-xl font-bold mb-7 pb-4 border-b border-border">Personal Information</h2>
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {(["firstName", "lastName"] as const).map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-semibold mb-2 capitalize">
                        {field === "firstName" ? "First Name" : "Last Name"} <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        className={`w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background ${errors[field] ? "border-destructive" : "border-border"}`}
                      />
                      {errors[field] && <p className="text-destructive text-xs mt-1">{errors[field]}</p>}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email <span className="text-destructive">*</span></label>
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
                    <label className="block text-sm font-semibold mb-2">Phone <span className="text-destructive">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={`w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background ${errors.phone ? "border-destructive" : "border-border"}`}
                    />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Professional */}
                <div className="pt-4 border-t border-border">
                  <h3 className="font-bold mb-5">Professional Details</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Engineering Discipline <span className="text-destructive">*</span></label>
                      <select
                        name="discipline"
                        value={form.discipline}
                        onChange={handleChange}
                        className={`w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background ${errors.discipline ? "border-destructive" : "border-border"}`}
                      >
                        <option value="">Select discipline…</option>
                        {disciplines.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                      {errors.discipline && <p className="text-destructive text-xs mt-1">{errors.discipline}</p>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold mb-2">License Number <span className="text-muted-foreground font-normal">(if applicable)</span></label>
                        <input
                          type="text"
                          name="licenseNumber"
                          value={form.licenseNumber}
                          onChange={handleChange}
                          className="w-full border border-border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Years of Experience</label>
                        <input
                          type="number"
                          name="yearsExperience"
                          value={form.yearsExperience}
                          onChange={handleChange}
                          min="0"
                          max="60"
                          className="w-full border border-border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold mb-2">City <span className="text-destructive">*</span></label>
                        <input
                          type="text"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          className={`w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background ${errors.city ? "border-destructive" : "border-border"}`}
                        />
                        {errors.city && <p className="text-destructive text-xs mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Country <span className="text-destructive">*</span></label>
                        <input
                          type="text"
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          className={`w-full border rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background ${errors.country ? "border-destructive" : "border-border"}`}
                        />
                        {errors.country && <p className="text-destructive text-xs mt-1">{errors.country}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Degree Upload */}
                <div className="pt-4 border-t border-border">
                  <h3 className="font-bold mb-2">Degree Certificate</h3>
                  <p className="text-muted-foreground text-xs mb-4">Upload your degree certificate in PDF format (max 10MB). This will be verified by our team.</p>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className={`border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-colors ${
                      degreeFile ? "border-primary bg-muted" : fileError ? "border-destructive" : "border-border hover:border-primary"
                    }`}
                  >
                    {degreeFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <FileText className="w-6 h-6 text-primary" />
                        <div className="text-left">
                          <p className="text-sm font-semibold">{degreeFile.name}</p>
                          <p className="text-xs text-muted-foreground">{(degreeFile.size / 1024).toFixed(0)} KB</p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setDegreeFile(null); if (fileRef.current) fileRef.current.value = ""; }}
                          className="ml-2 text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm font-medium">Click to upload PDF</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF only, max 10MB</p>
                      </>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="application/pdf" onChange={handleFile} className="hidden" />
                  {fileError && <p className="text-destructive text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{fileError}</p>}
                </div>

                {/* Agreement status */}
                {agreed === true && (
                  <div className="flex items-center gap-2 text-sm text-primary font-medium bg-muted border border-primary/20 rounded-sm px-4 py-3">
                    <CheckCircle className="w-4 h-4" />
                    You have agreed to the axara22 Engineer Agreement
                  </div>
                )}
                {agreed === false && (
                  <div className="flex items-center gap-2 text-sm text-destructive font-medium bg-destructive/5 border border-destructive/20 rounded-sm px-4 py-3">
                    <AlertCircle className="w-4 h-4" />
                    You must agree to the terms to register.{" "}
                    <button type="button" onClick={() => setShowLegal(true)} className="underline">Review again</button>
                  </div>
                )}
                {agreed === null && (
                  <div className="text-xs text-muted-foreground border border-border rounded-sm px-4 py-3">
                    By submitting, you'll be asked to review and agree to our Engineer Legal Agreement.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-sm hover:opacity-90 transition-opacity text-base"
                >
                  {agreed === true ? "Submit Registration" : "Review & Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Legal Agreement Modal */}
      {showLegal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4">
          <div className="bg-background rounded-sm shadow-xl max-w-2xl w-full flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="font-bold text-lg">Engineer Registration Agreement</h2>
                <p className="text-xs text-muted-foreground mt-0.5">You must read and agree to continue</p>
              </div>
              <button onClick={() => setShowLegal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <pre className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap font-sans">
                {LEGAL_AGREEMENT}
              </pre>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-border bg-muted flex gap-3 justify-end">
              <button
                onClick={() => { setAgreed(false); setShowLegal(false); }}
                className="px-6 py-2.5 border border-border rounded-sm text-sm font-semibold hover:bg-destructive/5 hover:border-destructive transition-colors"
              >
                I Disagree
              </button>
              <button
                onClick={() => { setAgreed(true); setShowLegal(false); }}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-sm text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                I Agree
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Register;
