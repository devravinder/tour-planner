/* eslint-disable react-refresh/only-export-components */
import { useOnClickOutside } from "hooks/useOnClickOutside";
import { Content, useModalNotification } from "./ModalNotificationProvider";
import { Modal, ModalContent } from "components/Modal";
import { useRef } from "react";

type ModalId = `modal${number}`;
/* 
 What we are doing here?
 Ans:- 
   we are adding many modal-contents to useModalNotification,
   and we are storing the modal-contents ids in idsRef.
   we are adding onClickOutside hook only to the first modal...that will pop/close one by one
   in createModalInstance, we are giving access to modal id, openModal & closeModal

*/
export default function useModal() {
  const { addContent, removeContent } = useModalNotification();
  const ref = useOnClickOutside(() => popModal());
  const idsCount = useRef(0);
  const idsRef = useRef<ModalId[]>([]);

  const nextId = (): ModalId => `modal${idsCount.current++}`;
  const lastId = (): ModalId => idsRef.current.at(-1) as ModalId;

  const popModal = () => {
    removeModelInstance(lastId());
  };
  const removeModelInstance = (id: ModalId) => {
    const index = idsRef.current.findIndex((e) => e === id);
    if (index >= 0) {
      idsRef.current.splice(index, 1);
      removeContent(id);
    }
  };

  const addModal = (id: ModalId, content: Content) => {
    idsRef.current.push(id);
    addContent(id, content);
  };

  const createModalInstance = () => {
    let called = false;
    const isFirst = idsRef.current.length == 0;
    const id = nextId();
    const closeModel = () => {
      removeModelInstance(id);
    };
    const openModal = (content: Content) => {
      if (called) {
        throw new Error(
          "openModal can be called only once per instance, create a new modal instance and try",
        );
      }
      called = true;
      addModal(
        id,
        <Modal>
          <ModalContent ref={isFirst ? ref : undefined}>{content}</ModalContent>
        </Modal>,
      );
    };
    return { id, closeModel, openModal };
  };

  return {
    createModalInstance,
    removeModelInstance,
  };
}
