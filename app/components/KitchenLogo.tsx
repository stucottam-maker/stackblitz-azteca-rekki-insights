import Image from "next/image";

export default function KitchenLogo({ size = 48, className = "" }: { size?: number; className?: string }) {
  return <Image src="/pwa-icon.svg?v=2" alt="Kitchen Insights" width={size} height={size} className={className} priority />;
}
