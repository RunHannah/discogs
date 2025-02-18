export default function Footer() {
  return (
    <footer className="flex flex-row items-center justify-center p-3 absolute bottom-[0] w-full">
      Powered by{" "}
      <a
        href="https://www.discogs.com/developers"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/discogs_logo_black.svg"
          alt="Discogs logo"
          className="pl-1 h-6 w-auto inline-block"
          title="Discogs API"
        />
      </a>
    </footer>
  );
}
