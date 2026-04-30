import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { navigation } from "@/data/navigation";
import { Container } from "../common/Container";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07111f] text-white/78 border-t border-white/10">
      <Container>
        <div className="grid grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-10 py-[62px] lg:grid-cols-2 sm:grid-cols-1">
          {/* Brand & Intro */}
          <div>
            <Link href="/" className="flex items-center gap-[10px] font-800 text-[20px] tracking-[-0.02em] no-underline text-white mb-[18px]">
              <span className="brand-mark">
                PKT
              </span>
              <span>{siteConfig.name}</span>
            </Link>
            <p className="text-white/72 mb-6 leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white text-[18px] font-800 mb-4">Products</h3>
            <div className="flex flex-col gap-2">
              <Link href="/products#Commercial-Induction-Cookers" className="text-white/78 hover:text-white no-underline">Commercial Induction Cookers</Link>
              <Link href="/products#Automatic-Cooking-Machines" className="text-white/78 hover:text-white no-underline">Automatic Cooking Machines</Link>
              <Link href="/products#Combi-Ovens" className="text-white/78 hover:text-white no-underline">Combi Ovens</Link>
              <Link href="/products#Commercial-Dishwashers" className="text-white/78 hover:text-white no-underline">Commercial Dishwashers</Link>
              <Link href="/products#Modular-Cooking-Systems" className="text-white/78 hover:text-white no-underline">Modular Cooking Systems</Link>
              <Link href="/products#Custom-Kitchen-Solutions" className="text-white/78 hover:text-white no-underline">Custom Kitchen Solutions</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-[18px] font-800 mb-4">Company</h3>
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="text-white/78 hover:text-white no-underline"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-[18px] font-800 mb-4">Contact</h3>
            <p className="mb-2 text-white/72">
              Email: <Link href={`mailto:${siteConfig.email}`} className="text-white/78 hover:text-white">{siteConfig.email}</Link>
            </p>
            <p className="mb-2 text-white/72">
              WhatsApp: <Link href={`https://wa.me/${siteConfig.whatsapp}`} className="text-white/78 hover:text-white">{siteConfig.phone}</Link>
            </p>
            <p className="mb-2 text-white/72">
              Address: {siteConfig.address}
            </p>
            <p className="mb-2 text-white/72">
              Language: EN / ES / FR / RU / AR
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-[18px]">
          <div className="flex justify-between items-center gap-5 text-[14px] text-white/62 sm:block">
            <span>© {currentYear} {siteConfig.name}. All rights reserved.</span>
            <div className="flex gap-6 sm:mt-2">
              <Link href="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
              <Link href="/sitemap" className="hover:text-white transition-colors duration-200">Sitemap</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
