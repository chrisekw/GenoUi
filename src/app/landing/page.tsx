
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/logo';
import { ArrowRight, Bot, Code, Users, Star, PlayCircle, Newspaper, Menu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { newsItems } from '@/lib/news-items';

const features = [
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: 'AI-Powered Generation',
    description: 'Instantly generate complete interfaces, layouts, and components tailored to your needs.',
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: 'Customizable & Developer-Friendly',
    description: 'Export to Tailwind CSS or plain HTML/CSS with full control over the code.',
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: 'Built for Teams',
    description: 'Share and iterate on UI projects seamlessly with your entire team.',
  },
  {
    icon: <Star className="w-8 h-8 text-primary" />,
    title: 'Community Support',
    description: 'Share your generated designs with the community and explore what others have built.',
  },
];

const testimonials = [
  {
    quote: "GenoUI has completely transformed our workflow. We're building and shipping UIs 10x faster. It feels like magic.",
    name: 'Sarah L.',
    title: 'Lead Designer at Innovate Co.',
    avatar: 'https://picsum.photos/48/48',
    avatarHint: 'person portrait'
  },
  {
    quote: "As a backend developer, frontend was always a bottleneck. GenoUI lets me create stunning, production-ready interfaces without writing a single line of CSS. A total game-changer.",
    name: 'Mike R.',
    title: 'Full-Stack Developer',
    avatar: 'https://picsum.photos/48/48',
    avatarHint: 'person portrait'
  },
  {
    quote: "The quality of the generated code is incredible. It's clean, responsive, and follows best practices. I can trust it for client projects.",
    name: 'Emily K.',
    title: 'Freelance Web Developer',
    avatar: 'https://picsum.photos/48/48',
    avatarHint: 'person portrait'
  }
];

const faqs = [
  {
    question: "What frameworks do you support?",
    answer: "Currently, GenoUI generates production-ready code for Tailwind CSS with HTML. We are actively working on expanding our support to include React, Vue, and Svelte components in the near future."
  },
  {
    question: "Can I customize the generated components?",
    answer: "Absolutely. The generated code is clean, well-structured, and yours to modify. You get full control to tweak the styles, structure, and logic to perfectly fit your needs."
  },
  {
    question: "Is there a free plan?",
    answer: "Yes! Our Free plan allows you to explore the core features of GenoUI with a generous monthly quota for component generations. For more advanced features and higher limits, you can upgrade to one of our paid plans."
  },
  {
    question: "How does the AI generation work?",
    answer: "GenoUI uses a powerful generative AI model that has been fine-tuned on a massive dataset of high-quality web interfaces and design principles. It understands your natural language prompts to create components that are not only aesthetically pleasing but also functional and responsive."
  }
];

export default function LandingPage() {
  return (
    <div className="bg-black text-white font-body antialiased">
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/landing" className="flex items-center gap-2">
            <Logo className="w-7 h-7 text-white" />
            <span className="text-xl font-bold">GenoUI</span>
          </Link>
           <nav className="hidden sm:flex items-center gap-6 text-sm">
              <Link href="#features" className="text-neutral-300 hover:text-white transition-colors">Features</Link>
              <Link href="/news" className="text-neutral-300 hover:text-white transition-colors">News</Link>
              <Link href="#faq" className="text-neutral-300 hover:text-white transition-colors">FAQ</Link>
          </nav>
          <div className="hidden sm:flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:flex">
              <Link href="/login">
                  Login
              </Link>
            </Button>
            <Button asChild variant="secondary" className="hidden sm:flex">
              <Link href="/signup">
                  Sign Up
                  <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black text-white w-full">
                <div className="flex justify-between items-center p-4 border-b border-neutral-800">
                    <Link href="/landing" className="flex items-center gap-2">
                        <Logo className="w-7 h-7 text-white" />
                        <span className="text-xl font-bold">GenoUI</span>
                    </Link>
                    <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Close menu</span>
                        </Button>
                    </SheetClose>
                </div>
                <nav className="flex flex-col gap-6 text-lg mt-8 text-center">
                    <SheetClose asChild>
                        <Link href="#features" className="text-neutral-300 hover:text-white transition-colors">Features</Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link href="/news" className="text-neutral-300 hover:text-white transition-colors">News</Link>
                    </SheetClose>
                    <SheetClose asChild>
                        <Link href="#faq" className="text-neutral-300 hover:text-white transition-colors">FAQ</Link>
                    </SheetClose>
                </nav>
                <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-col gap-4 px-4">
                     <SheetClose asChild>
                        <Button asChild variant="outline" className="w-full bg-transparent">
                            <Link href="/login">Login</Link>
                        </Button>
                     </SheetClose>
                     <SheetClose asChild>
                        <Button asChild variant="secondary" className="w-full">
                            <Link href="/signup">Sign Up <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                     </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden px-6 pt-20">
          <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-balance bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Build beautiful, AI-powered UIs in seconds.
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-neutral-300 text-balance">
              GenoUi helps you go from idea to production-ready interface with no code and full customization.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <Button asChild size="lg" className="bg-white text-black hover:bg-neutral-200">
                 <Link href="/signup">
                    Try GenoUi Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-neutral-700 hover:bg-neutral-900 hover:text-white">
                <Link href="#demo">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    Watch Demo
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="py-20 sm:py-32">
            <div className="container mx-auto px-6">
                 <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                        See GenoUI in Action
                    </h2>
                     <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-300 text-balance">
                        From a simple text prompt to a fully-coded component in one click.
                    </p>
                </div>
                <div className="relative rounded-xl shadow-2xl shadow-primary/20 border border-primary/20 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-10 bg-neutral-900 flex items-center px-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                    </div>
                     <Image 
                        src="https://storage.googleapis.com/static-cloud-c2c-content/user-file/141e6a17-ed26-44f2-8735-a136eda85652/genoui-demo.png"
                        width={2400}
                        height={1500}
                        alt="GenoUI application interface showing the prompt input and community components"
                        className="w-full h-auto mt-10"
                        priority
                    />
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 sm:py-32">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                    A New Paradigm in UI Development
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-300 text-balance">
                    GenoUI isn't just a tool; it's your creative partner.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 flex flex-col items-start gap-4 transition-all hover:border-primary/50 hover:shadow-primary/20 hover:shadow-lg">
                  {feature.icon}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-neutral-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 sm:py-32 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                        Loved by developers and designers
                    </h2>
                     <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-300 text-balance">
                        Don't just take our word for it. Here's what people are saying about GenoUI.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <div key={i} className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-4">
                            <p className="text-neutral-300 flex-grow">"{testimonial.quote}"</p>
                            <div className="flex items-center gap-4 mt-4">
                                <Image src={testimonial.avatar} data-ai-hint={testimonial.avatarHint} width={48} height={48} alt={`Avatar of ${testimonial.name}`} className="rounded-full" />
                                <div>
                                    <p className="font-semibold text-white">{testimonial.name}</p>
                                    <p className="text-sm text-neutral-400">{testimonial.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        {/* News Section */}
        <section id="news" className="py-20 sm:py-32">
            <div className="container mx-auto px-6 max-w-6xl">
                 <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                        News & Updates
                    </h2>
                     <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-300 text-balance">
                        Stay up to date with the latest features, announcements, and product news from GenoUI.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {newsItems.slice(0, 3).map((item, i) => (
                    <Link href={`/news/${item.slug}`} key={i}>
                        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-4 h-full transition-all hover:border-primary/50 hover:-translate-y-1">
                            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                            <p className="text-sm text-neutral-400">{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p className="text-neutral-300 flex-grow">{item.description}</p>
                            <span className="text-primary font-semibold flex items-center gap-2">
                                Read More <ArrowRight className="h-4 w-4"/>
                            </span>
                        </div>
                    </Link>
                  ))}
                </div>
                 <div className="text-center mt-12">
                    <Button asChild variant="outline" className="bg-transparent">
                        <Link href="/news">View All News</Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 sm:py-32">
            <div className="container mx-auto px-6 max-w-4xl">
                 <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                        Frequently Asked Questions
                    </h2>
                     <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-300 text-balance">
                        Have questions? We have answers. If you can't find what you're looking for, feel free to reach out.
                    </p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-neutral-800">
                      <AccordionTrigger className="text-lg text-left hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-neutral-400 pt-2">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
            </div>
        </section>


        {/* Why GenoUi Section */}
        <section className="py-20 sm:py-32 text-center">
            <div className="container mx-auto px-6">
                 <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                    Ready to build faster?
                </h2>
                 <p className="mt-6 max-w-xl mx-auto text-lg md:text-xl text-neutral-300 text-balance">
                    Save <span className="text-white font-medium">weeks</span> of development time and ship your vision faster than ever.
                </p>
                 <Button asChild size="lg" className="bg-white text-black hover:bg-neutral-200 mt-8">
                     <Link href="/signup">
                        Start Building for Free
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </section>

      </main>

      <footer className="border-t border-neutral-900">
        <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                 <Link href="/landing" className="flex items-center gap-2">
                    <Logo className="w-5 h-5 text-neutral-400" />
                    <span className="text-neutral-400">GenoUI</span>
                </Link>
                <p className="text-sm text-neutral-500">
                    © {new Date().getFullYear()} GenoUi. All rights reserved.
                </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-neutral-400">
                 <Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                 <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                 <Link href="/legal/refund" className="hover:text-white transition-colors">Refund Policy</Link>
            </div>
        </div>
      </footer>
    </div>
  );
}
