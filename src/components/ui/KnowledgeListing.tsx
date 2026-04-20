"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { ArticleCard } from "./ArticleCard";
import { Article, ArticleCategory, articleService } from "@/lib/articleService";
import { useLanguage } from "@/context/LanguageContext";

export function KnowledgeListing() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const articles = useMemo(() => articleService.getAll(), []);

  const categories: (ArticleCategory | "all")[] = ["all", "Tips", "Nutrition", "Gear", "Community"];

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = activeCategory === "all" || article.category === activeCategory;
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchQuery]);

  return (
    <section className="pb-32">
      <div className="container mx-auto px-6">
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 border-b border-outline-variant/10 pb-12">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-surface-container-high text-on-surface hover:bg-surface-variant"
                }`}
              >
                {t('knowledge', `categories.${cat}` as any)}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface/40" />
            <input
              type="text"
              placeholder={t('knowledge', 'searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Results Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
            {filteredArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface-container-high mb-6">
              <Search className="w-8 h-8 text-on-surface/20" />
            </div>
            <h3 className="text-2xl font-display font-bold text-on-surface mb-2">
              {t('knowledge', 'noResults')}
            </h3>
          </div>
        )}
      </div>
    </section>
  );
}
