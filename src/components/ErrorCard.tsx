type ErrorCardProps = {
  title: string;
  subTitle: string;
  description?: string;
  action?: { text: string; onClick: VoidFunction };
};
const ErrorCard = ({
  title,
  subTitle,
  description,
  action,
}: ErrorCardProps) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 justify-center items-center border rounded-md shadow p-4 max-w-md min-w-[350px]">
        <h2 className="font-bold text-5xl text-gray-900">{title}</h2>
        <p className="p-2 bg-gray-100 rounded-md">{subTitle}</p>
        <p className="text-gray-600">{description}</p>
        {action && (
          <p className="flex justify-end w-full">
            <span
              className="p-2 bg-primary-light rounded-md cursor-pointer text-primary"
              onClick={action.onClick}
            >
              {action.text}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ErrorCard;
