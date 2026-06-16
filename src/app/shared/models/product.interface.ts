export interface ProductCategory {
  id:    string;
  name:  string;
  slug:  string;
}

export interface ProductPresentation {
  label: string;
}

export interface Product {
  id:               string;
  name:             string;
  slug:             string;
  category:         ProductCategory;
  tagline?:         string;
  activeIngredient?: string;
  description?:     string;
  image?:           string;
  inserto?:         string;
  presentations:    ProductPresentation[];
  featured:         boolean;
  status:           'active' | 'inactive';
}
