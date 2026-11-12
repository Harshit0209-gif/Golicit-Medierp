import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './components/layout/Layout';
import HomePage from './pages/HomePage';

// The home page ships in the main bundle; every other page is split out.
const JobsPage = lazy(() => import('./pages/JobsPage'));
const JobDetailPage = lazy(() => import('./pages/JobDetailPage'));
const DoctorsPage = lazy(() => import('./pages/DoctorsPage'));
const HospitalsPage = lazy(() => import('./pages/HospitalsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="jobs/:slug" element={<JobDetailPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="hospitals" element={<HospitalsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
