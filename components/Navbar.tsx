"use client";
import { Bebas_Neue, Space_Grotesk } from "next/font/google";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../public/logo.png";
import Link from "next/link";
import { useTheme } from "next-themes";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { DownloadCloudIcon, Menu, X } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
});

const ThemeSwitch = styled(Switch)(({ theme }) => {
  const sunColor = theme.palette.warning.light;
  const moonColor = theme.palette.grey[100];

  const sunSvg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${sunColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  );

  const moonSvg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${moonColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a7 7 0 1 0 9 9 9 9 0 1 1-9-9z"/></svg>`,
  );

  return {
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      backgroundColor: theme.palette.grey[400], // Default track color (unchecked - light mode)
      opacity: 1,
      overflow: "hidden",
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&::before": {
        backgroundImage: `url("data:image/svg+xml,${sunSvg}")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "16px 16px",
        left: 12,
      },
      "&::after": {
        backgroundImage: `url("data:image/svg+xml,${moonSvg}")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "16px 16px",
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
      backgroundColor: theme.palette.common.black, // Thumb color
    },
    "& .MuiSwitch-switchBase": {
      "&.Mui-checked": {
        transform: "translateX(20px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.common.white, // Track color when checked
          opacity: 1,
          "&::after": {
            opacity: 0,
          },
        },
      },
    },
  };
});

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  const navLinkClass =
    "relative w-fit after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100";

  const handleDownload = () => {
    setLoading(true);

    const link = document.createElement("a");
    link.href = "/SAMARTH_CHAWLA_RESUME.pdf";
    link.download = "SAMARTH_CHAWLA_RESUME.pdf";
    link.click();

    setTimeout(() => setLoading(false), 1000); // simulate loading
  };

  const handleThemeToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <nav className="bg-gray-100 px-4 py-4 dark:bg-[#131313] dark:text-[#EDE1DF] sm:px-6 lg:px-8">
      <div className="relative w-full">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center justify-start">
            <Image
              src={logo}
              alt="Logo"
              width={40}
              height={40}
              className="mr-2 bg-transparent"
            />
            <h1
              className={`text-xl leading-tight font-bold ${bebasNeue.className}`}
            >
              SAMARTH <br></br> CHAWLA
            </h1>
          </div>

          <div
            className={`hidden items-center gap-6 text-base lg:flex ${spaceGrotesk.className}`}
          >
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-end gap-1 sm:gap-3">
            <ThemeSwitch
              checked={mounted ? isDark : false}
              onChange={handleThemeToggle}
              className="hidden lg:inline-flex"
              inputProps={{ "aria-label": "Toggle color theme" }}
            />

            <Tooltip title="Download Resume" sx={{ borderRadius: "10px" }}>
              <Button
                onClick={handleDownload}
                disabled={loading}
                variant="contained"
                className="gap-2 whitespace-nowrap text-xs sm:text-sm"
              >
                {loading ? (
                  <CircularProgress size={20} color="primary" />
                ) : (
                  <>
                    <DownloadCloudIcon style={{ marginLeft: 0 }} size={16} />
                    <span className="hidden sm:inline">Resume</span>
                    <span className="sr-only sm:hidden">Download Resume</span>
                  </>
                )}
              </Button>
            </Tooltip>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition hover:bg-gray-200 dark:text-[#EDE1DF] dark:hover:bg-[#1f1f1f] lg:hidden"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <div
          className={`transform overflow-hidden transition-all duration-300 ease-out lg:hidden ${
            mobileMenuOpen
              ? "mt-3 max-h-64 translate-y-0 opacity-100"
              : "pointer-events-none max-h-0 -translate-y-4 opacity-0"
          }`}
        >
          <div className="rounded-xl border border-gray-200 bg-white/90 p-4 shadow-md backdrop-blur dark:border-[#2b2b2b] dark:bg-[#1a1a1a]/95">
            <div
              className={`flex flex-col gap-3 text-sm ${spaceGrotesk.className}`}
            >
              {/* <div className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2 dark:border-[#2b2b2b]">
                <span className="text-sm">Theme</span>
                <ThemeSwitch
                  checked={mounted ? isDark : false}
                  onChange={handleThemeToggle}
                  inputProps={{ "aria-label": "Toggle color theme" }}
                />
              </div> */}

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={navLinkClass}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
