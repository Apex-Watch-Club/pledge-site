export type NotificationType = {
  message: string;
  timestamp: number;
};

export type ToasterContextType = {
  clear: () => void;
  notify: (message: string) => void;
  remove: (idx: number) => void;
  toggle: () => void;
  isOpen: boolean;
  notifications: NotificationType[];
};
