'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';

interface CodeDisplayProps {
  code: string;
  framework: string;
}

export function CodeDisplay({ code, framework }: CodeDisplayProps) {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Copied to clipboard!',
      description: 'The component code has been copied.',
    });
  };

  return (
    <div className="relative group h-full">
      <div className="absolute top-2 right-2 flex items-center gap-2 z-10">
         <Badge variant="secondary" className="capitalize">{framework}</Badge>
        <Button variant="ghost" size="icon" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-full">
        <pre className="bg-muted/50 rounded-md p-4 pt-12 text-sm w-full h-full">
          <code className="font-code">{code}</code>
        </pre>
      </ScrollArea>
    </div>
  );
}
