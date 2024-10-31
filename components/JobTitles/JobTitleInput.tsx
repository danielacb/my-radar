import { Button } from "@nextui-org/button";
import { useMutation, useQuery } from "convex/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Chip } from "@nextui-org/chip";
import { Input } from "@nextui-org/input";

import { api } from "@/convex/_generated/api";

const schema = z.object({
  jobTitle: z
    .string()
    .trim()
    .min(1, { message: "Job title must contain at least 1 character" })
    .max(50),
});

type FormFields = z.infer<typeof schema>;

export const JobTitleInput = () => {
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
    setFocus,
    setError,
  } = useForm<FormFields>({
    defaultValues: { jobTitle: "" },
    resolver: zodResolver(schema),
  });

  const jobTitles = useQuery(api.users.getJobTitles);
  const updateJobTitles = useMutation(api.users.updateJobTitles);

  const handleDelete = async (jobTitle: string) => {
    const newJobTitles = jobTitles?.filter((title) => title !== jobTitle);

    await updateJobTitles({ jobTitles: newJobTitles || [] });
  };

  const handleAdd: SubmitHandler<FormFields> = async (formData) => {
    const jobTitle = formData.jobTitle.trim();

    try {
      if (jobTitles?.includes(jobTitle))
        return setError("jobTitle", {
          message: "Job title already exists. Please add a different one.",
        });

      const newJobTitles = new Set(jobTitles || []);

      newJobTitles.add(jobTitle);

      await updateJobTitles({ jobTitles: Array.from(newJobTitles) });

      setFocus("jobTitle");
      reset();
    } catch (error) {
      console.error("Failed to add job title:", error);
      setError("jobTitle", {
        message: "Failed to add job title. Please try again.",
      });
    }
  };

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {jobTitles?.map((jobTitle) => (
          <Chip
            key={jobTitle}
            radius="sm"
            variant="flat"
            onClose={() => handleDelete(jobTitle)}
          >
            {jobTitle}
          </Chip>
        ))}
      </div>
      <form
        className="flex items-center gap-2 mt-2"
        onSubmit={handleSubmit(handleAdd)}
      >
        <div className="h-[88px] w-full">
          <Input
            errorMessage={errors?.jobTitle?.message || ""}
            isInvalid={!!errors.jobTitle}
            label="Add job title keyword"
            labelPlacement="outside"
            placeholder="Javascript"
            size="md"
            type="text"
            variant={errors.jobTitle ? "bordered" : "flat"}
            {...register("jobTitle")}
          />
        </div>
        <Button
          color="primary"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          size="md"
          type="submit"
        >
          Add
        </Button>
      </form>
    </>
  );
};
