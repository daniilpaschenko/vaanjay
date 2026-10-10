import 'user.dart';

class AppNotification {
  const AppNotification({
    this.id = '',
    this.userId = '',
    this.type = '',
    this.message = '',
    this.referenceId,
    this.referenceType,
    this.isRead = false,
    this.actor,
    this.createdAt,
  });

  final String id;
  final String userId;
  final String type;
  final String message;
  final String? referenceId;
  final String? referenceType;
  final bool isRead;
  final User? actor;
  final DateTime? createdAt;
}
