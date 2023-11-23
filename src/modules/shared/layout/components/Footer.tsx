import { SOCIALS } from "../constants";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center px-8 py-24 bg-luxury-black">
      <img
        className="w-full max-w-[139px] h-auto"
        src="/assets/logo.png"
        alt="Apex Watch Club Logo"
      />
      <div className="flex justify-center gap-6 my-16">
        {SOCIALS.map((e, idx) => (
          <a key={idx} href={e.url}>
            <img src={e.path} alt={e.name} />
          </a>
        ))}
      </div>
      <p className="text-xs text-gray text-center">
        &copy; Apex Watch Club All Rights Reserved {new Date().getFullYear()}
      </p>
    </footer>
  );
}
