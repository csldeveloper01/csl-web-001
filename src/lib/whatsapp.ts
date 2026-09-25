// src/lib/whatsapp.ts
/** Build a WhatsApp URL with a prefilled, URL‑encoded message.
 * The message string can contain line breaks (\n) which will be preserved by WhatsApp.
 */
export function buildWhatsAppUrl(message: string, phoneNumber: string = '918056052806'): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encoded}`;
}
/** Open the WhatsApp URL in a new tab. */
export function openWhatsApp(message: string): void {
  const url = buildWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}
