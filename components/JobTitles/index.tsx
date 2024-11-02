import { Button } from "@nextui-org/button";
import { useMutation, useQuery } from "convex/react";
import { Chip } from "@nextui-org/chip";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { JobTitleInput } from "./JobTitleInput";

import { api } from "@/convex/_generated/api";

export const JobTitles = () => {
  const jobTitles = useQuery(api.users.getJobTitles);
  const updateJobTitles = useMutation(api.users.updateJobTitles);

  const handleDelete = async (jobTitle: string) => {
    const newJobTitles = jobTitles?.filter((title) => title !== jobTitle);

    await updateJobTitles({ jobTitles: newJobTitles || [] });
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (!jobTitles) return null;

  return (
    <div className="text-center mt-6">
      {jobTitles?.length === 0 ? (
        <>
          <h4 className="font-bold text-md mb-4">
            Add job titles to search for job openings
          </h4>
          <Button size="sm" onPress={onOpen}>
            Add job titles
          </Button>
        </>
      ) : (
        <>
          <p className="text-xs mb-2">Job keywords:</p>
          <div className="flex items-center justify-center gap-2 flex-wrap w-full">
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
            <Button size="sm" onPress={onOpen}>
              Add more
            </Button>
          </div>
        </>
      )}

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl">
                Add job titles
              </ModalHeader>
              <ModalBody>
                <JobTitleInput />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
