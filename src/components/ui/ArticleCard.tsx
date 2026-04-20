"use client";

import React from "react";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Article } from "@/lib/articleService";
import { useLanguage } from "@/context/LanguageContext";

interface ArticleCardProps {
  article: Article;
  index: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  const { t } = useLanguage();

  return (
    <div
      className="group cursor-pointer opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      <Link href={`/knowledge/${article.id}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-5 shadow-ambient group-hover:shadow-lg transition-transform duration-500">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
              {t('knowledge', `categories.${article.category}` as any)}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[11px] font-medium text-on-surface/50 uppercase tracking-wider">
            <span>{article.author}</span>
          </div>

          <h3 className="text-xl md:text-2xl font-display font-bold text-on-surface transition-colors group-hover:text-primary leading-snug">
            {article.title}
          </h3>

          <p className="text-on-surface/70 text-sm md:text-base leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-2 text-primary text-sm font-bold pt-1">
            <span>{t('knowledge', 'readMore')}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
