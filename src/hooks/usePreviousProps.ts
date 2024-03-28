import { useEffect, useRef } from "react";

export default function usePreviousProps<T>(value: T) {
  const ref = useRef<T>();
  /* 
	const previous = usePreviousProps({ value }) 
	access-> previous?.value
	*/
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
