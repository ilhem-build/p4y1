export interface TimelineItem {
  id: number;
  title: string;
  year: string;
  description: string;
  image: string;
  category: 'Horology' | 'Numismatics' | 'Literature' | 'Pop Culture';
  alignment: 'left' | 'right' | 'center';
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}
