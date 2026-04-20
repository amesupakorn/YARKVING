import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { articleService } from "@/lib/articleService";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = articleService.getById(id);

  if (!article) return { title: "Article Not Found" };

  return {
    title: `${article.title} | YARKVING`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.imageUrl }],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { id } = await params;
  const article = articleService.getById(id);

  if (!article) notFound();

  return (
    <article className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link
            href="/knowledge"
            className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-12 hover:translate-x-1 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับไปที่สาระน่ารู้</span>
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              <span>{article.category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-on-surface leading-[1.15] mb-8 tracking-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-on-surface/50 text-sm font-medium border-y border-outline-variant/10 py-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{new Date(article.date).toLocaleDateString('th-TH', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-ambient">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Excerpt */}
          <p className="text-xl md:text-2xl text-on-surface/80 leading-relaxed font-medium mb-12 italic border-l-4 border-primary pl-8">
            {article.excerpt}
          </p>

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-on-surface prose-p:text-on-surface/80 prose-p:leading-relaxed prose-li:text-on-surface/80">
             {/* Note: In a real app we'd use a markdown renderer here */}
             <div className="whitespace-pre-line">
               {article.content}
             </div>
          </div>
          
          {/* Footer / Sharing */}
          <div className="mt-24 pt-12 border-t border-outline-variant/10">
             <div className="bg-surface-container-low rounded-3xl p-8 md:p-12 text-center">
                <h3 className="text-2xl font-display font-bold text-on-surface mb-2">บทความนี้มีประโยชน์ไหม?</h3>
                <p className="text-on-surface/60 mb-8">แบ่งปันความรู้ดีๆ ให้เพื่อนนักวิ่งคนอื่นๆ ได้รู้เช่นกัน</p>
                <div className="flex justify-center gap-4">
                   <button className="px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                     แชร์บทความ
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </article>
  );
}
