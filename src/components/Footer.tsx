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
    <footer className="bg-bgPrimary">
      <div
        className={cn(
          "py-side-spacing max-w-[1440px] mx-auto",
          "px-side-spacing-mobile md:px-side-spacing-tablet  "
        )}
      >
        <div className="grid md:grid-cols-3 gap-12 ">
          <div>
            <Link to="/" className="cursor-pointer">
              <LogoSVG width={72} height={28} color="#bbf298" />
            </Link>
            <p className="text-body-sm text-textBody mt-4">
              Copyright 2025 All rights reserved
            </p>
          </div>

          <div>
            <p className="text-body-sm-medium text-textBody mb-8">
              Quick Links
            </p>
            <ul className="space-y-8">
              <li>
                <Link
                  to="/about"
                  className="text-body-lg text-boneWhite hover:text-primary-100 transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-body-lg text-boneWhite hover:text-primary-100 transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-body-lg text-boneWhite hover:text-primary-100 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-body-sm-medium text-textBody mb-8">
              Social Links
            </p>
            <ul className="space-y-8">
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
                <a href="#features" className="footer-social-links">
                  <div className="footer-social-links-icon">
                    <LinkedInSVG height={24} width={24} />
                  </div>
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
