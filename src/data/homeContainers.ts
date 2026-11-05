export type HomeContainerId = 'projects' | 'skills' | 'certifications' | 'experience';

export interface HomeContainerItem {
  id: HomeContainerId;
  title: string;
  count: string;
  path: string;
  subtitle: string;
}

export const homeContainers: HomeContainerItem[] = [
  {
    id: 'projects',
    title: 'Projects',
    count: '05',
    path: '/projects',
    subtitle: 'Selected Works',
  },
  {
    id: 'skills',
    title: 'Skills',
    count: '32',
    path: '/skills',
    subtitle: 'Core Competencies',
  },
  {
    id: 'certifications',
    title: 'Certifications',
    count: '06',
    path: '/certifications',
    subtitle: 'Verified Credentials',
  },
  {
    id: 'experience',
    title: 'Experience',
    count: '01',
    path: '/experience',
    subtitle: 'Work History',
  },
];
