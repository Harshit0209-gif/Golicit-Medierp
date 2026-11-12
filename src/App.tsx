import { EnquiryProvider } from './components/Enquiry';
import { About } from './sections/About';
import { Credentials } from './sections/Credentials';
import { EnquirySection } from './sections/EnquirySection';
import { Footer } from './sections/Footer';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Institutions } from './sections/Institutions';
import { Process } from './sections/Process';
import { Professionals } from './sections/Professionals';
import { Services } from './sections/Services';
import { Specialisations } from './sections/Specialisations';
import { Testimonials } from './sections/Testimonials';

export default function App() {
  return (
    <EnquiryProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Credentials />
        <About />
        <Services />
        <Specialisations />
        <Process />
        <Institutions />
        <Professionals />
        <Testimonials />
        <EnquirySection />
      </main>
      <Footer />
    </EnquiryProvider>
  );
}
