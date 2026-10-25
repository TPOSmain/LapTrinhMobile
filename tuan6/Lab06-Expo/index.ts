// Phải import gesture-handler ở dòng đầu tiên (bắt buộc cho Drawer)
import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import App from "./App";

registerRootComponent(App);
