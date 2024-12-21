import NewsWrapper from "@/components/news/news-wrapper";

export default async function NewsPage() {
  return (
    <div className="container px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest News</h1>
      <NewsWrapper />
    </div>
  );
}
