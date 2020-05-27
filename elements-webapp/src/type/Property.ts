export interface IProperty<T> {
  name: string;
  key: string;
  value: T;
}

export interface INumericProperty extends IProperty<number> {
  min: number;
  max: number;
}

export interface IStringProperty extends IProperty<string[]> {
  possibleValues: string[];
  type: 'SINGLE' | 'UNIQUE' | 'MULTIPLE';
}
