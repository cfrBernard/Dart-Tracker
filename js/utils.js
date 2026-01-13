// utils.js ===== parsing & helpers =====

export function parseThrow(raw) {
  if (!raw) return 0;
  let val = raw.trim().toUpperCase();
  const dtMatch = val.match(/^(D|T|S)(\d{1,2})$/);
  if (dtMatch) {
    const type = dtMatch[1];
    const number = parseInt(dtMatch[2], 10);
    if (isNaN(number)) return 0;
    if (type === 'D') return number * 2;
    if (type === 'T') return number * 3;
    return number;
  }

  val = val.replace(',', '.');
  if (val.includes('.')) {
    const [multiplier, base] = val.split('.').map(Number);
    if (!isNaN(multiplier) && !isNaN(base)) return multiplier * base;
  }

  const num = parseInt(val, 10);
  return isNaN(num) ? 0 : num;
}

export function parseThrows(inputs) {
  return [...inputs].map(i => parseThrow(i.value));
}
