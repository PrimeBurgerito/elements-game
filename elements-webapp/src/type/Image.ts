export interface IImageCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IImage {
  fileName: string;
  key: string;
  uri: string;
  crops: { [key: string]: IImageCrop }
}
