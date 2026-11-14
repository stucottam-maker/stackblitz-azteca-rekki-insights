import Image from "next/image";

export default function KitchenLogo({ size = 48, className = "" }: { size?: number; className?: string }) {
  return <Image src="/pwa-icon.svg" alt="Kitchen Insights emblem" width={size} height={size} className={className} unoptimized priority />;
}
