"use client";

import React, { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "../common/Button";
import * as analytics from "@/lib/analytics";

interface ProductInquiryFormProps {
  productName: string;
}

export const ProductInquiryForm: React.FC<ProductInquiryFormProps> = ({ productName }) => {
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
          event_category: "Product Inquiry",
          event_label: productName,
        });
        analytics.fbqEvent("Lead", {
          content_name: productName,
          content_category: "Product Inquiry",
        });
      } else {
        setStatus("Error: " + result.message);
      }
    } catch {
      setStatus("Error sending inquiry. Please check your connection.");
    }
  };

  return (
    <form className="p-7 bg-white border border-[color:var(--border)] rounded-[var(--radius)] shadow-[0_10px_26px_rgba(9,24,39,0.05)]" onSubmit={handleSubmit}>
      <input type="hidden" name="product" value={productName} />
      <input ref={submittedAtRef} type="hidden" name="submittedAt" />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid grid-cols-2 max-[760px]:grid-cols-1 gap-3.5">
        <div>
          <label className="block mb-2 text-[14px] font-extrabold text-[color:var(--text)]">Name</label>
          <input name="name" placeholder="Your Name" required className="w-full mb-3.5 border border-[color:var(--border)] rounded-[7px] px-[15px] py-3.5 bg-[#f4f7f9] text-[color:var(--text)] font-inherit focus:outline focus:outline-2 focus:outline-[rgba(230,95,26,0.24)] focus:border-[color:var(--orange)] focus:bg-white transition-colors" />
        </div>
        <div>
          <label className="block mb-2 text-[14px] font-extrabold text-[color:var(--text)]">Email</label>
          <input type="email" name="email" placeholder="Your Email" required className="w-full mb-3.5 border border-[color:var(--border)] rounded-[7px] px-[15px] py-3.5 bg-[#f4f7f9] text-[color:var(--text)] font-inherit focus:outline focus:outline-2 focus:outline-[rgba(230,95,26,0.24)] focus:border-[color:var(--orange)] focus:bg-white transition-colors" />
        </div>
      </div>
      <div>
        <label className="block mb-2 text-[14px] font-extrabold text-[color:var(--text)]">Message</label>
        <textarea name="message" rows={5} placeholder={`I am interested in ${productName}. Please send details and price.`} className="w-full mb-3.5 border border-[color:var(--border)] rounded-[7px] px-[15px] py-3.5 bg-[#f4f7f9] text-[color:var(--text)] font-inherit focus:outline focus:outline-2 focus:outline-[rgba(230,95,26,0.24)] focus:border-[color:var(--orange)] focus:bg-white transition-colors"></textarea>
      </div>
      <Button type="submit" iconEnd={<Send aria-hidden="true" />}>Send Inquiry</Button>
      {status && (
        <p className={`mt-3.5 font-extrabold ${status.startsWith("Error") ? "text-[color:var(--orange)]" : "text-[#15803d]"}`}>
          {status}
        </p>
      )}
    </form>
  );
};
