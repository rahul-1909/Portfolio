export type HomeContainerId = 'projects' | 'skills' | 'certifications' | 'experience';

export interface HomeContainerItem {
  id: HomeContainerId;
  title: string;
  count: string;
  path: string;
  subtitle: string;
  bgColor: string;
}

export const homeContainers: HomeContainerItem[] = [
  {
    id: 'projects',
    title: 'Projects',
    count: '05',
    path: '/projects',
    subtitle: 'Selected Works',
    bgColor: '#E3E7EB', // slate
  },
  {
    id: 'skills',
    title: 'Skills',
    count: '12',
    path: '/skills',
    subtitle: 'Core Competencies',
    bgColor: '#E9E8E3', // sand
  },
  {
    id: 'certifications',
    title: 'Certifications',
    count: '06',
    path: '/certifications',
    subtitle: 'Verified Credentials',
    bgColor: '#E4E9E3', // sage
  },
  {
    id: 'experience',
    title: 'Experience',
    count: '01',
    path: '/experience',
    subtitle: 'Work History',
    bgColor: '#EDE7E2', // clay
  },
];
