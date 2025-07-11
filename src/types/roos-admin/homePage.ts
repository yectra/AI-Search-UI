export type RestaurantResponseModel = {
  address: string;
  apiKey: string;
  apiToken: string;
  autoAccept: boolean;
  autoPrint: boolean;
  businessTypes: string;
  businessUrl: string;
  city: string;
  contactNo: string;
  country: string;
  deliveryFeeZipCode: any[];
  deliveryRadius: boolean;
  deliveryZipcode: boolean;
  description: string;
  doordashDeveloperId: string;
  doordashDeveloperKey: string;
  doordashSigningSecret: string;
  email: string;
  emailFlag: boolean;
  emailHost: string;
  emailPort: string;
  facebookId: string;
  id: string;
  instagramId: string;
  leadTime: number;
  localAccountId: string;
  minimumOrderAmountDoordash: number;
  minimumOrderAmountSelfdelivery: number;
  minimumOrderAmountUbereats: number;
  paymentFlag: boolean;
  phoneNumber: null
  printFormat: string;
  printerName: string;
  restaurantLogo: string;
  restaurantName: string;
  state: string;
  templateName: string;
  transaction_id: string;
  transaction_status: string;
  twilioAccountSID: string;
  twilioAuthToken: string;
  uberEatsAccessToken: string;
  uberEatsClientId: string;
  uberEatsClientSecret: string;
  uberEatsCustomerId: string;
  userId: string;
  websiteUrl: string;
  whatsappToken: string;
  whatsappUrl: string;
  zipCode: string;
  deliveryFeeRadius: DeliveryFeeModel[];
  deliveryMode?: string[];
  images: string[];
  selectedServices: string[];
  serviceTypes: ServiceType[];
  taxDetails: TaxValue[];
}

export type DeliveryFeeModel = {
  deliveryRadius: string;
  feeAmount: string;
  symbol: string;
}

export type TaxValue = {
    taxName: string;
    taxValue: string;
    taxUnits: string;
}
export interface OpenCloseModel {
    openAt: string;
    closeAt: string;
}
export interface OpenCloseTime {
    day: string;
    closed: boolean;
    timings: Array<OpenCloseModel>;
}

export interface ServiceType {
    serviceMode: string;
    restaurantOpenCloseTime: OpenCloseTime[];
}