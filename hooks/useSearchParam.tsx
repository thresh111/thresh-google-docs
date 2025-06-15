import { useQueryState, parseAsString } from "nuqs";

function useSearchParam(key: string) {
  return useQueryState(key, parseAsString.withDefault("").withOptions({ clearOnDefault: true }));
}

export default useSearchParam;
