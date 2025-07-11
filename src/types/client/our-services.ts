export type ServiceResponse = {
  id: string;
  name: string;
  navigationPath: string;
  imageURL: string[];
  description: string;
  keyFeatures: string[];
  rating: number;
  isPublished: boolean;
  category: {
    id: string;
    name: string;
  };
  location: string[];
};
