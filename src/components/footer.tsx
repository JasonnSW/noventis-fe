import Image from "next/image";
import Logo from "../../public/Logo.svg";
import { CiHeart } from "react-icons/ci";
import Link from "next/link";
import { LuGithub } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-[#0B0848] text-[#F4F4F4] border-t-4 border-[#171089]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Image
                alt="noventis-logo"
                className="w-16 h-16 sm:w-20 sm:h-20"
                src={Logo}
              />
              <span className="text-2xl sm:text-3xl font-bold font-orbitron text-professional-song">
                Noventis
              </span>
            </div>

            <p className="mt-3 max-w-sm text-sm sm:text-base font-openSans text-white leading-relaxed">
              Intelligent automation for data analysis. Free data scientists
              from repetitive tasks.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/docs"
                    className="group inline-flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors"
                  >
                    <IoDocumentTextOutline className="h-5 w-5 text-white/70 group-hover:text-white" />
                    <span>Documentation</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/your-org/noventis"
                    target="_blank"
                    className="group inline-flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors"
                  >
                    <LuGithub className="h-5 w-5 text-white/70 group-hover:text-white" />
                    <span>GitHub Repository</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Support Us
              </h3>
              <p className="text-sm text-white/70 max-w-sm text-center sm:text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                sed augue ex. Aenean at arcu erat.
              </p>

              <div className="mt-4">
                <Link
                  href="https://github.com/your-org/noventis"
                  target="_blank"
                  className="btn-gradient-github"
                >
                  <LuGithub className="h-4 w-4" />
                  <span>Star on GitHub</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 h-0.5 w-full bg-[#120D6A]" />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-sm text-white/70 md:flex-row">
          <p className="font-openSans text-base text-[#f4f4f4]">
            © 2025 Noventis. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-sm md:text-base font-openSans text-white">
              Developed with
            </span>
            <CiHeart className="text-[#CF4BC0] w-4 h-4" />
            <span className="font-openSans text-white text-xs sm:text-sm md:text-base font-bold">
              by the Laplace Team, Universitas Brawijaya
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
