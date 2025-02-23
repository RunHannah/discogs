import Image, { type ImageProps } from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardWithImageProps extends ImageProps {
  title?: string;
  year?: string;
  country?: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function CardWithImage({
  title,
  year,
  country,
  src,
  alt,
  width,
  height,
  ...props
}: CardWithImageProps) {
  return (
    <Card className="max-w-[200px] mt-2 mb-2 flex flex-col h-fit rounded-none relative overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        placeholder="blur"
        blurDataURL={"/placeholder.svg?height=50&width=50"}
        {...props}
      />

      {/* Hover effect container */}
      <div className="absolute inset-0 text-white bg-black bg-opacity-0 hover:bg-opacity-70 transition-all duration-300">
        {/* Text is hidden by default and appears on hover */}
        <div className="w-full h-full flex flex-col justify-center items-center text-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <CardHeader className="p-3">
            <CardTitle>{title || "Unknown"}</CardTitle>
          </CardHeader>
          <CardContent className="pl-3 pb-3 pr-3 text-xs">
            <p>Year: {year || "Unknown"}</p>
            <p>Country: {country || "Unknown"}</p>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
