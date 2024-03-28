import tw from "tailwind-styled-components";
export type SwitchProps = {
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
};

export default function Switch({
  value = false,
  onChange,
  className = "",
}: SwitchProps) {
  return (
    <SwitchContainer onClick={() => onChange?.(!value)} className={className}>
      <SwichInput type="checkbox" checked={value} readOnly />
      <SwitchBackgroung />
      <SwitchSpace />
      <SwitchDot />
    </SwitchContainer>
  );
}

const SwitchContainer = tw.div`relative w-12 h-6 p-[2px] flex flex-row items-center cursor-pointer rounded-full `;
const SwichInput = tw.input`sr-only peer`;
const SwitchBackgroung = tw.span`z-0 absolute bg-gray-200 peer-checked:bg-primary w-full h-full left-0 right-0  rounded-full`;
const SwitchSpace = tw.span`z-10 flex-grow-0 peer-checked:flex-grow transition-all duration-100`;
const SwitchDot = tw.span`z-10 flex-grow-0 w-5 h-5 rounded-full bg-white`;
