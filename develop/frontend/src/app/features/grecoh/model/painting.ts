export interface Painting {
  id: number;
  title: string;
  painter: string;
  painter_slug: string;
  slug: string;
  url?: string;
  painting_version_id?: number;
  scored?: boolean;
}
