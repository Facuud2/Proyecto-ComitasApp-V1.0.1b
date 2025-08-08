import { useMemo } from "react";
import { formatString } from "../helpers/formatString";
import { categories } from "../data/categories";

export function useFormatString() {
    useMemo( () => formatString, [categories] );
}