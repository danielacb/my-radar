import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Divider } from "@nextui-org/divider";
import { useMutation, useQuery } from "convex/react";
import { Chip } from "@nextui-org/chip";
import { Input } from "@nextui-org/input";
import { FormEvent, useState } from "react";

import { ThemeSwitch } from "../theme-switch";

import { api } from "@/convex/_generated/api";

export default function SettingsModal() {
  const [jobTitle, setJobTitle] = useState("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
      <Button variant="bordered" onPress={onOpen}>
        Settings
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement="top-center"
        size="sm"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl">
                Settings
              </ModalHeader>
              <ModalBody className="py-6">
                <h4 className="font-bold text-large">Job Title keywords</h4>
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
                  className="flex items-end gap-2 mt-2"
                  onSubmit={handleAdd}
                >
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

                <Divider className="my-8" />

                <div className="flex items-center">
                  <h4 className="font-bold text-large w-full">Theme</h4>
                  <ThemeSwitch />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
