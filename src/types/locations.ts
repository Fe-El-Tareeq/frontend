export interface Neighborhood {
  id: string;
  name: string;
  governorate: string;
  isActive?: boolean;
}

export interface NeighborhoodListData {
  neighborhoods: Neighborhood[];
}
