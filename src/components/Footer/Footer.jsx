import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import FoodCycleLogo from "../shared/FoodCycleLogo";

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="bg-base-200 text-base-content mt-12 dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Brand Section */}
          <div className="max-w-xs">
            <FoodCycleLogo />
            <p className="mt-2 text-sm">
              Transforming food waste into sustainable solutions for communities
              worldwide.
            </p>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Navigation Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    onClick={handleScrollToTop}
                    to="/about"
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleScrollToTop}
                    to="/contact"
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleScrollToTop}
                    to="/how-it-works"
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    onClick={handleScrollToTop}
                    to="/privacy"
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleScrollToTop}
                    to="/terms"
                    className="hover:text-primary transition-colors flex items-center gap-2"
                  >
                    Terms of Service
                  </Link>
                </li>
              
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <MdEmail className="text-lg" />
                  <span>contact@foodcycle.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdPhone className="text-lg" />
                  <span>+1 (555) 123-4567</span>
                </div>

                <div className="flex gap-4 mt-2">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors text-xl"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors text-xl"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors text-xl"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors text-xl"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-base-300 mt-8 pt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} FoodCycle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
