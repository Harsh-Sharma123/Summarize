"use client";

import UplaodFormInput from "./upload-form-input";
import { z } from "zod";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine((file) => file.size <= 20 * 1024 * 1024, {
      message: "File size must be less than 20MB",
    })
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "File must be a PDF",
    }),
});

export default function UploadForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Submitted");
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    // validating the fields
    const validatedFields = schema.safeParse({ file });

    console.log(validatedFields);

    if (!validatedFields.success) {
      console.log(
        validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid File"
      );
      return;
    }

    // schema with zod
    // upload the file to uploadthing
    // parse the PDF using lang chain
    // save the summary to database
    // redirect to the [id] summary page
  };

  return (
    <section>
      <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
        <UplaodFormInput onSubmit={handleSubmit} />
      </div>
    </section>
  );
}
