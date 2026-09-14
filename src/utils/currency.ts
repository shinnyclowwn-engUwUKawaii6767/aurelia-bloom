/**
 * Utility for formatting currency in Colombian Pesos (COP).
 * Aurelia Bloom is an artisanal boutique florist founded in Colombia.
 */

export const formatCOP = (amount: number): string => {
  return `$ ${amount.toLocaleString('es-CO')} COP`;
};

export const formatCOPShort = (amount: number): string => {
  return `$ ${amount.toLocaleString('es-CO')}`;
};
