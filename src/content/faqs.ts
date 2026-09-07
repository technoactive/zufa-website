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
      "Yes. You can collect from the restaurant or order delivery through Deliveroo, Uber Eats and Just Eat. First-time online orders receive 20% off.",
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
    question: "Can you arrange entertainment for my party?",
    answer:
      "Yes — belly dancing shows are a Zufa favourite and can be arranged for private events. Let us know what you have in mind when you enquire.",
  },
];

export const cateringFaqs: readonly Faq[] = [
  {
    question: "Which areas does Zufa cater?",
    answer: `We cater across ${site.cateringAreas.slice(0, -1).join(", ")} and ${site.cateringAreas.at(-1)}, as well as the surrounding areas of North West London and Hertfordshire.`,
  },
  {
    question: "What events can Zufa cater for?",
    answer:
      "Weddings, birthdays, family gatherings, board lunches, working meetings and corporate events. We bring our expertise and equipment to the heart of the party.",
  },
  {
    question: "Can the catering menu be tailored?",
    answer:
      "Absolutely. Tell us your guest numbers, dietary requirements and budget and we will put together a mezze and grill selection to suit.",
  },
];
