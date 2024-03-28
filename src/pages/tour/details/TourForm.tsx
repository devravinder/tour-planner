import {
  Expense,
  Tour,
  categories,
  createTour,
  editTour,
  emptyExpense,
  emptyTour,
  services,
  travellingTypes,
} from "services/tourService";
import { PageMode } from "./TourDetailsPage";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Input from "components/form/input/Input";
import { Button, Outline } from "components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "services/queryKeys";
import { useNavigate, useParams } from "react-router";
import { DateInput } from "components/form/input/DateInput";
import DropZone from "components/form/input/drop-zone";
import ImagePreview from "./ImagePreview";

import Separator from "components/Separator";
import {
  Label,
  InputContainer,
  InputError,
  Description,
} from "components/form";
import {
  TemplateFormData,
  expenseOptions,
  toFormData,
  toTour,
  statusOptions,
} from "./utils";
import Select from "components/form/input/Select";
import RichTextEditor from "components/form/input/rich-text/RichTextEditor";
import DateRangeInput from "components/form/input/DateRangeInput";
import Checkbox from "components/form/input/Checkbox";
import Radio from "components/form/input/Radio";
import Switch from "components/form/input/Switch";
import { neverValue } from "services/utils";
import Icons from "components/icons";

type TourFormProps = {
  pageMode: PageMode;
  tour: Tour;
  setPageMode: (pageMode: PageMode) => void;
};

export default function TourForm({ tour }: TourFormProps) {
  const {
    register,
    reset,
    trigger,
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TemplateFormData>({
    defaultValues: toFormData(tour),
    mode: "onBlur",
  });
  const { fields, insert, remove } = useFieldArray({
    control,
    name: "expenses",
  });

  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();

  const toListView = () => {
    navigate("/tours/list");
  };
  const addMutation = useMutation(createTour, {
    onError(error, variables, context) {
      console.log({ error, variables, context });
    },
    onSuccess() {
      queryClient.invalidateQueries(queryKeys.tours());
      toListView();
    },
  });

  const editMutation = useMutation(editTour, {
    onError(error, variables, context) {
      console.log({ error, variables, context });
      toListView();
    },
    onSuccess() {
      queryClient.invalidateQueries(queryKeys.tours());
      toListView();
    },
  });

  const onFormSubmit = (data: TemplateFormData) => {
    const payload = toTour(data);
    params.id ? editMutation.mutate(payload) : addMutation.mutate(payload);
  };
  const handleReset = () => {
    reset(toFormData(emptyTour));
  };

  const addEXpense = (currentIndex: number) => {
    insert(currentIndex + 1, emptyExpense);
  };

  const deleteExpense = (currentIndex: number) => {
    /*     if (fields.length == 1) {
      update(0, emptyExpense);
      return;
    } */
    recalculateExpenses(getValues("expenses")?.[currentIndex]);
    remove(currentIndex);
  };
  const recalculateExpenses = (removedExpense?: Expense) => {
    if (removedExpense) {
      setValue(
        "totalExpense",
        (getValues("totalExpense") || 0) - (removedExpense?.amount || 0),
      );
    } else {
      const totalExpenses = (getValues("expenses") || []).reduce(
        (p: number, c: Expense) => p + parseFloat(`${c.amount || 0}`),
        0,
      );
      setValue("totalExpense", totalExpenses);
    }
  };

  const titleRef = register("title", { required: "Title Required" });

  const expenseRef = register("plannedExpense", {
    required: "Expense amount is required",
  });
  register("image");

  const totalExpense = watch("totalExpense");
  const image = watch("image");
  const encodeImageFileAsURL = (file: File | Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  const handleFileUpload = async (files: File[]) => {
    // handle error cases
    const url = await encodeImageFileAsURL(files[0]);
    setValue("image", url as string);
    trigger("image");
  };

  console.log({ errors, v: getValues() });

  return (
    <form
      className="flex flex-col gap-y-4"
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <div className="flex flex-col gap-y-4">
        <InputContainer>
          <Label htmlFor="image">Image</Label>
          {image ? (
            <ImagePreview
              url={image}
              onRemove={() => {
                setValue("image", "");
                trigger("image");
              }}
            />
          ) : (
            <DropZone onFilesDrop={handleFileUpload} multiple={false}>
              <Description className="text-lg">
                Click or Drop a Image
              </Description>
            </DropZone>
          )}
          <InputError errors={errors} name="image" />
        </InputContainer>
        <Separator.Horizontal />
        <InputContainer>
          <Label htmlFor="title">Title</Label>
          <Input {...titleRef} placeholder="Title" />
          <InputError errors={errors} name="title" />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="description">Description</Label>
          <Controller
            control={control}
            name="description"
            defaultValue={getValues("description")}
            rules={{ required: "Discription Required" }}
            render={({ field: { onChange, value } }) => (
              <RichTextEditor onChange={onChange} value={value} />
            )}
          />
          <InputError errors={errors} name="description" />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="travellingType">Travelling</Label>
          <div className="flex flex-row gap-4 flex-wrap">
            {travellingTypes.map((e) => (
              <div key={e} className="flex flex-row gap-1">
                <Radio {...register("travellingType")} value={e} />{" "}
                <span>{e}</span>
              </div>
            ))}
          </div>
        </InputContainer>
        <InputContainer>
          <Label htmlFor="categories">Tags</Label>
          <Controller
            control={control}
            name="categories"
            defaultValue={getValues("categories")}
            rules={{ required: "Categories Required" }}
            render={({ field: { value, onChange } }) => (
              <Select
                options={categories}
                placeholder="Choose Option"
                valueKey={neverValue}
                labelKey={neverValue}
                multi={true}
                searchable={true}
                value={value}
                onChange={onChange}
              ></Select>
            )}
          />
          <InputError errors={errors} name="categories" />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="services">Services</Label>
          <div className="flex flex-row gap-4 flex-wrap">
            {services.map((e) => (
              <div key={e} className="flex flex-row gap-1">
                <Checkbox {...register("services")} value={e} />{" "}
                <span>{e}</span>
              </div>
            ))}
          </div>
          <InputError errors={errors} name="services" />
        </InputContainer>

        <div className="w-full flex flex-row gap-x-4">
          <InputContainer className="w-1/2">
            <Label htmlFor="status">Status</Label>
            <Controller
              control={control}
              name="status"
              defaultValue={getValues("status")}
              rules={{ required: "Status Required" }}
              render={({ field: { value, onChange } }) => (
                <Select
                  options={statusOptions}
                  placeholder="Choose Option"
                  valueKey={"value"}
                  labelKey={"label"}
                  multi={false}
                  searchable={true}
                  value={value}
                  onChange={onChange}
                ></Select>
              )}
            />
            <InputError errors={errors} name="status" />
          </InputContainer>
          <InputContainer className="w-1/2 flex flex-row items-center gap-4">
            <Label htmlFor="needLoan">Need Loan?</Label>
            <Controller
              control={control}
              name="needLoan"
              defaultValue={getValues("needLoan")}
              rules={{ required: "Required" }}
              render={({ field: { value, onChange } }) => (
                <Switch value={value} onChange={onChange}></Switch>
              )}
            />
            <InputError errors={errors} name="needLoan" />
          </InputContainer>
        </div>

        <div className="w-full flex flex-row gap-x-4">
          <InputContainer className="w-1/2">
            <Label htmlFor="duration">Duration</Label>
            <Controller
              control={control}
              name="duration"
              defaultValue={getValues("duration")}
              rules={{ required: "Duration Required" }}
              render={({ field: { value, onChange } }) => (
                <DateRangeInput
                  value={value}
                  onChange={onChange}
                  placeholder="Duration"
                  minDate={new Date()}
                />
              )}
            />
            <InputError errors={errors} name="duration" />
          </InputContainer>
          <InputContainer className="w-1/2">
            <Label htmlFor="plannedExpense">Planned Expense</Label>
            <Input
              {...expenseRef}
              placeholder="Planned Expense"
              type="number"
            />
            <InputError errors={errors} name="plannedExpense" />
          </InputContainer>
        </div>

        <Separator.Horizontal />
        <div className="w-full flex flex-row gap-x-4">
          <InputContainer className="w-1/2">
            <Label htmlFor="startDate">Start Date</Label>
            <Controller
              control={control}
              name="startDate"
              defaultValue={getValues("startDate")}
              render={({ field: { value, onChange } }) => (
                <DateInput
                  value={value}
                  onChange={onChange}
                  type="date"
                  placeholder="Start Date"
                />
              )}
            />
            <InputError errors={errors} name="startDate" />
          </InputContainer>
          <InputContainer className="w-1/2">
            <Label htmlFor="endDate">End Date</Label>
            <Controller
              control={control}
              name="endDate"
              defaultValue={getValues("endDate")}
              render={({ field: { value, onChange } }) => (
                <DateInput
                  value={value}
                  onChange={onChange}
                  type="date"
                  placeholder="End Date"
                />
              )}
            />
            <InputError errors={errors} name="endDate" />
          </InputContainer>
        </div>

        <div className="w-full flex flex-row justify-between">
          <div className="w-1/2 flex gap-x-2">
            <label>Total Expenses:</label>
            <span>{totalExpense}</span>
          </div>
          <div className="w-1/2 flex justify-end">
            {getValues("expenses")?.length == 0 && (
              <Outline.Primary
                onClick={() => addEXpense(0)}
                type="button"
                className="px-4"
              >
                + Add Expense
              </Outline.Primary>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          {fields?.map((field, index) => {
            return (
              <div
                key={`${field.id}_${index}`}
                className="flex flex-row gap-x-4"
              >
                <InputContainer className="w-1/6">
                  <Label htmlFor={`expenses.${index}.type`}>Type</Label>
                  <Controller
                    control={control}
                    name={`expenses.${index}.type`}
                    defaultValue={fields[index].type}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        options={expenseOptions}
                        placeholder="Choose Option"
                        valueKey={"value"}
                        labelKey={"label"}
                        multi={false}
                        searchable={false}
                        value={value}
                        onChange={onChange}
                      ></Select>
                    )}
                  />
                  <InputError errors={errors} name={`expenses.${index}.type`} />
                </InputContainer>
                <InputContainer>
                  <Label htmlFor={`expenses.${index}.details`}>Details</Label>
                  <Input
                    {...register(`expenses.${index}.details`)}
                    placeholder="Enter Deatils"
                  />
                  <InputError
                    errors={errors}
                    name={`expenses.${index}.details`}
                  />
                </InputContainer>
                <InputContainer>
                  <Label htmlFor={`expenses.${index}.amount`}>Amount</Label>
                  <Input
                    {...register(`expenses.${index}.amount`)}
                    onBlur={() => recalculateExpenses()}
                    placeholder="Enter Amount"
                  />
                  <InputError
                    errors={errors}
                    name={`expenses.${index}.amount`}
                  />
                </InputContainer>

                <div className="w-1/5 flex flex-row gap-x-2 pt-8">
                  <div
                    className="w-8 text-orange-400 cursor-pointer"
                    onClick={() => deleteExpense(index)}
                  >
                    <Icons.CloseCircle className="w-7 h-7 font-thin" />
                  </div>
                  <div
                    className="w-8 text-blue-400 cursor-pointer"
                    onClick={() => addEXpense(index)}
                  >
                    <Icons.PlusCircle className="w-7 h-7 font-thin" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="">
          <Outline.Disabled type="button" onClick={toListView}>
            Close
          </Outline.Disabled>
        </div>
        <div className=" flex flex-row gap-4">
          <Outline.Secondary type="reset" onClick={handleReset}>
            Reset
          </Outline.Secondary>
          <Button.Primary type="submit">Submit</Button.Primary>
        </div>
      </div>
    </form>
  );
}
