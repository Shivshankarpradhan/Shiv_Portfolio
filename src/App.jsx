import { useState } from "react";
import MinimalPreloader from "./components/NetflixPreloader";
import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import About from "./components/About";
import Expertise from "./components/Expertise";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="bg-[#08050F] min-h-screen text-white relative cursor-none selection:bg-purple-600 selection:text-white">
      {/* Cinematic Purple Preloader */}
      {loading && (
        <MinimalPreloader onComplete={() => setLoading(false)} />
      )}

      {/* Global Mouse Hover Effects & Purple Spotlight */}
      <CustomCursor />

      {/* Portfolio Sections */}
      <Hero />
      <About />
      <Expertise />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;