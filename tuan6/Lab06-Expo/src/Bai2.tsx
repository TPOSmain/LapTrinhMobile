/**
 * Bai2.tsx – BÀI 2: Gắn API (fetch, useEffect, loading / error / thử lại)
 */
import React, { useCallback, useEffect, useState } from "react";
import { ErrorBox, Loading, Phone, PHONES } from "./shared";
import { SelectPhoneApp } from "./Bai1";

/* ============================================================
 * BÀI 2: GẮN API (fetch, useEffect, loading / error / thử lại)
 * ============================================================ */

// Endpoint mockapi.io, ví dụ "https://xxxxxxxx.mockapi.io/api/v1"
// Khai báo trong file .env: EXPO_PUBLIC_API_URL=https://xxxxxxxx.mockapi.io/api/v1
// Để trống => dùng dữ liệu mẫu offline (có giả lập độ trễ)
const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? "").replace(/\/$/, "");
const USING_API = API_URL !== "";
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(() => r(), ms));

async function fetchPhone(id: string): Promise<Phone> {
  if (!USING_API) {
    await sleep(600);
    const p = PHONES.find((x) => x.id === id);
    if (!p) throw new Error("Không tìm thấy sản phẩm");
    return p;
  }
  const res = await fetch(`${API_URL}/phones/${id}`);
  if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}`);
  return (await res.json()) as Phone;
}

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null); // TODO 1
    setPhone(null);
    try {
      // TODO 2
      setPhone(await fetchPhone("1"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không thể tải dữ liệu");
    }
  }, []);

  useEffect(() => {
    load(); // TODO 3
  }, [load]);

  if (error) return <ErrorBox message={error} onRetry={load} />; // TODO 4
  if (!phone) return <Loading />; // TODO 5
  return <SelectPhoneApp phone={phone} />; // TODO 6
}
