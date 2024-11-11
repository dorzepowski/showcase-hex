export interface Value<T = number> {
  hex: string;
  value: T;
}

export interface ValueProps<T = number> {
  value: Value<T>;
}

export interface ValuePathProps<T = number> {
  value: Value<T>;
  path: string[];
}

export interface ValuePropsOptionalId<T = number> extends ValueProps<T> {
  id?: number;
}

export interface ItemValueProps<T> extends ValueProps<T> {
  idx: number;
}

export interface ItemValuePathProps<T = number> extends ValuePathProps<T> {
  idx: number;
}
