export type Coproduct<T extends Record<keyof any, {}>> = {
  [K in keyof T]: Record<"type", K> & T[K];
}[keyof T];

export type Individual<
  TCoproduct extends Record<"type", keyof any>,
  Tag extends TCoproduct["type"]
> = Extract<TCoproduct, Record<"type", Tag>>;

export function match<TCoproduct extends Record<"type", keyof any>>(value: TCoproduct) {
  return function <TOut>(patterns: {
    [K in TCoproduct["type"]]: (param: Omit<Individual<TCoproduct, K>, "type">) => TOut;
  }): TOut {
    const tag: TCoproduct["type"] = value.type;
    return patterns[tag](value as any);
  };
}
