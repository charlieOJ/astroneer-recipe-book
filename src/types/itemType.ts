export interface itemType {
  id: string;
  name: string;
  icon?: string;
  image?: string;
  tier: number;
  recipe?: itemResourceType[];
  cost?: number | string;
  type?: string;
  size?: string;
}

interface itemResourceType {
  resource: string;
  quantity?: number;
}
