import { Button } from "@/components/common/Button";
import { getProducts } from "@/sanity/queries";
import { Container } from "../common/Container";
import { ProductCard } from "../product/ProductCard";
import { Product, SectionHeaderData } from "@/sanity/types";

interface FeaturedProductsProps {
  products?: Product[];
  header?: SectionHeaderData;
}

export const FeaturedProducts = async ({ products, header }: FeaturedProductsProps) => {
  let displayProducts = products;

  // Fallback to fetching all products if no manual selection is provided
  if (!displayProducts || displayProducts.length === 0) {
    const allProducts = await getProducts();
    displayProducts = allProducts.slice(0, 6);
  }

  return (
    <section className="section bg-light">
      <Container className="section-heading split-heading">
        <div>
          <span className="eyebrow">{header?.eyebrow || "Featured Products"}</span>
          <h2>{header?.title || "Factory Direct Commercial Foodservice Equipment"}</h2>
          {header?.description && <p>{header.description}</p>}
        </div>
        <Button variant="secondary" href={header?.cta?.href || "/products"}>
          {header?.cta?.text || "View All Products"}
        </Button>
      </Container>
      
      <Container className="product-grid">
        {displayProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </Container>
    </section>
  );
};
