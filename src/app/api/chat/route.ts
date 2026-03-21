import { NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_CONTEXT = `You are the Culinary Guild AI, an expert chef and cooking assistant. You help people with:
- Recipe suggestions based on available ingredients
- Cooking techniques and tips
- Ingredient substitutions
- Meal planning and dietary advice
- Food science explanations
- Kitchen equipment recommendations

Be warm, encouraging, and knowledgeable. Format recipes clearly with ingredients and steps.
Keep responses concise but thorough. Use cooking terminology appropriately.`;

function generateResponse(messages: ChatMessage[]): string {
  const lastMessage = messages[messages.length - 1];
  const query = lastMessage.content.toLowerCase();

  if (
    query.includes("substitute") ||
    query.includes("replacement") ||
    query.includes("instead of")
  ) {
    return `Great question! Here are some common substitutions:

🥚 **Eggs** → Flax eggs (1 tbsp ground flax + 3 tbsp water), mashed banana, or applesauce
🧈 **Butter** → Coconut oil, olive oil, or avocado for baking
🥛 **Milk** → Oat milk, almond milk, or coconut milk
🌾 **All-purpose flour** → Almond flour, oat flour, or a gluten-free blend
🍬 **Sugar** → Honey, maple syrup, or coconut sugar (adjust liquid ratios)

The best substitute depends on what you're making. What specific ingredient are you looking to replace, and in what dish? I can give you a more tailored recommendation!`;
  }

  if (
    query.includes("chicken") &&
    (query.includes("rice") || query.includes("broccoli"))
  ) {
    return `With chicken, rice, and broccoli, you have the foundation for several delicious meals! Here's my favorite:

**Garlic Butter Chicken & Rice Bowl** 🍗

**Ingredients:**
• 2 chicken breasts, cubed
• 2 cups cooked rice
• 2 cups broccoli florets
• 3 cloves garlic, minced
• 2 tbsp butter
• 1 tbsp soy sauce
• Salt, pepper, and red pepper flakes

**Instructions:**
1. Season chicken with salt and pepper. Sear in a hot skillet until golden (6-7 min)
2. Add garlic and butter, cook 1 minute until fragrant
3. Add broccoli with a splash of water. Cover and steam 3-4 minutes
4. Stir in soy sauce and a pinch of red pepper flakes
5. Serve over warm rice

**Pro tip:** Toast the rice in the pan with a little sesame oil for extra flavor!

Want me to suggest variations or other dishes with these ingredients?`;
  }

  if (
    query.includes("pasta") &&
    (query.includes("al dente") || query.includes("perfect"))
  ) {
    return `Here's the secret to perfect al dente pasta every time! 🍝

**The Method:**
1. **Use plenty of water** — at least 4 quarts per pound of pasta
2. **Salt generously** — the water should taste like the sea (about 1-2 tbsp per pot)
3. **Wait for a rolling boil** before adding pasta
4. **Stir within the first 2 minutes** to prevent sticking
5. **Start testing 2 minutes before** the package time
6. **Save pasta water** — that starchy liquid is liquid gold for sauces

**The Test:** Bite into a piece. You want a tiny white dot in the center — that means it's still slightly firm and will finish cooking in the sauce.

**Pro tip:** Always finish cooking your pasta in the sauce for 1-2 minutes. Add splashes of pasta water to create a silky, emulsified sauce that clings to every strand.

Would you like a specific pasta recipe recommendation?`;
  }

  if (query.includes("vegetarian") || query.includes("vegan")) {
    return `Here's a quick and delicious vegetarian dinner! 🌿

**Crispy Chickpea & Sweet Potato Buddha Bowl**

**Prep:** 15 min | **Cook:** 25 min | **Serves:** 2

**Ingredients:**
• 1 can chickpeas, drained and patted dry
• 1 large sweet potato, cubed
• 2 cups mixed greens
• 1 avocado, sliced
• ½ cup cooked quinoa
• 2 tbsp olive oil
• 1 tsp smoked paprika, cumin, garlic powder

**Tahini Dressing:**
• 3 tbsp tahini
• 2 tbsp lemon juice
• 1 tbsp maple syrup
• Water to thin

**Instructions:**
1. Toss sweet potato and chickpeas with olive oil and spices
2. Roast at 425°F for 25 minutes, tossing halfway
3. Build bowls: greens → quinoa → sweet potato → chickpeas → avocado
4. Drizzle with tahini dressing

This is packed with protein, fiber, and flavor. Would you like more vegetarian ideas?`;
  }

  if (
    query.includes("french") &&
    (query.includes("sauce") || query.includes("technique"))
  ) {
    return `Let me teach you a classic French mother sauce — **Béchamel**! 🇫🇷

This is one of the five French mother sauces and the foundation for mac & cheese, lasagna, gratins, and more.

**Classic Béchamel Sauce**

**Ingredients:**
• 2 tbsp butter
• 2 tbsp all-purpose flour
• 2 cups whole milk, warmed
• Salt, white pepper, pinch of nutmeg

**Instructions:**
1. Melt butter over medium heat in a saucepan
2. Add flour and whisk constantly for 2 minutes (this is your *roux*)
3. Slowly pour in warm milk, whisking constantly to prevent lumps
4. Cook for 5-7 minutes, stirring, until it coats the back of a spoon
5. Season with salt, white pepper, and a pinch of nutmeg

**Key Tips:**
• Warm milk = fewer lumps
• White pepper keeps it looking clean
• The roux should smell nutty but not brown

**Variations:**
• Add Gruyère → **Mornay sauce** (perfect for gratins)
• Add onion and clove → **Soubise sauce**

Want to learn another mother sauce?`;
  }

  if (query.includes("spice") || query.includes("indian")) {
    return `Indian cooking has some of the most aromatic spice combinations in the world! 🇮🇳

**Essential Spice Pairings:**

🟡 **Cumin + Coriander + Turmeric** — The holy trinity of Indian cooking. Use as a base for almost any curry.

🔴 **Garam Masala** (cumin, coriander, cardamom, cinnamon, cloves, black pepper) — Add at the end of cooking for warmth and depth.

🟢 **Mustard Seeds + Curry Leaves** — Toast in hot oil for South Indian dishes. The "tadka" technique.

🟠 **Fenugreek + Cumin + Nigella** — Classic for naan and pickles (panch phoron blend).

**Pro Tips:**
• Always bloom whole spices in hot oil first — this unlocks their flavor
• Ground spices lose potency after 6 months; toast and grind your own for the best results
• Start with less; you can always add more

Would you like a specific Indian recipe to practice with?`;
  }

  if (
    query.includes("hello") ||
    query.includes("hi") ||
    query.includes("hey")
  ) {
    return `Hello! Welcome to the Culinary Guild! 👨‍🍳

I'm your AI chef assistant, ready to help with anything in the kitchen. Here are some things I can help you with:

🍳 **Recipe Ideas** — Tell me what ingredients you have and I'll suggest dishes
📖 **Cooking Techniques** — From knife skills to sauce making
🔄 **Substitutions** — Dietary needs or missing ingredients? I've got alternatives
🌍 **World Cuisines** — Explore dishes from any culinary tradition
📋 **Meal Planning** — Weekly menus, prep tips, and batch cooking

What would you like to explore today?`;
  }

  return `That's a great culinary question! 👨‍🍳

Here are some thoughts:

Based on your query, I'd recommend exploring a few approaches:

1. **Start with quality ingredients** — Fresh, seasonal produce makes the biggest difference in any dish
2. **Master your heat control** — Understanding when to use high vs. low heat is crucial
3. **Taste as you go** — Season in layers and adjust throughout cooking
4. **Don't overcrowd the pan** — This is the #1 mistake home cooks make; it leads to steaming instead of searing

Would you like me to dive deeper into any specific aspect? I can provide:
• Detailed recipes with step-by-step instructions
• Technique tutorials
• Ingredient substitution guides
• Cuisine-specific tips

Just let me know what you're cooking or what you'd like to learn!`;
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    const response = generateResponse(messages);

    return NextResponse.json({ message: response });
  } catch {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
