"use client";
import { createContext } from "react";
import { ToasterContextType } from "../types";

const ToasterContext = createContext<ToasterContextType>({
  clear: () => {},
  notify: (message: string) => {},
  toggle: () => {},
  isOpen: false,
  notifications: [],
});

export { ToasterContext };
