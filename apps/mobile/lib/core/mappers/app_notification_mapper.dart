import '../entities/app_notification.dart';
import '../models/app_notification.dart' as data;
import 'user_mapper.dart';

extension AppNotificationModelMapper on data.AppNotification {
  AppNotification toEntity() => AppNotification(
        id: id,
        userId: userId,
        type: type,
        message: message,
        referenceId: referenceId,
        referenceType: referenceType,
        isRead: isRead,
        actor: actor?.toEntity(),
        createdAt: createdAt,
      );
}

extension AppNotificationEntityMapper on AppNotification {
  data.AppNotification toModel() => data.AppNotification(
        id: id,
        userId: userId,
        type: type,
        message: message,
        referenceId: referenceId,
        referenceType: referenceType,
        isRead: isRead,
        actor: actor?.toModel(),
        createdAt: createdAt,
      );
}
