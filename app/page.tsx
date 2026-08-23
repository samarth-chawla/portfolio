import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Experience from "@/sections/Experience";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Samarth Chawla",
  url: "https://www.samarthworks.in",
  image: "https://www.samarthworks.in/profile.webp",
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer building scalable web applications and API-driven systems.",
  email: "mailto:mr.samarthchawla@gmail.com",
  sameAs: [
    "https://github.com/samarth-chawla",
    "https://www.linkedin.com/in/samarth-chawla-51a403337/",
    "https://x.com/_samarth_chawla",
  ],
};

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Analytics />
      <SpeedInsights />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
