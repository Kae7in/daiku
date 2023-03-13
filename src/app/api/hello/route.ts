import { Configuration, OpenAIApi } from "openai";

export async function GET(request: Request) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createEdit({
    model: "code-davinci-edit-001",
    input: "",
    instruction:
      "Create a React component that composes a separate child component. Please write it in the style of React Hooks. Include a comment at the top of each codeblock indicating the filename with the correct extension.",
    temperature: 0.5,
  });
  const responseText = completion.data.choices[0].text;

  return new Response(responseText);
}
