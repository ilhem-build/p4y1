import React from 'react';
import { TimelineItem, ServiceItem } from './types';
import { Search, Globe, TrendingUp, ShieldCheck } from 'lucide-react';

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 1,
    title: "The Genesis",
    year: "2009",
    description: "Establishing the foundation in numismatics. Rare coins and medallions represent the initial appreciation of history held in one's hand, forming the core of our heritage expertise.",
    // UPDATED IMAGE LINK: Coin/Medallion
    image: "https://res.cloudinary.com/dhpqnaqgd/image/upload/v1764075669/image02_khextw.jpg",
    category: "Numismatics",
    alignment: "left"
  },
  {
    id: 2,
    title: "Archival Paper & Philately",
    year: "2012",
    description: "We expanded into a diverse range of paper artifacts and philatelic items: stamps, postcards, First Day Covers (FDC), cigarette cards, and historical banknotes. This deep focus encompasses old books, manuscripts, autographs, and share certificates, each holding unique historical and cultural significance.",
    image: "https://res.cloudinary.com/dhpqnaqgd/image/upload/v1764077003/book.jpg", // Book image kept as requested
    category: "Literature",
    alignment: "right"
  },
  {
    id: 3,
    // TITLE CHANGED to reflect mechanical focus
    title: "Mechanical Arts",
    year: "2015",
    // UPDATED DESCRIPTION: Now includes lighters and broader mechanical items
    description: "A deep dive into mechanical arts. From the intricate movements of luxury timepieces (horology) to the vintage engineering of lighters, we master the value of timeless craft and mechanics.",
    // UPDATED IMAGE LINK: Person with a lighter
    image: "https://res.cloudinary.com/dhpqnaqgd/image/upload/v1764075653/image01_fn2ak2.jpg",
    category: "Mechanical Arts", // Category updated
    alignment: "center"
  },
  {
    id: 4,
    title: "Modern Collectibles",
    year: "2019",
    // UPDATED DESCRIPTION: Listing specific inventory
    description: "Bridging the gap to pop culture. TCG rarities (Pokemon, Yu-Gi-Oh), exclusive Funko Pops, and limited-edition figures emerge as the new asset class for the modern, discerning investor.",
    // UPDATED IMAGE LINK: Collectible card
    image: "https://res.cloudinary.com/dhpqnaqgd/image/upload/v1764077840/model_spbnjj.jpg",
    category: "Pop Culture",
    alignment: "left"
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    title: "Appraisal & Valuation",
    description: "Expert authentication and market value assessment for heritage assets and modern collectibles.",
    icon: <Search className="w-6 h-6" />
  },
  {
    title: "Sourcing Strategy",
    description: "Leveraging a global network to locate rare artifacts, specific timepieces, or investment-grade cards.",
    icon: <Globe className="w-6 h-6" />
  },
  {
    title: "Asset Transition",
    description: "Strategic consulting for businesses moving from high-volume commerce to premium heritage branding.",
    icon: <TrendingUp className="w-6 h-6" />
  }
];

export const TESTIMONIALS = [
  {
    text: "Purchased a Trucial States FDC. Excellent service and completely satisfied.",
    author: "Private, Abu Dhabi"
  },
  {
    text: "Collection met my requirements perfectly. Excellent service.",
    author: "Private, Kuwait" 
  },
  {
    text: "Very pleased with the 1887 Tata-signed Indenture. Fair price and smooth process.",
    author: "AlphaOmegaPhilately, Mumbai" 
  },
  {
    text: "A dependable source for honest philatelic appraisals and guidance.",
    author: "Todywalla Auctions, Mumbai" 
  },
  {
    text: "We often purchase rare banknotes from this source. Items are authentic, high quality, and fairly priced.",
    author: "KTNumismatics, Chennai" 
  },
  {
    text: "Excellent service. Very satisfied with the rare Book 1908 Twentieth Century Impressions of British Malaya.",
    author: "Justin Lim, Singapore" 
  },
  {
    text: "Received the 1900 American Beauties cigarette cards. Excellent condition and fully satisfied",
    author: "Derek Lugton, New Zealand" 
  },
  {
    text: "Wonderful 1900 Thomas Holloway Card Set. Truly satisfied.",
    author: "Private, London" 
  },
  {
    text: "Great consulting and appraisal service. Very professional and helped me secure the 1888 Majagram Tea Co. share certificate. Highly recommended",
    author: "Liu Bo, China" 
  },
  {
    text: "Excellent rare Gandhi autograph. Fully satisfied with the purchase",
    author: "Juliza, South Africa" 
  },
  {
    text: "Professional and smooth experience acquiring the rare Japan WWII censor cover. Highly satisfied.",
    author: "Chan Soo Park, South Korea" 
  },
  {
    text: "Excellent consulting and advice for my ancient coin collection.",
    author: "Walter Deijnckens, Belgium" 
  },
  {
    text: "Perfect transaction. Excellent 1859 British India Cover.",
    author: "StampBay, California" 
  }

];
