import ErrorCard from "components/ErrorCard";

export default function Page404() {
  return (
    <ErrorCard
      action={{
        text: "Goto Home Page",
        onClick: () => window.location.replace("/"),
      }}
      title="Page Not  Found"
      subTitle="Page Not Found (or) No Access"
      description="You may trying with invalid url (or) you may don't have access to the page, please reach out the admin"
    />
  );
}
