/**
 * Formats a number to Nigerian Naira currency (₦)
 * e.g. 120000 -> ₦120,000
 */
export function formatNaira(amount) {
  const numeric = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0
  }).format(numeric).replace('NGN', '₦');
}
