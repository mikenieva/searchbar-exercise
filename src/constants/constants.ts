import { NavigationItem } from '../interfaces/index';

export const NAVIGATION: NavigationItem[] = [
  {
    name: 'Solutions',
    href: 'https://mybrightwheel.com/childcare-management-software/',
  },
  { name: 'Resources', href: 'https://mybrightwheel.com/resources/' },
  { name: 'Pricing', href: 'https://mybrightwheel.com/pricing/' },
];

export const URL = {
  base: import.meta.env.VITE_BASE_URL,
  api: import.meta.env.VITE_BASE_URL_API,
};
