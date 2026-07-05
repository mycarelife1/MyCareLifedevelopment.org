import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Users, Shield, Baby,
  Scale, Globe, ArrowRight, ChevronRight, ChevronLeft,
  HandHeart, Target, Activity,
} from 'lucide-react';
import CountUp from '../components/CountUp';
import NewsletterForm from '../components/NewsletterForm';
import { impactStats, impactStories, partners } from '../data/content';

const heroSlides = [
  {
    src: 'https://i.postimg.cc/Njxp4BRv/69.jpg',
    alt: 'MyCare Life community transformation initiative',
  },
  {
    src: 'https://i.postimg.cc/CxpMGRJr/289d7ec9-343e-4ebd-b751-2cafd44239b7-E8658E15-14E5-4A9D-92BD-14B2B9E34B05.jpg',
    alt: 'MyCare Life community development initiative',
  },
  {
    src: 'https://i.postimg.cc/TPGw6KDm/c378b4a9-89f0-4ec0-8f22-e875bc0d3a3a-D21BF61A-674A-4BD7-A8C9-03CF0DC159E2.jpg',
    alt: 'MyCare Life volunteerism and community engagement',
  },
  {
    src: 'https://i.postimg.cc/zfJJQ4sn/18e05eba-06b1-4e46-94d2-08978cd2c28a-ED6AB1EA-C23B-4E56-861E-3301F31F83FF.jpg',
    alt: 'MyCare Life youth empowerment program',
  },
  {
    src: 'https://i.postimg.cc/RhzDdmpS/IMG-0412.jpg',
    alt: 'MyCare Life multi-stakeholder engagement',
  },
  {
    src: 'https://i.postimg.cc/V6bZDCLt/IMG-0986.jpg',
    alt: 'MyCare Life event at the National Assembly',
  },
];

const featuredPrograms = [
  { id: 'youth-empowerment', title: 'Youth & Creativity Initiative', description: 'Skills, mentorship and leadership development for young people.', icon: Users },
  { id: 'good-governance', title: 'Good Governance Advocacy', description: 'Civic education, transparency and accountability campaigns.', icon: Scale },
  { id: 'indigenous-empowerment', title: 'Indigenous Empowerment', description: 'Rights, representation and inclusion of indigenous populations.', icon: Globe },
  { id: 'child-rights', title: 'Child Rights Advocacy', description: 'Protection, shelter and rehabilitation for vulnerable children.', icon: Baby },
  { id: 'womens-empowerment', title: "Women's Empowerment", description: 'Economic empowerment, legal aid and gender equality programs.', icon: Shield },
  { id: 'health-outreach', title: 'Health Outreach', description: 'Community health screenings, eye care and maternal health.', icon: Activity },
];