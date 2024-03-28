/* eslint-disable react-refresh/only-export-components */
import React, { memo, useState, useRef, useCallback, useEffect } from "react";
import openFile from "./openFile";
import readFileAsText from "./readFileAsText";

export interface DropZoneProps {
  onDragStateChange?: (isDragActive: boolean) => void;
  onDrag?: () => void;
  onDragIn?: () => void;
  onDragOut?: () => void;
  onDrop?: () => void;
  onFilesDrop: (files: File[]) => void;
  multiple?: boolean;
  readAsTxt?: boolean;
  children?: JSX.Element;
  className?: string;
}

function DropZone({
  onDragStateChange,
  onDrag,
  onDragIn,
  onDragOut,
  onDrop,
  onFilesDrop,
  multiple,
  readAsTxt,
  className = "",
  children,
}: DropZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const dropZoneRef = useRef<null | HTMLDivElement>(null);

  const mapFileListToArray = (files: FileList) => {
    const array = [];
    for (let i = 0; i < files.length; i++) {
      array.push(files.item(i));
    }
    return array;
  };

  const handleDragIn = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onDragIn?.();

      if (event.dataTransfer?.items?.length) {
        setIsDragActive(true);
      }
    },
    [onDragIn],
  );

  // Create handler for dragleave event:
  const handleDragOut = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onDragOut?.();

      setIsDragActive(false);
    },
    [onDragOut],
  );

  // Create handler for dragover event:
  const handleDrag = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();

      onDrag?.();
      if (!isDragActive) {
        setIsDragActive(true);
      }
    },
    [isDragActive, onDrag],
  );

  // Create handler for drop event:
  const handleDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      event.stopPropagation();

      setIsDragActive(false);
      onDrop?.();

      if (event.dataTransfer?.files?.length) {
        const files = mapFileListToArray(event.dataTransfer.files) as File[];
        onFilesDrop?.(multiple ? files : [files[0]]);
        event.dataTransfer.clearData();

        if (readAsTxt)
          // handle propely for multiple files
          readFileAsText({ file: files[0] })
            .catch((err) => {
              console.log(err);
              Promise.resolve(undefined);
            })
            .then((text) => console.log({ text })); // we can do sometings
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onDrop, onFilesDrop],
  );

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    openFile({ multiple }).then(
      (files) => onFilesDrop?.(mapFileListToArray(files) as File[]),
    );
  };

  // Obser active state and emit changes:
  useEffect(() => {
    onDragStateChange?.(isDragActive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragActive]);

  // Attach listeners to dropzone on mount:
  useEffect(() => {
    const tempZoneRef = dropZoneRef?.current;
    if (tempZoneRef) {
      tempZoneRef.addEventListener("dragenter", handleDragIn);
      tempZoneRef.addEventListener("dragleave", handleDragOut);
      tempZoneRef.addEventListener("dragover", handleDrag);
      tempZoneRef.addEventListener("drop", handleDrop);
    }

    // Remove listeners from dropzone on unmount:
    return () => {
      tempZoneRef?.removeEventListener("dragenter", handleDragIn);
      tempZoneRef?.removeEventListener("dragleave", handleDragOut);
      tempZoneRef?.removeEventListener("dragover", handleDrag);
      tempZoneRef?.removeEventListener("drop", handleDrop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={dropZoneRef}
      onClick={onClick}
      className={`w-full h-20 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer ${
        isDragActive ? "active border-primary-500 " : ""
      }  ${className}`}
    >
      {children}
    </div>
  );
}

export default memo(DropZone);
