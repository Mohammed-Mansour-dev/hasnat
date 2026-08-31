export type ContactInfo = {
  phone: string;
  whatsapp: string;
  email: string;
};

export type BrandInfo = {
  name: string;
  englishName: string;
  logo: string;
  mark: string;
};

export type HeroData = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  video: string;
  poster: string;
};

export type Package = {
  quantity: number;
  price: number;
};

export type DedicationOption = {
  id: string;
  label: string;
  description: string;
  requiresRecipient: boolean;
  recipientLabel?: string;
  recipientPlaceholder?: string;
};

export type Step = {
  number: string;
  title: string;
  description: string;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type TrustInfo = {
  storeName: string;
  authority: string;
  certificateNumber: string;
  commercialRegistration: string;
};

export type Order = {
  packageQuantity: number;
  totalPrice: number;
  dedicationType: string;
  dedicationLabel: string;
  recipientName?: string;
  customerName: string;
  phone: string;
  notes?: string;
};

export type SubmittedOrder = Order & {
  orderNumber: string;
  createdAt: string;
};
