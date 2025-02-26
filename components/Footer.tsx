import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-row items-center justify-center p-3 absolute bottom-[0] w-full">
      Powered by{" "}
      <a
        href="https://www.discogs.com/developers"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/discogs_logo_black.svg"
          alt="Discogs logo"
          className="pl-1 h-6 w-auto inline-block"
          title="Discogs API"
          width={70}
          height={24}
        />
      </a>
    </footer>
  );
}
