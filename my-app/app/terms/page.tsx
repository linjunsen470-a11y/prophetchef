import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for using the ProKitchenTech website and submitting commercial kitchen equipment inquiries.",
};

const termsSections = [
  {
    title: "Use of This Website",
    body: [
      "This website provides general information about commercial kitchen equipment, manufacturing capability, applications, certificates and inquiry channels.",
      "You agree to use the website only for lawful business purposes and not to interfere with website operation, security or availability.",
    ],
  },
  {
    title: "Product Information",
    body: [
      "Product images, descriptions, specifications, dimensions and application suggestions are provided for general reference. Actual product details may vary by model, configuration, certification requirement, destination market or custom project scope.",
      "Final specifications, pricing, delivery time, warranty terms and commercial obligations must be confirmed in written quotations, proforma invoices, purchase contracts or other signed business documents.",
    ],
  },
  {
    title: "Inquiries and Quotations",
    body: [
      "Submitting an inquiry through the website does not create a purchase contract. Our team may contact you to clarify requirements before issuing a quotation.",
      "Quotations may be subject to material costs, exchange rates, shipping conditions, destination requirements, order quantity and validity periods stated in the quotation.",
    ],
  },
  {
    title: "Intellectual Property",
    body: [
      "Website content, including text, page layouts, product descriptions, graphics, logos and other materials, is owned by or licensed to ProKitchenTech unless otherwise stated.",
      "You may view and share website pages for normal business evaluation. You may not copy, reproduce, scrape, modify or republish website content for competing commercial use without written permission.",
    ],
  },
  {
    title: "Third-Party Links and Services",
    body: [
      "The website may include links to third-party websites or services, such as WhatsApp, email clients, map providers or image sources. We are not responsible for third-party content, availability, security or privacy practices.",
    ],
  },
  {
    title: "Limitation of Liability",
    body: [
      "To the fullest extent permitted by applicable law, ProKitchenTech is not liable for indirect, incidental, consequential or special damages arising from website use, inability to access the website, reliance on website information or third-party service availability.",
      "Nothing in these Terms limits obligations that cannot be excluded under applicable law or under a separate signed contract.",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <article className="py-24 max-md:py-16 bg-[linear-gradient(180deg,#f8fafc_0,#fff_260px)]">
      <Container className="max-w-[880px]">
        <span className="inline-flex items-center gap-2 uppercase tracking-[0.12em] text-[12px] font-black text-[color:var(--orange)]">Terms of Service</span>
        <h1 className="mt-3 mb-4 text-[color:var(--text)] text-[clamp(38px,5vw,58px)] font-extrabold leading-[1.06] tracking-[-0.045em]">Terms of Service</h1>
        <p className="m-0 text-[color:var(--muted)] text-[18px] leading-[1.7]">
          These Terms of Service govern your access to and use of the {siteConfig.name}
          website. By using this website or submitting an inquiry, you agree to these
          Terms.
        </p>
        <p className="mt-[18px] text-[color:var(--blue)] text-[14px] font-extrabold">Last updated: May 5, 2026</p>

        <div className="mt-[42px] p-[34px] max-md:p-6 border border-[color:var(--border)] rounded-[18px] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
          {termsSections.map((section) => (
            <section key={section.title} className="mt-[30px] pt-[30px] border-t border-[color:var(--border)] first:mt-0 first:pt-0 first:border-t-0">
              <h2 className="m-0 mb-3 text-[color:var(--text)] text-[24px] font-extrabold leading-[1.25]">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="m-0 mt-3 first:mt-0 text-[#334155] leading-[1.75]">{paragraph}</p>
              ))}
            </section>
          ))}

          <section className="mt-[30px] pt-[30px] border-t border-[color:var(--border)] first:mt-0 first:pt-0 first:border-t-0">
            <h2 className="m-0 mb-3 text-[color:var(--text)] text-[24px] font-extrabold leading-[1.25]">Warranty, Installation and After-Sales Support</h2>
            <p className="m-0 text-[#334155] leading-[1.75]">
              Product warranty, spare parts, installation guidance, commissioning,
              maintenance and after-sales support terms depend on product type, order
              scope and confirmed commercial documents. Website descriptions do not
              replace written warranty or service terms agreed for a specific order.
            </p>
          </section>

          <section className="mt-[30px] pt-[30px] border-t border-[color:var(--border)] first:mt-0 first:pt-0 first:border-t-0">
            <h2 className="m-0 mb-3 text-[color:var(--text)] text-[24px] font-extrabold leading-[1.25]">Changes to These Terms</h2>
            <p className="m-0 text-[#334155] leading-[1.75]">
              We may update these Terms from time to time. The latest version will be
              posted on this page with the updated date. Continued use of the website
              after changes means you accept the revised Terms.
            </p>
          </section>

          <section className="mt-[30px] pt-[30px] border-t border-[color:var(--border)] first:mt-0 first:pt-0 first:border-t-0">
            <h2 className="m-0 mb-3 text-[color:var(--text)] text-[24px] font-extrabold leading-[1.25]">Contact</h2>
            <p className="m-0 text-[#334155] leading-[1.75]">
              For questions about these Terms, contact us at{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-[color:var(--orange)] font-extrabold hover:text-[color:var(--orange-dark)] transition-colors">{siteConfig.email}</a> or visit the{" "}
              <Link href="/contact" className="text-[color:var(--orange)] font-extrabold hover:text-[color:var(--orange-dark)] transition-colors">contact page</Link>.
            </p>
          </section>
        </div>
      </Container>
    </article>
  );
}
