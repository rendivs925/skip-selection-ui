export function calculateTotalWithVAT(price: number, vat: number): number {
  return price + (price * vat) / 100;
}

export function formatGBP(amount: number): string {
  return new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
}
