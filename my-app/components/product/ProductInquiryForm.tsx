"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "../common/Button";

interface ProductInquiryFormProps {
  productName: string;
}

export const ProductInquiryForm: React.FC<ProductInquiryFormProps> = ({ productName }) => {
  const [status, setStatus] = useState("");

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
      } else {
        setStatus("Error: " + result.message);
      }
    } catch {
      setStatus("Error sending inquiry. Please check your connection.");
    }
  };

  return (
    <form className="p-7 bg-white border border-[color:var(--border)] rounded-[var(--radius)] shadow-[0_10px_30px_rgba(15,23,42,0.04)]" onSubmit={handleSubmit}>
      <input type="hidden" name="product" value={productName} />
      <div className="grid grid-cols-2 max-[760px]:grid-cols-1 gap-3.5">
        <div>
          <label className="block mb-2 text-[14px] font-extrabold text-[color:var(--text)]">Name</label>
          <input name="name" placeholder="Your Name" required className="w-full mb-3.5 border border-[color:var(--border)] rounded-[12px] px-[15px] py-3.5 bg-[#f8fafc] text-[color:var(--text)] font-inherit focus:outline focus:outline-2 focus:outline-[rgba(249,115,22,0.25)] focus:border-[color:var(--orange)] focus:bg-white transition-colors" />
        </div>
        <div>
          <label className="block mb-2 text-[14px] font-extrabold text-[color:var(--text)]">Email</label>
          <input type="email" name="email" placeholder="Your Email" required className="w-full mb-3.5 border border-[color:var(--border)] rounded-[12px] px-[15px] py-3.5 bg-[#f8fafc] text-[color:var(--text)] font-inherit focus:outline focus:outline-2 focus:outline-[rgba(249,115,22,0.25)] focus:border-[color:var(--orange)] focus:bg-white transition-colors" />
        </div>
      </div>
      <div>
        <label className="block mb-2 text-[14px] font-extrabold text-[color:var(--text)]">Message</label>
        <textarea name="message" rows={5} placeholder={`I am interested in ${productName}. Please send details and price.`} className="w-full mb-3.5 border border-[color:var(--border)] rounded-[12px] px-[15px] py-3.5 bg-[#f8fafc] text-[color:var(--text)] font-inherit focus:outline focus:outline-2 focus:outline-[rgba(249,115,22,0.25)] focus:border-[color:var(--orange)] focus:bg-white transition-colors"></textarea>
      </div>
      <Button type="submit" iconEnd={<Send aria-hidden="true" />}>Send Inquiry</Button>
      {status && <p className="mt-3.5 text-[#15803d] font-extrabold">{status}</p>}
    </form>
  );
};
