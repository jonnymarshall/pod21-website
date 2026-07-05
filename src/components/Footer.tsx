import { cn } from "@/lib/utils";
import {
  LogoSVG,
  YoutubeFooterSVG,
  TwitterSVG,
  LinkedInSVG,
} from "@/assets/icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer" className="border-t border-stroke bg-bgPrimary">
      <div
        className={cn(
          "mx-auto max-w-[1440px] py-side-spacing",
          "px-side-spacing-mobile md:px-side-spacing-tablet"
        )}
      >
        <div className="grid gap-12 md:grid-cols-3">
          <div id="footer--brand">
            <Link to="/" className="cursor-pointer" aria-label="pod21 home">
              <LogoSVG width={72} height={28} color="#f3efeb" />
            </Link>
            <p className="readout mt-6 leading-relaxed text-[#5c5a57]">
              EST. 2025 <span className="slash-sep">{"//"}</span> USA
            </p>
          </div>

          <div id="footer--quick-links">
            <p className="eyebrow mb-8">Index</p>
            <ul className="space-y-6">
              <li>
                <Link
                  to="/about"
                  className="nav-link !text-[13px]"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <span className="slash-sep">{"// "}</span>About
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="nav-link !text-[13px]"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <span className="slash-sep">{"// "}</span>Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="nav-link !text-[13px]">
                  <span className="slash-sep">{"// "}</span>Contact
                </Link>
              </li>
            </ul>
          </div>

          <div id="footer--social-links">
            <p className="eyebrow mb-8">Signal</p>
            <ul className="space-y-6">
              <li>
                <a href="https://x.com/pod21hq" className="footer-social-links">
                  <div className="footer-social-links-icon">
                    <TwitterSVG height={24} width={24} />
                  </div>
                  X
                </a>
              </li>
              <li>
                <a href="#features" className="footer-social-links">
                  <div className="footer-social-links-icon">
                    <YoutubeFooterSVG height={24} width={24} />
                  </div>
                  Youtube
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/111912003/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-links"
                >
                  <div className="footer-social-links-icon">
                    <LinkedInSVG height={24} width={24} />
                  </div>
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Baseline strip */}
        <div
          id="footer--baseline"
          className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-stroke pt-6"
        >
          <p className="readout text-[10px] text-[#5c5a57]">
            © {new Date().getFullYear()} POD21{" "}
            <span className="slash-sep">{"//"}</span> ALL RIGHTS RESERVED
          </p>
          <p className="readout text-[10px] text-[#5c5a57]">
            UK <span className="slash-sep">{"//"}</span> MEXICO{" "}
            <span className="slash-sep">{"//"}</span> USA{" "}
            <span className="slash-sep">{"//"}</span>{" "}
            <span className="text-primary-100">EVERYWHERE SIGNAL TRAVELS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
