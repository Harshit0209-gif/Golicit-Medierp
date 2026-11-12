import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type Audience = 'institution' | 'professional';

interface EnquiryState {
  audience: Audience;
  specialty: string;
  /** Preselect the enquiry form and scroll to it. */
  open: (audience: Audience, specialty?: string) => void;
  setAudience: (audience: Audience) => void;
}

const EnquiryContext = createContext<EnquiryState | null>(null);

/** Lets any section send the reader to the enquiry form with the right options chosen. */
export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [audience, setAudience] = useState<Audience>('institution');
  const [specialty, setSpecialty] = useState('');

  const open = useCallback((next: Audience, nextSpecialty = '') => {
    setAudience(next);
    setSpecialty(nextSpecialty);
    document.getElementById('enquiry')?.scrollIntoView({ block: 'start' });
  }, []);

  const value = useMemo(() => ({ audience, specialty, open, setAudience }), [audience, specialty, open]);
  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used inside EnquiryProvider');
  return ctx;
}
