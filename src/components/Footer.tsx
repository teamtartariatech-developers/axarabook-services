import { Link } from "react-router-dom";
import { Zap, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-max section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-3">
              <div className="w-8 h-8 bg-primary-foreground flex items-center justify-center rounded-sm">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              axara<span className="opacity-50">22</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed max-w-xs">
              Connecting you with verified, certified engineers for all your technical needs.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest opacity-60">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {[{ to: "/", label: "Home" }, { to: "/services", label: "Book Engineer" }, { to: "/register", label: "Engineer Register" }].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="opacity-70 hover:opacity-100 transition-opacity">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest opacity-60">Contact</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@axara22.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (800) 292-2200</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Global Operations</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-light mt-10 pt-6 text-xs opacity-40 flex flex-col sm:flex-row justify-between gap-2">
          <span>© 2024 axara22. All rights reserved.</span>
          <span>Verified Engineers. Trusted Service.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
