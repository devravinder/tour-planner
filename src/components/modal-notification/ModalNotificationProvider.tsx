/* eslint-disable react-refresh/only-export-components */
import { Fragment, createContext, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type Content = JSX.Element | string;

export type Contents = Record<string, Content>;

type ModalNotificationContext = {
  contents: Contents;
  addContent: (id: string, content: Content) => void;
  removeContent: (id: string) => void;
};

const ModalNotificationContext = createContext({} as ModalNotificationContext);

export function useModalNotification() {
  const notificationContext = useContext(ModalNotificationContext);
  return notificationContext;
}

export function ModalNotificationProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const contentsRef = useRef<Contents>({}); // using ref, bcz when we do setContents multiple times without any delay, useState will take only latest value
  const [contents, setContents] = useState<Contents>({});

  const removeContent = (id: string) => {
    delete contentsRef.current[id];
    setContents({ ...contentsRef.current });
  };

  const addContent = (id: string, content: Content) => {
    contentsRef.current[id] = content;
    setContents({ ...contentsRef.current });
  };

  return (
    <ModalNotificationContext.Provider
      value={{
        contents: contents,
        addContent,
        removeContent,
      }}
    >
      {createPortal(
        <Fragment>
          {Object.entries(contents).map(([key, content]) => (
            <Fragment key={key}>{content}</Fragment>
          ))}
        </Fragment>,
        document.body,
      )}
      {children}
    </ModalNotificationContext.Provider>
  );
}

export default ModalNotificationProvider;
