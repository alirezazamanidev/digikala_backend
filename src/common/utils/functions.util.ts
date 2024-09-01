export const isBoolean = (value: any) => {
  return ['false', false, 'true', true].includes(value);
};
export const toBoolean = (value: any) => {
  return [true, 'true'].includes(value)
    ? true
    : [false, 'false'].includes(value)
      ? false
      : value;
};

  export const isNull = (value: string) => ['null', null].includes(value);