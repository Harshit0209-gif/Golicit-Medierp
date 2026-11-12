import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { About } from './components/sections/About';
import { AudienceCards } from './components/sections/AudienceCards';
import { FinalCta } from './components/sections/FinalCta';
import { Hero } from './components/sections/Hero';
import { Solutions } from './components/sections/Solutions';
import { Specialisations } from './components/sections/Specialisations';
import { StatsBar } from './components/sections/StatsBar';
import { Testimonials } from './components/sections/Testimonials';
import { WhyChooseUs } from './components/sections/WhyChooseUs';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <StatsBar />
        <About />
        <Solutions />
        <Specialisations />
        <WhyChooseUs />
        <AudienceCards />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
