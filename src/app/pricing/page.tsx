
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

interface Tier {
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
    link: string;
    highlighted?: boolean;
}

const tiers: Tier[] = [
    {
        name: 'Free',
        price: 'Free',
        description: 'Explore the core power of GenoUI without any investment.',
        features: [
            'Unlimited generations',
            'Access to all components',
            'Publish to community gallery',
        ],
        cta: 'Get Started',
        link: '/app'
    },
    {
        name: 'Sponsor',
        price: 'Donate',
        description: 'Support the project and keep it running for everyone.',
        features: [
            'Help cover server costs',
            'Fund new feature development',
            'Get a warm fuzzy feeling',
            'Our eternal gratitude',
        ],
        cta: 'Sponsor on GitHub',
        highlighted: true,
        link: 'https://github.com/sponsors/YOUR_USERNAME' // Replace with actual sponsor link
    },
];

export default function PricingPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 animate-fade-in">
      <div className="grid w-full max-w-6xl mx-auto gap-2 text-center">
        <h1 className="text-3xl font-semibold">Pricing</h1>
        <p className="text-muted-foreground">
          GenoUI is free to use for everyone. If you find it useful, consider sponsoring the project.
        </p>
      </div>
      <div className="grid w-full max-w-xl mx-auto gap-8 md:grid-cols-2 lg:grid-cols-2 items-start">
        {tiers.map((tier) => (
          <Card key={tier.name} className={tier.highlighted ? 'border-primary shadow-lg' : ''}>
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold">{tier.price}</div>
              <ul className="space-y-2">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant={tier.highlighted ? 'default' : 'outline'}>
                <Link href={tier.link}>{tier.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
