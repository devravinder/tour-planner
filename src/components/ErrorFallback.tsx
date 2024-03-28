import ErrorCard from "./ErrorCard";

type ErrorPageFallbackProps = {
  error: Error;
};

export default function ErrorFallback({ error }: ErrorPageFallbackProps) {
  return (
    <ErrorCard
      title={"Oops!"}
      subTitle={`${error.name}: ${error.message}`}
      action={{ text: "Reload", onClick: () => window.location.replace("/") }}
    />
  );
}
