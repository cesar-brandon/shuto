import { convertImageToBinary } from "@/lib/utils/image";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const imageSchema = z.object({
  content: z.object({
    title: z.string(),
    body: z.string(),
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const base64Image = body.base64Image;

    if (!base64Image) return new Response("Bad Request", { status: 400 });

    const { object: content } = await generateObject({
      model: google("gemini-1.5-pro-latest"),
      system:
        `Esta es una aplicacion de reconocimiento de imagenes.` +
        `te mostrare una imagen y tu me devolveras el titulo y la descripcion de la misma`,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Observa la imagen de la planta y devuelve como titulo el nombre de la planta y como cuerpo una descripción de la misma",
            },
            {
              type: "image",
              image: base64Image,
            },
          ],
        },
      ],
      schema: imageSchema,
    });

    return new Response(JSON.stringify(content), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
