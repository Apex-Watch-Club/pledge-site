import { ReactNode, useState } from "react";
import { ToasterContext } from "../contexts/ToasterContext";
import { NotificationType } from "../types";

export default function ToasterProvider(props: { children: ReactNode }) {
  const { children, ...config } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const notify = (message: string) => {
    setNotifications((prev) => {
      const newNotifications = JSON.parse(JSON.stringify(prev));
      newNotifications.push({ message, timestamp: Date.now() });
      return newNotifications;
    });
  };

  const clear = () => {
    setNotifications([]);
  };

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const remove = (idx: number) => {
    setNotifications((prev) => {
      const newNotifications = JSON.parse(JSON.stringify(prev));
      newNotifications.splice(idx, 1);
      return newNotifications;
    });
  };

  return (
    <ToasterContext.Provider
      value={{ clear, notify, remove, toggle, isOpen, notifications }}
    >
      {children}
    </ToasterContext.Provider>
  );
}
