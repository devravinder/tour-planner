import Icons from "components/icons";
import { forwardRef } from "react";
import tw from "tailwind-styled-components";
type ImagePreviewProps = {
  url?: string;
  onRemove?: (url?: string) => void;
  className?: string;
};

const ImagePreview = forwardRef<HTMLDivElement, ImagePreviewProps>(
  ({ url, onRemove, className = "" }, ref) => {
    return (
      <Preview.Container ref={ref} className={className}>
        <Preview.Button onClick={() => onRemove?.(url)}>
          <Icons.CloseOutline className="w-8 h-8" />
        </Preview.Button>
        <img src={url} className="rounded-md"></img>
      </Preview.Container>
    );
  },
);

const Preview = {
  Container: tw.div`relative group/img p-2 m-auto border-2 border-dashed border-primary-500 rounded-md max-w-3xl h-auto`,
  Button: tw.div`w-9 h-9 absolute top-2 left-2 flex justify-center items-center cursor-pointer invisible group-hover/img:visible bg-disabled-500 rounded-full`,
};
export default ImagePreview;
