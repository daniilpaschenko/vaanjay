import 'package:freezed_annotation/freezed_annotation.dart';

import 'user.dart';

part 'app_notification.freezed.dart';
part 'app_notification.g.dart';

@freezed
abstract class AppNotification with _$AppNotification {
  const factory AppNotification({
    @Default('') String id,
    @Default('') String userId,
    @Default('') String type,
    @Default('') String message,
    String? referenceId,
    String? referenceType,
    @Default(false) bool isRead,
    User? actor,
    DateTime? createdAt,
  }) = _AppNotification;

  factory AppNotification.fromJson(Map<String, Object?> json) =>
      _$AppNotificationFromJson(json);
}
