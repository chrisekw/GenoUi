
'use client';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { newsItems } from '@/lib/news-items';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Heart, MessageSquare } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/icons/logo';
import { useToast } from '@/hooks/use-toast';
import Script from 'next/script';

export default function NewsArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { toast } = useToast();
  const article = newsItems.find((item) => item.slug === slug);
  
  const [likes, setLikes] = useState(article?.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState(article?.comments || []);
  const [newComment, setNewComment] = useState('');

  if (!article) {
    notFound();
  }

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        author: 'Guest User', // In a real app, this would be the logged-in user
        avatar: 'https://picsum.photos/40/40',
        text: newComment,
        date: new Date().toISOString(),
      };
      setComments([newCommentObj, ...comments]);
      setNewComment('');
      toast({ title: "Comment posted!" });
    }
  };

  return (
     <>
        <Script
            src="https://news.google.com/swg/js/v1/swg-basic.js"
            strategy="afterInteractive"
        />
        <Script id="google-news-init" strategy="afterInteractive">
            {`
              (self.SWG_BASIC = self.SWG_BASIC || []).push( basicSubscriptions => {
                basicSubscriptions.init({
                  type: "NewsArticle",
                  isPartOfType: ["Product"],
                  isPartOfProductId: "CAowifTADA:openaccess",
                  clientOptions: { theme: "light", lang: "en" },
                });
              });
            `}
        </Script>
        <div className="bg-black text-white min-h-screen">
        <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/landing" className="flex items-center gap-2">
                <Logo className="w-7 h-7 text-white" />
                <span className="text-xl font-bold">GenoUI</span>
            </Link>
            <Button asChild variant="outline" className="bg-transparent">
                <Link href="/login">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
            </div>
        </header>

        <main className="container mx-auto px-6 py-16 md:py-24 max-w-4xl">
            <Link href="/news" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to News</span>
            </Link>
            <article>
            <header className="mb-8">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance mb-4">{article.title}</h1>
                <div className="text-neutral-400 text-sm">
                <span>By {article.author}</span> &bull; <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </header>

            <div 
                className="prose prose-invert prose-lg max-w-none text-neutral-300 prose-p:text-neutral-300 prose-h3:text-white"
                dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <Separator className="my-12 bg-neutral-800" />

            {/* Likes and Comments Section */}
            <div className="flex items-center gap-6">
                <Button variant={hasLiked ? 'default' : 'outline'} onClick={handleLike} className="transition-colors bg-transparent">
                <Heart className={`mr-2 h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} />
                {likes} Likes
                </Button>
                <div className="flex items-center gap-2 text-neutral-400">
                    <MessageSquare className="h-5 w-5" />
                    <span>{comments.length} Comments</span>
                </div>
            </div>

            <Separator className="my-12 bg-neutral-800" />

            {/* Comments Form */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Leave a Comment</h2>
                <form onSubmit={handleCommentSubmit} className="grid gap-4">
                <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment here..."
                    className="bg-neutral-900 border-neutral-700 text-base"
                    rows={4}
                />
                <div className="flex justify-end">
                    <Button type="submit">Post Comment</Button>
                </div>
                </form>
            </div>
            
            {/* Comments List */}
            <div className="mt-12 space-y-8">
                {comments.map(comment => (
                    <div key={comment.id} className="flex gap-4 items-start">
                        <Avatar>
                            <AvatarImage src={comment.avatar} alt={comment.author} data-ai-hint="person portrait"/>
                            <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-baseline gap-2">
                                <p className="font-semibold text-white">{comment.author}</p>
                                <p className="text-xs text-neutral-500">{new Date(comment.date).toLocaleDateString()}</p>
                            </div>
                            <p className="text-neutral-300">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            </article>
        </main>
        </div>
    </>
  );
}
