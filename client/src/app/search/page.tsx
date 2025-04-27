'use client';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import TutorSearch from './_components/TutorSearch';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const subject = searchParams.get('subject') || '';
  const location = searchParams.get('location') || '';
  
  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <TutorSearch />
    </main>
  );
}