import { useState, KeyboardEvent } from "react";
import { toast } from "react-toastify";
import { Input } from "./input";
import { Button } from "./button";
import { Modal } from "./modal";
import { UserPlusIcon } from "../icons/user-plus-icon";
import { isEmptyString } from "../utils/is-empty-string";
import { sendInvite } from "../(platform)/members/service/send-invite";
import "react-toastify/dist/ReactToastify.css";

interface AddUserModalProps {
  orgId?: string | null;
  canChooseRole?: boolean;
  setOrgId?: (orgId: null) => void;
  setAddUserModalOpen: (isModalOpen: boolean) => void;
}

export const AddMemberModal = ({
  setOrgId,
  orgId,
  setAddUserModalOpen,
  canChooseRole = false,
}: AddUserModalProps) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");

  const handleSendInvite = async () => {
    try {
      const response = await sendInvite({
        email,
        role,
        canChooseRole,
        organizationId: orgId,
      });

      console.log("response", response);

      if (response?.code === "invitation-sent") {
        toast.success(response?.message);
      } else {
        toast.warning(response?.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }

    setAddUserModalOpen(false);

    if (setOrgId) {
      setOrgId(null);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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
              {canChooseRole && (
                <div className="mb-3">
                  <div className="flex items-center mb-4">
                    <input
                      defaultChecked={role === "owner"}
                      onClick={() => setRole("owner")}
                      id="default-radio-1"
                      type="radio"
                      value="owner"
                      name="default-radio"
                      className="accent-primary-700 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer"
                    />
                    <label
                      htmlFor="default-radio-1"
                      className="ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Owner
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      onClick={() => setRole("member")}
                      defaultChecked={role === "member"}
                      id="default-radio-2"
                      type="radio"
                      value="member"
                      name="default-radio"
                      className="accent-primary-700 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer"
                    />
                    <label
                      htmlFor="default-radio-2"
                      className="ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Member
                    </label>
                  </div>
                </div>
              )}
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
          onClick={() => setAddUserModalOpen(false)}
        />
      </div>
    </Modal>
  );
};
