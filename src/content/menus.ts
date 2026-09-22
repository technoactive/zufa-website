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
        { name: "Zaatar", description: "Dry thyme, olive oil, sesame seeds", price: 4.75, allergens: ["sesame"], diets: ["vegan"] },
        { name: "Zaatar Extra", description: "Zaatar, tomatoes, fresh mint", price: 5.5, allergens: ["sesame"], diets: ["vegan"] },
        { name: "Zaatar – Jibneh", description: "Zaatar and mixed cheese", price: 6.5, allergens: ["dairy", "sesame"], diets: ["vegetarian"] },
        { name: "Jibneh", description: "Mixed cheese", price: 5.75, allergens: ["dairy"], diets: ["vegetarian"] },
        { name: "Kafta – Jibneh", description: "Minced lamb, mixed cheese", price: 9.75, allergens: ["dairy"] },
      ],
    },
    {
      id: "soups",
      title: "Soups",
      items: [
        { name: "Lentil Soup", price: 8.25, allergens: ["celery"], diets: ["vegan"] },
        { name: "Chicken Soup", price: 8.75, allergens: ["gluten", "celery"] },
      ],
    },
    {
      id: "cold-mezze",
      title: "Cold Mezze",
      description: "All our cold mezze are vegetarian.",
      items: [
        {
          name: "Hommos",
          description: "Purée of chickpeas, tahini and lemon",
          price: [
            { label: "Classic", price: 8.25 },
            { label: "Zaatar", price: 8.25 },
            { label: "Beiruty", price: 9.75 },
            { label: "Snoubar (pine nuts)", price: 9.75 },
            { label: "Tannoury (roasted red pepper)", price: 9.75 },
            { label: "Muhammara", price: 10.5 },
          ],
          allergens: ["sesame"],
          diets: ["vegan"],
        },
        { name: "Tzatziki", description: "Lebanese yoghurt, garlic, cucumber, dry mint", price: 7.75, allergens: ["dairy"], diets: ["vegetarian"] },
        { name: "Moutabbal (Baba Ghannouj)", description: "Chargrilled aubergines, sesame sauce, garlic, lemon juice", price: 9.95, allergens: ["sesame"], diets: ["vegan"] },
        { name: "Beet & Rocket Crunch", description: "Beetroot, peppery wild rocket, feta, lemon juice, pomegranate molasses, extra-virgin olive oil, walnuts", price: 10.75, allergens: ["dairy", "nuts"], diets: ["vegetarian"] },
        { name: "Fattoush", description: "Lettuce, tomatoes, radish, cucumber, onions, mint, parsley, sumac, lemon juice, extra-virgin olive oil, crispy bread", price: 12.5, allergens: ["gluten"], diets: ["vegan"] },
        { name: "Tabbouleh", description: "Chopped parsley, tomatoes, onions, bulgur, lemon juice, extra-virgin olive oil", price: 10.5, allergens: ["gluten"], diets: ["vegan"] },
        { name: "Rahib", description: "Charcoal-grilled aubergines, cherry tomatoes, garlic, bell pepper, parsley, sumac, lemon juice, extra-virgin olive oil", price: 10.25, diets: ["vegan"] },
        { name: "Muhammara", description: "Spicy dip with mixed nuts and red peppers", price: 9.95, allergens: ["nuts", "peanuts"], diets: ["vegan", "spicy"] },
        { name: "Mixed Olives", price: 6.0, diets: ["vegan"] },
        { name: "Mixed Pickles", price: 5.5, diets: ["vegan"] },
      ],
    },
    {
      id: "hot-mezze-vegetarian",
      title: "Hot Mezze — Vegetarian",
      description:
        "Your Zufa experience is not complete without our hot mezze, served sizzling in handmade clay pans so you can enjoy them warm until the end of your meal.",
      items: [
        { name: "Falafel", description: "Chickpea and broad-bean croquettes, sesame, herbs", price: 9.5, allergens: ["sesame", "celery"], diets: ["vegan"] },
        { name: "Fatayer", description: "Pastry parcels with spinach, onions, sumac, pine nuts", price: 8.75, allergens: ["gluten", "nuts"], diets: ["vegan"] },
        { name: "Arnabeet", description: "Fried cauliflower florets, lemon juice, tahini", price: 8.75, allergens: ["sesame"], diets: ["vegan"] },
        { name: "Cheese Rikakat", description: "Rolled filo pastry, feta cheese, fresh herbs", price: 9.75, allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
        { name: "Halloumi", description: "Grilled halloumi cheese, sesame seeds", price: 9.75, allergens: ["dairy", "sesame"], diets: ["vegetarian"] },
        { name: "Zufa Halloumi", description: "Grilled halloumi, pesto, sun-dried tomatoes", price: 11.25, allergens: ["dairy", "peanuts"], diets: ["vegetarian"] },
        { name: "Chilli Halloumi", description: "Halloumi cubes, garlic, pepper, fresh chilli, spring onions", price: 12.75, allergens: ["dairy"], diets: ["vegetarian", "spicy"] },
        { name: "Bamieh Bel Zeit", description: "Baby okra, tomatoes, onions, garlic, fresh coriander", price: 9.25, diets: ["vegan"] },
        { name: "Foul Mudamas", description: "Fava beans, lemon juice, garlic, olive oil", price: 10.25, diets: ["vegan"] },
        { name: "Spicy Potatoes", description: "Sautéed diced potatoes, fresh coriander, pepper, onions", price: 9.75, diets: ["vegan", "spicy"] },
        { name: "Phoenician Potatoes", description: "Diced potatoes, garlic, fresh coriander", price: 9.75, diets: ["vegan"] },
        { name: "Musakaat Bel Zeit", description: "Baked aubergines, tomatoes, chickpeas, onions", price: 9.75, diets: ["vegan"] },
        { name: "Balila", description: "Chickpeas, cumin, lemon juice, garlic, olive oil", price: 9.25, diets: ["vegan"] },
      ],
    },
    {
      id: "hot-mezze",
      title: "Hot Mezze — Meat & Seafood",
      items: [
        {
          name: "Hommos Shawarma",
          description: "Hommos with roasted shawarma",
          price: [
            { label: "Chicken", price: 11.5 },
            { label: "Mixed", price: 12.5 },
            { label: "Lamb", price: 13.5 },
          ],
          allergens: ["sesame"],
        },
        { name: "Kraydes Bil Kizbara", description: "Sautéed prawns, fresh coriander, garlic, lemon juice", price: 12.75, allergens: ["crustaceans"] },
        { name: "Samke Harra", description: "Baked fish, spicy sauce, garlic, onions, fresh coriander", price: 10.75, allergens: ["fish"], diets: ["spicy"] },
        { name: "Calamari", description: "Fried squid served with tartar sauce", price: 9.5, allergens: ["crustaceans", "gluten", "eggs"] },
        { name: "Chilli Prawns", description: "Sautéed prawns, garlic, pepper, fresh chilli, spring onions", price: 12.75, allergens: ["crustaceans"], diets: ["spicy"] },
        { name: "Kebbeh", description: "Bulgur shell stuffed with minced lamb, onions, pine nuts", price: 9.75, allergens: ["gluten", "nuts"] },
        { name: "Arayes", description: "Charcoal-grilled flatbread with minced lamb, sesame sauce, pine nuts", price: 11.5, allergens: ["gluten", "sesame", "nuts"] },
        { name: "Samboussik Lahme", description: "Pastry stuffed with minced lamb, onions, pine nuts", price: 9.75, allergens: ["gluten", "nuts"] },
        { name: "Jawaneh", description: "Chargrilled chicken wings", price: 8.75 },
        { name: "Jawaneh Bil Kizbara", description: "Chicken wings flambéed with coriander, garlic and lemon", price: 11.5 },
        { name: "Sawdat Dajaj", description: "Sautéed chicken liver, lemon juice, garlic", price: 9.25 },
        { name: "Sojok", description: "Pan-fried spicy lamb sausages, tomatoes, lemon juice", price: 12.25, diets: ["spicy"] },
      ],
    },
    {
      id: "grill",
      title: "From the Charcoal Grill",
      description: "Served with salad. Spicy options available — just ask.",
      items: [
        { name: "Farrouj Meshwi", description: "Marinated free-range boneless baby chicken", price: 24.5 },
        { name: "Djej Bayti", description: "Marinated free-range boneless chicken legs", price: 22.5 },
        { name: "Shish Taouk", description: "Marinated tender chicken cubes (2 skewers)", price: 22.5 },
        { name: "Lahm Meshwi", description: "Marinated lamb cubes (2 skewers)", price: 23.75 },
        { name: "Kafta Meshwi", description: "Seasoned minced lamb, parsley, onions (2 skewers)", price: 21.5 },
        { name: "Castaletta", description: "Marinated lamb cutlets", price: 24.75 },
        { name: "Mixed Grill", description: "Chargrilled selection of 3 skewers: lahm meshwi, shish taouk and kafta", price: 26.75 },
        {
          name: "Zufa Mixed Grill",
          description: "Castaletta, jawaneh, chicken shawarma, lamb shawarma and kafta meshwi, served with salad and rice",
          price: [
            { label: "For two", price: 43.75 },
            { label: "For four", price: 80.75 },
          ],
        },
      ],
    },
    {
      id: "house-specials",
      title: "House Specials",
      items: [
        { name: "Lamb Shank", description: "Braised and slowly cooked with the chef’s special spices, served with lamb rice or steamed vegetables and toasted nuts", price: 24.75, allergens: ["nuts"] },
        { name: "Bamieh Lahme", description: "Tender lamb and okra stewed in a rich tomato sauce with garlic, coriander, onions and lemon, served with vermicelli rice", price: 21.5, allergens: ["gluten"] },
        { name: "Spicy Lebanese Tilapia", description: "Baked tilapia with spicy sauce, garlic, onions and fresh coriander, served with rice", price: 22.75, allergens: ["fish"], diets: ["spicy"] },
        { name: "Spicy Meat Balls", description: "Minced lamb, spicy peppers, onions and parsley cooked in a special spicy sauce, served with vermicelli rice", price: 23.75, allergens: ["gluten"], diets: ["spicy"] },
        {
          name: "Chef’s Special",
          description: "Sliced lamb or chicken in a spicy tomato, pepper, onion and garlic sauce, served with vermicelli rice",
          price: [
            { label: "Chicken", price: 20.75 },
            { label: "Mix", price: 21.5 },
            { label: "Lamb", price: 22.25 },
          ],
          allergens: ["gluten"],
          diets: ["spicy"],
        },
        {
          name: "Shawarma Wrap",
          description: "Tomatoes, pickles, garlic sauce, served with skin-on fries",
          price: [
            { label: "Chicken", price: 18.25 },
            { label: "Mix", price: 19.5 },
            { label: "Lamb", price: 19.75 },
          ],
          allergens: ["gluten"],
        },
        { name: "Duck Shawarma Wrap", description: "Duck magret, fig jam, pickles, garlic sauce, spring onions, served with skin-on fries", price: 21.75, allergens: ["gluten"] },
      ],
    },
    {
      id: "vegetarian-mains",
      title: "Vegetarian Mains",
      items: [
        { name: "Vegetarian Mixed Grill", description: "Charcoal-grilled sweet potatoes, mushrooms, bell pepper, courgette, baby potatoes, aubergine, shallots, pomegranate sauce. Add halloumi for £4.50", price: 18.75, diets: ["vegan"] },
        { name: "Musakaat Rice", description: "Baked aubergine, tomato sauce, onions, chickpeas, served with vermicelli rice", price: 19.75, allergens: ["gluten"], diets: ["vegan"] },
        { name: "Bamieh Rice", description: "Simmered baby okra, tomato sauce, onions, garlic, fresh coriander, served with vermicelli rice", price: 18.25, allergens: ["gluten"], diets: ["vegan"] },
        { name: "Fattet Batinjen", description: "Layered baked aubergines with creamy yoghurt, tahini, crunchy pita and pomegranate seeds", price: 19.5, allergens: ["gluten", "dairy", "sesame"], diets: ["vegetarian"] },
        { name: "Falafel Wrap", description: "Tomatoes, pickles, tahini sauce, served with skin-on fries. Add halloumi for £4.50", price: 15.5, allergens: ["gluten", "sesame"], diets: ["vegan"] },
        { name: "Halloumi Wrap", description: "Sun-dried tomato and pesto, served with skin-on fries", price: 17.5, allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
      ],
    },
    {
      id: "seafood",
      title: "Seafood",
      description: "Served with your choice of steamed vegetables or rice.",
      items: [
        { name: "Sea Bass", description: "Baked sea bass fillet with tahini sauce", price: 25.75, allergens: ["fish", "sesame"] },
        { name: "Salmon", description: "Baked salmon fillet with special spicy sauce", price: 26.75, allergens: ["fish"], diets: ["spicy"] },
        { name: "King Prawns", description: "Grilled king prawns with coriander sauce", price: 32.75, allergens: ["crustaceans"] },
      ],
    },
    {
      id: "sides",
      title: "Side Dishes",
      items: [
        { name: "Plain Rice", price: 5.0, allergens: ["dairy"], diets: ["vegetarian"] },
        { name: "Vermicelli Rice", price: 5.75, allergens: ["gluten"], diets: ["vegan"] },
        { name: "Lamb Rice", price: 7.25, allergens: ["nuts"] },
        { name: "Skin-on Fries", price: 5.5, diets: ["vegan"] },
        { name: "Spicy Skin-on Fries", price: 6.5, diets: ["vegan", "spicy"] },
        { name: "Sweet Potato Fries", price: 7.75, diets: ["vegan"] },
        { name: "Steamed Vegetables", price: 5.75, diets: ["vegan"] },
        { name: "Side Salad", price: 4.5, diets: ["vegan"] },
        { name: "Bread Basket", price: 3.5, allergens: ["gluten"], diets: ["vegan"] },
        { name: "Chilli Pickles", price: 4.5, diets: ["vegan", "spicy"] },
        {
          name: "Sauces",
          description: "Garlic, chilli or tahini",
          price: 2.0,
        },
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
  shortTitle: "Sharing Platters",
  summary:
    "Vegetarian, Levantine and Lebanese grill sharing feasts for two or four — the easiest way to eat the Lebanese way.",
  intro:
    "Lebanese food is made for sharing. Our feasts bring the whole table a generous spread of mezze and charcoal grills. Ideal for groups, celebrations and first-time visitors.",
  image: "/images/sharing-table.jpg",
  imageAlt: "A round table laden with Lebanese sharing dishes and cocktails at Zufa Hatch End",
  pdf: "/menus/zufa-a-la-carte-menu.pdf",
  sections: [
    {
      id: "sharing-platters",
      title: "Sharing Platters",
      items: [
        {
          name: "Vegetarian Feast",
          description: "Hommos, moutabbal, fattoush, tzatziki, falafel, fatayer, spicy potatoes, grilled halloumi, cheese rikakat",
          price: [
            { label: "For two", price: 55.75 },
            { label: "For four", price: 105.75 },
          ],
          diets: ["vegetarian"],
        },
        {
          name: "Levantine Feast",
          description: "Hommos, tzatziki, tabbouleh, lamb samboussik, calamari, kebbeh lamb, jawaneh, shish taouk, kafta meshwi",
          price: [
            { label: "For two", price: 65.75 },
            { label: "For four", price: 125.75 },
          ],
        },
        {
          name: "Lebanese Feast Grill",
          description: "Lahm meshwi, kafta meshwi, shish taouk, jawaneh, chicken legs, tzatziki, hommos, salad, vermicelli rice, sauces and bread",
          price: [
            { label: "For two", price: 69.75 },
            { label: "For four", price: 133.75 },
          ],
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
    "Weekday lunch in Hatch End: a two-course Lebanese lunch for £15.95, wraps with fries or salad from £9.99, mezze platters and a build-your-own salad bar.",
  intro:
    "Our weekday lunch menu is quick, generous and great value — perfect for a working lunch, a catch-up with friends or a lazy afternoon on the patio.",
  availability: "Monday – Friday, 12pm – 5pm",
  image: "/images/dishes-detail.webp",
  imageAlt: "Close-up of Lebanese lunch dishes at Zufa",
  pdf: "/menus/zufa-a-la-carte-menu.pdf",
  sections: [
    {
      id: "two-course",
      title: "Two-Course Lunch",
      description:
        "Choose one starter and one main course for £15.95. Add £4.50 for baklawa and a hot drink.",
      items: [
        { name: "Two-Course Lunch Menu", description: "One starter + one main course from the selection below", price: 15.95, priceNote: "per person" },
        { name: "Starter — Hommos", description: "Purée of chickpeas with sesame sauce and lemon juice", allergens: ["sesame"], diets: ["vegan"] },
        { name: "Starter — Moutabbal", description: "Smoked aubergines, garlic, sesame sauce and lemon juice", allergens: ["sesame"], diets: ["vegan"] },
        { name: "Starter — Fattoush", description: "Lettuce, tomatoes, radish, cucumber, onions, sumac, lemon juice, olive oil", allergens: ["gluten"], diets: ["vegan"] },
        { name: "Starter — Tzatziki", description: "Lebanese yoghurt, garlic, cucumber, dry mint", allergens: ["dairy"], diets: ["vegetarian"] },
        { name: "Starter — Falafel", description: "Bean croquettes made with chickpeas, broad beans and herbs", allergens: ["sesame", "celery"], diets: ["vegan"] },
        { name: "Starter — Kebbeh Lamb", description: "Minced lamb and cracked-wheat shell stuffed with minced lamb, onions and pine nuts", allergens: ["gluten", "nuts"] },
        { name: "Starter — Samke Harra", description: "Baked fish, spicy tomato sauce, garlic, onions, fresh coriander and pine nuts", allergens: ["fish", "nuts"], diets: ["spicy"] },
        { name: "Main — Falafel Salad", description: "Falafel on mixed green leaves, tomatoes, cucumber, pickles and sesame sauce", allergens: ["sesame", "celery"], diets: ["vegan"] },
        { name: "Main — Bamieh Rice", description: "Baby okra with garlic and coriander, served with vermicelli rice", allergens: ["gluten"], diets: ["vegan"] },
        { name: "Main — Kafta Meshwi", description: "Chargrilled seasoned minced lamb with parsley and onions, served with fries or salad" },
        { name: "Main — Shish Taouk", description: "Chargrilled marinated tender chicken cubes, served with fries" },
        { name: "Main — Jawaneh", description: "Chargrilled chicken wings, served with fries or salad" },
        { name: "Main — Sea Bass", description: "Baked sea bass fillet served with fries or salad and sesame sauce", allergens: ["fish", "sesame"] },
      ],
    },
    {
      id: "lunch-wraps",
      title: "Lunch Wrap Deal",
      description: "All wraps are served with skin-on fries or salad.",
      items: [
        { name: "Falafel Wrap", description: "Bean croquettes, lettuce, sesame sauce, tomatoes and pickles", price: 9.99, allergens: ["gluten", "sesame", "celery"], diets: ["vegan"] },
        { name: "Spicy Potatoes Wrap", description: "Sautéed potatoes, tomatoes, coriander, garlic and pickles", price: 9.99, allergens: ["gluten"], diets: ["vegan", "spicy"] },
        { name: "Halloumi Wrap", description: "Grilled halloumi, pesto, sun-dried tomatoes", price: 10.99, allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
        { name: "Shish Taouk Wrap", description: "Chargrilled chicken cubes, lettuce, tomatoes, garlic sauce and pickles", price: 10.99, allergens: ["gluten"] },
        { name: "Chicken Shawarma Wrap", description: "Roasted slices of chicken, lettuce, garlic, tomatoes and pickles", price: 10.99, allergens: ["gluten"] },
        { name: "Kafta Meshwi Wrap", description: "Chargrilled minced lamb, lettuce, tomatoes, sesame sauce and pickles", price: 10.99, allergens: ["gluten", "sesame"] },
        { name: "Mixed Shawarma Wrap", description: "Roasted chicken and lamb, lettuce, garlic, tomatoes and pickles", price: 11.49, allergens: ["gluten"] },
        { name: "Lamb Shawarma Wrap", description: "Roasted thin slices of lamb, lettuce, sesame sauce, tomatoes and pickles", price: 11.99, allergens: ["gluten", "sesame"] },
      ],
    },
    {
      id: "lunch-platters",
      title: "Mezze Platters",
      items: [
        {
          name: "Veg Mezzes Selection",
          description: "Hommos, moutabbal, tzatziki, falafel, fatayer, grilled halloumi",
          price: [
            { label: "For one", price: 13.95 },
            { label: "For two", price: 24.95 },
          ],
          diets: ["vegetarian"],
        },
        {
          name: "Mezzes Selection",
          description: "Hommos, moutabbal, tzatziki, kebbeh, lamb samboussik, grilled halloumi",
          price: [
            { label: "For one", price: 15.95 },
            { label: "For two", price: 28.95 },
          ],
        },
      ],
    },
    {
      id: "salad-bar",
      title: "Salad Bar",
      description:
        "Make your own salad — choose any five ingredients: cherry tomatoes, cucumber, rocket, mixed green leaves, mint, red onions, pomegranate seeds, parsley, black olives, crispy zaatar pita, beetroot. Dressings: pomegranate molasses, lemon vinaigrette or lemon tahini.",
      items: [
        { name: "Build-Your-Own Salad", description: "Any five ingredients with your choice of dressing", price: 8.5, diets: ["vegan"] },
        {
          name: "Extra Toppings",
          price: [
            { label: "Roasted chickpeas", price: 2.5 },
            { label: "Mixed seeds & nuts", price: 3.0 },
            { label: "Avocado", price: 4.0 },
            { label: "Feta cheese", price: 4.0 },
            { label: "Falafel", price: 4.0 },
            { label: "Grilled halloumi", price: 5.0 },
            { label: "Grilled chicken", price: 6.0 },
            { label: "Chicken shawarma", price: 6.0 },
            { label: "Grilled prawns", price: 8.0 },
          ],
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Breakfast                                                           */
/* ------------------------------------------------------------------ */

export const breakfastMenu: Menu = {
  slug: "breakfast",
  title: "Breakfast & Brunch Menu",
  shortTitle: "Breakfast",
  summary:
    "Lebanese breakfast and brunch in Hatch End, Wednesday to Sunday, 8am to midday: manakish from the saj, Lebanese eggs, foul, labneh and halloumi, breakfast platters from £12.95, eggs Benedict, pancakes, smoothies and Lebanese coffee.",
  intro:
    "Wednesday to Sunday we open at 8am for a proper Lebanese breakfast, and the menu runs until midday for anyone who prefers a late brunch: manakish straight from the oven, eggs cooked the village way with sojok or awarma, foul and musabaha with warm bread, and platters made for sharing. If you’d rather go beyond the Levant, there are eggs Benedict on sourdough, brioche pain perdu and buttermilk pancakes, with fresh juices, smoothies and coffee to go with them.",
  availability: "Wednesday – Sunday, 8am – midday",
  image: "/images/dishes-detail.webp",
  imageAlt: "Lebanese breakfast dishes at Zufa Hatch End",
  pdf: "/menus/zufa-breakfast-menu.pdf",
  sections: [
    {
      id: "manakish",
      title: "Manakish",
      description: "Lebanese flatbreads baked to order.",
      items: [
        { name: "Zaatar", description: "Soft baked flatbread spread with a blend of wild thyme, olive oil and sesame seeds", price: 5.5, allergens: ["gluten", "sesame"], diets: ["vegan"] },
        { name: "Zaatar Extra", description: "Zaatar with tomatoes and fresh mint, served with olives", price: 6.5, allergens: ["gluten", "sesame"], diets: ["vegan"] },
        { name: "Zaatar Labneh", description: "Creamy strained yoghurt spread with zaatar", price: 6.5, allergens: ["gluten", "sesame", "dairy"], diets: ["vegetarian"] },
        { name: "Zaatar Jibneh", description: "Zaatar topped with mixed cheese", price: 7.0, allergens: ["gluten", "sesame", "dairy"], diets: ["vegetarian"] },
        { name: "Jibneh", description: "Akkawi and mozzarella cheese blend", price: 6.75, allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
        { name: "Harra", description: "Cheese blended with aromatic spices", price: 7.0, allergens: ["gluten", "dairy"], diets: ["vegetarian", "spicy"] },
        { name: "Safiha", description: "Seasoned minced lamb with tomatoes, onions, herbs and chilli", price: 9.25, allergens: ["gluten"], diets: ["spicy"] },
      ],
    },
    {
      id: "eggs",
      title: "Eggs",
      items: [
        { name: "Shakshuka", description: "Spicy peppers, onions and tomato sauce with farm-fresh eggs", price: 12.95, allergens: ["eggs"], diets: ["vegetarian", "spicy"] },
        { name: "Sojok & Bayd", description: "Spicy lamb sausages pan-fried with farm-fresh eggs", price: 11.95, allergens: ["eggs"], diets: ["spicy"] },
        { name: "Bayd bi Awarma", description: "Farm-fresh eggs fried with diced lamb, onions and spices", price: 10.95, allergens: ["eggs"] },
        { name: "Bayd & Batata", description: "Diced potatoes cooked with garlic and spices, scrambled with farm-fresh eggs", price: 9.95, allergens: ["eggs"], diets: ["vegetarian"] },
        { name: "Ejjeh", description: "Traditional Lebanese omelette — farm-fresh eggs, herbs and spices, served with salad", price: 10.95, allergens: ["eggs"], diets: ["vegetarian"] },
        { name: "Add-ons for Ejjeh", description: "Red onions, mushrooms, tomatoes, cheese, diced potatoes or spinach", price: 2.5, priceNote: "each" },
      ],
    },
    {
      id: "cold-dishes",
      title: "Cold Dishes",
      description: "Served with bread.",
      items: [
        { name: "Labneh", description: "Creamy strained yoghurt with olive oil", price: 7.25, allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
        { name: "Hommos", description: "Chickpea purée, tahini and olive oil", price: 7.75, allergens: ["gluten", "sesame"], diets: ["vegan"] },
        { name: "Babaganough", description: "Smoked aubergine purée, tahini, garlic and olive oil", price: 8.25, allergens: ["gluten", "sesame"], diets: ["vegan"] },
        { name: "Olives", description: "Kalamata and green Greek olives", price: 5.5, diets: ["vegan"] },
      ],
    },
    {
      id: "hot-dishes",
      title: "Hot Dishes",
      description: "Served with bread.",
      items: [
        { name: "Foul", description: "Fava beans mashed with garlic, lemon juice and olive oil", price: 11.75, allergens: ["gluten"], diets: ["vegan"] },
        { name: "Halloumi", description: "Grilled halloumi with tomatoes and cucumber", price: 8.75, allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
        { name: "Musabaha", description: "Chickpeas blended with tahini, lemon, garlic and olive oil, served with whole chickpeas and cumin", price: 11.25, allergens: ["gluten", "sesame"], diets: ["vegan"] },
        { name: "Batata Harra", description: "Crispy potatoes with peppers, onions, chilli and garlic", price: 8.75, allergens: ["gluten"], diets: ["vegan", "spicy"] },
        { name: "Fatayer", description: "Baked pastry filled with spinach, onions, pine nuts and aromatic spices", price: 6.75, allergens: ["gluten", "nuts"], diets: ["vegan"] },
        { name: "Fatayer Jibneh", description: "Baked pastry filled with seasoned creamy cheese and herbs", price: 7.75, allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
      ],
    },
    {
      id: "breakfast-platters",
      title: "Breakfast Platters",
      description: "Authentic flavours, made for sharing. Served with bread.",
      items: [
        { name: "Breakfast for One", description: "Hommos, labneh, foul, halloumi, sojok, olives, eggs, vegetables and zaatar", price: 13.95, allergens: ["gluten", "sesame", "dairy", "eggs"] },
        {
          name: "Family Breakfast Platter",
          description: "Hommos, labneh, foul, mixed manakish, sojok, eggs and vegetables",
          note: "Serves 2 – 4, minimum 2 people. Vegetarian option available.",
          price: 12.95,
          priceNote: "per person",
          allergens: ["gluten", "sesame", "dairy", "eggs"],
        },
      ],
    },
    {
      id: "benedict",
      title: "Beyond the Levant — Benedict",
      description: "Served on sourdough bread. Eggs scrambled or poached.",
      items: [
        { name: "Spicy Avocado & Feta Eggs", description: "Farm-fresh eggs with creamy spicy avocado paste and feta", price: 11.75, allergens: ["gluten", "eggs", "dairy"], diets: ["vegetarian", "spicy"] },
        { name: "Salmon Benedict", description: "Farm-fresh eggs and smoked salmon with hollandaise sauce", price: 12.75, allergens: ["gluten", "eggs", "dairy", "fish"] },
        { name: "Spiced Spinach Royale", description: "Farm-fresh eggs, masala spinach and hollandaise sauce", price: 11.25, allergens: ["gluten", "eggs", "dairy"], diets: ["vegetarian"] },
        { name: "The Duck Pond", description: "Farm-fresh eggs, confit duck and hollandaise sauce", price: 12.75, allergens: ["gluten", "eggs", "dairy"] },
      ],
    },
    {
      id: "pain-perdu",
      title: "Pain Perdu",
      items: [
        { name: "Bonjour", description: "Soft brioche pancake with cinnamon-vanilla custard and a caramelised golden crust, blueberry compote, fresh berries, crème fraîche, berry sauce and chocolate crumb", price: 9.95, allergens: ["gluten", "dairy", "eggs"], diets: ["vegetarian"] },
        { name: "Bon Appétit", description: "Soft brioche soaked in cinnamon-vanilla custard with caramelised apple, banana brûlée, crème fraîche and salted caramel", price: 9.95, allergens: ["gluten", "dairy", "eggs"], diets: ["vegetarian"] },
      ],
    },
    {
      id: "pancakes",
      title: "Pancakes",
      items: [
        { name: "Morning Heaven", description: "Fluffy American-style buttermilk pancakes topped with seasonal fresh fruit, berry compote and maple syrup, finished with rainbow sprinkles", price: 10.75, allergens: ["gluten", "dairy", "eggs"], diets: ["vegetarian"] },
        { name: "Honeymoon Mode", description: "Stacks of fluffy pancakes generously coated in Nutella, layered with fresh banana and strawberries, finished with toasted almonds", price: 11.25, allergens: ["gluten", "dairy", "eggs", "nuts"], diets: ["vegetarian"] },
      ],
    },
    {
      id: "add-ons",
      title: "Add-ons",
      items: [
        { name: "Two Farm-Fresh Eggs", price: 3.75, allergens: ["eggs"], diets: ["vegetarian"] },
        { name: "Fries", price: 4.0, diets: ["vegan"] },
        { name: "Spicy Fries", price: 4.75, diets: ["vegan", "spicy"] },
        { name: "Avocado", price: 2.75, diets: ["vegan"] },
        { name: "Falafel", price: 1.75, allergens: ["sesame", "celery"], diets: ["vegan"] },
        { name: "Sourdough Bread", price: 1.75, allergens: ["gluten"], diets: ["vegan"] },
      ],
    },
    {
      id: "jam",
      title: "Jam",
      description: "Served with bread and butter.",
      items: [
        { name: "Apricot", price: 3.5, allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
        { name: "Fig", price: 3.75, allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
        { name: "Strawberry", price: 3.5, allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
        { name: "Orange Marmalade", price: 3.75, allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
      ],
    },
    {
      id: "smoothies-juices",
      title: "Smoothies & Fresh Juices",
      items: [
        { name: "Verde", description: "Spinach, green apple and cucumber", price: 6.25, diets: ["vegan"] },
        { name: "Tropical", description: "Coconut water, pineapple, mango and banana", price: 6.25, diets: ["vegan"] },
        { name: "Berryholic", description: "Mixed berries, banana and almond milk", price: 6.25, allergens: ["nuts"], diets: ["vegan"] },
        { name: "Fresh Juices", description: "Orange, apple, carrot, or lemon / lemon mint — ask for today’s options", price: [{ label: "Single", price: 5.5 }, { label: "Mix", price: 5.75 }], diets: ["vegan"] },
      ],
    },
    {
      id: "coffee-tea",
      title: "Coffee & Tea",
      description: "Plant-based milk available.",
      items: [
        {
          name: "Coffee",
          price: [
            { label: "Espresso", price: 2.75 },
            { label: "Macchiato", price: 3.0 },
            { label: "Lebanese coffee", price: 3.5 },
            { label: "Flat white", price: 4.25 },
            { label: "Cappuccino", price: 4.5 },
            { label: "Latte", price: 4.5 },
            { label: "Mocha", price: 4.5 },
            { label: "Hot chocolate", price: 4.5 },
          ],
        },
        {
          name: "Tea",
          price: [
            { label: "English breakfast", price: 3.75 },
            { label: "Earl Grey", price: 3.75 },
            { label: "Green", price: 3.75 },
            { label: "Fresh mint", price: 3.75 },
            { label: "Peppermint", price: 3.75 },
            { label: "Lebanese tea", price: 3.75 },
            { label: "Matcha", price: 5.5 },
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
  summary: "A simple kids meal for under-12s — pizza margherita, grilled chicken cubes, chicken wings or minced lamb, with fries, salad or rice, juice and a scoop of ice cream.",
  intro:
    "Zufa is a family restaurant at heart. Our kids meal keeps things simple: a main of your child’s choice, a side, a juice and a scoop of ice cream.",
  image: "/images/feast-table.jpg",
  imageAlt: "Family-style Lebanese dishes on a table at Zufa",
  pdf: "/menus/zufa-a-la-carte-menu.pdf",
  sections: [
    {
      id: "kids",
      title: "Kids Meal",
      description: "Under 12s only. £10.99 including a main with fries, salad or rice, a juice and a scoop of ice cream (vanilla, chocolate or cookies & cream).",
      items: [
        { name: "Kids Meal", description: "Choose a main below — served with fries, salad or rice, plus juice and a scoop of ice cream", price: 10.99, priceNote: "under 12s" },
        { name: "Pizza Margherita", allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
        { name: "Chicken Cubes Grilled" },
        { name: "Chicken Wings Grilled" },
        { name: "Minced Lamb Grilled" },
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
    "Traditional Lebanese sweets — baklawa, pistachio baklawa, knefeh, osmaliyeh and mouhallabieh — alongside puddings, gluten-free honey cake, ice cream, Lebanese coffee and floral teas.",
  intro:
    "Lebanese desserts are traditionally flavoured with rose water, orange blossom and sugar syrup. Finish your meal the Lebanese way with a plate of sweets and a strong Lebanese coffee.",
  image: "/images/baklawa.jpg",
  imageAlt: "A plate of baklawa and Lebanese sweets at Zufa",
  pdf: "/menus/zufa-a-la-carte-menu.pdf",
  sections: [
    {
      id: "desserts",
      title: "House Desserts",
      items: [
        { name: "Baklawa", description: "Layers of flaky pastry filled with nuts and honey", price: 6.75, allergens: ["gluten", "nuts"], diets: ["vegetarian"] },
        { name: "Pistachio Baklawa", description: "Layers of flaky pastry infused with pistachio paste and honey", price: 7.75, allergens: ["gluten", "nuts"], diets: ["vegetarian"] },
        { name: "Mouhallabieh", description: "Milk pudding with orange blossom and rose-water syrup and pistachio", price: 6.75, allergens: ["dairy", "nuts"], diets: ["vegetarian"] },
        { name: "Osmaliyeh", description: "Crispy shredded pastry with clotted cream, drizzled with rose-water syrup", price: 8.25, allergens: ["gluten", "dairy", "nuts"], diets: ["vegetarian"] },
        { name: "Knefeh", description: "Sweet semolina pudding stuffed with mixed cheese, served warm", price: 8.75, allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
        { name: "Chocolate Pudding", description: "Rich and velvety, with Belgian chocolate sauce and vanilla ice cream (vegan option available)", price: 9.75, allergens: ["dairy"], diets: ["vegetarian"] },
        { name: "Honey-Cinnamon Pudding", description: "A blend of honey and cinnamon, served with vanilla ice cream", price: 9.75, allergens: ["dairy"], diets: ["vegetarian"] },
        { name: "Gluten-Free Honey Cake", description: "Moist, sweet and served with walnuts", price: 8.75, allergens: ["dairy", "eggs", "nuts"], diets: ["vegetarian"] },
        { name: "Affogato al Pistachio", description: "Hot espresso poured over creamy vanilla gelato, finished with crushed roasted pistachios", price: 7.75, allergens: ["dairy", "nuts"], diets: ["vegetarian"] },
        {
          name: "Ice Cream",
          description: "Vanilla, chocolate or cookies & cream",
          price: [
            { label: "1 scoop", price: 3.25 },
            { label: "2 scoops", price: 5.5 },
            { label: "3 scoops", price: 6.75 },
          ],
          allergens: ["dairy"],
          diets: ["vegetarian"],
        },
      ],
    },
    {
      id: "coffee",
      title: "Coffee",
      description: "Plant-based milk and flavoured syrups available.",
      items: [
        { name: "Lebanese Coffee", description: "Finely ground, cardamom-scented and served the traditional way", price: 4.0 },
        { name: "Single Espresso", price: 2.75 },
        { name: "Double Espresso", price: 4.25 },
        { name: "Single Macchiato", price: 3.25, allergens: ["dairy"] },
        { name: "Double Macchiato", price: 4.25, allergens: ["dairy"] },
        { name: "Americano", price: 3.75 },
        { name: "Flat White", price: 4.5, allergens: ["dairy"] },
        { name: "Cappuccino", price: 4.5, allergens: ["dairy"] },
        { name: "Latte", price: 4.5, allergens: ["dairy"] },
        { name: "Mocha", price: 4.75, allergens: ["dairy"] },
        { name: "Iced Latte", price: 4.75, allergens: ["dairy"] },
        { name: "Matcha", price: 6.5 },
        { name: "French Coffee", description: "With brandy", price: 9.99 },
        { name: "Irish Coffee", description: "With whisky", price: 9.99 },
        { name: "Bailey’s Coffee", price: 9.99, allergens: ["dairy"] },
      ],
    },
    {
      id: "tea",
      title: "Tea & Infusions",
      items: [
        { name: "Tea & Infusions", description: "Fresh mint, fresh mint tea, camomile, green, peppermint, Earl Grey, orange blossom or English breakfast", price: 3.75 },
        {
          name: "Flora Tea",
          description:
            "Hand-tied first-pick green tea tips with dried aromatic flowers that bloom into a flower display when steeped. Please ask your server for availability.",
          price: 6.75,
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Takeaway wraps                                                      */
/* ------------------------------------------------------------------ */

export const takeawayMenu: Menu = {
  slug: "takeaway-menu",
  title: "Takeaway Menu",
  shortTitle: "Takeaway",
  summary:
    "Zufa’s 2026 takeaway menu: mezze, charcoal grills and wraps in small or large, for collection or delivery in Hatch End, Pinner and Harrow.",
  intro:
    "The same kitchen, packed to travel. Wraps come in small or large; mezze, grills and desserts match the restaurant. Order on this website for 20% off your first order, or call to collect.",
  image: "/images/dishes-detail.webp",
  imageAlt: "Lebanese dishes packed and ready for takeaway at Zufa",
  pdf: "/menus/zufa-takeaway-menu.pdf",
  sections: [
    {
      id: "veg-wraps",
      title: "Vegetarian Wraps",
      items: [
        { name: "Hommos Beiruty Wrap", description: "Hommos, green chilli, parsley, tomatoes and cucumber", price: [{ label: "Small", price: 6.25 }, { label: "Large", price: 10.25 }], allergens: ["sesame", "gluten"], diets: ["vegan"] },
        { name: "Falafel Wrap", description: "Bean croquettes, lettuce, sesame sauce, tomatoes, pickles", price: [{ label: "Small", price: 8.5 }, { label: "Large", price: 13.0 }], allergens: ["sesame", "gluten", "celery"], diets: ["vegan"] },
        { name: "Halloumi Wrap", description: "Grilled halloumi, pesto, sun-dried tomatoes, rocket", price: [{ label: "Small", price: 8.75 }, { label: "Large", price: 13.5 }], allergens: ["gluten", "dairy"], diets: ["vegetarian"] },
        { name: "Spicy Potatoes Wrap", description: "Sautéed potatoes, tomatoes, coriander, garlic sauce and pickles", price: [{ label: "Small", price: 7.75 }, { label: "Large", price: 12.5 }], allergens: ["gluten"], diets: ["vegan", "spicy"] },
      ],
    },
    {
      id: "meat-wraps",
      title: "Non-vegetarian Wraps",
      items: [
        { name: "Chicken Shawarma Wrap", description: "Roasted thin slices of chicken, lettuce, garlic sauce, tomatoes and pickles", price: [{ label: "Small", price: 9.0 }, { label: "Large", price: 14.0 }], allergens: ["gluten"] },
        { name: "Duck Shawarma Wrap", description: "Duck magret, fig jam, spring onion, pickles, garlic sauce", price: [{ label: "Small", price: 9.25 }, { label: "Large", price: 14.0 }], allergens: ["gluten"] },
        { name: "Lamb Shawarma Wrap", description: "Roasted lamb, lettuce, sesame sauce, tomatoes and pickles", price: [{ label: "Small", price: 9.75 }, { label: "Large", price: 15.75 }], allergens: ["gluten", "sesame"] },
        { name: "Mixed Shawarma Wrap", description: "Roasted chicken and lamb, lettuce, garlic sauce, tomatoes and pickles", price: [{ label: "Small", price: 9.5 }, { label: "Large", price: 15.25 }], allergens: ["gluten"] },
        { name: "Shish Taouk Wrap", description: "Chargrilled chicken cubes, lettuce, tomatoes, sesame sauce and pickles", price: [{ label: "Small", price: 9.0 }, { label: "Large", price: 15.5 }], allergens: ["gluten", "sesame"] },
        { name: "Kafta Meshwi Wrap", description: "Chargrilled minced lamb, lettuce, tomatoes, sesame sauce and pickles", price: [{ label: "Small", price: 9.0 }, { label: "Large", price: 15.5 }], allergens: ["gluten", "sesame"] },
        { name: "Lahm Meshwi Wrap", description: "Chargrilled lamb cubes, lettuce, tomatoes, sesame sauce and pickles", price: [{ label: "Small", price: 9.75 }, { label: "Large", price: 15.75 }], allergens: ["gluten", "sesame"] },
        { name: "Sawdat Dajaj Wrap", description: "Chicken livers, garlic sauce, tomatoes and pickles", price: [{ label: "Small", price: 7.75 }, { label: "Large", price: 12.5 }], allergens: ["gluten"] },
        { name: "Sojok Wrap", description: "Spicy lamb sausages, garlic sauce, tomatoes and pickles", price: [{ label: "Small", price: 9.75 }, { label: "Large", price: 15.75 }], allergens: ["gluten"], diets: ["spicy"] },
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
    "Organic Lebanese wines from Château Barka alongside Château Ksara and Château Belle-Vue, Champagne and prosecco, signature and classic cocktails, mocktails, arak, beer, spirits and soft drinks.",
  intro:
    "Lebanon has one of the world’s oldest wine traditions, stretching back thousands of years to the Phoenicians. The Bekaa Valley, with its high elevations, abundant sunshine and distinctive soils, is still at its heart. Our list leads with Château Barka, a family-owned estate growing organically between 1,450 and 1,700 metres in the northern Bekaa, whose wines are named after ancient Phoenician goddesses — alongside Château Ksara, Château Belle-Vue and carefully chosen bottles from around the world.",
  image: "/images/dinner-for-two.jpg",
  imageAlt: "Red and white wine with grilled dishes on a table at Zufa",
  sections: [
    {
      id: "signature-cocktails",
      title: "Zufa Signature Cocktails",
      description:
        "All signature cocktails £12.50. Two-for-one on house cocktails Monday to Thursday, 12pm – 7pm, and Friday to Saturday, 12pm – 6pm.",
      items: [
        { name: "Watermelon Fizz", description: "Grey Goose Watermelon & Basil, strawberry purée, syrup, Fever-Tree soda", price: 12.5 },
        { name: "Yakuza", description: "Grey Goose Vanilla, Midori, passion purée, passion fruit juice", price: 12.5 },
        { name: "Beirut Cooler", description: "Grey Goose, Malibu, peach schnapps, Midori, orange and cranberry juice", price: 12.5 },
        { name: "Marley’s Mojito", description: "Bacardí Spiced, mint, passion purée, lime, Fever-Tree soda", price: 12.5 },
        { name: "Pinky Promise", description: "Bacardí Coconut, Malibu, coconut purée, lime, rose syrup", price: 12.5 },
        { name: "Love Potion", description: "Pink gin, Chambord, strawberry purée, lychee juice, lime juice", price: 12.5 },
        { name: "Mint Collins", description: "Bombay Sapphire, elderflower cordial, mint, lime, Fever-Tree soda", price: 12.5 },
        { name: "Beirut Mule", description: "Arak, lime juice, ginger syrup, Fever-Tree ginger beer", price: 12.5 },
        { name: "The Punch", description: "Amaretto, Southern Comfort, red wine, fresh fruits, Fever-Tree lemonade", price: 12.5 },
        { name: "Spice of Life", description: "Patrón Silver tequila, Cointreau, mango purée, chilli-infused syrup", price: 12.5, diets: ["spicy"] },
      ],
    },
    {
      id: "classic-cocktails",
      title: "Classic Cocktails",
      description: "All classic cocktails £12.95. If you have a particular cocktail in mind, let us know and we will do our best.",
      items: [
        { name: "Cosmopolitan", price: 12.95 },
        { name: "Daiquiri", price: 12.95 },
        { name: "Bellini", price: 12.95 },
        { name: "Pornstar Martini", price: 12.95 },
        { name: "Lychee Martini", price: 12.95 },
        { name: "Piña Colada", price: 12.95 },
        { name: "Espresso Martini", price: 12.95 },
        { name: "Aperol Spritz", price: 12.95 },
        { name: "Hugo Spritz", price: 12.95 },
        { name: "Old Fashioned", price: 12.95 },
        { name: "Manhattan", price: 12.95 },
        { name: "Classic Martini", price: 12.95 },
        { name: "Sours", price: 12.95 },
      ],
    },
    {
      id: "mocktails",
      title: "Mocktails",
      description: "All mocktails £8.25.",
      items: [
        { name: "Lemonada", description: "Lebanese lemonade — fresh lemon juice, fresh mint, simple syrup", price: 8.25 },
        { name: "Lebanese Spice", description: "Cranberry juice, guava juice, mango juice, Fever-Tree soda", price: 8.25 },
        { name: "Ginger Buzz", description: "Pineapple juice, lime, mint, Fever-Tree ginger beer", price: 8.25 },
        { name: "Mock Champagne", description: "Lychee juice, lemon juice, grenadine syrup, Fever-Tree soda", price: 8.25 },
        { name: "Oriental Night", description: "Date syrup, Fever-Tree lemonade, pine nuts", price: 8.25, allergens: ["nuts"] },
        { name: "Virgin Mojito", description: "Choice of classic, strawberry, raspberry, passion fruit, peach or mango", price: 8.25 },
        { name: "Berries Collins", description: "Fresh berries, lemon juice, guava juice", price: 8.25 },
        { name: "Elderflower Fizz", description: "Elderflower cordial, lime juice, fresh mint, Fever-Tree elderflower tonic, grenadine", price: 8.25 },
      ],
    },
    {
      id: "sparkling",
      title: "Sparkling & Champagne",
      items: [
        { name: "Prosecco DOC Millesimato Brut, Zonin", description: "Italy. Wisteria flowers, crisp apple and fine citrus fruits with an almond finish. Fresh, fruity and well balanced.", price: 32.0, priceNote: "bottle" },
        { name: "Prosecco DOC Millesimato Rosé Brut, Zonin", description: "Italy. Luminous pale pink, pleasantly fruity, with notes of orchard apple and red fruits.", price: [{ label: "125ml", price: 9.75 }, { label: "Bottle", price: 34.0 }] },
        { name: "Prosecco 20cl Mini Bottle", description: "Prefer a single serve? A perfectly chilled 20cl mini bottle of Prosecco.", price: 10.5 },
        { name: "Carte Blanche Brut, Champagne Charles Ellner", description: "France. An elegant and subtle Champagne, fresh and fruity with floral hints.", price: 52.0, priceNote: "bottle" },
        { name: "Rosé Brut, Champagne Charles Ellner", description: "France. Intense aromas with hints of strawberry, developing into intensely fruity notes.", price: 62.0, priceNote: "bottle" },
        { name: "Laurent-Perrier La Cuvée", description: "France. Crisp lemony freshness with more than a hint of green apples on the palate. Vegan.", price: 75.0, priceNote: "bottle" },
        { name: "Veuve Clicquot Yellow Label Brut", description: "France. Toasty, bready and fruity notes, fit for any occasion.", price: 82.0, priceNote: "bottle" },
        { name: "Moët & Chandon Rosé", description: "France. Fresh summer berries, wild strawberry, raspberry and cherry with soft rose notes and a light peppery spice.", price: 85.0, priceNote: "bottle" },
        { name: "Laurent-Perrier Rosé", description: "France. Consistently appealing, light, elegant notes of red fruits and a delicate mousse. Vegan.", price: 115.0, priceNote: "bottle" },
      ],
    },
    {
      id: "white-wine",
      title: "White Wine",
      items: [
        { name: "SanLeo Bianco, Borgo SanLeo", description: "Italy. Light and fresh with delicate floral aromas, crisp green apple and a clean, refreshing finish.", price: 24.0, priceNote: "bottle" },
        { name: "Chenin Blanc, Du Toitskloof", description: "South Africa. Green apple, pear and tropical pineapple with a well-balanced, crisp finish.", price: 28.0, priceNote: "bottle" },
        { name: "Pinot Grigio Friuli DOC Aquileia, Tenuta Ca’ Vescovo", description: "Italy. Fresh aroma of acacia flowers and exotic fruit with a persistent finish.", price: [{ label: "175ml", price: 8.75 }, { label: "250ml", price: 10.25 }, { label: "Bottle", price: 29.5 }] },
        { name: "Sauvignon Blanc, Du Toitskloof", description: "South Africa. Vibrant gooseberry, tropical guava and pear with subtle green notes and a lingering, crisp finish.", price: [{ label: "175ml", price: 9.0 }, { label: "250ml", price: 10.75 }, { label: "Bottle", price: 31.0 }] },
        { name: "Chardonnay Friuli DOC, Zonin", description: "Italy. Dry and fruit-driven with citrus and lime on the nose; dried peach, vanilla and subtle wood on the palate.", price: 33.0, priceNote: "bottle" },
        { name: "Blanc de l’Observatoire, Château Ksara", description: "Lebanon. Light-bodied white blend with fresh aromas of citrus, white stone fruit and wildflowers.", price: 36.0, priceNote: "bottle" },
        { name: "Atargatis White, Château Barka", description: "Lebanon. Named after the Phoenician mermaid goddess of the sea. Delicate floral aromas leading to fresh white peach and vibrant exotic fruit with a well-balanced finish. Organic.", price: [{ label: "175ml", price: 10.25 }, { label: "250ml", price: 13.25 }, { label: "Bottle", price: 38.0 }] },
        { name: "Gavi del Comune di Gavi DOCG, Cossetti", description: "Italy. Fresh, persistent aroma with hints of flowers and fresh fruit. Pleasantly dry, crisp and harmonious.", price: 40.0, priceNote: "bottle" },
        { name: "Sauvignon Blanc Marlborough, HãHã", description: "New Zealand. Elderflower, passion fruit, lime zest and stone fruit with a crisp, flinty finish.", price: 42.0, priceNote: "bottle" },
        { name: "Sancerre La Gemière, Les Grands Chais de France", description: "France. Vibrant citrus and white peach balanced by crisp minerality, flinty notes and a long, refined finish.", price: 49.0, priceNote: "bottle" },
      ],
    },
    {
      id: "rose-wine",
      title: "Rosé Wine",
      items: [
        { name: "Pinot Grigio Blush DOC, Zonin", description: "Italy. 100% Pinot Grigio from Delle Venezie. Delicately fruity with subtle floral notes and a crisp, refreshing finish.", price: [{ label: "175ml", price: 8.75 }, { label: "250ml", price: 10.25 }, { label: "Bottle", price: 29.5 }] },
        { name: "Côtes de Provence Rosé, Henri Gaillard", description: "France. Pale pink with vibrant red berries and redcurrant, balanced by fine minerality, crisp acidity and subtle spice.", price: 38.0, priceNote: "bottle" },
        { name: "Tanit Rosé, Château Barka", description: "Lebanon. Named after the Phoenician goddess of heaven, the sun, the moon and the stars. Refreshing and fruity, with vibrant sweet cherries and cassis and a smooth, well-balanced acidity. Organic.", note: "Silver Medal — The Drinks Business 2025 UK", price: [{ label: "175ml", price: 10.25 }, { label: "250ml", price: 13.25 }, { label: "Bottle", price: 38.0 }] },
        { name: "Gris de Gris, Château Ksara", description: "Lebanon. Summer berries, peach compote, peony, jasmine and vine flowers with a refreshing acidity and dry finish.", price: 40.0, priceNote: "bottle" },
      ],
    },
    {
      id: "red-wine",
      title: "Red Wine",
      items: [
        { name: "Cabernet Sauvignon Friuli DOC Aquileia, Tenuta Ca’ Vescovo", description: "Italy. Elegant aroma with floral and wild berry notes, complemented by a touch of spice.", price: 24.0, priceNote: "bottle" },
        { name: "Merlot Friuli DOC Aquileia, Tenuta Ca’ Vescovo", description: "Italy. Ruby-red, pleasantly full-bodied and intense with soft tannins and a long fruity finish.", price: [{ label: "175ml", price: 8.75 }, { label: "250ml", price: 10.25 }, { label: "Bottle", price: 30.0 }] },
        { name: "Shiraz, Du Toitskloof", description: "South Africa. Eucalyptus, spice and peppercorn with supple tannins and a smooth finish.", price: 32.0, priceNote: "bottle" },
        { name: "Montepulciano d’Abruzzo DOC, Zonin", description: "Italy. Full-bodied with hints of ripe fruit, cherry and cocoa followed by peppery notes on the finish.", price: 33.0, priceNote: "bottle" },
        { name: "Malbec, Proemio", description: "Argentina. Bright red with intense aromas of red fruit, cherries and plum. Medium-bodied, velvet texture and a long, persistent finish.", price: [{ label: "175ml", price: 9.25 }, { label: "250ml", price: 11.75 }, { label: "Bottle", price: 34.0 }] },
        { name: "Pinot Noir Naciente, Bodegas Morandé", description: "Chile. Delicate and fresh with ripe red fruit, fine tannins, balanced acidity and a smooth, refined finish.", price: 36.0, priceNote: "bottle" },
        { name: "Sancho Garcés Rioja Tempranillo", description: "Spain. Deep violet-red with vibrant aromas of fresh red fruit and liquorice, complemented by soft, smooth tannins. Vegan.", price: 36.0, priceNote: "bottle" },
        { name: "Le Prieuré Rouge, Château Ksara", description: "Lebanon. Dark fruits dominate this mellow, well-rounded wine, with warming notes of spice and liquorice on the finish. Vegan.", price: 38.0, priceNote: "bottle" },
        { name: "Talliya Red, Château Barka", description: "Lebanon. Named after the goddess of rain and dew. Mineral and fruity on the nose with a harmonic scent of dark berries; fresh, well-structured and elegant on the palate. Organic.", price: [{ label: "175ml", price: 10.25 }, { label: "250ml", price: 13.25 }, { label: "Bottle", price: 38.0 }] },
        { name: "Chianti Classico DOCG, Castello di Albola", description: "Italy. Full-bodied and velvety with delicate violet on the nose, opening to rich cherry and subtle leather.", price: 42.0, priceNote: "bottle" },
        { name: "Château Lafont-Fourcat, Bordeaux", description: "France. Succulent texture, medium body and a clean, lush finish.", price: 58.0, priceNote: "bottle" },
        { name: "Ichtar, Château Barka", description: "Lebanon. Named after Ishtar, the Phoenician goddess of beauty and love. A blend of Cabernet Sauvignon and Syrah with smooth, round tannins and a generous bouquet of red fruits. Organic.", note: "Gold Medal 2020 — France International Wine Awards", price: 72.0, priceNote: "bottle" },
        { name: "Château Barka Royal", description: "Lebanon. Deep and complex with rich blackcurrant and raspberry, hints of vanilla and spice, and a long, structured finish with soft, elegant tannins. Shiraz, Cabernet Sauvignon and Merlot. Organic.", note: "Gold Medal 2019 — France International Wine Awards", price: 88.0, priceNote: "bottle" },
        { name: "La Renaissance, Château Belle-Vue", description: "Lebanon. Ripe plum, currant and chocolate underscored by hints of mushroom and mint, with an extraordinary expression of terroir.", price: 95.0, priceNote: "bottle" },
        { name: "Le Château, Château Belle-Vue", description: "Lebanon. Notes of coffee and black cherry providing a winning intensity.", price: 140.0, priceNote: "bottle" },
      ],
    },
    {
      id: "sweet-wine",
      title: "Sweet Wine",
      items: [
        { name: "Vin Doux Sweet Red, Château Barka", description: "Lebanon. 100% overripe Tempranillo grapes. Well balanced, with beautiful shades of spices and red fruits. Organic.", price: [{ label: "125ml", price: 10.5 }, { label: "Bottle", price: 49.0 }] },
      ],
    },
    {
      id: "arak",
      title: "Arak",
      description: "Arak is the traditional Lebanese spirit made from grapes and flavoured with anise — served with water and ice alongside mezze.",
      items: [
        { name: "Ksarak", price: [{ label: "Glass", price: 4.75 }, { label: "½ bottle", price: 43.0 }, { label: "Bottle", price: 64.0 }] },
        { name: "Massaya", price: [{ label: "Glass", price: 5.25 }, { label: "¼ bottle", price: 34.0 }, { label: "½ bottle", price: 48.0 }, { label: "Bottle", price: 78.0 }] },
      ],
    },
    {
      id: "beer",
      title: "Beer",
      items: [
        { name: "Lebanese Beer", price: 5.0, priceNote: "330ml" },
        { name: "Cobra Draught", price: [{ label: "Half pint", price: 4.5 }, { label: "Pint", price: 6.5 }] },
        { name: "Peroni 0%", price: 4.5, priceNote: "330ml" },
      ],
    },
    {
      id: "spirits",
      title: "Spirits (50ml)",
      items: [
        { name: "Whisky — Bourbon", price: [{ label: "Jack Daniel’s", price: 7.75 }, { label: "Woodford Reserve", price: 8.5 }, { label: "Bulleit", price: 8.5 }] },
        { name: "Whisky — Blended Scotch", price: [{ label: "Johnnie Walker Red Label", price: 6.75 }, { label: "Johnnie Walker Black Label", price: 8.5 }, { label: "Chivas Regal 12 Year Old", price: 8.5 }, { label: "Monkey Shoulder", price: 8.5 }, { label: "Chivas Regal 18 Year Old", price: 12.0 }, { label: "Johnnie Walker Blue Label", price: 25.0 }] },
        { name: "Whisky — Single Malt", price: [{ label: "Laphroaig 10 Year Old", price: 7.25 }, { label: "Glenlivet Founder’s Reserve", price: 9.5 }, { label: "Glenfiddich 12 Year Old", price: 9.5 }, { label: "Auchentoshan 12 Year Old", price: 9.5 }, { label: "Glenmorangie", price: 10.25 }, { label: "Bowmore 12 Year Old", price: 10.75 }, { label: "Oban 14 Year Old", price: 14.75 }, { label: "The Macallan 12 Year Old", price: 16.0 }] },
        { name: "Whisky — Irish", price: [{ label: "Jameson", price: 7.75 }, { label: "Green Spot", price: 10.5 }, { label: "Redbreast 12 Year Old", price: 10.5 }] },
        { name: "Whisky — Japanese", price: [{ label: "Nikka From The Barrel", price: 9.5 }, { label: "Yamazaki 12 Year Old", price: 16.5 }, { label: "Hibiki Harmony", price: 19.5 }] },
        { name: "Vodka", price: [{ label: "Eristoff", price: 7.75 }, { label: "Vanilla", price: 7.75 }, { label: "Grey Goose", price: 9.5 }, { label: "Belvedere", price: 9.5 }, { label: "Beluga Noble", price: 11.5 }, { label: "Snow Queen", price: 12.5 }] },
        { name: "Gin", price: [{ label: "Bombay Sapphire", price: 7.75 }, { label: "Bombay Bramble", price: 7.75 }, { label: "Tanqueray Flor de Sevilla", price: 7.75 }, { label: "Gordon’s Premium Pink", price: 7.75 }, { label: "Bombay Sapphire Premier Cru", price: 8.25 }, { label: "Hendrick’s", price: 8.75 }, { label: "Monkey 47", price: 8.75 }, { label: "Gin Mare", price: 8.75 }, { label: "Slingsby Rhubarb", price: 8.75 }, { label: "Roku", price: 9.5 }, { label: "Tanqueray No. TEN", price: 10.75 }] },
        { name: "Rum", price: [{ label: "Bacardí Carta Blanca / Carta Negra / Coconut / Spiced", price: 7.75 }, { label: "Kraken Spiced", price: 8.75 }, { label: "Havana Club Añejo 3 Años", price: 8.75 }, { label: "Diplomático Reserva Exclusiva", price: 9.5 }] },
        { name: "Tequila", price: [{ label: "Tequila Rose", price: 6.75 }, { label: "Jose Cuervo Especial Reposado", price: 6.75 }, { label: "Jose Cuervo Especial Blanco", price: 6.75 }, { label: "Cascabel Honey", price: 6.75 }, { label: "Patrón Silver", price: 8.5 }, { label: "Patrón XO Cafe", price: 9.5 }] },
        { name: "Cognac", price: [{ label: "Martell VS", price: 6.75 }, { label: "Hennessy VS", price: 8.5 }, { label: "Rémy Martin VSOP", price: 9.5 }, { label: "Rémy Martin XO", price: 25.0 }] },
        { name: "Port", price: [{ label: "Taylor’s Fine Tawny", price: 7.75 }] },
        { name: "Shots", price: [{ label: "Brain Damage", price: 6.0 }, { label: "B-52", price: 6.0 }, { label: "Baby Guinness", price: 6.5 }, { label: "ChocoLoco", price: 6.5 }, { label: "Jägerbomb", price: 6.5 }] },
      ],
    },
    {
      id: "soft-drinks",
      title: "Soft Drinks & Water",
      items: [
        { name: "Coke / Diet Coke / Coke Zero", price: 3.25, priceNote: "200ml" },
        { name: "Fanta", price: 3.75, priceNote: "330ml" },
        { name: "Fever-Tree Mixers", description: "Lemonade, tonic water, refreshingly light tonic, soda water, ginger ale or ginger beer", price: 3.25, priceNote: "200ml" },
        { name: "Fever-Tree Sparkling", description: "Sicilian lemonade, raspberry rose lemonade, English elderflower or Mexican lime soda", price: 4.25, priceNote: "275ml" },
        { name: "Red Bull", price: 4.5 },
        { name: "Ayran", description: "Traditional yoghurt drink", price: 4.5, allergens: ["dairy"] },
        { name: "Jallab", description: "Traditional date syrup drink", price: 5.5 },
        { name: "Fresh Juices", description: "Orange, apple, carrot or mixed", price: 6.5 },
        { name: "Bottled Juices", description: "Orange, apple, cranberry, pineapple, lychee, mango, guava or passion fruit", price: 3.5 },
        { name: "Still / Sparkling Water", price: [{ label: "330ml", price: 3.75 }, { label: "800ml", price: 4.75 }] },
      ],
    },
  ],
};

export const menus: readonly Menu[] = [aLaCarte, takeawayMenu, setMenus, lunchMenu, breakfastMenu, kidsMenu, dessertMenu, drinksMenu];

export function getMenu(slug: string): Menu | undefined {
  return menus.find((m) => m.slug === slug);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);
}
