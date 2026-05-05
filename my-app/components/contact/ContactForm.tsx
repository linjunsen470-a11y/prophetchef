"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "../common/Button";

export const ContactForm = () => {
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
      setStatus("Error sending message. Please try again later.");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>Name</label>
          <input name="name" placeholder="Your Name" required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="Your Email" required />
        </div>
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label>Company</label>
          <input name="company" placeholder="Company Name" />
        </div>
        <div className="form-group">
          <label>Phone / WhatsApp</label>
          <input name="phone" placeholder="Phone Number" />
        </div>
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea name="message" rows={6} placeholder="How can we help you?"></textarea>
      </div>
      <Button type="submit" iconEnd={<Send aria-hidden="true" />}>Send Message</Button>
      {status && <p className="form-message">{status}</p>}
      <style jsx>{`
        .contact-form {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius-custom);
          padding: 32px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          font-weight: 800;
          margin-bottom: 8px;
          font-size: 14px;
        }
        input, textarea {
          width: 100%;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 14px 15px;
          font: inherit;
          color: var(--color-text);
          background: #f8fafc;
        }
        input:focus, textarea:focus {
          outline: 2px solid rgba(249, 115, 22, 0.25);
          border-color: var(--orange);
          background: #fff;
        }
        .form-message {
          margin: 16px 0 0;
          color: #15803d;
          font-weight: 800;
        }
        @media (max-width: 760px) {
          .form-grid { grid-template-columns: 1fr; gap: 0; }
        }
      `}</style>
    </form>
  );
};
