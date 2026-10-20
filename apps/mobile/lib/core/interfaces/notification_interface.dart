import '../entities/entities.dart';

abstract class NotificationInterface {
  Future<Paginated<AppNotification>> getNotifications({int page = 1});

  Future<int> getUnreadCount();

  Future<void> markAsRead(String notificationId);

  Future<void> markAllAsRead();
}
