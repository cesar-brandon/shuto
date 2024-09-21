import {
  createRouteHandler,
  createUploadthing,
  UploadThingError,
} from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

const uploadRouter = {
  plantImage: f({
    image: {
      maxFileSize: "4MB",
    },
  })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(({ file, metadata }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
export type UploadRouter = typeof uploadRouter;

const handlers = createRouteHandler({
  router: uploadRouter,
  // Apply an (optional) custom config:
  // config: { ... },
});
export { handlers as GET, handlers as POST };
