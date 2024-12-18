"use client";

import { InfoIcon } from "./icons/info-icon";
import { XSquareIcon } from "./icons/x-square-icon";
import { CircleCheckIcon } from "./icons/circle-check-icon";
import { AlertIcon } from "./icons/alert-icon";
import { ToastContainer } from "react-toastify";

export const Toast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme="light"
      toastClassName="border border-gray-200 rounded-lg shadow"
      icon={({ type }) => {
        switch (type) {
          case "info":
            return <InfoIcon className="stroke-indigo-400" />;
          case "error":
            return <XSquareIcon className="stroke-red-500" />;
          case "success":
            return <CircleCheckIcon className="stroke-green-700" />;
          case "warning":
            return <AlertIcon className="stroke-yellow-500" />;
          default:
            return null;
        }
      }}
    />
  );
};
