import useToaster from "../hooks/useToaster";
import { getDateFromTimestamp } from "../helpers";

export default function Toaster() {
  const { clear, notify, remove, toggle, isOpen, notifications } = useToaster();

  if (!isOpen) {
    return (
      <div className="fixed bottom-0 left-0">
        <button
          className="relative bg-gold p-2 m-8 rounded-lg z-50"
          onClick={toggle}
        >
          Toaster
          <span className="flex items-center justify-center p-1 bg-red-600 rounded-full text-xs w-6 h-6 absolute -right-3 -top-3">
            <p className="text-white">{notifications.length}</p>
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-3/12 h-screen bg-luxury-black p-4 z-50 drop-shadow-xl">
      <div className="flex justify-between absolute top-0 left-0 w-full bg-luxury-black p-4">
        <h1>Toaster</h1>
        <button onClick={toggle}>Close</button>
      </div>

      {/*NOTIFICATIONS*/}
      <div className="w-full h-full overflow-scroll mt-8">
        {/*SINGLE NOTIFICATION*/}
        {notifications.toReversed().map((n, idx) => (
          <div
            className="p-2 border-b-[1px] border-gold text-white rounded-sm break-all hover:bg-gold"
            key={idx}
          >
            <p className="mb-2">{n.message}</p>
            <div className="w-full flex justify-between items-center">
              <p className="text-xs text-dark-gold">
                {getDateFromTimestamp(n.timestamp)}
              </p>
              <button
                onClick={() => remove(notifications.length - idx - 1)}
                className="text-xs text-dark-gold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 p-4 bg-luxury-black w-full flex justify-center items-center">
        <button
          className="text-white border-[1px] border-white rounded-full p-4"
          onClick={clear}
        >
          x
        </button>
      </div>
    </div>
  );
}
