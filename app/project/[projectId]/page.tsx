'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ProjectRedirect() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.projectId as string;

  useEffect(() => {
    if (projectId) {
      router.replace(`/section/${projectId}`);
    } else {
      router.replace('/');
    }
  }, [projectId, router]);

  return null;
}
