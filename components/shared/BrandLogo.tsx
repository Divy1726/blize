import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type BrandLogoProps = {
  href?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function BrandLogo({
  href = '/',
  className,
  imageClassName,
  priority = false,
}: BrandLogoProps) {
  return (
    <Link href={href} className={cn('inline-flex items-center', className)}>
      <Image
        src="/blize-logo.png"
        alt="Blize Global"
        width={780}
        height={242}
        priority={priority}
        className={cn('h-auto w-[170px] object-contain sm:w-[190px]', imageClassName)}
      />
    </Link>
  );
}
