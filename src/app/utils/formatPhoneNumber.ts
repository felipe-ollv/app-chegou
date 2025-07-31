export default function formatPhoneNumber(value: string) {
  return value
    .replace(/\D/g, '')     
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
    .slice(0, 15);
}
