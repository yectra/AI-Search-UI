export type UpdateProfileResponse = {
  companyName: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  gstDetails: string;
  nameAndDesignation: string;
  contactPhone: string;
  contactEmail: string;
  bioData: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  publicUrl: string;
  backgroundUrl: string;
  thumbnailUrl: string;
  paymentUpiId: string;
  seoMetaTitle: string;
  seoMetaKeywords: string;
  seoMetaDescription: string;
  bankName: string;
  ifscCode: string;
  accountNumber: string;
  vendorExperienceType: string;
  registeredBusinessForums: string;
  productServiceOfferings: string[];
  referenceProjects: string[];
  referenceClients: string[];
  locationOfService: string[];
  termsAndConditions: boolean;
  status: string;
  date: string;
  id: string;
};

export type UpdateCustomerResponse = {
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  id: string;
};

export type IUserProfileCover = {
  name: string;
  role: string;
  coverUrl: string;
  avatarUrl: string;
};
