import Image from "next/image";
import { Release } from "@/types/DiscogsRelease";

type ReleaseImageType = Pick<Release, "images">;

export default function ReleaseImage({ images }: ReleaseImageType) {
  const imageSrc =
    images && images[0] ? images[0].uri : "https://placehold.co/150x150.png";

  return (
    <Image
      className="h-fit"
      src={imageSrc}
      alt="Album Image"
      width={150}
      height={150}
    />
  );
}
