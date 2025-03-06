
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudyGroups from "./pages/StudyGroups";
import DoubtSolving from "./pages/DoubtSolving";
import FoodDelivery from "./pages/FoodDelivery";
import IncidentReport from "./pages/IncidentReport";
import EmergencyAlerts from "./pages/EmergencyAlerts";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/study-groups" element={<StudyGroups />} />
          <Route path="/doubt-solving" element={<DoubtSolving />} />
          <Route path="/food-delivery" element={<FoodDelivery />} />
          <Route path="/incident-report" element={<IncidentReport />} />
          <Route path="/emergency-alerts" element={<EmergencyAlerts />} />
          <Route path="/library" element={<Library />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
