import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteLayout from "./components/SiteLayout";
import Index from "./pages/Index.tsx";
import Solutions from "./pages/Solutions";
import Reach from "./pages/Reach";
import Proof from "./pages/Proof";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import AboutKipl from "./pages/AboutKipl";
import GetMediaPlan from "./pages/GetMediaPlan";
import LegalPage from "./pages/LegalPage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/reach" element={<Reach />} />
            <Route path="/proof" element={<Proof />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about-kipl" element={<AboutKipl />} />
            <Route path="/why-kipl" element={<Navigate to="/about-kipl" replace />} />
            <Route path="/about" element={<Navigate to="/about-kipl" replace />} />
            <Route path="/get-media-plan" element={<GetMediaPlan />} />
            <Route path="/privacy" element={<LegalPage kind="privacy" />} />
            <Route path="/terms" element={<LegalPage kind="terms" />} />
            <Route path="/disclaimer" element={<LegalPage kind="disclaimer" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
