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
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <input type="hidden" name="product" value={productName} />
      <div className="form-grid">
        <div>
          <label>Name</label>
          <input name="name" placeholder="Your Name" required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" placeholder="Your Email" required />
        </div>
      </div>
      <div>
        <label>Message</label>
        <textarea name="message" rows={5} placeholder={`I am interested in ${productName}. Please send details and price.`}></textarea>
      </div>
      <Button type="submit" iconEnd={<Send aria-hidden="true" />}>Send Inquiry</Button>
      {status && <p className="form-message">{status}</p>}
    </form>
  );
};
