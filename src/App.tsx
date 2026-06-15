import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import OrderConfirmation from "./pages/OrderConfirmation";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/uczen" element={<StudentDashboard />} />
          <Route path="/nauczyciel" element={<TeacherDashboard />} />
          <Route path="/matura" element={<Index />} />
          <Route path="/osmoklasista" element={<Index />} />
          <Route path="/sklep" element={<Shop />} />
          <Route path="/produkt/:id" element={<Product />} />
          <Route path="/koszyk" element={<Cart />} />
          <Route path="/zamowienie" element={<Checkout />} />
          <Route path="/zamowienie/potwierdzenie" element={<OrderConfirmation />} />
          <Route path="/darmowe-materialy" element={<Index />} />
          <Route path="/korepetycje" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;