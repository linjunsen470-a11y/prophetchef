import type { Application, Category, Product } from "@/sanity/types";

function sentence(value: string | undefined) {
  return value?.trim().replace(/[.。]+$/, "") || "";
}

function listPreview(values: string[], max = 3) {
  return values.filter(Boolean).slice(0, max).join(", ");
}

export function buildProductSeoDescription(product: Product) {
  const categoryName = product.category?.name || "commercial kitchen equipment";
  const variantCount = product.variants?.length || 0;
  const modelText = variantCount > 1 ? `${variantCount} model options` : product.modelCode ? `model ${product.modelCode}` : "model options";
  const baseDescription = sentence(product.description);

  const detail = baseDescription ? `${baseDescription}. ` : "";

  return `${product.name} is a ProphetChef ${categoryName} series for commercial kitchens and foodservice projects. ${detail}Compare ${modelText}, technical specifications, OEM support and request a factory-direct quotation.`;
}

export function buildCategorySeoDescription(category: Category, products: Product[] = []) {
  const productNames = listPreview(products.map((product) => product.name));
  const productText = productNames ? ` including ${productNames}` : " for B2B kitchen projects";
  const categoryDescription = sentence(category.description);
  const detail = categoryDescription ? `${categoryDescription}. ` : "";

  return `${detail}Explore ProphetChef ${category.name}${productText}. Compare commercial equipment series, model specifications, OEM options and request a factory-direct quote for your foodservice project.`;
}

export function buildApplicationSeoDescription(application: Application) {
  const recommended = sentence(application.recommended);
  const recommendationText = recommended ? ` Recommended equipment includes ${recommended}.` : "";
  const description = sentence(application.description);
  const intro = description ? `${description}.` : `Plan ${application.name} commercial kitchen projects with ProphetChef equipment recommendations.`;

  return `${intro}${recommendationText} Review project planning priorities, equipment mix and request a factory-direct solution quotation from ProphetChef.`;
}


