import { Route, Routes } from "react-router";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { ScrollManager } from "./scroll-manager";
import HomePage from "@/pages/home";
import UxDesignPage from "@/pages/services-ux";
import WebsitesPage from "@/pages/services-websites";
import AiPage from "@/pages/services-ai";
import WorkPage from "@/pages/work";
import CaseStudyPage from "@/pages/case-study";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import PrivacyPage from "@/pages/privacy";
import NotFoundPage from "@/pages/not-found";

export function App() {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-medium text-canvas transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/ux-design" element={<UxDesignPage />} />
          <Route path="/services/websites" element={<WebsitesPage />} />
          <Route path="/services/ai" element={<AiPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <RevealObserver />
      <ScrollManager />
    </>
  );
}
