import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6">
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Product
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-white"
                >
                  Community Guidelines
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {/* <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Cookies Policy
                </a>
              </li> */}
              <li>
                <a
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="terms-serivce"
                  className="text-gray-300 hover:text-white"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-gray-400 text-center">
          &copy; 2025 Done It. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
