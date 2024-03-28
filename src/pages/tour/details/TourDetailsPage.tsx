import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fake, getTour } from "services/tourService";
import TourForm from "./TourForm";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "services/queryKeys";
import Icons from "components/icons";

export type PageMode = "create" | "edit" | "view";

export default function TourDetailsPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [pageMode, setPageMode] = useState<PageMode>(
    params.id ? "view" : "create",
  );
  const tour = useGetTourById(params.id);

  const toListView = () => {
    navigate("/tours/list");
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        <Icons.ArrowBack
          onClick={toListView}
          className="cursor-pointer w-5 h-5 text-primary"
        />
        <div className="text-center font-semibold text-secondary underline text-3xl">
          Tour Details
        </div>
        <div></div>
      </div>
      <TourForm
        pageMode={pageMode}
        setPageMode={setPageMode}
        tour={tour}
      ></TourForm>
    </div>
  );
}

const useGetTourById = (id?: string) => {
  const { data } = useQuery(
    queryKeys.tour(id),
    () => {
      return id ? getTour(id) : fake();
    },
    { suspense: true, refetchOnWindowFocus: false },
  );
  return data!;
};
