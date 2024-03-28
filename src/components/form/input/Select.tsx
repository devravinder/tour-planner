import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import IconChevronUp from "../../icons/IconChevronUp";
import IconChevronDown from "../../icons/IconChevronDown";
import IconClose from "../../icons/IconClose";
import tw from "tailwind-styled-components";

type MultiSelect<Option> = {
  multi: true;
  value?: Option[];
  onChange?(value?: Option[]): void;
};

type SingleSelect<Option> = {
  multi: false;
  value?: Option;
  onChange?(value?: Option): void;
};

export type Select<Option> = {
  disabled?: boolean;
  placeholder?: string;
  options: Option[];
  searchable?: boolean;
  className?: string;
  valueKey: Option extends string ? never : keyof Option;
  labelKey: Option extends string ? never : keyof Option;
} & (SingleSelect<Option> | MultiSelect<Option>);

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const Select = <Option extends unknown>({
  disabled,
  placeholder,
  options,
  className = "",
  multi: isMulti,
  searchable: isSearchable,
  labelKey,
  valueKey,
  value,
  onChange,
}: Select<Option>) => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const selevctInputRef = useOnClickOutside<HTMLDivElement>(() =>
    setShowMenu(false),
  );

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  const onInputClick = () => {
    setShowMenu(!showMenu);
  };

  const remove = (value: Option[], index: number) => {
    value.splice(index, 1);
    return value;
  };

  const removeTag = (value: Option[], index: number) => {
    if (isMulti) onChange?.([...remove(value, index)]);
  };

  const compare = (first: Option, second: Option) => {
    if (typeof first === "string") return first === second;
    return first[valueKey] === second[valueKey];
  };

  const findIndex = (option: Option, value: Option[]) => {
    if (typeof option === "string") return value.findIndex((e) => e === option);

    return value.findIndex((e) => e[valueKey] === option[valueKey]);
  };

  const addOrRemove = (option: Option, value: Option[]) => {
    const index = findIndex(option, value);
    if (index >= 0) remove(value, index);
    else value.push(option);
    return value;
  };

  const onOptionClick = (option: Option) => {
    if (isMulti) {
      if (!value) onChange?.([option]);
      else onChange?.(addOrRemove(option, value));
    } else {
      onChange?.(option);
    }
  };

  const isSelected = (option: Option) => {
    if (!value) return false;
    if (isMulti) return findIndex(option, value) >= 0;
    return compare(option, value);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const getDisplay = () => {
    if (!value || (value as Option[]).length === 0) {
      return <p className="text-gray-400">{placeholder}</p>;
    }
    if (!isMulti)
      return (typeof value === "string" ? value : value[labelKey]) as string;

    const isString = typeof value[0] === "string";

    return (
      <ChipContainer>
        {value.map((option, index) => (
          <Chip key={`selected-${index}`}>
            {(isString ? option : option[labelKey]) as string}
            <ChipIcon
              onClick={(e) => {
                e.stopPropagation();
                removeTag(value, index);
              }}
            >
              <IconClose />
            </ChipIcon>
          </Chip>
        ))}
      </ChipContainer>
    );
  };

  const getOptions = () => {
    if (!searchValue) return options;
    if (!(options && options.length)) return [];
    const search = searchValue.toLowerCase();

    if (typeof options[0] === "string")
      return options.filter(
        (o) => (o as string).toLowerCase().indexOf(search) >= 0,
      );
    return options.filter(
      (o) => (o[labelKey] as string).toLowerCase().indexOf(search) >= 0,
    );
  };

  const optionsList = () => {
    const options = getOptions();

    const isString = typeof options[0] === "string";

    return options.map((option, index) => (
      <Option
        onClick={() => onOptionClick(option)}
        key={`option-${index}`}
        className={
          isSelected(option)
            ? "bg-primary text-white first:rounded-t-md last:rounded-b-md"
            : ""
        }
      >
        {(isString ? option : option[labelKey]) as string}
      </Option>
    ));
  };

  return (
    <SelectContainer $disabled={disabled} tabIndex={0} className={className}>
      <SelectInput ref={selevctInputRef} onClick={onInputClick}>
        {getDisplay()}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onInputClick();
          }}
        >
          {showMenu ? <IconChevronUp /> : <IconChevronDown />}
        </div>
      </SelectInput>
      {showMenu && (
        <MenuContainer>
          {isSearchable && (
            <SearchInputContainer>
              <SearchInput
                onChange={onSearch}
                value={searchValue}
                ref={searchRef}
              />
            </SearchInputContainer>
          )}

          <OptionsContainer>{optionsList()}</OptionsContainer>
        </MenuContainer>
      )}
    </SelectContainer>
  );
};

const SelectContainer = tw.div<{
  $disabled?: boolean;
}>`w-full text-left border relative rounded-md focus-within:border-primary-500 focus-within:outline outline-1 focus-within:outline-primary-500 ${(
  p,
) => (p.$disabled ? "pointer-events-none bg-gray-200" : "")}`;
const SelectInput = tw.div`flex items-center justify-between select-none px-2 py-3 cursor-pointer`;
const MenuContainer = tw.div`absolute border rounded-md shadow-md z-50 w-full bg-white translate-y-2`;
const OptionsContainer = tw.div`max-h-52 overflow-auto`;
const SearchInput = tw.input`w-full border border-gray-200 rounded-md p-2 focus:border-primary-500 focus:ring-primary-500`;
const SearchInputContainer = tw.div`bg-disabled-50 p-2 `;
const Option = tw.div`p-2 cursor-pointer hover:bg-primary-500`;

const ChipContainer = tw.div`flex flex-wrap gap-2`;
const Chip = tw.div`flex gap-1 items-center bg-primary-200 text-sm px-2 py-[0.12rem] rounded-md`;
const ChipIcon = tw.span`flex items-center cursor-pointer`;

export default Select;
