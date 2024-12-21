"use client";

import { useEffect, useState } from "react";
import { NewsCard } from "@/components/news/news-card";
import { Skeleton } from "@/components/ui/skeleton";
import { finnhubClient } from "@/utils/stockapi";

export default function NewsWrapper() {
  const [newsData, setNewsData] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch news data
    finnhubClient.marketNews("general", {}, (error, data, response) => {
      if (error) {
        console.error(error);
        return;
      }
      setNewsData(data);

      const uniqueCategories = Array.from(
        new Set(data.map((item) => item.category))
      );
      setCategories(uniqueCategories);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredNews(newsData);
    } else {
      setFilteredNews(
        newsData.filter((article) => article.category === selectedCategory)
      );
    }
  }, [selectedCategory, newsData]);

  return (
    <div>
      <div className="mb-4 flex gap-4">
        {!loading && (
          <button
            className={`px-4 py-2 rounded ${
              selectedCategory === "all"
                ? "bg-green-500 text-white"
                : "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
            } hover:bg-green-400 transition`}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </button>
        )}

        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${
              selectedCategory === category
                ? "bg-green-500 text-white"
                : "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100"
            } hover:bg-green-400 transition`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* News Articles or Loading Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-60 w-full rounded-lg" />
            ))
          : filteredNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
      </div>
    </div>
  );
}
