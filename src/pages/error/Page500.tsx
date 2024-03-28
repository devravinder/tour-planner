import ErrorCard from "components/ErrorCard";

export default function Page500() {
  return (
    <ErrorCard
      action={{ text: "Reload", onClick: () => window.location.replace("/") }}
      title="Server Issue"
      subTitle="Please be patient"
      description="We are working on the issue, we'll get back to you soon....please share the error with dev team"
    />
  );
}
