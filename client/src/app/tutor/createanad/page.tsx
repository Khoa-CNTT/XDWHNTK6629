'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CreateAnAd() {
  const router = useRouter();

  useEffect(() => {
    // Chuyển hướng tự động đến bước 1
    router.push('/tutor/createanad/step1');
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Đang chuyển hướng...</p>
    </div>
  );
}