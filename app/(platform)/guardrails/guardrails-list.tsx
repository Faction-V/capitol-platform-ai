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
        <table className="table-auto w-full bg-white rounded overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="border-r border-gray-300">Enabled</th>
              <th className="border-r border-gray-300">Name</th>
              <th className="border-r border-gray-300">Description</th>
              <th className="border-r border-gray-300">Fail criteria</th>
              <th className="border-r border-gray-300">Pass criteria</th>
              <th className="border-r border-gray-300">Examples</th>
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
                active={false}
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
      </div>
    </div>
  );
}
