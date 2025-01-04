import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [
    {"role": "user", "content": "write a haiku about ai"},
  ],
});

completion.then((result) => console.log(result.choices[0].message));