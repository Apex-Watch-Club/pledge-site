import { useContext } from "react";
import { ToasterContext } from "../contexts/ToasterContext";

export default function useToaster() {
  return useContext(ToasterContext);
}
