import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footor() {
  return (
    <section className="relative overflow-hidden py-10 bg-gray-800">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-1/4">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4">
                <Link to="/" className="text-white font-bold text-2xl">
                  <Logo />
                </Link>
              </div>
              <div>
                <p className="text-sm text-gray-300">
                  &copy; {new Date().getFullYear()} MyBlog. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-1/4">
            <div className="h-full">
              <h3 className="tracking-wider mb-4 text-sm font-semibold uppercase text-gray-300">
                Company
              </h3>
              <ul>
                <li className="mb-2">
                  <Link
                    to="/features"
                    className="text-base text-gray-300 hover:text-white transition duration-300"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/pricing"
                    className="text-base text-gray-300 hover:text-white transition duration-300"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/affiliate"
                    className="text-base text-gray-300 hover:text-white transition duration-300"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    to="/press"
                    className="text-base text-gray-300 hover:text-white transition duration-300"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-1/4">
            <div className="h-full">
              <h3 className="tracking-wider mb-4 text-sm font-semibold uppercase text-gray-300">
                Support
              </h3>
              <ul>
                <li className="mb-2">
                  <Link
                    to="/account"
                    className="text-base text-gray-300 hover:text-white transition duration-300"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/help"
                    className="text-base text-gray-300 hover:text-white transition duration-300"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/contact"
                    className="text-base text-gray-300 hover:text-white transition duration-300"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="text-base text-gray-300 hover:text-white transition duration-300"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-1/4">
            <div className="h-full">
              <h3 className="tracking-wider mb-4 text-sm font-semibold uppercase text-gray-300">
                Legals
              </h3>
              <ul>
                <li className="mb-2">
                  <Link
                    to="/terms"
                    className="text-base text-gray-300 hover:text-white transition duration-300"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/privacy"
                    className="text-base text-gray-300 hover:text-white transition duration-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/licensing"
                    className="text-base text-gray-300 hover:text-white transition duration-300"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footor;
