export interface City {
  key: string;
  nameAr: string;
  nameEn: string;
  neighborhoodsCount?: number;
}

export interface CityListData {
  cities: City[];
}

export interface Neighborhood {
  id: string;
  key?: string;
  name: string;
  governorate: string;
  isActive?: boolean;
}

export interface NeighborhoodListData {
  neighborhoods: Neighborhood[];
}

