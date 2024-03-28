import { Outline } from "components/Button";

type DeleteModalProps = {
  onCancel: VoidFunction;
  onDelete: VoidFunction;
};
export default function DeleteModal({ onDelete, onCancel }: DeleteModalProps) {
  return (
    <div className="flex flex-col w-80 h-36 gap-2 justify-between p-2">
      <h1 className="text-xl border-b flex-grow-0 text-center font-bold">
        Delete
      </h1>
      <p className=" flex-grow">Deleted data can not be retrived</p>
      <div className="flex flex-row justify-between flex-grow-0 gap-2">
        <Outline.Primary onClick={onCancel} className="p-1">
          Cancel
        </Outline.Primary>
        <Outline.Danger onClick={onDelete} className="p-1">
          Delete
        </Outline.Danger>
      </div>
    </div>
  );
}
