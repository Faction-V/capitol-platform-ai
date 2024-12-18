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
        <div className="rounded-md border overflow-hidden w-full">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b bg-gray-200">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-10 px-2 text-left align-middle font-medium text-zinc-700">
                  Enabled
                </th>
                <th className="h-10 px-2 text-left align-middle font-medium text-zinc-700">
                  Name
                </th>
                <th className="h-10 px-2 text-left align-middle font-medium text-zinc-700">
                  Description
                </th>
                <th className="h-10 px-2 text-left align-middle font-medium text-zinc-700">
                  Fail criteria
                </th>
                <th className="h-10 px-2 text-left align-middle font-medium text-zinc-700">
                  Pass criteria
                </th>
                <th className="h-10 px-2 text-left align-middle font-medium text-zinc-700">
                  Examples
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
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
    </div>
  );
}
