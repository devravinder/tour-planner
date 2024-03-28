import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "services/queryKeys";
import { getTours } from "services/tourService";
import TourListingTable from "./TourListingTable";

export default function TourListPage() {
  const { data, isLoading } = useQuery(queryKeys.tours(), getTours, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    suspense: false,
  });
  if (isLoading) return <div className="">Loading</div>;

  return <TourListingTable tours={data || []}></TourListingTable>;
}
