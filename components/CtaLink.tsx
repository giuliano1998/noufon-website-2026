'use client';

import Link from 'next/link';
import { trackCtaVertical } from '@/lib/site';

/** Link de CTA que dispara el evento cta_vertical {vertical} en GTM/GA4/Pixel. */
export default function CtaLink({
  href,
  vertical,
  label,
  className = 'btn btn-primary',
  children,
}: {
  href: string;
  vertical: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={() => trackCtaVertical(vertical, label)}>
      {children}
    </Link>
  );
}
