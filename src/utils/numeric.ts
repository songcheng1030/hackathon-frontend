export const getNormalizedPriceString = (value: number) => {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};

export const addLeadingZeros = (num: number, totalLength: number) => {
  return String(num).padStart(totalLength, '0');
}

export const countDecimals = (value: number) => {
  if(Math.floor(value) === value) return 0;
  return value.toString().split('.')[1].length || 0; 
}

export const numberToFloat = (num: number) => {
  return Number.isInteger(num) ? num + '.0' : num.toFixed(Math.min(countDecimals(num), 18));
}