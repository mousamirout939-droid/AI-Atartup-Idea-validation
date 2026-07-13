import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import Button from '../common/button';

export default function ShareReport({ ideaId }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/ideas/${ideaId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="ghost" icon={copied ? Check : Share2} onClick={handleShare}>
      {copied ? 'Link copied!' : 'Share'}
    </Button>
  );
}
