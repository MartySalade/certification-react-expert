export interface IOption {
  id: number;
  // Forced to use any here as we don't know the type of data each key can contain
  [key: string]: any;
}
