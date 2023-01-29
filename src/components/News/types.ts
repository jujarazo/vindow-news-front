export type Image = {
  url: string;
  thumbnail: string;
  thumbnailHeight: number;
  thumbnailWidth: number;
  height: number;
  width: number;
};

export type News = {
  id: string;
  body: string;
  title: string;
  description: string;
  image: Image;
  url: string;
};
