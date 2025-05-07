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
    <footer
      className={cn(
        "py-side-spacing bg-bgPrimary",
        "px-side-spacing-mobile md:px-side-spacing-tablet lg:px-side-spacing"
      )}
    >
      <div className="grid md:grid-cols-3 gap-12">
        <div>
          <Link to="/" className="cursor-pointer">
            <LogoSVG width={72} height={28} color="#bbf298" />
          </Link>
          <p className="text-body-sm text-textBody mt-4">
            Copyright 2025 All rights reserved
          </p>
        </div>

        <div>
          <p className="text-body-sm-medium text-textBody mb-8">Quick Links</p>
          <ul className="space-y-8">
            <li>
              <a
                href="#features"
                className="text-body-lg text-boneWhite hover:text-primary-100 transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <Link to="/blogs" className="text-body-lg text-boneWhite hover:text-primary-100 transition-colors" onClick={() => window.scrollTo(0, 0)}>
                Blogs
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
          <p className="text-body-sm-medium text-textBody mb-8">Social Links</p>
          <ul className="space-y-8">
            <li>
              <a href="#features" className="footer-social-links">
                <div className="footer-social-links-icon">
                  <TwitterSVG height={24} width={24} />
                </div>
                Twitter
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
    </footer>
  );
};

export default Footer;
