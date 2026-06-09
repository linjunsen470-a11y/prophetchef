import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for ProKitchenTech, covering inquiry data, website analytics, cookies, data sharing and user rights.",
};

const policySections = [
  {
    title: "Information We Collect",
    body: [
      "When you submit an inquiry, request a quotation, contact us by email, phone or WhatsApp, we may collect your name, company name, country or region, contact details, project requirements and any files or messages you choose to send.",
      "We may also collect basic technical information from website visits, such as browser type, device information, referring pages, approximate location, pages viewed and interaction data.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use collected information to respond to inquiries, prepare quotations, recommend suitable commercial kitchen equipment, provide project support, arrange after-sales communication and improve our website and services.",
      "We may also use contact information to follow up on B2B project discussions, distributor cooperation or product updates when the communication is relevant to your request.",
    ],
  },
  {
    title: "Cookies and Analytics",
    body: [
      "Our website may use cookies or similar technologies to keep the site functional, understand visitor traffic and improve page performance.",
      "You can disable cookies in your browser settings, although some website features may not work as intended.",
    ],
  },
  {
    title: "How We Share Information",
    body: [
      "We do not sell personal information. We may share necessary details with trusted service providers, logistics partners, technical support providers or internal teams when required to process inquiries, prepare quotations, deliver services or comply with legal obligations.",
      "Where a project requires cooperation with a regional partner, we will only share information that is reasonably necessary for the requested business communication.",
    ],
  },
  {
    title: "Data Retention and Security",
    body: [
      "We retain inquiry and business communication records for as long as needed to support the project, maintain commercial records, resolve disputes or meet legal and accounting requirements.",
      "We use reasonable administrative, technical and organizational measures to protect information. No online transmission or storage method can be guaranteed to be completely secure.",
    ],
  },
  {
    title: "Your Choices and Rights",
    body: [
      "You may contact us to request access, correction or deletion of personal information we hold about you, subject to identity verification and applicable legal requirements.",
      "You may also ask us to stop sending non-essential follow-up messages.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <article className="py-24 max-md:py-16 bg-[linear-gradient(180deg,#f8fafc_0,#fff_260px)]">
      <Container className="max-w-[880px]">
        <span className="inline-flex items-center gap-2 uppercase tracking-[0.12em] text-[12px] font-black text-[color:var(--orange)]">Privacy Policy</span>
        <h1 className="mt-3 mb-4 text-[color:var(--text)] text-[clamp(38px,5vw,58px)] font-extrabold leading-[1.06] tracking-[-0.045em]">Privacy Policy</h1>
        <p className="m-0 text-[color:var(--muted)] text-[18px] leading-[1.7]">
          This Privacy Policy explains how {siteConfig.name} collects, uses and protects
          information when you visit our website or contact us about commercial kitchen
          equipment, OEM projects, quotations or after-sales support.
        </p>
        <p className="mt-[18px] text-[color:var(--blue)] text-[14px] font-extrabold">Last updated: May 5, 2026</p>

        <div className="mt-[42px] p-[34px] max-md:p-6 border border-[color:var(--border)] rounded-[10px] bg-white shadow-[0_14px_34px_rgba(9,24,39,0.08)]">
          {policySections.map((section) => (
            <section key={section.title} className="mt-[30px] pt-[30px] border-t border-[color:var(--border)] first:mt-0 first:pt-0 first:border-t-0">
              <h2 className="m-0 mb-3 text-[color:var(--text)] text-[24px] font-extrabold leading-[1.25]">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="m-0 mt-3 first:mt-0 text-[#334155] leading-[1.75]">{paragraph}</p>
              ))}
            </section>
          ))}

          <section className="mt-[30px] pt-[30px] border-t border-[color:var(--border)] first:mt-0 first:pt-0 first:border-t-0">
            <h2 className="m-0 mb-3 text-[color:var(--text)] text-[24px] font-extrabold leading-[1.25]">International Business Communications</h2>
            <p className="m-0 text-[#334155] leading-[1.75]">
              Because {siteConfig.name} serves global foodservice buyers, inquiry details
              may be processed in different countries or regions where our staff, systems
              or service providers operate. We handle such information for legitimate B2B
              communication and project support.
            </p>
          </section>

          <section className="mt-[30px] pt-[30px] border-t border-[color:var(--border)] first:mt-0 first:pt-0 first:border-t-0">
            <h2 className="m-0 mb-3 text-[color:var(--text)] text-[24px] font-extrabold leading-[1.25]">Contact Us</h2>
            <p className="m-0 text-[#334155] leading-[1.75]">
              For privacy questions or requests, contact us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-[color:var(--orange)] font-extrabold hover:text-[color:var(--orange-dark)] transition-colors">{siteConfig.email}</a>. You can also
              use the <Link href="/contact" className="text-[color:var(--orange)] font-extrabold hover:text-[color:var(--orange-dark)] transition-colors">contact page</Link> for business inquiries.
            </p>
          </section>
        </div>
      </Container>
    </article>
  );
}
