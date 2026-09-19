import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import HomePage from "@/pages/Homepage.jsx";
import ToolPage from "@/pages/ToolPage.jsx";
import CategoryPage from "@/pages/CategoryPage.jsx";
import NotFound from "@/pages/NotFound.jsx";

function App() {
  return (
    <HelmetProvider>
      <div className="App min-h-screen bg-background text-foreground">
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/:slug" element={<ToolPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
        <Toaster />
      </div>
    </HelmetProvider>
  );
}

export default App;
