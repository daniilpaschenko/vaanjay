import 'user.dart';

class Call {
  const Call({
    this.id = '',
    this.callerId = '',
    this.caller,
    this.receiverId,
    this.receiver,
    this.groupId,
    this.type = 'audio',
    this.status = 'initiated',
    this.startedAt,
    this.endedAt,
    this.durationSeconds,
    this.createdAt,
  });

  final String id;
  final String callerId;
  final User? caller;
  final String? receiverId;
  final User? receiver;
  final String? groupId;
  final String type;
  final String status;
  final DateTime? startedAt;
  final DateTime? endedAt;
  final int? durationSeconds;
  final DateTime? createdAt;
}
