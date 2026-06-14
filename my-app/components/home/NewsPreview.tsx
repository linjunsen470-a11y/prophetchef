import { Button } from "@/components/common/Button";
import { getNewsItems } from "@/sanity/queries";
import { BlogCard } from "../blog/BlogCard";
import { NewsItem } from "@/sanity/types";
import styles from "./NewsPreview.module.css";

interface NewsPreviewProps {
  data?: {
    title?: string;
    subtitle?: string;
    articles?: NewsItem[];
  };
}

export const NewsPreview = async ({ data }: NewsPreviewProps) => {
  let displayNews = data?.articles;

  if (!displayNews || displayNews.length === 0) {
    const news = await getNewsItems();
    displayNews = news.slice(0, 3);
  }

  return (
    <section className="section bg-light">
      <div className="container section-heading split-heading">
        <div>
          <span className="eyebrow">News</span>
          <h2>{data?.title || "Industry Insights and Product Knowledge"}</h2>
          {data?.subtitle && <p>{data?.subtitle}</p>}
        </div>
        <Button variant="secondary" href="/news">View All News</Button>
      </div>
      <div className={`container ${styles.newsGrid}`}>
        {displayNews.map((item) => (
          <BlogCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};
