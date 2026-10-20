import 'package:flutter_riverpod/flutter_riverpod.dart';

class NotificationsState {
  const NotificationsState({this.notifications = const []});

  final List<Map<String, dynamic>> notifications;

  NotificationsState copyWith({List<Map<String, dynamic>>? notifications}) {
    return NotificationsState(notifications: notifications ?? this.notifications);
  }
}

class NotificationsNotifier extends Notifier<NotificationsState> {
  @override
  NotificationsState build() => const NotificationsState();

  Future<void> load() async {}
}

final notificationsProvider =
    NotifierProvider<NotificationsNotifier, NotificationsState>(
  NotificationsNotifier.new,
);
