export interface Offer {
  id: string;
  title: string;
  headline: string;
  description: string;
  when: string;
  /** Internal path, external URL or tel: link — rendered through <Button>. */
  cta: { label: string; href: string };
  /** Additional detail sentences used in llms-full.txt and FAQ answers. */
  details?: string;
}

export const offers: readonly Offer[] = [
  {
    id: "byo-monday",
    title: "Monday Offer",
    headline: "Corkage-free Mondays — bring your own wine",
    description:
      "Every Monday we waive corkage entirely. Bring a bottle you love, we’ll bring the mezze and the glasses.",
    when: "Every Monday, all day",
    cta: { label: "Book a Monday table", href: "/bookings" },
    details: "Bring-your-own applies to wine only and is available for dine-in guests on Mondays.",
  },
  {
    id: "cocktails-241",
    title: "2-for-1 Cocktails",
    headline: "Two-for-one on all cocktails",
    description:
      "Zaatarita, PoMojito, Espresso Martini and the rest of the list — two for the price of one, Monday to Friday afternoons and early evenings.",
    when: "Monday – Friday, 12pm – 7pm",
    cta: { label: "See the cocktail list", href: "/menu/drinks" },
    details: "Applies to signature and classic cocktails ordered together, dine-in only.",
  },
  {
    id: "lunch",
    title: "Lunch Offer",
    headline: "Two-course lunch for £15.45",
    description:
      "Choose a starter and a main from our weekday lunch menu, or grab a Lebanese wrap with fries or salad from £9.99.",
    when: "Monday – Friday, 12pm – 4pm",
    cta: { label: "View the lunch menu", href: "/menu/lunch" },
    details: "Add baklawa and a hot drink to the two-course lunch for £4.50.",
  },
  {
    id: "first-order",
    title: "20% Off Your First Order",
    headline: "20% off your first online takeaway order",
    description:
      "New to ordering Zufa at home? Get 20% off when you order online for the first time.",
    when: "First online orders",
    cta: { label: "Order takeaway", href: "/takeaway" },
  },
  {
    id: "belly-dancing",
    title: "Belly Dancing Nights",
    headline: "Live belly dancing shows",
    description:
      "On selected evenings a live belly dancer brings Beirut to Hatch End. Tables fill quickly — book ahead and ask about the next show.",
    when: "Selected evenings — call for the next date",
    cta: { label: "Call to reserve", href: "tel:+442084216821" },
  },
  {
    id: "private-hire",
    title: "Private Hire",
    headline: "Celebrate your special occasion at Zufa",
    description:
      "Birthdays, engagements, baby showers, hen and stag nights and company get-togethers — our restaurant can be booked for up to 60 seated or 80 standing guests.",
    when: "Available seven days a week",
    cta: { label: "Enquire about private hire", href: "/private-hire" },
  },
];
