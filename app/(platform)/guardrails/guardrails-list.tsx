"use client";

import { useState } from "react";
import { Button } from "@/app/components/button";
import { GuardrailsConfig, User } from "../../types";
import { useUser } from "../UserProvider";
import { GuardrailsItem } from "./guardrails-item";

interface GuardrailsListProps {
  configs: Array<GuardrailsConfig>;
}

export default function GuardrailsList({ configs }: GuardrailsListProps) {
  const user: User | undefined = useUser();
  const [configsList, setConfigsList] = useState(configs);
  const [isAddNewConfigState, setIsAddNewConfigState] = useState(false);

  const addNewConfig = (config: GuardrailsConfig) => {
    setConfigsList([...configsList, config]);
    setIsAddNewConfigState(false);
  };

  const deleteConfig = (id: string) => {
    const updatedConfigs = configsList.filter((item) => item.id !== id);
    setConfigsList(updatedConfigs);
  };

  const handleUpdateConfig = (config: GuardrailsConfig) => {
    const updatedConfigs = configsList.map((item) => {
      if (item.id === config.id) {
        return config;
      }

      return item;
    });

    setConfigsList(updatedConfigs);
  };

  return (
    <div className="mb-4 w-full">
      <div className="flow-root">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">Guardrails configs</h3>
          {user?.isOwner && (
            <Button
              label="New config"
              onClick={() => setIsAddNewConfigState(true)}
            />
          )}
        </div>
        <hr className="h-px my-4 bg-gray-200 border-0" />
        {configsList.length === 0 ? (
          <p className="text-gray-500">
            There are no Guardrails configs associated with your account.
          </p>
        ) : (
          <table className="table-auto w-full bg-white rounded overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Fail criteria</th>
                <th>Pass criteria</th>
                <th>Examples</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isAddNewConfigState && (
                <GuardrailsItem
                  isOwner={user?.isOwner}
                  key="new-guardrails-config"
                  examples=""
                  failCriteria=""
                  guardrailDescription=""
                  id=""
                  name=""
                  passCriteria=""
                  isEditModeState={true}
                  addNewConfig={addNewConfig}
                  handleUpdateConfig={handleUpdateConfig}
                />
              )}

              {configsList.map((item) => (
                <GuardrailsItem
                  deleteConfig={deleteConfig}
                  handleUpdateConfig={handleUpdateConfig}
                  isOwner={user?.isOwner}
                  key={item?.id}
                  {...item}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
