/**
 * +998 (90) 123-45-67 formatiga o'tkazadi
 * digits — faqat raqamlar (998 siz, 9 ta raqam)
 */
export function formatPhone(digits: string): string {
	const d = digits.slice(0, 9);
	if (d.length === 0) return "+998";
	let result = "+998 (";
	result += d.slice(0, Math.min(2, d.length));
	if (d.length < 2) return result;
	result += ") ";
	result += d.slice(2, Math.min(5, d.length));
	if (d.length <= 5) return result;
	result += "-";
	result += d.slice(5, Math.min(7, d.length));
	if (d.length <= 7) return result;
	result += "-";
	result += d.slice(7, 9);
	return result;
}

/**
 * Formatlangan raqamdan faqat 998 dan keyingi 9 ta raqamni ajratib oladi
 */
export function extractPhoneDigits(formatted: string): string {
	const all = formatted.replace(/\D/g, "");
	return all.startsWith("998") ? all.slice(3) : all;
}
