import notifee, {
  AndroidImportance,
  AndroidNotificationSetting,
  Notification,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";

const CHANNEL_ID = "money-saver-channel";

interface NotificationData {
  id: string;
  title: string;
  date: Date;
}

export const NotificationsService = {
  createNotificationChannel: async () => {
    await notifee.deleteChannel(CHANNEL_ID);

    await notifee.createChannel({
      id: CHANNEL_ID,
      name: CHANNEL_ID,
      vibration: true,
      sound: "default",
      importance: AndroidImportance.HIGH,
    });

    const channel = await notifee.getChannel(CHANNEL_ID);
    if (!channel) {
      throw new Error("Channel not found");
    }

    if (channel.blocked) {
      throw new Error("Channel is blocked");
    }
  },

  checkPermission: async () => {
    const { android } = await notifee.getNotificationSettings();
    if (android.alarm !== AndroidNotificationSetting.ENABLED) {
      await notifee.openAlarmPermissionSettings();
    }
  },

  createNotification: (id: string, title: string): Notification => ({
    id,
    title: `🛑 ${title} 🛑`,
    body: "Opaa, parece que você tem uma despesa para pagar hoje!",
    android: {
      channelId: CHANNEL_ID,
      pressAction: {
        id: "default",
        launchActivity: "default",
      },
    },
  }),

  createTimeStampNotification: async (
    notification: Notification,
    date: Date
  ): Promise<void> => {
    await NotificationsService.createNotificationChannel();
    await NotificationsService.checkPermission();

    const scheduleDate = new Date(date);
    scheduleDate.setHours(11, 40, 0, 0);

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: scheduleDate.getTime(),
    };

    const createNotificationID = await notifee.createTriggerNotification(
      notification,
      trigger
    );

    console.log(`Notification created with ID: ${createNotificationID}`);
  },

  scheduleNotification: async (notification: NotificationData) => {
    const notificationData = NotificationsService.createNotification(
      notification.id,
      notification.title
    );

    await NotificationsService.createTimeStampNotification(
      notificationData,
      notification.date
    );
  },

  cancelNotification: async (id: string) => {
    await notifee.cancelNotification(id);
  },
};
