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
    <article className="legal-page">
      <Container className="legal-container">
        <span className="eyebrow">Privacy Policy</span>
        <h1>Privacy Policy</h1>
        <p className="legal-lead">
          This Privacy Policy explains how {siteConfig.name} collects, uses and protects
          information when you visit our website or contact us about commercial kitchen
          equipment, OEM projects, quotations or after-sales support.
        </p>
        <p className="legal-updated">Last updated: May 5, 2026</p>

        <div className="legal-content">
          {policySections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <section>
            <h2>International Business Communications</h2>
            <p>
              Because {siteConfig.name} serves global foodservice buyers, inquiry details
              may be processed in different countries or regions where our staff, systems
              or service providers operate. We handle such information for legitimate B2B
              communication and project support.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              For privacy questions or requests, contact us at{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. You can also
              use the <Link href="/contact">contact page</Link> for business inquiries.
            </p>
          </section>
        </div>
      </Container>
    </article>
  );
}
