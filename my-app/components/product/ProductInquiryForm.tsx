"use client";

import React, { useState } from "react";
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
    } catch (err) {
      setStatus("Error sending inquiry. Please check your connection.");
    }
  };

  return (
    <form className="bg-white border border-border rounded-custom p-8 shadow-[0_10px_30px_rgba(15,23,42,0.04)]" onSubmit={handleSubmit}>
      <input type="hidden" name="product" value={productName} />
      <div className="grid grid-cols-2 gap-5 mb-5 sm:grid-cols-1 sm:gap-0">
        <div className="mb-5 sm:mb-4">
          <label className="block font-800 mb-2 text-[14px]">Name</label>
          <input name="name" placeholder="Your Name" required className="w-full border border-border rounded-[12px] p-[14px_15px] font-inherit text-text bg-[#f8fafc] focus:outline focus:outline-2 focus:outline-orange/25 focus:border-orange focus:bg-white" />
        </div>
        <div className="mb-5 sm:mb-4">
          <label className="block font-800 mb-2 text-[14px]">Email</label>
          <input type="email" name="email" placeholder="Your Email" required className="w-full border border-border rounded-[12px] p-[14px_15px] font-inherit text-text bg-[#f8fafc] focus:outline focus:outline-2 focus:outline-orange/25 focus:border-orange focus:bg-white" />
        </div>
      </div>
      <div className="mb-5">
        <label className="block font-800 mb-2 text-[14px]">Message</label>
        <textarea name="message" rows={5} placeholder={`I am interested in ${productName}. Please send details and price.`} className="w-full border border-border rounded-[12px] p-[14px_15px] font-inherit text-text bg-[#f8fafc] focus:outline focus:outline-2 focus:outline-orange/25 focus:border-orange focus:bg-white"></textarea>
      </div>
      <Button type="submit">Send Inquiry</Button>
      {status && <p className="mt-4 mb-0 text-[#15803d] font-800">{status}</p>}
    </form>
  );
};
