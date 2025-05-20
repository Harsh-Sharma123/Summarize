"use client";

import { useUploadThing } from "../../../utils/uploadthing";
import UplaodFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner";
import { generatePDFSummary } from "@/app/actions/upload-action";

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
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      toast("Error occurred while uploading PDF " + err.message);
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for", file);
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      toast(
        "Something went wrong " +
          validatedFields.error.flatten().fieldErrors.file?.[0] +
          "Invalid File"
      );
      return;
    }

    toast("Uploading PDF !! We are uploading you PDF.");

    // upload the file to uploadthing
    const resp = await startUpload([file]);

    if (!resp) {
      toast("Something went wrong. Please use a different file.");
      return;
    }

    toast(
      "Processing PDF !! Hang tight our AI is reading through your documents."
    );

    // parse the PDF using lang chain

    const summary = await generatePDFSummary(resp);
    console.log(summary);

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
