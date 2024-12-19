import { useState, KeyboardEvent } from "react";
import { toast } from "react-toastify";
import { Input } from "./input";
import { Button } from "./button";
import { Modal } from "./modal";
import { UserPlusIcon } from "../icons/user-plus-icon";
import { isEmptyString } from "../utils/is-empty-string";
import { sendInvite } from "../(platform)/members/services/send-invite";
import { RadioButton } from "./radio-button";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleSendInvite = async () => {
    try {
      setIsLoading(true);
      const response = await sendInvite({
        email,
        role,
        canChooseRole,
        organizationId: orgId,
      });

      if (response?.code === "invitation-sent") {
        toast.success(response?.message);
      } else {
        toast.warning(response?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send invite");
    }
    setAddUserModalOpen(false);
    setIsLoading(false);

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
  console.log("role", role);

  return (
    <Modal closeModal={() => setAddUserModalOpen(false)}>
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
                  <RadioButton
                    id="radio-button-owner"
                    checked={role === "owner"}
                    value="owner"
                    label="Owner"
                    onChange={() => setRole("owner")}
                  />
                  <RadioButton
                    id="radio-button-member"
                    checked={role === "member"}
                    value="member"
                    label="Member"
                    onChange={() => setRole("member")}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
        <Button
          isLoading={isLoading}
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
