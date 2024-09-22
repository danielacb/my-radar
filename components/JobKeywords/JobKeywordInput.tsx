import { Button } from "@nextui-org/button";
import { useMutation, useQuery } from "convex/react";
import { Chip } from "@nextui-org/chip";
import { FormEvent, useState } from "react";
import { Input } from "@nextui-org/input";

import { api } from "@/convex/_generated/api";

export const JobKeywordInput = () => {
  const [jobTitle, setJobTitle] = useState("");

  const jobTitles = useQuery(api.settings.getJobTitles);
  const updateJobTitles = useMutation(api.settings.updateJobTitles);

  const handleDelete = async (jobTitle: string) => {
    const newJobTitles = jobTitles?.filter((title) => title !== jobTitle);

    await updateJobTitles({ jobTitles: newJobTitles || [] });
  };

  const handleAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newJobTitles = new Set(jobTitles || []);

    newJobTitles.add(String(jobTitle));
    await updateJobTitles({ jobTitles: Array.from(newJobTitles) });
    setJobTitle("");
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
      <form className="flex items-end gap-2 mt-2" onSubmit={handleAdd}>
        <Input
          label="Add job title keyword"
          labelPlacement="outside"
          placeholder="Javascript"
          size="md"
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <Button color="primary" size="md" type="submit">
          Add
        </Button>
      </form>
    </>
  );
};
