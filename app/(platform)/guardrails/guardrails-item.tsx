import { KeyboardEvent, useState } from "react";
import { toast } from "react-toastify";
import { EditIcon } from "../../icons/edit-icon";
import { TrashIcon } from "../../icons/trash-icon";
import { DeleteConfirmationModal } from "../../components/delete-confirmation-modal";
import { GuardrailsConfig } from "../../types";
import { Button } from "@/app/components/button";
import { EditCell } from "./edit-cell";
import { createGuardrailsConfig } from "./services/create-guardrails-config";
import { updateGuardrailsConfigs } from "./services/update-guardrails-config";
import { deleteGuardrailsConfig } from "./services/delete-guardrails-config";

interface GuardrailsItem extends GuardrailsConfig {
  isOwner: boolean | undefined;
  isEditModeState?: boolean;
  addNewConfig?: (config: GuardrailsConfig) => void;
  handleUpdateConfig?: (config: GuardrailsConfig) => void;
  deleteConfig?: (id: string) => void;
}

export const GuardrailsItem = ({
  isOwner,
  id,
  name,
  guardrailDescription,
  examples,
  failCriteria,
  passCriteria,
  isEditModeState = false,
  addNewConfig,
  handleUpdateConfig,
  deleteConfig,
}: GuardrailsItem) => {
  const [isEditMode, setIsEditMode] = useState(isEditModeState);
  const [nameValue, setNameValue] = useState(name);
  const [guardrailDescriptionValue, setGuardrailDescriptionValue] =
    useState(guardrailDescription);
  const [examplesValue, setExamplesValue] = useState(examples);
  const [failCriteriaValue, setFailCriteriaValue] = useState(failCriteria);
  const [passCriteriaValue, setPassCriteriaValue] = useState(passCriteria);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditMode(false);
    }
  };

  const saveConfig = async () => {
    setIsLoading(true);
    try {
      const result = await createGuardrailsConfig({
        name: nameValue,
        description: guardrailDescriptionValue,
        examples: examplesValue,
        failCriteria: failCriteriaValue,
        passCriteria: passCriteriaValue,
      });
      toast.success("Config was created successfully");
      if (addNewConfig) {
        addNewConfig(result);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }

    setIsLoading(false);
    setIsEditMode(false);
  };

  const updateConfig = async () => {
    setIsLoading(true);

    try {
      await updateGuardrailsConfigs({
        name: nameValue,
        description: guardrailDescriptionValue,
        examples: examplesValue,
        failCriteria: failCriteriaValue,
        passCriteria: passCriteriaValue,
        id,
      });

      if (handleUpdateConfig) {
        handleUpdateConfig({
          id,
          name: nameValue,
          guardrailDescription: guardrailDescriptionValue,
          examples: examplesValue,
          failCriteria: failCriteriaValue,
          passCriteria: passCriteriaValue,
        });
      }
      toast.success("Config was updated successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }

    setIsEditMode(false);
    setIsLoading(false);
  };

  const handleSaveNewConfig = async () => {
    if (id) {
      await updateConfig();
    } else {
      await saveConfig();
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      await deleteGuardrailsConfig(id);
      deleteConfig?.(id);
      toast.success("Config was deleted successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
    setIsLoading(false);
  };

  return (
    <tr className="bg-white border-b last:border-none">
      <EditCell
        value={nameValue}
        isEditMode={isEditMode}
        updateValue={(value) => setNameValue(value)}
        handleKeyDown={handleKeyDown}
      />
      <EditCell
        value={guardrailDescriptionValue}
        isEditMode={isEditMode}
        updateValue={(value) => setGuardrailDescriptionValue(value)}
        handleKeyDown={handleKeyDown}
      />
      <EditCell
        value={passCriteriaValue}
        isEditMode={isEditMode}
        updateValue={(value) => setPassCriteriaValue(value)}
        handleKeyDown={handleKeyDown}
      />
      <EditCell
        value={failCriteriaValue}
        isEditMode={isEditMode}
        updateValue={(value) => setFailCriteriaValue(value)}
        handleKeyDown={handleKeyDown}
      />
      <EditCell
        value={examplesValue}
        isEditMode={isEditMode}
        updateValue={(value) => setExamplesValue(value)}
        handleKeyDown={handleKeyDown}
      />
      <td className="p-3">
        {isOwner && (
          <div className="flex gap-2 items-start">
            {isEditMode ? (
              <Button
                isLoading={isLoading}
                label="Save"
                onClick={handleSaveNewConfig}
              />
            ) : (
              <>
                <Button
                  label={<EditIcon />}
                  type="secondary"
                  onClick={() => setIsEditMode(true)}
                />
                <Button
                  label={<TrashIcon />}
                  type="secondary"
                  onClick={() => setIsConfirmationModalOpen(true)}
                />
              </>
            )}
          </div>
        )}

        {isConfirmationModalOpen && (
          <DeleteConfirmationModal
            isLoading={isLoading}
            title="Delete config"
            description="Are you sure you want to delete the config? This action cannot be undone."
            buttonLabel="Delete config"
            handleDelete={handleDelete}
            handleCancel={() => setIsConfirmationModalOpen(false)}
          />
        )}
      </td>
    </tr>
  );
};
