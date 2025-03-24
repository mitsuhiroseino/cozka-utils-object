export type ParseOptions = {
  /**
   * 特定のキー、値の場合に任意の値を出力する場合に指定
   * @param key
   * @param value
   * @returns
   */
  reviver?: (key: string, value: any) => any;
};
