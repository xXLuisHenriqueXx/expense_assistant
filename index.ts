import { registerRootComponent } from "expo";
import App from "./App";
import { registerBackgroundNotificationHandler } from "./src/lib/notifications/backgroundNotificationHandler";

// registerBackgroundNotificationHandler();

registerRootComponent(App);
