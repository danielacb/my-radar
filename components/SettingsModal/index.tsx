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

import { ThemeSwitch } from "../theme-switch";
import { JobTitleInput } from "../JobTitles/JobTitleInput";

export default function SettingsModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                <JobTitleInput />

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
