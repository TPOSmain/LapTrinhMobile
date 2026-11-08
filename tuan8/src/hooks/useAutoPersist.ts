import { useEffect } from "react";
import { saveJSON } from "../storage/storage";

// Một hook ghi dùng chung cho cả giỏ hàng và danh sách yêu thích.
export function useAutoPersist<T>(key: string, value: T, ready: boolean) {
  useEffect(() => {
    if (ready) void saveJSON(key, value);
  }, [key, value, ready]);
}
