import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { NotificationItem } from "../components/NotificationItem";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getNotifications, markAsRead } from "../services/notificationService";
import { getErrorMessage } from "../api/client";
import { useAuth } from "../store/hooks";
import { RootScreenProps } from "../navigation/types";
import { AppNotification } from "../types";
import { colors } from "../theme";

export function NotificationsScreen({ navigation }: RootScreenProps<"Notifications">) {
  const { user, isLoggedIn } = useAuth();
  const [data, setData] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      setData(await getNotifications(user.id));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user]);
  useEffect(() => {
    load();
  }, [load]);

  const setRead = (id: number, read: boolean) =>
    setData((prev) => prev.map((x) => (x.id === id ? { ...x, read } : x)));

  const open = async (n: AppNotification) => {
    // (1) Cập nhật lạc quan: đổi giao diện NGAY, gọi API phía sau, lỗi thì hoàn lại
    if (!n.read) {
      setRead(n.id, true);
      markAsRead(n.id).catch(() => setRead(n.id, false));
    }
    // (2) Điều hướng theo dữ liệu gắn trong thông báo
    if (n.target?.screen === "Orders") navigation.navigate("Orders");
    else if (n.target?.screen === "BookDetail" && n.target.bookId) navigation.navigate("BookDetail", { bookId: n.target.bookId });
  };

  if (!isLoggedIn) {
    return <EmptyState emoji="🔒" title="Bạn cần đăng nhập" actionLabel="Đăng nhập" onAction={() => navigation.navigate("Login")} />;
  }
  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(n) => String(n.id)}
        contentContainerStyle={{ gap: 8, flexGrow: 1 }}
        renderItem={({ item }) => <NotificationItem item={item} onPress={open} />}
        ListEmptyComponent={<EmptyState emoji="🔔" title="Chưa có thông báo nào" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: colors.bg, padding: 12 } });
