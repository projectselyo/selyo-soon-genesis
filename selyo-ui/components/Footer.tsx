import React from "react";

const Footer: React.FC = () => {
  return (
    // mt-[5rem] temporary
    <footer className="bg-neutral-900 text-white py-6 px-4 mt-[5rem]">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Selyo. All rights reserved.
        </p>
        <div className="mt-2">
          <a
            href="/privacy-policy"
            className="text-gray-400 hover:text-white mx-2"
          >
            Privacy Policy
          </a>
          <a href="/terms" className="text-gray-400 hover:text-white mx-2">
            Terms of Service
          </a>
          <a href="/contact" className="text-gray-400 hover:text-white mx-2">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
