"use client";

import React, { useEffect } from "react";
import * as analytics from "@/lib/analytics";

interface ProductViewTrackerProps {
  productName: string;
  categoryName: string;
}

export const ProductViewTracker: React.FC<ProductViewTrackerProps> = ({
  productName,
  categoryName,
}) => {
  useEffect(() => {
    // GA4 view_item event
    analytics.event("view_item", {
      currency: "USD",
      items: [
        {
          item_name: productName,
          item_category: categoryName,
        },
      ],
    });

    // Facebook Pixel ViewContent event
    analytics.fbqEvent("ViewContent", {
      content_name: productName,
      content_category: categoryName,
    });
  }, [productName, categoryName]);

  return null;
};
