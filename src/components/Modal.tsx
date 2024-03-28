import tw from "tailwind-styled-components";

export const Modal = tw.div`bg-disabled-500 absolute top-0 bottom-0 left-0 w-full h-full flex justify-center items-center z-[51]`;

export const ModalContent = tw.div`flex justify-center items-center rounded-md p-1 bg-white`;

/* 
<Modal>
    <ModalContent>
        Hello
    </ModalContent>
</Modal>

*/
