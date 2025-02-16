import Image from "next/image";
import { Release } from "@/app/types/DiscogsRelease";

type ReleaseImageType = Pick<Release, "images">;

export default function ReleaseImage({ images }: ReleaseImageType) {
  const albumImage = (
    <Image src={images[0].uri} alt="Album Image" width={150} height={150} />
  );
  const noImageAvailable = (
    <div className="w-[150px] h-[150px] border-t-indigo-100 flex">
      No Image Available
    </div>
  );

  return <>{images.length ? albumImage : noImageAvailable}</>;
}
