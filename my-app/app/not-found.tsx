import React from "react";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";

export default function NotFound() {
  return (
    <div className="py-30 min-h-[60vh] flex items-center">
      <Container className="text-center">
        <span className="eyebrow">404 Error</span>
        <h1 className="text-[64px] my-[10px] mx-0 leading-[1.1] tracking-[-0.04em]">Page Not Found</h1>
        <p className="text-[18px] text-muted max-w-[540px] my-0 mx-auto mb-8">The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
        <div className="flex gap-3 justify-center">
          <Button href="/">Back to Home</Button>
          <Button href="/products" variant="secondary">View Products</Button>
        </div>
      </Container>
    </div>
  );
}
