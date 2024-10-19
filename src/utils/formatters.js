export function separadorDeMiles(value) {
    if (!value) return ''; // Si el valor es vacío, devolver una cadena vacía
    return parseInt(value, 10).toLocaleString('es-ES', {
      maximumFractionDigits: 0, // Sin decimales
    });
  }
  