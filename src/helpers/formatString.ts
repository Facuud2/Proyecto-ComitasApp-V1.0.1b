import type { TSelect } from "../types";

export const formatString = (
  id: number | null | undefined,
  options: TSelect[]
): string => {
  if (id == null) return "-";
  const option = options.find((opt) => opt.id === id);
  return option ? option.name : `Desconocido (${id})`;
};
