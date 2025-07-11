export default function convertNum(value) {
  // Create a new Intl.NumberFormat object for formatting numbers
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Format the value and return it
  return formatter.format(value);
}