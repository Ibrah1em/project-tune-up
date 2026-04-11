import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer
    initial={{ opacity: 0, y: 40, rotateX: 5 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    viewport={{ once: true }}
    className="py-16 border-t border-border bg-surface-low"
    style={{ perspective: "1200px" }}
  >
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link to="/" className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">&lt;/&gt;</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">Future Leaders</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs">منصة تعليمية عربية احترافية لبناء قادة المستقبل في التقنية</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          {[
            { title: "المنصة", links: [{ label: "الدورات", to: "/courses" }, { label: "المشاريع", to: "/projects" }, { label: "الاستشارات", to: "/consultations" }, { label: "رعاة المدرسة", to: "/sponsors" }] },
            { title: "الحساب", links: [{ label: "تسجيل الدخول", to: "/login" }, { label: "إنشاء حساب", to: "/signup" }] },
            { title: "قانوني", links: [{ label: "الخصوصية", to: "#" }, { label: "الشروط", to: "#" }] },
          ].map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + ci * 0.1 }}
              viewport={{ once: true }}
            >
              <p className="font-display font-semibold text-sm text-foreground mb-4">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">© 2026 Future Leaders. جميع الحقوق محفوظة.</p>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
