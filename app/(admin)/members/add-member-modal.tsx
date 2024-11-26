import { useState } from "react";
import { toast } from "react-toastify";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { UserPlusIcon } from "../../icons/user-plus-icon";
import { isEmptyString } from "../../utils/is-empty-string";
import { sendInvite } from "./service/send-invite";
import "react-toastify/dist/ReactToastify.css";

interface AddUserModalProps {
  setAddAddUserModalOpen: (isModalOpen: boolean) => void;
}

export const AddMemberModal = ({
  setAddAddUserModalOpen,
}: AddUserModalProps) => {
  const [email, setEmail] = useState("");

  const handleSendInvite = async () => {
    try {
      const response = await sendInvite({ email });

      if (response?.code === "invitation-sent") {
        toast.success(response?.message);
      } else {
        toast.warning(response?.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }

    setAddAddUserModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEmptyString(email)) {
      return;
    }

    if (event.key === "Enter") {
      handleSendInvite();
    }
  };

  return (
    <Modal>
      <div className="bg-white px-4 pb-4 pt-5">
        <div className="flex gap-4">
          <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100">
            <UserPlusIcon />
          </div>
          <div className="flex-grow">
            <h3
              className="text-base font-semibold text-gray-900"
              id="modal-title"
            >
              Add member
            </h3>
            <hr className="h-px my-3 bg-gray-200 border-0" />
            <div className="mt-2">
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  User email
                </label>
                <Input
                  onChange={(value: string) => {
                    setEmail(value);
                  }}
                  onKeyDown={handleKeyDown}
                  value={email}
                  type="email"
                  id="email"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
        <Button
          disabled={isEmptyString(email)}
          label="Send invite"
          onClick={handleSendInvite}
        />
        <Button
          type="secondary"
          label="Cancel"
          onClick={() => setAddAddUserModalOpen(false)}
        />
      </div>
    </Modal>
  );
};
