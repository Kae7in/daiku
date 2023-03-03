import { Configuration, OpenAIApi } from "openai";

export async function GET(request: Request) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: "Write a JavaScript function that prints Hello World",
      stream: false,
    });
    const responseText = completion.data.choices[0].text;
    return new Response(responseText);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }

  return new Response("No op");
}
