export interface Ship {
  id: string;
  name: string;
  lengthInMeters: number;
  widthInMeters: number;
  code: string;
  [key: string]: any;
}
