import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { redirects } from "./content/redirects";
import Home from "./pages/site/Home";
import VoorWie from "./pages/site/VoorWie";
import CategoryPage from "./pages/site/CategoryPage";
import Oplossingen from "./pages/site/Oplossingen";
import ProcessPage from "./pages/site/ProcessPage";
import Werkwijze from "./pages/site/Werkwijze";
import Prijzen from "./pages/site/Prijzen";
import Voorbeelden from "./pages/site/Voorbeelden";
import Over from "./pages/site/Over";
import Werkstroomcheck from "./pages/site/Werkstroomcheck";
import Bedankt from "./pages/site/Bedankt";
import Privacy from "./pages/site/Privacy";
import CampaignPage from "./pages/site/CampaignPage";
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
import GroothandelPromptPack from "./pages/promptpacks/GroothandelPromptPack";
import MaakindustriePromptPack from "./pages/promptpacks/MaakindustriePromptPack";
import TransportPromptPack from "./pages/promptpacks/TransportPromptPack";
import BrandAssets from "./pages/BrandAssets";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            {/* Oude URL's → inhoudelijk passende nieuwe route (client-side; 301 op hosting = livegang-punt) */}
            {redirects.map((r) => <Route key={r.from} path={r.from} element={<Navigate to={r.to} replace />} />)}

            <Route path="/" element={<Home />} />
            <Route path="/voor-wie" element={<VoorWie />} />
            <Route path="/groothandels" element={<CategoryPage key="groothandels" id="groothandels" />} />
            <Route path="/importeurs-distributeurs" element={<CategoryPage key="importeurs-distributeurs" id="importeurs-distributeurs" />} />
            <Route path="/service-onderhoud" element={<CategoryPage key="service-onderhoud" id="service-onderhoud" />} />
            <Route path="/maatwerk-montage" element={<CategoryPage key="maatwerk-montage" id="maatwerk-montage" />} />
            <Route path="/oplossingen" element={<Oplossingen />} />
            <Route path="/oplossingen/:id" element={<ProcessPage />} />
            <Route path="/werkwijze" element={<Werkwijze />} />
            <Route path="/prijzen" element={<Prijzen />} />
            <Route path="/voorbeelden" element={<Voorbeelden />} />
            <Route path="/over" element={<Over />} />
            <Route path="/werkstroomcheck" element={<Werkstroomcheck />} />
            <Route path="/bedankt" element={<Bedankt />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/campagnes/offerte-intake" element={<CampaignPage key="offerte-intake" id="offerte-intake" />} />
            <Route path="/campagnes/aftersales" element={<CampaignPage key="aftersales" id="aftersales" />} />
            <Route path="/campagnes/service-intake" element={<CampaignPage key="service-intake" id="service-intake" />} />
            <Route path="/campagnes/project-intake" element={<CampaignPage key="project-intake" id="project-intake" />} />

            {/* Inzichten — footer-only, inhoud ongewijzigd */}
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
            <Route path="/bronnen/prompts/groothandel-2026" element={<GroothandelPromptPack />} />
            <Route path="/bronnen/prompts/maakindustrie-2026" element={<MaakindustriePromptPack />} />
            <Route path="/bronnen/prompts/transport-2026" element={<TransportPromptPack />} />
            <Route path="/brand" element={<BrandAssets />} />
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
