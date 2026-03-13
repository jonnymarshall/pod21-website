const links = [
  {
    title: "pod 21: Podcast Production Services",
    url: "https://pod21.xyz",
    image: "/links-hero.jpg",
    shake: false,
  },
  {
    title: "Chat on WhatsApp",
    url: "https://wa.me/447970368030",
    image: null,
    shake: true,
  },
  {
    title: "Book a Call",
    url: "https://calendly.com/pod21/discoverycall",
    image: null,
    shake: false,
  },
];

const socials = [
  {
    label: "Website",
    url: "https://pod21.xyz",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    url: "https://wa.me/447970368030",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    url: "https://x.com/pod21hq",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const Links = () => {
  return (
    <>
      <style>{`
        @keyframes linkShake {
          0%   { transform: rotate(0deg); }
          2%   { transform: rotate(-1.3deg); }
          4%   { transform: rotate(1.3deg); }
          6%   { transform: rotate(-1.3deg); }
          7%   { transform: rotate(1.3deg); }
          9%   { transform: rotate(-0.7deg); }
          11%  { transform: rotate(0.7deg); }
          13%  { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .shake-button {
          animation: linkShake 4.62s ease infinite;
          transform-origin: center;
        }
      `}</style>

      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/links-bg-pattern.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "900px",
        }}
      >
        <div className="w-full max-w-[400px] flex flex-col items-center px-5 py-12">

          {/* Profile */}
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-[#1a1a1a] mb-3 flex items-center justify-center border-2 border-white/10">
              <img
                src="https://ugc.production.linktr.ee/100e80b1-45e3-4915-8d7a-4ecd88934736_4JWZDLRC-400x400.jpeg"
                alt="pod21"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-white font-kanit text-[18px] font-bold mb-1">pod21</h1>
            <p className="text-white/70 font-roboto text-[13px] leading-snug max-w-[260px]">
              We are a team of podcast production experts ready to bring your show to life.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4 mb-7">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-white/80 hover:text-white transition-colors duration-150"
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Links */}
          <div className="w-full flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full rounded-2xl overflow-hidden bg-transparent hover:bg-white/[0.04] border border-white/25 transition-colors duration-200${link.shake ? " shake-button" : ""}`}
              >
                {link.image ? (
                  <div>
                    <div className="w-full aspect-[16/9] overflow-hidden">
                      <img
                        src={link.image}
                        alt={link.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="flex items-center justify-center px-4 py-3">
                      <span className="text-[#bbf298] font-roboto text-[13px] font-normal text-center">{link.title}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center px-4 py-[14px]">
                    <span className="text-[#bbf298] font-roboto text-[13px] font-normal text-center">{link.title}</span>
                  </div>
                )}
              </a>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Links;
