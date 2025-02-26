import Image from 'next/image'
import spinner from "@/public/loading-spinner.gif"

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image src={spinner} alt="loading..." height={100} width={100}/>
    </div>
  );
}
