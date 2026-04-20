import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Groothandel from "./pages/Groothandel";
import Maakindustrie from "./pages/Maakindustrie";
import Transport from "./pages/Transport";
import OverOns from "./pages/OverOns";
import OnzeAanpak from "./pages/OnzeAanpak";
import Faq from "./pages/Faq";
import LpAssessment from "./pages/LpAssessment";
import Inzichten from "./pages/Inzichten";
import AiInGroothandel2026 from "./pages/inzichten/AiInGroothandel2026";
import AiPricingVoorGroothandel from "./pages/inzichten/AiPricingVoorGroothandel";
import AiVoorMaakindustrieOee from "./pages/inzichten/AiVoorMaakindustrieOee";
import PredictiveMaintenanceMachinebouw from "./pages/inzichten/PredictiveMaintenanceMachinebouw";
import VrachtwagenheffingAiCompensatie from "./pages/inzichten/VrachtwagenheffingAiCompensatie";
import CsrdScope3AutomatiseringTransport from "./pages/inzichten/CsrdScope3AutomatiseringTransport";
import GroothandelWhitepaper2026 from "./pages/whitepapers/GroothandelWhitepaper2026";
import MaakindustrieWhitepaper2026 from "./pages/whitepapers/MaakindustrieWhitepaper2026";
import TransportWhitepaper2026 from "./pages/whitepapers/TransportWhitepaper2026";
import Cases from "./pages/Cases";
import Bronnen from "./pages/Bronnen";
import Nieuwsbrief from "./pages/Nieuwsbrief";
import AiReadinessAssessment from "./pages/AiReadinessAssessment";
import GroothandelPromptPack from "./pages/promptpacks/GroothandelPromptPack";
import MaakindustriePromptPack from "./pages/promptpacks/MaakindustriePromptPack";
import TransportPromptPack from "./pages/promptpacks/TransportPromptPack";
import NotFound from "./pages/NotFound";
import React from "react";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/groothandel" element={<Groothandel />} />
            <Route path="/maakindustrie" element={<Maakindustrie />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/over-ons" element={<OverOns />} />
            <Route path="/onze-aanpak" element={<OnzeAanpak />} />
            <Route path="/veelgestelde-vragen" element={<Faq />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/lp/assessment" element={<LpAssessment />} />
            <Route path="/inzichten" element={<Inzichten />} />
            <Route path="/inzichten/ai-in-nederlandse-technische-groothandel-2026" element={<AiInGroothandel2026 />} />
            <Route path="/inzichten/ai-pricing-voor-groothandel" element={<AiPricingVoorGroothandel />} />
            <Route path="/inzichten/ai-voor-nederlandse-maakindustrie-oee" element={<AiVoorMaakindustrieOee />} />
            <Route path="/inzichten/predictive-maintenance-machinebouw" element={<PredictiveMaintenanceMachinebouw />} />
            <Route path="/inzichten/vrachtwagenheffing-2026-ai-compensatie" element={<VrachtwagenheffingAiCompensatie />} />
            <Route path="/inzichten/csrd-scope-3-automatisering-transport" element={<CsrdScope3AutomatiseringTransport />} />
            <Route path="/whitepapers/ai-in-technische-groothandel-2026" element={<GroothandelWhitepaper2026 />} />
            <Route path="/whitepapers/ai-voor-nederlandse-maakindustrie-2026" element={<MaakindustrieWhitepaper2026 />} />
            <Route path="/whitepapers/ai-voor-nederlandse-transport-2026" element={<TransportWhitepaper2026 />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/bronnen" element={<Bronnen />} />
            <Route path="/bronnen/ai-readiness-assessment" element={<AiReadinessAssessment />} />
            <Route path="/bronnen/prompts/groothandel-2026" element={<GroothandelPromptPack />} />
            <Route path="/bronnen/prompts/maakindustrie-2026" element={<MaakindustriePromptPack />} />
            <Route path="/bronnen/prompts/transport-2026" element={<TransportPromptPack />} />
            <Route path="/nieuwsbrief" element={<Nieuwsbrief />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
