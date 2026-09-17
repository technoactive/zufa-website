/**
 * Option lists for the catering enquiry form. Shared by the client form
 * (rendering), the server action (validation) and the emails (labels), so a
 * change here propagates everywhere.
 */

export interface Option {
  value: string;
  label: string;
  hint?: string;
}

export const occasionOptions = [
  { value: "wedding", label: "Wedding or engagement" },
  { value: "birthday", label: "Birthday" },
  { value: "family", label: "Family gathering or anniversary" },
  { value: "corporate", label: "Office lunch or corporate event" },
  { value: "religious", label: "Religious or community celebration" },
  { value: "funeral", label: "Wake or memorial" },
  { value: "other", label: "Something else" },
] as const satisfies readonly Option[];

export const eventTimeOptions = [
  { value: "morning", label: "Morning (before 12pm)" },
  { value: "lunch", label: "Lunchtime (12pm – 2pm)" },
  { value: "afternoon", label: "Afternoon (2pm – 6pm)" },
  { value: "evening", label: "Evening (after 6pm)" },
  { value: "all-day", label: "All day / several sittings" },
  { value: "unsure", label: "Not decided yet" },
] as const satisfies readonly Option[];

export const venueTypeOptions = [
  { value: "home", label: "Private home or garden" },
  { value: "office", label: "Office or workplace" },
  { value: "hall", label: "Hired hall or venue" },
  { value: "marquee", label: "Marquee or outdoor site" },
  { value: "place-of-worship", label: "Place of worship" },
  { value: "other", label: "Other" },
] as const satisfies readonly Option[];

export const serviceStyleOptions = [
  { value: "mezze-table", label: "Mezze table", hint: "Buffet of cold and hot mezze, grills and salads for guests to help themselves." },
  { value: "plated", label: "Plated courses", hint: "Sit-down service with starters, mains and dessert brought to the table." },
  { value: "grill-station", label: "Live grill station", hint: "Our chef cooks shish taouk, kafta and lamb on the charcoal grill at your venue." },
  { value: "boxed", label: "Boxed lunches & wraps", hint: "Individual saj wraps and salad boxes — ideal for the office." },
  { value: "canapes", label: "Canapés & finger food", hint: "Mini kebbeh, fatayer, arayes and falafel passed around on trays." },
  { value: "unsure", label: "Not sure yet", hint: "Tell us the occasion and we’ll suggest what works." },
] as const satisfies readonly Option[];

export const menuStyleOptions = [
  { value: "vegetarian", label: "Vegetarian feast" },
  { value: "levantine", label: "Levantine — mezze and grills" },
  { value: "feast-grill", label: "Lebanese feast grill" },
  { value: "bespoke", label: "Bespoke — we’ll build it together" },
  { value: "unsure", label: "Not sure yet" },
] as const satisfies readonly Option[];

export const dietaryOptions = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "halal", label: "Halal" },
  { value: "gluten-free", label: "Gluten-free" },
  { value: "nut-free", label: "Nut allergy" },
  { value: "dairy-free", label: "Dairy-free" },
  { value: "other", label: "Other allergies" },
] as const satisfies readonly Option[];

export const budgetOptions = [
  { value: "under-20", label: "Under £20 per head" },
  { value: "20-30", label: "£20 – £30 per head" },
  { value: "30-45", label: "£30 – £45 per head" },
  { value: "45-plus", label: "£45+ per head" },
  { value: "unsure", label: "Not sure — advise me" },
] as const satisfies readonly Option[];

export const extrasOptions = [
  { value: "staff", label: "Serving staff" },
  { value: "chef", label: "Chef on site" },
  { value: "tableware", label: "Crockery, cutlery & glassware" },
  { value: "setup", label: "Set-up & clear-down" },
  { value: "delivery-only", label: "Delivery only" },
] as const satisfies readonly Option[];

export const sourceOptions = [
  { value: "google", label: "Google search" },
  { value: "maps", label: "Google Maps" },
  { value: "instagram", label: "Instagram" },
  { value: "recommendation", label: "Friend or family" },
  { value: "guest", label: "I’ve eaten at the restaurant" },
  { value: "event", label: "Tasted your food at an event" },
  { value: "other", label: "Somewhere else" },
] as const satisfies readonly Option[];

export const cateringOptionGroups = {
  occasion: occasionOptions,
  eventTime: eventTimeOptions,
  venueType: venueTypeOptions,
  serviceStyle: serviceStyleOptions,
  menuStyle: menuStyleOptions,
  dietary: dietaryOptions,
  budget: budgetOptions,
  extras: extrasOptions,
  source: sourceOptions,
} as const;

export type CateringOptionGroup = keyof typeof cateringOptionGroups;

export function optionValues<G extends CateringOptionGroup>(group: G): readonly string[] {
  return cateringOptionGroups[group].map((o) => o.value);
}

export function optionLabel(group: CateringOptionGroup, value: string | undefined): string | undefined {
  if (!value) return undefined;
  const list: readonly Option[] = cateringOptionGroups[group];
  return list.find((o) => o.value === value)?.label ?? value;
}

export function optionLabels(group: CateringOptionGroup, values: readonly string[] | undefined): string | undefined {
  if (!values?.length) return undefined;
  return values.map((v) => optionLabel(group, v) ?? v).join(", ");
}
