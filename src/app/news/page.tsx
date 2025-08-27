
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { newsItems } from '@/lib/news-items';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/logo';

export default function NewsPage() {
  return (
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

      <main className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">News & Updates</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-300">
            The latest announcements, feature releases, and product news from GenoUI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <Link href={`/news/${item.slug}`} key={item.slug} className="block group">
              <Card className="bg-neutral-900/50 border-neutral-800 rounded-2xl h-full flex flex-col transition-all group-hover:border-primary/50 group-hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-white text-xl">{item.title}</CardTitle>
                  <CardDescription>{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-neutral-400">{item.description}</p>
                </CardContent>
                <CardFooter>
                   <span className="text-primary font-semibold flex items-center gap-2">
                        Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
                    </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

    