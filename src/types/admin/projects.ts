type UserModel = {
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  id: string;
};

type VendorModel = {
  id: string;
  companyName: string;
  officialAddress: string;
  gstDetails: string;
  panDetails: string;
  phoneNumber: string;
  emailAddress: string;
  nameAndDesignation: string;
  contactPhone: string;
  contactEmail: string;
  bankName: string;
  ifscCode: string;
  accountNumber: string;
  vendorExperienceType: string;
  registeredBusinessForums: string;
  productServiceOfferings: Array<String>;
  referenceProjects: Array<String>;
  referenceClients: Array<String>;
  termsAndConditions: boolean;
};

export type ProjectDeatilsAdminResponseModel = {
  projectName: string;
  navigationPath: string;
  assignedVendorDetails?: Array<VendorModel>;
  userDetails: UserModel;
  createdAt: string;
  updatedAt: string;
  id: string;
};
