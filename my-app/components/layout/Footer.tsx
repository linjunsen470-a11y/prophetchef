import Link from "next/link";
import { siteConfig } from "@/data/site";

const productLinks = [
  ["Commercial Induction Cookers", "/products#Commercial-Induction-Cookers"],
  ["Automatic Cooking Machines", "/products#Automatic-Cooking-Machines"],
  ["Combi Ovens", "/products#Combi-Ovens"],
  ["Commercial Dishwashers", "/products#Commercial-Dishwashers"],
  ["Modular Cooking Systems", "/products#Modular-Cooking-Systems"],
  ["Custom Kitchen Solutions", "/products#Custom-Kitchen-Solutions"],
];

const companyLinks = [
  ["Factory", "/factory"],
  ["Applications", "/applications"],
  ["Certificates", "/certificates"],
  ["News", "/news"],
  ["Contact", "/contact"],
];

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark">PKT</span>
            <span>{siteConfig.name}</span>
          </Link>
          <p>{siteConfig.description}</p>
        </div>

        <div>
          <h3>Products</h3>
          {productLinks.map(([label, href]) => (
            <Link href={href} key={href}>{label}</Link>
          ))}
        </div>

        <div>
          <h3>Company</h3>
          {companyLinks.map(([label, href]) => (
            <Link href={href} key={href}>{label}</Link>
          ))}
        </div>

        <div>
          <h3>Contact</h3>
          <p>Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
          <p>WhatsApp: <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener">{siteConfig.phone}</a></p>
          <p>Address: {siteConfig.address}</p>
          <p>Language: EN / ES / FR / RU / AR</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© 2026 {siteConfig.name}. All rights reserved.</span>
          <span><Link href="/privacy">Privacy Policy</Link> · <Link href="/sitemap">Sitemap</Link></span>
        </div>
      </div>
    </footer>
  );
};
