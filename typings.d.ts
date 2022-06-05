export interface featured {
  0: {
    bestseller: boolean;
    category: string;
    currency: string;
    details: {
      dimmentions: {
        width: number;
        height: number;
      };
      size: number;
      description: string;
      recommendations: [];
    };
    image: {
      alt: string;
      src: string;
    };
    name: string;
    price: number;
  };
}
export interface product {
  data(): {
    bestseller: boolean;
    category: string;
    currency: string;
    details: {
      dimmentions: {
        width: number;
        height: number;
      };
      size: number;
      description: string;
      recommendations: [];
    };
    image: {
      alt: string;
      src: string;
    }
    name: string;
    price: number;
  };
}
