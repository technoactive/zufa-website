/**
 * Menus — fully structured so they can be rendered as accessible HTML,
 * emitted as schema.org `Menu` JSON-LD, and serialised into llms-full.txt.
 *
 * Prices are in GBP. Where a dish has several variants, `price` is an array.
 */

export type Allergen =
  | "gluten"
  | "dairy"
  | "celery"
  | "nuts"
  | "sesame"
  | "lupin"
  | "fish"
  | "eggs"
  | "crustaceans"
  | "peanuts";

export type Diet = "vegetarian" | "vegan" | "spicy";

export interface PriceVariant {
  label: string;
  price: number;
}

export interface MenuItem {
  name: string;
  description?: string;
  price?: number | readonly PriceVariant[];
  /** Free-form pricing note, e.g. "per person". */
  priceNote?: string;
  allergens?: readonly Allergen[];
  diets?: readonly Diet[];
  note?: string;
}

export interface MenuSection {
  id: string;
  title: string;
  description?: string;
  items: readonly MenuItem[];
}

export interface Menu {
  slug: string;
  title: string;
  shortTitle: string;
  /** One-sentence summary used in meta descriptions and llms.txt. */
  summary: string;
  /** Longer intro shown at the top of the menu page. */
  intro: string;
  availability?: string;
  image: string;
  imageAlt: string;
  pdf?: string;
  sections: readonly MenuSection[];
}

export const allergenLabels: Record<Allergen, string> = {
  gluten: "Gluten",
  dairy: "Dairy",
  celery: "Celery",
  nuts: "Nuts",
  sesame: "Sesame",
  lupin: "Lupin",
  fish: "Fish",
  eggs: "Eggs",
  crustaceans: "Crustaceans",
  peanuts: "Peanuts",
};

export const dietLabels: Record<Diet, string> = {
  vegetarian: "Vegetarian",
  vegan: "Plant-based",
  spicy: "Spicy",
};

/* ------------------------------------------------------------------ */
/* À la carte                                                          */
/* ------------------------------------------------------------------ */

export const aLaCarte: Menu = {
  slug: "a-la-carte",
  title: "À La Carte Menu",
  shortTitle: "À La Carte",
  summary:
    "Zufa’s full Lebanese à la carte: home-made saj bread, cold and hot mezze, chargrilled mains, house specials, seafood and sides.",
  intro:
    "Lebanese meals begin with a generous selection of small sharing dishes called mezze, followed by chargrilled meats, fish and vegetarian mains. At Zufa every dish is made from scratch with fresh, locally sourced ingredients and an essential blend of Lebanese herbs and spices.",
  image: "/images/mezze-spread.jpg",
  imageAlt: "A table of Lebanese mezze at Zufa: hommos with lamb, tabbouleh, fattoush, moutabbal and sambousek",
  pdf: "/menus/zufa-a-la-carte-menu.pdf",
  sections: [
    {
      id: "saj-bread",
      title: "Home-made Saj Bread",
      description:
        "Saj is a traditional domed iron griddle used in Lebanon to bake thin flatbread. Our fillings are wrapped and chargrilled for extra flavour, then served on a hand-cut olive-wood board from Lebanon.",
      items: [
        { name: "Zaatar", description: "Dry thyme, olive oil, sesame seeds", price: 4.5, allergens: ["sesame"], diets: ["vegan"] },
        { name: "Zaatar Extra", description: "Zaatar, tomatoes, fresh mint", price: 5.0, allergens: ["sesame"], diets: ["vegan"] },
        { name: "Zaatar – Jibneh", description: "Zaatar, mixed cheese", price: 5.5, allergens: ["dairy", "sesame"], diets: ["vegetarian"] },
        { name: "Jibneh", description: "Mixed cheese", price: 5.5, allergens: ["dairy"], diets: ["vegetarian"] },
        { name: "Kafta – Jibneh", description: "Minced lamb, mixed cheese", price: 9.5, allergens: ["dairy"] },
      ],
    },
    {
      id: "soups",
      title: "Soups",
      items: [
        { name: "Lentil Soup", price: 6.5, allergens: ["celery"], diets: ["vegan"] },
        { name: "Chicken Soup", price: 7.25, allergens: ["gluten", "celery"] },
      ],
    },
    {
      id: "cold-mezze",
      title: "Cold Mezze",
      description: "All our cold mezze are vegetarian.",
      items: [
        {
          name: "Hommos",
          description: "Purée of chickpeas, tahini, lemon juice",
          price: [
            { label: "Classic", price: 7.5 },
            { label: "Beiruty", price: 8.25 },
            { label: "Pesto", price: 8.25 },
            { label: "Pine nuts", price: 9.75 },
            { label: "Muhammara", price: 10.5 },
          ],
          allergens: ["sesame"],
          diets: ["vegan"],
        },
        { name: "Moutabbal (Baba Ghannouj)", description: "Purée of smoked aubergines, sesame sauce, garlic, lemon juice", price: 8.75, allergens: ["sesame"], diets: ["vegan"] },
        { name: "Tabbouleh Salad", description: "Chopped parsley, tomatoes, onions, bulgur, lemon juice, extra-virgin olive oil", price: 8.25, allergens: ["gluten"], diets: ["vegan"] },
        { name: "Fattoush Salad", description: "Lettuce, tomatoes, radish, cucumber, onions, mint, parsley, sumac, lemon juice, extra-virgin olive oil, crispy bread", price: 8.75, allergens: ["gluten"], diets: ["vegan"] },
        { name: "Zufa Salad", description: "Chopped curly kale, tomatoes, cucumber, onions, pomegranate seeds, walnuts, pomegranate molasses, extra-virgin olive oil", price: 8.25, allergens: ["nuts"], diets: ["vegan"] },
        { name: "Spicy Lebanese Salad", description: "Lettuce, tomatoes, cucumber, onions, green chillies, olives, mint, lemon juice, olive oil", price: 8.25, diets: ["vegan", "spicy"] },
        { name: "Muhammara", description: "Spicy dip with mixed nuts, red peppers, pomegranate molasses", price: 9.5, allergens: ["nuts", "peanuts"], diets: ["vegan", "spicy"] },
        { name: "Tzatziki", description: "Lebanese yoghurt, garlic, cucumber, dry mint", price: 7.25, allergens: ["dairy"], diets: ["vegetarian"] },
        { name: "Warak Enab", description: "Vine leaves stuffed with rice, tomatoes, onions, parsley", price: 7.75, diets: ["vegan"] },
        { name: "Mixed Olives", price: 5.5, diets: ["vegan"] },
        { name: "Mixed Pickles", description: "Olives, turnip, cucumber, chillies", price: 5.0, diets: ["vegan"] },
        { name: "Chilli Pickles", price: 4.0, diets: ["vegan", "spicy"] },
      ],
    },
    {
      id: "hot-mezze-vegetarian",
      title: "Hot Mezze — Vegetarian",
      description:
        "Your Zufa experience is not complete without our hot mezze, served sizzling in handmade clay pans so you can enjoy them warm until the end of your meal.",
      items: [
        { name: "Falafel", description: "Chickpea and broad-bean croquettes, garlic, herbs", price: 8.5, allergens: ["sesame", "celery"], diets: ["vegan"] },
        { name: "Foul Mudamas", description: "Fava beans, lemon juice, garlic, olive oil", price: 8.25, diets: ["vegan"] },
        { name: "Cheese Rikakat", description: "Rolled filo pastry, feta cheese, fresh herbs", price: 8.25, allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
        { name: "Arnabeet", description: "Fried cauliflower florets, lemon juice, tahini", price: 8.0, allergens: ["sesame"], diets: ["vegan"] },
        { name: "Fatayer", description: "Pastry parcels stuffed with spinach, onions, sumac, pine nuts", price: 8.25, allergens: ["gluten", "nuts"], diets: ["vegan"] },
        { name: "Musakaat Bel Zeit", description: "Baked aubergines, tomatoes, chickpeas, onions", price: 8.75, diets: ["vegan"] },
        { name: "Bamieh Bel Zeit", description: "Baby okra, tomatoes, onions, garlic, fresh coriander", price: 8.0, diets: ["vegan"] },
        { name: "Halloumi", description: "Grilled halloumi cheese, sesame seeds", price: 8.75, allergens: ["dairy", "sesame"], diets: ["vegetarian"] },
        { name: "Zufa Halloumi", description: "Grilled halloumi, pesto, sun-dried tomatoes", price: 10.75, allergens: ["dairy", "peanuts"], diets: ["vegetarian"] },
        { name: "Chilli Halloumi", description: "Halloumi cubes, garlic, pepper, fresh chilli, spring onions", price: 11.25, allergens: ["dairy"], diets: ["vegetarian", "spicy"] },
        { name: "Spicy Potatoes", description: "Sautéed diced potatoes, fresh coriander, pepper, onions", price: 8.0, diets: ["vegan", "spicy"] },
        { name: "Phoenician Potatoes", description: "Diced potatoes, garlic, fresh coriander", price: 7.0, diets: ["vegan"] },
      ],
    },
    {
      id: "hot-mezze",
      title: "Hot Mezze — Meat & Seafood",
      items: [
        { name: "Hommos Awarma", description: "Hommos, diced lamb, pine nuts", price: 11.75, allergens: ["sesame", "nuts"] },
        { name: "Hommos Shawarma", description: "Hommos with roasted lamb, chicken or mixed shawarma", price: 10.0, allergens: ["sesame"] },
        { name: "Jawaneh", description: "Chargrilled chicken wings, garlic sauce", price: 7.5 },
        { name: "Jawaneh Bil Kizbara", description: "Chargrilled chicken wings, fresh coriander, garlic, lemon juice", price: 10.75 },
        { name: "Kebbeh", description: "Bulgur shell stuffed with minced lamb, onions, pine nuts", price: 9.5, allergens: ["gluten", "nuts"] },
        { name: "Sambousek Lamb", description: "Pastry stuffed with minced lamb, onions, pine nuts", price: 9.5, allergens: ["gluten", "nuts"] },
        { name: "Arayes", description: "Chargrilled Lebanese bread filled with minced lamb and pine nuts", price: 10.0, allergens: ["gluten", "sesame", "nuts"] },
        { name: "Sawdat Dajaj", description: "Sautéed chicken liver, lemon juice, garlic", price: 8.5 },
        { name: "Sojok", description: "Pan-fried spicy lamb sausages, tomatoes, lemon juice", price: 10.5, diets: ["spicy"] },
        { name: "Kraydes Bil Kizbara", description: "Sautéed prawns, fresh coriander, garlic, lemon juice", price: 11.75, allergens: ["crustaceans"] },
        { name: "Samke Harra", description: "Baked fish, spicy tomato sauce, garlic, onions, fresh coriander", price: 9.5, allergens: ["fish"], diets: ["spicy"] },
        { name: "Calamari", description: "Fried pineapple-cut squid", price: 9.5, allergens: ["crustaceans", "gluten"] },
      ],
    },
    {
      id: "grill",
      title: "From the Charcoal Grill",
      description: "Served with a side dish of your choice. Ask if you would like your grill spicy.",
      items: [
        { name: "Farrouj Meshwi", description: "Marinated free-range boneless baby chicken", price: 20.25 },
        { name: "Shish Taouk", description: "Marinated tender chicken cubes (2 skewers)", price: 18.5 },
        { name: "Lahm Meshwi", description: "Marinated lamb cubes (2 skewers)", price: 20.25 },
        { name: "Kafta Meshwi", description: "Seasoned minced lamb, parsley, onions (2 skewers)", price: 19.5 },
        { name: "Kafta Khashkhash", description: "Kafta meshwi topped with spicy onion, pepper and tomato sauce, pine nuts", price: 21.0, allergens: ["nuts"], diets: ["spicy"] },
        { name: "Castaletta", description: "Marinated lamb cutlets", price: 23.75 },
        { name: "Mixed Grill", description: "Chargrilled selection of 3 skewers: lahm meshwi, shish taouk and kafta", price: 23.75 },
        { name: "Zufa Mixed Grill for Two", description: "Lamb cutlets, chicken shawarma, lamb shawarma, kafta and jawaneh, served with two sides", price: 39.75, priceNote: "for 2 people" },
      ],
    },
    {
      id: "house-specials",
      title: "House Specials",
      items: [
        { name: "Zufa Lamb Shank", description: "Braised and slowly cooked with the chef’s special spices, served with lamb rice or steamed vegetables", price: 23.75, allergens: ["nuts"] },
        { name: "Duck Shawarma Wrap", description: "Duck magret, fig jam, spring onion, pickles, garlic sauce, served with french fries", price: 18.75, allergens: ["gluten"] },
        { name: "Bamieh Lamb Rice", description: "Baby okra and lamb stew served with vermicelli rice", price: 19.5, allergens: ["gluten"] },
        {
          name: "Chef’s Special",
          description: "Sliced lamb or chicken enriched in a spicy tomato, pepper and onion sauce, served with rice",
          price: [
            { label: "Chicken", price: 18.25 },
            { label: "Mixed", price: 20.0 },
            { label: "Lamb", price: 20.25 },
          ],
          diets: ["spicy"],
        },
        {
          name: "Shawarma Wrap",
          description: "Tomatoes, pickles, garlic sauce, served with chips",
          price: [
            { label: "Chicken", price: 16.25 },
            { label: "Mixed", price: 17.75 },
            { label: "Lamb", price: 18.0 },
          ],
          allergens: ["gluten"],
        },
      ],
    },
    {
      id: "vegetarian-mains",
      title: "Vegetarian Mains",
      items: [
        { name: "Vegetarian Mixed Grill", description: "Potatoes, mushrooms, red pepper, courgette, aubergine, shallots, chilli, pomegranate sauce. Add halloumi for £4.00", price: 16.75, diets: ["vegan"] },
        { name: "Musakaat Rice", description: "Baked aubergine, tomato sauce, onions, chickpeas, served with vermicelli rice", price: 17.5, allergens: ["gluten"], diets: ["vegan"] },
        { name: "Bamieh Rice", description: "Simmered baby okra, tomato sauce, onions, garlic, fresh coriander, served with vermicelli rice", price: 17.5, allergens: ["gluten"], diets: ["vegan"] },
        { name: "Falafel Wrap", description: "Tomatoes, pickles, tahini sauce, served with chips. Add halloumi for £4.00", price: 14.0, allergens: ["gluten", "sesame"], diets: ["vegan"] },
        { name: "Halloumi Wrap", description: "Tomatoes, cucumber, thyme, served with chips", price: 15.5, allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
      ],
    },
    {
      id: "seafood",
      title: "Seafood",
      description: "Served with your choice of steamed vegetables or rice.",
      items: [
        { name: "King Prawns", description: "Grilled jumbo prawns with coriander sauce", price: 29.0, allergens: ["crustaceans"] },
        { name: "Sea Bass", description: "Baked sea bass fillet with tahini sauce", price: 20.75, allergens: ["fish", "sesame"] },
        { name: "Salmon", description: "Baked salmon fillet with special spicy sauce", price: 22.75, allergens: ["fish"], diets: ["spicy"] },
        { name: "Cod", description: "Baked cod fillet with special spicy sauce", price: 19.75, allergens: ["fish"], diets: ["spicy"] },
      ],
    },
    {
      id: "sides",
      title: "Side Dishes",
      items: [
        { name: "Vermicelli Rice", price: 5.0, allergens: ["gluten"], diets: ["vegan"] },
        { name: "Plain Rice", price: 4.5, allergens: ["dairy"], diets: ["vegetarian"] },
        { name: "Lamb Rice", price: 6.5, allergens: ["nuts"] },
        { name: "French Fries", price: 4.5, diets: ["vegan"] },
        { name: "Sweet Potato Fries", price: 6.25, diets: ["vegan"] },
        { name: "Steamed Vegetables", price: 4.5, diets: ["vegan"] },
        { name: "Side Salad", price: 4.0, diets: ["vegan"] },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Set menus & sharing platters                                        */
/* ------------------------------------------------------------------ */

export const setMenus: Menu = {
  slug: "set-menus",
  title: "Set Menus & Sharing Platters",
  shortTitle: "Set Menus",
  summary:
    "Group and tasting set menus (minimum two people) plus vegetarian and Levantine sharing feasts for two — the easiest way to eat the Lebanese way.",
  intro:
    "Lebanese food is made for sharing. Our set menus take the decisions away and bring the whole table a generous spread of mezze followed by chargrilled mains. Ideal for groups, celebrations and first-time visitors.",
  image: "/images/sharing-table.jpg",
  imageAlt: "A round table laden with Lebanese sharing dishes and cocktails at Zufa Hatch End",
  pdf: "/menus/zufa-set-menus.pdf",
  sections: [
    {
      id: "set-menus",
      title: "Set Menus",
      description: "Minimum two people. Priced per person.",
      items: [
        {
          name: "Group Menu",
          description:
            "Starters: hommos, moutabbal, tabbouleh, cheese rikakat, jawaneh, samke harra. Main course: shish taouk, kafta meshwi, mixed shawarma, chips and salad.",
          price: 36.75,
          priceNote: "per person",
        },
        {
          name: "Tasting Menu",
          description:
            "Starters: hommos, moutabbal, tabbouleh, warak enab, sojok, cheese rikakat, kebbeh, falafel. Then a main course of your choice plus any side (add £4 for a seafood main).",
          price: 46.75,
          priceNote: "per person",
        },
      ],
    },
    {
      id: "sharing-platters",
      title: "Sharing Platters for Two",
      items: [
        {
          name: "Vegetarian Feast for Two",
          description: "Hommos, moutabbal, fattoush, bamieh, falafel, fatayer, spicy potatoes, halloumi, cheese rikakat",
          price: 49.75,
          diets: ["vegetarian"],
        },
        {
          name: "Levantine Feast for Two",
          description: "Hommos, tzatziki, tabbouleh, Phoenician potatoes, lamb sambousek, calamari, chilli halloumi, shish taouk, kafta meshwi",
          price: 59.75,
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Lunch                                                               */
/* ------------------------------------------------------------------ */

export const lunchMenu: Menu = {
  slug: "lunch",
  title: "Lunch Menu",
  shortTitle: "Lunch",
  summary:
    "Weekday lunch in Hatch End: a two-course Lebanese lunch for £15.45, wraps with fries or salad from £9.99, mezze platters for two and a build-your-own salad bar.",
  intro:
    "Our weekday lunch menu is quick, generous and great value — perfect for a working lunch, a catch-up with friends or a lazy afternoon on the patio.",
  availability: "Monday – Friday, 12pm – 4pm",
  image: "/images/dishes-detail.webp",
  imageAlt: "Close-up of Lebanese lunch dishes at Zufa",
  pdf: "/menus/zufa-lunch-menu.pdf",
  sections: [
    {
      id: "two-course",
      title: "Two-Course Lunch",
      description:
        "Choose one starter and one main course for £15.45. Add £4.50 for baklawa and a hot drink.",
      items: [
        { name: "Two-Course Lunch Menu", description: "One starter + one main course from the selection below", price: 15.45, priceNote: "per person" },
        { name: "Starter — Hommos", description: "Purée of chickpeas with sesame sauce and lemon juice", allergens: ["sesame"], diets: ["vegan"] },
        { name: "Starter — Moutabbal", description: "Smoked aubergines, garlic, sesame sauce and lemon juice", allergens: ["sesame"], diets: ["vegan"] },
        { name: "Starter — Fattoush", description: "Lettuce, tomatoes, radish, cucumber, onions, sumac, lemon juice, olive oil", allergens: ["gluten"], diets: ["vegan"] },
        { name: "Starter — Falafel", description: "Bean croquettes made with chickpeas, broad beans and herbs", allergens: ["sesame", "celery"], diets: ["vegan"] },
        { name: "Starter — Kebbeh Lamb", description: "Minced lamb and cracked-wheat shell stuffed with minced lamb, onions and pine kernels", allergens: ["gluten", "nuts"] },
        { name: "Starter — Samke Harra", description: "Baked white fish, spicy tomato sauce, garlic, onions, fresh coriander", allergens: ["fish"], diets: ["spicy"] },
        { name: "Main — Falafel Salad", description: "Falafel, mixed green leaves, tomatoes, cucumber, pickles and sesame sauce", allergens: ["sesame", "celery"], diets: ["vegan"] },
        { name: "Main — Bamieh Rice", description: "Baby okra with tomatoes, onions, garlic and coriander, served with vermicelli rice", allergens: ["gluten"], diets: ["vegan"] },
        { name: "Main — Kafta Meshwi", description: "Chargrilled seasoned minced lamb with parsley and onions, served with fries or salad" },
        { name: "Main — Shish Taouk", description: "Chargrilled marinated tender chicken cubes, served with fries or salad" },
        { name: "Main — Jawaneh", description: "Chargrilled chicken wings, served with fries or salad" },
        { name: "Main — Sea Bass", description: "Baked sea bass fillet with tahini", allergens: ["fish", "sesame"] },
      ],
    },
    {
      id: "lunch-wraps",
      title: "Lunch Wraps",
      description: "All wraps are served with fries or salad.",
      items: [
        { name: "Falafel Wrap", description: "Bean croquettes, lettuce, tahini, tomatoes and pickles", price: 9.99, allergens: ["gluten", "sesame", "celery"], diets: ["vegan"] },
        { name: "Spicy Potatoes Wrap", description: "Sautéed potatoes, tomatoes, coriander, garlic and pickles", price: 9.99, allergens: ["gluten"], diets: ["vegan", "spicy"] },
        { name: "Halloumi Wrap", description: "Grilled halloumi, pesto, sun-dried tomatoes", price: 10.99, allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
        { name: "Shish Taouk Wrap", description: "Chargrilled chicken cubes, lettuce, tomatoes, garlic and pickles", price: 10.99, allergens: ["gluten"] },
        { name: "Chicken Shawarma Wrap", description: "Roasted slices of chicken, lettuce, garlic, tomatoes and pickles", price: 10.99, allergens: ["gluten"] },
        { name: "Kafta Meshwi Wrap", description: "Chargrilled minced lamb, lettuce, tomatoes, tahini and pickles", price: 11.49, allergens: ["gluten", "sesame"] },
        { name: "Mixed Shawarma Wrap", description: "Roasted chicken and lamb, lettuce, garlic, tomatoes and pickles", price: 11.49, allergens: ["gluten"] },
        { name: "Lamb Shawarma Wrap", description: "Roasted thin slices of lamb, lettuce, tahini, tomatoes and pickles", price: 11.99, allergens: ["gluten", "sesame"] },
      ],
    },
    {
      id: "lunch-platters",
      title: "Platters for Two",
      items: [
        { name: "Vegetarian Mezze Platter", description: "Hommos, moutabbal, tzatziki, falafel, fatayer, halloumi", price: 24.95, diets: ["vegetarian"] },
        { name: "Mixed Mezze Platter", description: "Hommos, moutabbal, tzatziki, kebbeh, lamb sambousek, grilled halloumi", price: 28.95 },
      ],
    },
    {
      id: "salad-bar",
      title: "Salad Bar",
      description:
        "Make your own salad — choose any five ingredients: cherry tomatoes, avocado, cucumber, rocket, mixed lettuce leaves, mint, red onions, pomegranate seeds, parsley. Dressings: pomegranate molasses, lemon juice, extra-virgin olive oil.",
      items: [
        { name: "Build-Your-Own Salad", description: "Any five ingredients with your choice of dressing", price: 8.5, diets: ["vegan"] },
        {
          name: "Extra Toppings",
          price: [
            { label: "Feta cheese", price: 3.0 },
            { label: "Falafel", price: 4.0 },
            { label: "Mixed seeds & nuts", price: 4.0 },
            { label: "Halloumi", price: 4.5 },
            { label: "Grilled chicken", price: 5.5 },
            { label: "Grilled prawns", price: 8.0 },
          ],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Kids                                                                */
/* ------------------------------------------------------------------ */

export const kidsMenu: Menu = {
  slug: "kids",
  title: "Kids Menu",
  shortTitle: "Kids",
  summary: "A simple, child-friendly Lebanese menu — cheese pizza, chicken wings, shish taouk and kafta, each served with chips, rice or salad.",
  intro:
    "Zufa is a family restaurant at heart. Our kids menu keeps things simple and fresh, with every dish served with a choice of chips, rice or salad.",
  image: "/images/feast-table.jpg",
  imageAlt: "Family-style Lebanese dishes on a table at Zufa",
  pdf: "/menus/zufa-kids-menu.pdf",
  sections: [
    {
      id: "kids",
      title: "For Little Ones",
      description: "Each dish is served with chips, rice or salad.",
      items: [
        { name: "Cheese Pizza", price: 8.5, allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
        { name: "Chicken Wings", price: 8.5 },
        { name: "Shish Taouk", description: "Marinated chicken cubes", price: 9.5 },
        { name: "Kafta Meshwi", description: "Seasoned minced lamb", price: 9.5 },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Desserts & hot drinks                                               */
/* ------------------------------------------------------------------ */

export const dessertMenu: Menu = {
  slug: "desserts",
  title: "Dessert Menu",
  shortTitle: "Desserts",
  summary:
    "Traditional Lebanese sweets — baklawa, knefeh, osmaliyeh and atayef — alongside puddings, a gluten-free honey cake, Lebanese coffee and floral teas.",
  intro:
    "Lebanese desserts are traditionally flavoured with rose water, orange blossom and sugar syrup. Finish your meal the Lebanese way with a plate of sweets and a strong Lebanese coffee.",
  image: "/images/warak-enab.jpg",
  imageAlt: "A plated dish finished with pomegranate seeds and edible flowers at Zufa",
  sections: [
    {
      id: "desserts",
      title: "Desserts",
      description: "Please ask your server for today’s selection and prices.",
      items: [
        { name: "Baklawa", description: "Layers of flaky pastry filled with nuts, honey and spices — a Middle Eastern delight", allergens: ["gluten", "nuts"], diets: ["vegetarian"] },
        { name: "Chocolate Baklawa", description: "Indulgent layers of flaky pastry and rich chocolate", allergens: ["gluten", "nuts", "dairy"], diets: ["vegetarian"] },
        { name: "Osmaliyeh", description: "Crispy phyllo in fragrant syrup, filled with cream and topped with nuts", allergens: ["gluten", "dairy", "nuts"], diets: ["vegetarian"] },
        { name: "Atayef", description: "Middle Eastern pancakes filled with cream or nuts, sweetened to perfection", allergens: ["gluten", "dairy", "nuts"], diets: ["vegetarian"] },
        { name: "Knefeh", description: "Sweet semolina, cheese and syrup — served deliciously warm", allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
        { name: "Chocolate Pudding", description: "Rich and velvety, with Belgian chocolate sauce and vanilla ice cream (vegan option available)", allergens: ["dairy"], diets: ["vegetarian"] },
        { name: "Honey-Cinnamon Pudding", description: "A delightful blend of honey and cinnamon-infused creamy pudding — warm and comforting", allergens: ["dairy"], diets: ["vegetarian"] },
        { name: "Gluten-Free Honey Cake", description: "Moist, sweet and perfectly indulgent", allergens: ["dairy", "eggs"], diets: ["vegetarian"] },
        { name: "Vanilla & Chocolate Ice Cream", allergens: ["dairy"], diets: ["vegetarian"] },
      ],
    },
    {
      id: "coffee",
      title: "Coffee",
      items: [
        { name: "Lebanese Coffee", description: "Finely ground, cardamom-scented and served the traditional way", price: 3.5 },
        { name: "Espresso", price: 2.25 },
        { name: "Double Espresso", price: 2.75 },
        { name: "Macchiato", price: 2.5 },
        { name: "Double Macchiato", price: 3.25 },
        { name: "Americano", price: 2.5 },
        { name: "Flat White", price: 3.0 },
        { name: "Cappuccino", price: 3.5 },
        { name: "Latte", price: 3.5 },
        { name: "Mocha", price: 3.5 },
        { name: "Hot Chocolate", price: 3.0 },
        { name: "Irish Coffee", description: "With whiskey", price: 8.25 },
        { name: "French Coffee", description: "With brandy", price: 8.25 },
        { name: "Bailey’s Coffee", price: 8.25 },
      ],
    },
    {
      id: "tea",
      title: "Tea & Infusions",
      items: [
        { name: "Tea & Infusions", description: "Fresh mint, camomile, jasmine, green, Earl Grey, black, lemon, peppermint or orange blossom", price: 3.0 },
        {
          name: "Flora Tea",
          description:
            "Hand-tied first-pick green tea tips with dried aromatic flowers that bloom into a flower display when steeped. Please ask your server for availability.",
          price: 5.25,
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Drinks                                                              */
/* ------------------------------------------------------------------ */

export const drinksMenu: Menu = {
  slug: "drinks",
  title: "Drinks Menu",
  shortTitle: "Drinks",
  summary:
    "Lebanese wines from Château Ksara, Château Musar and Château Belle-Vue, signature and classic cocktails, mocktails, arak, Almaza beer, spirits and soft drinks.",
  intro:
    "Lebanon has a wine history stretching back to biblical times — the Phoenicians were exporting wine five thousand years ago. Our list celebrates the Bekaa Valley alongside carefully chosen bottles from around the world, and our bar mixes Lebanese flavours into signature cocktails and mocktails.",
  image: "/images/dinner-for-two.jpg",
  imageAlt: "Red and white wine with grilled dishes on a table at Zufa",
  sections: [
    {
      id: "signature-cocktails",
      title: "Zufa Signature Cocktails",
      description: "All signature cocktails £11.95. Two-for-one on cocktails Monday to Friday, 12pm – 7pm.",
      items: [
        { name: "Zaatarita", description: "Patrón Silver, zaatar-infused syrup, lime, grapefruit juice", price: 11.95 },
        { name: "Mangorita", description: "Patrón Silver, Cointreau, lime, mango purée, mango juice", price: 11.95 },
        { name: "PoMojito", description: "Bacardi Blanca, Diplomático, pomegranate purée, mint, pomegranate seeds, lime, Fever-Tree soda", price: 11.95 },
        { name: "Pinky Promise", description: "Lanique Rose, Malibu, coconut purée, lime, rose syrup", price: 11.95 },
        { name: "Love Potion", description: "Pink gin, Chambord, strawberry purée, lychee juice, lime juice", price: 11.95 },
        { name: "Rapaska", description: "Grey Goose, Passoã, raspberry purée, lemon juice, apple juice", price: 11.95 },
        { name: "Beirut Cooler", description: "Grey Goose peach & rosemary, Malibu, peach schnapps, Midori, orange, cranberry juice", price: 11.95 },
        { name: "The Punch", description: "Amaretto, Southern Comfort, red wine, fresh fruits, lemonade", price: 11.95 },
        { name: "Mint Collins", description: "Bombay Sapphire, elderflower cordial, mint, lime, Fever-Tree soda", price: 11.95 },
        { name: "Sexy Honey", description: "Grey Goose Lemon, peach schnapps, peach purée, lychee juice, lemon juice, honey", price: 11.95 },
        { name: "Beirut to London", description: "Bulleit Bourbon, Ksarak, fresh mint, Fever-Tree ginger ale, simple syrup", price: 11.95 },
      ],
    },
    {
      id: "classic-cocktails",
      title: "Classic Cocktails",
      description: "All classic cocktails £11.50.",
      items: [
        { name: "Cosmopolitan", description: "Grey Goose Citron, Cointreau, lime, cranberry juice", price: 11.5 },
        { name: "Daiquiri", description: "Bacardi Blanca, sugar, lime juice — classic or with fruits of your choice", price: 11.5 },
        { name: "Bellini", description: "Peach, strawberry or raspberry purée topped with prosecco", price: 11.5 },
        { name: "Pornstar Martini", description: "Grey Goose, Passoã, lime, passion fruit purée, prosecco shot", price: 11.5 },
        { name: "Lychee Martini", description: "Grey Goose, Briottet lychee, Martini Dry, lime juice, lychee juice", price: 11.5 },
        { name: "Piña Colada", description: "Bacardi Coconut, Malibu, coconut cream, pineapple juice", price: 11.5 },
        { name: "Espresso Martini", description: "Grey Goose, Kahlúa, espresso crema", price: 11.5 },
        { name: "Aperol Spritz", description: "Aperol, Prosecco DOC, Fever-Tree soda", price: 11.5 },
      ],
    },
    {
      id: "mocktails",
      title: "Mocktails",
      description: "All mocktails £7.75.",
      items: [
        { name: "LimoNana", description: "The Lebanese lemonade — fresh lemon juice, fresh mint, simple syrup", price: 7.75 },
        { name: "Lebanese Spice", description: "Cranberry juice, guava juice, mango juice, Fever-Tree soda", price: 7.75 },
        { name: "Ginger Buzz", description: "Fever-Tree ginger beer, pineapple juice, lime, mint", price: 7.75 },
        { name: "Mock Champagne", description: "Lychee juice, lemon juice, grenadine syrup, Fever-Tree soda", price: 7.75 },
        { name: "Oriental Night", description: "Date syrup, Fever-Tree lemonade, pine nuts", price: 7.75, allergens: ["nuts"] },
        { name: "Virgin Mojito", description: "Classic, strawberry, raspberry, passion fruit, peach or mango", price: 7.75 },
        { name: "Berries Collins", description: "Fresh berries, lemon juice, guava juice", price: 7.75 },
        { name: "Elderflower Fizz", description: "Bottlegreen cordial, lime juice, fresh mint, Fever-Tree elderflower tonic, grenadine", price: 7.75 },
      ],
    },
    {
      id: "lebanese-wines",
      title: "Lebanese Wines",
      description:
        "Château Ksara is Lebanon’s oldest working winery, founded by Jesuit monks in 1857 in the heart of the Bekaa Valley. No pesticides or herbicides are used on its vineyards.",
      items: [
        { name: "Sunset Rosé, Château Ksara", description: "Bekaa Valley. Intense red berries followed by peppery, spicy notes with a crisp finish. Vegan.", price: [{ label: "175ml", price: 8.75 }, { label: "250ml", price: 11.75 }, { label: "Bottle", price: 32.75 }] },
        { name: "Blanc de Blancs, Château Ksara", description: "Bekaa Valley. Fresh and elegant honeysuckle with ripe stone fruit and a hint of oak smoke. Vegan.", price: [{ label: "175ml", price: 10.0 }, { label: "250ml", price: 12.75 }, { label: "Bottle", price: 34.0 }] },
        { name: "Merwah, Château Ksara", description: "Bekaa Valley. Intense citrus with tropical notes and delicate white flowers. Vegan.", price: 37.0, priceNote: "bottle" },
        { name: "Petit Geste, Château Belle-Vue", description: "Bhamdoun. Elegant, fresh, fruity and incredibly silky.", price: 89.0, priceNote: "bottle" },
        { name: "Le Prieuré Rouge, Château Ksara", description: "Bekaa Valley. Dark fruits in a mellow, well-rounded red with warming spice and liquorice. Vegan.", price: [{ label: "175ml", price: 9.75 }, { label: "250ml", price: 11.75 }, { label: "Bottle", price: 32.0 }] },
        { name: "Réserve du Couvent Rouge, Château Ksara", description: "Bekaa Valley. Black cherry, black pepper and vanilla with plush, mouth-filling tannins. Vegan.", price: 37.0, priceNote: "bottle" },
        { name: "Château Ksara Rouge", description: "Bekaa Valley. Bold raspberry and blackcurrant giving way to leathery, spicy notes. Vegan.", price: 59.0, priceNote: "bottle" },
        { name: "La Renaissance, Château Belle-Vue", description: "Bhamdoun. Mushroom and mint underscore ripe plum, currant and chocolate.", price: 69.0, priceNote: "bottle" },
        { name: "Chateau Khoury Symphonie", description: "A powerful Bordeaux blend — spicy cedar, leather and blackberries with lasting berry, cacao and coffee.", price: 85.0, priceNote: "bottle" },
        { name: "Château Musar Red", description: "Bekaa Valley. Cabernet Sauvignon, Cinsault and Carignan — fragrant, aromatic, smooth and well balanced.", price: 92.0, priceNote: "bottle" },
        { name: "Le Château, Château Belle-Vue", description: "Bhamdoun. Coffee and black cherry with winning intensity.", price: 119.0, priceNote: "bottle" },
      ],
    },
    {
      id: "sparkling",
      title: "Sparkling & Champagne",
      items: [
        { name: "Cá del Console Prosecco Extra Dry", description: "Veneto, Italy. White peach, pear and flowers; fresh and clean. Vegan.", price: [{ label: "125ml", price: 7.75 }, { label: "Bottle", price: 28.0 }] },
        { name: "Cá del Console Prosecco Rosé", description: "Veneto, Italy. Summer berries, wild strawberry and stone fruit.", price: [{ label: "125ml", price: 8.5 }, { label: "Bottle", price: 29.75 }] },
        { name: "Champagne V. Testulat Carte d’Or Brut Blanc de Noirs", description: "Rich and fruity with vanilla and peach.", price: 50.0, priceNote: "bottle" },
        { name: "Laurent-Perrier La Cuvée", description: "Crisp lemony freshness with green apple. Vegan.", price: 69.75, priceNote: "bottle" },
        { name: "Veuve Clicquot Yellow Label Brut", description: "Toasty, bready and fruity.", price: 75.0, priceNote: "bottle" },
        { name: "Laurent-Perrier Rosé", description: "Light, elegant red fruits with a delicate mousse. Vegan.", price: 115.0, priceNote: "bottle" },
      ],
    },
    {
      id: "white-wine",
      title: "White Wine",
      items: [
        { name: "Mancura Etnia Sauvignon Blanc", description: "Valle Central, Chile. Tropical fruit and white flowers with a refreshing finish. Vegan.", price: [{ label: "175ml", price: 7.75 }, { label: "250ml", price: 9.0 }, { label: "Bottle", price: 24.5 }] },
        { name: "Montalto Organic Pinot Grigio", description: "Sicily, Italy. Pear, green apple and white peach; crisp and citrussy. Vegan.", price: [{ label: "175ml", price: 7.75 }, { label: "250ml", price: 10.25 }, { label: "Bottle", price: 29.0 }] },
        { name: "Kleinkloof Chenin Blanc", description: "Coastal Region, South Africa. Pineapple, guava and citrus. Vegan.", price: 24.0, priceNote: "bottle" },
        { name: "First Fleet Chardonnay", description: "South-Eastern Australia. Crisp and modern.", price: 28.0, priceNote: "bottle" },
        { name: "Gavi di Gavi La Contessa", description: "Piedmont, Italy. Greengage and almond; fresh and dry. Vegan.", price: 33.75, priceNote: "bottle" },
        { name: "Marlborough Sauvignon Blanc, Babich", description: "New Zealand. Gooseberry, grapefruit and lemon with herbaceous, mineral notes.", price: 38.0, priceNote: "bottle" },
        { name: "Sancerre, Domaine Cherrier", description: "Loire, France. Fresh citrus with melon and stone fruit.", price: 46.0, priceNote: "bottle" },
      ],
    },
    {
      id: "rose-wine",
      title: "Rosé Wine",
      items: [
        { name: "Poggio Alto Pinot Grigio Rosé", description: "Veneto, Italy. Delicate pale pink with acacia flowers.", price: [{ label: "175ml", price: 7.25 }, { label: "250ml", price: 9.0 }, { label: "Bottle", price: 26.0 }] },
        { name: "Whispering Angel, Côtes de Provence Rosé", description: "Provence, France. Pale, dry and smooth with stone fruit and a mineral finish.", price: 59.75, priceNote: "bottle" },
      ],
    },
    {
      id: "red-wine",
      title: "Red Wine",
      items: [
        { name: "Poco Mas Merlot", description: "Valle Central, Chile. Smooth, juicy berry fruit, slightly spicy.", price: [{ label: "175ml", price: 7.25 }, { label: "250ml", price: 9.0 }, { label: "Bottle", price: 26.0 }] },
        { name: "Punta de Vacas Malbec, Norton", description: "Mendoza, Argentina. Floral violets and a rich, juicy palate. Vegan.", price: [{ label: "175ml", price: 9.0 }, { label: "250ml", price: 11.0 }, { label: "Bottle", price: 31.0 }] },
        { name: "Villa Rossi Sangiovese, Rubicone", description: "Emilia-Romagna, Italy. Smooth and easy-drinking red fruits.", price: 23.0, priceNote: "bottle" },
        { name: "Angelo Montepulciano d’Abruzzo", description: "Abruzzo, Italy. Super-juicy black cherry, smooth and round.", price: 27.0, priceNote: "bottle" },
        { name: "Promesa Rioja Crianza", description: "Rioja, Spain. Strawberry, blackberry and rhubarb with vanilla and cocoa. Vegan.", price: 32.0, priceNote: "bottle" },
        { name: "La La Land Pinot Noir", description: "Victoria, Australia. Fresh cherry with a hint of rosemary.", price: 35.0, priceNote: "bottle" },
        { name: "Pèppoli Chianti Classico, Antinori", description: "Tuscany, Italy. Intense red fruit with vanilla and chocolate.", price: 43.0, priceNote: "bottle" },
        { name: "Château Montaiguillon, Montagne-Saint-Émilion", description: "Bordeaux, France. Roasted plum, dried herbs and fresh earth. Vegan.", price: 48.0, priceNote: "bottle" },
        { name: "Châteauneuf-du-Pape Le Parvis, Ferraton", description: "Rhône, France. Sour cherry, plum, roasted coffee and leather. Vegan.", price: 79.0, priceNote: "bottle" },
      ],
    },
    {
      id: "arak",
      title: "Arak",
      description: "Arak is the traditional Lebanese spirit distilled from grapes and flavoured with anise — served with water and ice alongside mezze.",
      items: [
        { name: "Ksarak", price: [{ label: "Glass", price: 4.25 }, { label: "¼ bottle", price: 22.0 }, { label: "½ bottle", price: 38.0 }, { label: "Bottle", price: 56.0 }] },
        { name: "Massaya", price: [{ label: "Glass", price: 4.75 }, { label: "¼ bottle", price: 28.0 }, { label: "½ bottle", price: 41.0 }, { label: "Bottle", price: 64.0 }] },
      ],
    },
    {
      id: "beer",
      title: "Beer",
      items: [
        { name: "Almaza (Lebanon) 4.2%", price: 4.5 },
        { name: "Cobra 4.5%", price: [{ label: "Half pint", price: 4.0 }, { label: "Pint", price: 6.0 }] },
        { name: "Beck’s 0%", price: 4.0 },
      ],
    },
    {
      id: "spirits",
      title: "Spirits (50ml)",
      items: [
        { name: "Whisky — Bourbon", price: [{ label: "Jack Daniel’s", price: 6.75 }, { label: "Woodford Reserve", price: 7.5 }, { label: "Bulleit", price: 8.0 }] },
        { name: "Whisky — Blended Scotch", price: [{ label: "Johnnie Walker Red", price: 6.75 }, { label: "Johnnie Walker Black", price: 8.5 }, { label: "Chivas Regal 12", price: 8.5 }, { label: "Monkey Shoulder", price: 8.5 }, { label: "Chivas Regal 18", price: 12.0 }, { label: "Johnnie Walker Blue", price: 25.0 }] },
        { name: "Whisky — Single Malt", price: [{ label: "Laphroaig", price: 7.25 }, { label: "Glenlivet Reserve", price: 8.5 }, { label: "Glenfiddich 12", price: 9.0 }, { label: "Auchentoshan 12", price: 9.5 }, { label: "Bowmore 12", price: 9.75 }, { label: "Glenmorangie", price: 10.25 }, { label: "Macallan 12", price: 14.0 }, { label: "Oban 14", price: 14.75 }] },
        { name: "Whisky — Irish & Japanese", price: [{ label: "Jameson", price: 6.75 }, { label: "Nikka from the Barrel", price: 9.5 }, { label: "Green Spot", price: 10.0 }, { label: "Redbreast", price: 10.5 }, { label: "Yamazaki 12", price: 16.5 }] },
        { name: "Vodka", description: "Grey Goose flavours: Citron, Strawberry & Lemongrass, Watermelon & Basil, Peach & Rosemary", price: [{ label: "Smirnoff Black / Vanilla", price: 6.75 }, { label: "Grey Goose", price: 8.5 }, { label: "Belvedere", price: 8.5 }, { label: "Beluga", price: 9.5 }, { label: "Snow Queen", price: 10.5 }] },
        { name: "Gin", price: [{ label: "Bombay Sapphire / Bramble", price: 6.75 }, { label: "Gordon’s Pink", price: 6.75 }, { label: "Bombay Premier Cru", price: 7.5 }, { label: "Tanqueray Sevilla", price: 7.5 }, { label: "Monkey 47", price: 7.5 }, { label: "Gin Mare", price: 7.5 }, { label: "Slingsby Rhubarb", price: 7.5 }, { label: "Hendrick’s", price: 7.75 }, { label: "Roku", price: 9.5 }, { label: "Tanqueray No. Ten", price: 10.75 }] },
        { name: "Rum", price: [{ label: "Bacardi White / Carta Negra / Coconut / Spiced", price: 6.75 }, { label: "Havana Club Añejo", price: 7.25 }, { label: "Diplomático", price: 9.0 }] },
        { name: "Tequila", price: [{ label: "Tequila Rose", price: 4.75 }, { label: "Jose Cuervo Reposado / Blanco", price: 5.75 }, { label: "Cascabel Honey", price: 6.75 }, { label: "Patrón Silver", price: 8.5 }, { label: "Patrón XO Café", price: 12.0 }] },
        { name: "Cognac", price: [{ label: "Martell VS", price: 6.75 }, { label: "Rémy Martin VSOP", price: 7.25 }, { label: "Hennessy VS", price: 7.5 }, { label: "Rémy Martin XO", price: 25.0 }] },
        { name: "Port", price: [{ label: "Taylor’s", price: 6.75 }, { label: "Taylor’s 10 Year Vintage", price: 8.5 }] },
        { name: "Shots", price: [{ label: "B52", price: 6.0 }, { label: "Brain Damage", price: 6.0 }, { label: "Baby Guinness", price: 6.5 }, { label: "ChocoLoco", price: 6.5 }, { label: "Jäger Bomb", price: 6.5 }] },
      ],
    },
    {
      id: "soft-drinks",
      title: "Soft Drinks & Water",
      items: [
        { name: "Coke / Diet Coke / Coke Zero / Fanta", price: 3.0 },
        { name: "Fever-Tree", description: "Lemonade, tonic, slimline tonic, soda, lemon tonic, ginger ale or ginger beer", price: 3.0 },
        { name: "Red Bull", price: 3.5 },
        { name: "Ayran", description: "Traditional yoghurt drink", price: 4.0, allergens: ["dairy"] },
        { name: "Jallab", description: "Traditional date drink", price: 4.0 },
        { name: "Fresh Juices", description: "Orange, apple or carrot", price: 5.5 },
        { name: "Bottled Juice", description: "Orange, apple, cranberry, pineapple, lychee, mango, guava, passion fruit or grapefruit", price: 3.0 },
        { name: "Voss Still / Sparkling Water", price: [{ label: "330ml", price: 3.5 }, { label: "800ml", price: 4.5 }] },
      ],
    },
  ],
};

export const menus: readonly Menu[] = [aLaCarte, setMenus, lunchMenu, kidsMenu, dessertMenu, drinksMenu];

export function getMenu(slug: string): Menu | undefined {
  return menus.find((m) => m.slug === slug);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);
}
