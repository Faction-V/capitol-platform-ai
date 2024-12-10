import { KeyboardEvent, useState } from "react";
import { EditIcon } from "../../icons/edit-icon";
import { TrashIcon } from "../../icons/trash-icon";
import { DeleteConfirmationModal } from "../../components/delete-confirmation-modal";
import { GuardrailsConfig } from "../../types";
import { Button } from "@/app/components/button";
import { EditCell } from "./edit-cell";
import { createGuardrailsConfig } from "./services/create-guardrails-config";
import { updateGuardrailsConfigs } from "./services/update-guardrails-config";
import { toast } from "react-toastify";

interface GuardrailsItem extends GuardrailsConfig {
  isOwner: boolean | undefined;
  isEditModeState?: boolean;
  addNewConfig?: (config: GuardrailsConfig) => void;
  handleUpdateConfig?: (config: GuardrailsConfig) => void;
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
}: GuardrailsItem) => {
  const [isEditMode, setIsEditMode] = useState(isEditModeState);
  const [nameValue, setNameValue] = useState(name);
  const [guardrailDescriptionValue, setGuardrailDescriptionValue] =
    useState(guardrailDescription);
  const [examplesValue, setExamplesValue] = useState(examples);
  const [failCriteriaValue, setFailCriteriaValue] = useState(failCriteria);
  const [passCriteriaValue, setPassCriteriaValue] = useState(passCriteria);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditMode(false);
    }
  };

  const saveConfig = async () => {
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

    setIsEditMode(false);
  };

  const updateConfig = async () => {
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
    setIsEditMode(false);

    toast.success("Config was updated successfully");
  };

  const handleSaveNewConfig = async () => {
    if (id) {
      await updateConfig();
    } else {
      await saveConfig();
    }
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
              <Button label="Save" onClick={handleSaveNewConfig} />
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
                  onClick={() => {}}
                />
              </>
            )}
          </div>
        )}
      </td>
    </tr>
  );
};
