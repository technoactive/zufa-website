import { site } from "./site";

export interface Faq {
  question: string;
  answer: string;
}

/** General FAQs — surfaced on the homepage and contact page, and emitted as FAQPage JSON-LD. */
export const generalFaqs: readonly Faq[] = [
  {
    question: "Where is Zufa Lebanese restaurant?",
    answer: `Zufa is at ${site.address.full}, on the Uxbridge Road in Hatch End, North West London. We are a short walk from Hatch End Overground station and there is plenty of local parking.`,
  },
  {
    question: "What are Zufa’s opening hours?",
    answer:
      "We are open Sunday to Thursday from 11am to 11pm, and Friday and Saturday from 11am to midnight. Our weekday lunch menu is served Monday to Friday, 12pm to 4pm.",
  },
  {
    question: "Do I need to book a table at Zufa?",
    answer: `Booking is recommended, especially for Friday and Saturday evenings. You can book online in seconds for parties of up to ${site.reservations.maxOnlinePartySize}. For larger groups, please call us on ${site.phone.display}.`,
  },
  {
    question: "Does Zufa offer vegetarian and vegan food?",
    answer:
      "Yes. Lebanese cuisine is naturally plant-forward: all of our cold mezze are vegetarian and most are vegan, including hommos, moutabbal, tabbouleh, fattoush, falafel and warak enab. We also serve a vegetarian mixed grill, musakaat rice and bamieh rice.",
  },
  {
    question: "Is Zufa halal?",
    answer:
      "Please call us on 0208 421 6821 for the latest information about the sourcing of our meat and any dietary requirements — our team is always happy to help.",
  },
  {
    question: "Can Zufa cater for allergies?",
    answer:
      "Our online menus list the main allergens for every dish (gluten, dairy, nuts, sesame, fish, crustaceans and more). Please let your server know about any allergy or intolerance when you order and we will guide you.",
  },
  {
    question: "Does Zufa do takeaway or delivery?",
    answer:
      "Yes. You can order collection or delivery on this website (20% off your first order, on that form only), collect by calling us, or use Deliveroo, Uber Eats and Just Eat. The 20% does not apply on the apps.",
  },
  {
    question: "Is Zufa licensed? Can I bring my own wine?",
    answer:
      "Zufa is fully licensed, with a list of Lebanese wines, arak, Almaza beer and cocktails. On Mondays we are corkage-free, so you are welcome to bring your own wine.",
  },
  {
    question: "Does Zufa have outdoor seating?",
    answer: "Yes, we have an al fresco patio for outside dining in warmer months.",
  },
  {
    question: "Is there parking near Zufa?",
    answer:
      "There is plenty of local parking on and around the Uxbridge Road, and we are easily reached by bus and by the London Overground to Hatch End.",
  },
];

export const privateHireFaqs: readonly Faq[] = [
  {
    question: "How many guests can Zufa host for a private event?",
    answer: `Our restaurant can be booked for up to ${site.capacity.seated} guests seated or ${site.capacity.standing} standing.`,
  },
  {
    question: "What kind of events does Zufa host?",
    answer:
      "Birthdays, engagements, baby showers, hen and stag evenings, anniversaries, company get-togethers and celebrations of every kind.",
  },
  {
    question: "How do I book a large group at Zufa?",
    answer: `For tables or events of more than ${site.reservations.eventPartySize} guests, please call us on ${site.phone.display} or send an enquiry through our private hire form and a member of the team will be in touch.`,
  },
  {
    question: "Can we bring our own music or make a speech?",
    answer:
      "Yes. Bring a playlist and we’ll put it on, and there is space for a short speech. Tell us when you enquire if you’d like a cake plated with the coffee.",
  },
  {
    question: "How does private hire pricing work?",
    answer:
      "It depends on the day of the week, your numbers and how you want to eat. Most parties go for one of our set menus (the Group Menu is £36.75 a head, the Tasting Menu £46.75) and pay for drinks as they go. Tell us what you have in mind and we’ll give you a clear quote rather than a formula.",
  },
  {
    question: "Can we bring a cake or decorate the room?",
    answer:
      "Bring the cake and we’ll serve it with the coffee. If you’d like to decorate, say so when you book and we’ll make sure there’s time before your guests arrive.",
  },
  {
    question: "Is Zufa suitable for children and guests with dietary requirements?",
    answer:
      "Yes. We have a kids menu, every cold mezze is vegetarian and most are vegan, and allergens are listed for every dish. Let us know about allergies in advance and the kitchen will plan around them.",
  },
  {
    question: "How do guests get to Zufa and where can they park?",
    answer: `We’re at ${site.address.street}, ${site.address.locality}, a short walk from Hatch End Overground station with buses stopping nearby. There is plenty of parking on the surrounding streets.`,
  },
  {
    question: "Can you cater at our own venue instead?",
    answer:
      "Yes. If your party is at home, in a hall or at the office, our catering team brings the same menu to you across North West London and Hertfordshire. See our catering page for details.",
  },
];

export const cateringFaqs: readonly Faq[] = [
  {
    question: "Which areas does Zufa cater?",
    answer: `We cater across ${site.cateringAreas.slice(0, -1).join(", ")} and ${site.cateringAreas.at(-1)}, as well as the surrounding areas of North West London and Hertfordshire. If you’re further out, ask; it’s usually possible.`,
  },
  {
    question: "What events can Zufa cater for?",
    answer:
      "Weddings and engagements, birthdays, christenings, Eid and Christmas gatherings, board lunches, working meetings, product launches and office parties. We bring the food and the equipment and set it out where you are.",
  },
  {
    question: "Can the catering menu be tailored?",
    answer:
      "Yes, and it usually is. Tell us your guest numbers, dietary requirements and budget and we’ll put together a mezze and grill selection to suit, then change it with you until it’s right.",
  },
  {
    question: "Do you cater for vegetarian, vegan and allergy requirements?",
    answer:
      "Every day. All of our cold mezze are vegetarian and most are vegan (hommos, moutabbal, tabbouleh, fattoush, warak enab, muhammara), as are falafel and spinach fatayer. We list the allergens for every dish and can build a menu around nut, gluten, dairy or sesame allergies.",
  },
  {
    question: "How is catering priced?",
    answer:
      "Per head. The figure depends on your numbers, the dishes you choose and where we’re bringing it. As a guide, our in-restaurant Group Menu is £36.75 per person and the Tasting Menu £46.75. Send us the basics and you’ll get a proper quote back, not a range.",
  },
  {
    question: "How much notice do you need?",
    answer:
      "As much as you can give us, particularly for weekends, wedding season and December. Smaller working lunches can often be arranged with a few days’ notice. Call us and we’ll tell you straight away whether the date works.",
  },
  {
    question: "Could we hold the event at the restaurant instead?",
    answer: `Yes. Zufa can be hired privately for up to ${site.capacity.seated} guests seated or ${site.capacity.standing} standing, with a licensed bar and patio. See our private hire page.`,
  },
];
