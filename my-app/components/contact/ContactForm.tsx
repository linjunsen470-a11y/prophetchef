"use client";

import React, { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "../common/Button";
import * as analytics from "@/lib/analytics";

export const ContactForm = () => {
  const [status, setStatus] = useState("");
  const submittedAtRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    submittedAtRef.current?.setAttribute("value", String(Date.now()));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    setStatus("Sending...");
    
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        setStatus(result.message);
        analytics.event("generate_lead", {
          event_category: "Contact",
          event_label: "Inquiry Form",
        });
        analytics.fbqEvent("Lead", {
          content_name: "Inquiry Form",
        });
      } else {
        setStatus("Error: " + result.message);
      }
    } catch {
      setStatus("Error sending message. Please try again later.");
    }
  };

  return (
    <form className="rounded-[var(--radius-custom)] border border-[color:var(--border)] bg-white p-8 shadow-[0_10px_26px_rgba(9,24,39,0.05)]" onSubmit={handleSubmit}>
      <input ref={submittedAtRef} type="hidden" name="submittedAt" />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid grid-cols-2 gap-5 max-[760px]:grid-cols-1 max-[760px]:gap-0">
        <div className="mb-5">
          <label className="mb-2 block text-[14px] font-extrabold text-[color:var(--text)]">Name</label>
          <input className="w-full rounded-[7px] border border-[color:var(--border)] bg-[#f4f7f9] px-[15px] py-3.5 text-[color:var(--text)] transition-colors focus:border-[color:var(--orange)] focus:bg-white focus:outline focus:outline-2 focus:outline-[rgba(230,95,26,0.24)]" name="name" placeholder="Your Name" required />
        </div>
        <div className="mb-5">
          <label className="mb-2 block text-[14px] font-extrabold text-[color:var(--text)]">Email</label>
          <input className="w-full rounded-[7px] border border-[color:var(--border)] bg-[#f4f7f9] px-[15px] py-3.5 text-[color:var(--text)] transition-colors focus:border-[color:var(--orange)] focus:bg-white focus:outline focus:outline-2 focus:outline-[rgba(230,95,26,0.24)]" type="email" name="email" placeholder="Your Email" required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 max-[760px]:grid-cols-1 max-[760px]:gap-0">
        <div className="mb-5">
          <label className="mb-2 block text-[14px] font-extrabold text-[color:var(--text)]">Company</label>
          <input className="w-full rounded-[7px] border border-[color:var(--border)] bg-[#f4f7f9] px-[15px] py-3.5 text-[color:var(--text)] transition-colors focus:border-[color:var(--orange)] focus:bg-white focus:outline focus:outline-2 focus:outline-[rgba(230,95,26,0.24)]" name="company" placeholder="Company Name" />
        </div>
        <div className="mb-5">
          <label className="mb-2 block text-[14px] font-extrabold text-[color:var(--text)]">Phone / WhatsApp</label>
          <input className="w-full rounded-[7px] border border-[color:var(--border)] bg-[#f4f7f9] px-[15px] py-3.5 text-[color:var(--text)] transition-colors focus:border-[color:var(--orange)] focus:bg-white focus:outline focus:outline-2 focus:outline-[rgba(230,95,26,0.24)]" name="phone" placeholder="Phone Number" />
        </div>
      </div>
      <div className="mb-5">
        <label className="mb-2 block text-[14px] font-extrabold text-[color:var(--text)]">Message</label>
        <textarea className="w-full rounded-[7px] border border-[color:var(--border)] bg-[#f4f7f9] px-[15px] py-3.5 text-[color:var(--text)] transition-colors focus:border-[color:var(--orange)] focus:bg-white focus:outline focus:outline-2 focus:outline-[rgba(230,95,26,0.24)]" name="message" rows={6} placeholder="How can we help you?"></textarea>
      </div>
      <Button type="submit" iconEnd={<Send aria-hidden="true" />}>Send Message</Button>
      {status && (
        <p className={`mt-4 font-extrabold ${status.startsWith("Error") ? "text-[color:var(--orange)]" : "text-[#15803d]"}`}>
          {status}
        </p>
      )}
    </form>
  );
};
