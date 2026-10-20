import '../entities/call.dart';
import '../models/call.dart' as data;
import 'user_mapper.dart';

extension CallModelMapper on data.Call {
  Call toEntity() => Call(
        id: id,
        callerId: callerId,
        caller: caller?.toEntity(),
        receiverId: receiverId,
        receiver: receiver?.toEntity(),
        groupId: groupId,
        type: type,
        status: status,
        startedAt: startedAt,
        endedAt: endedAt,
        durationSeconds: durationSeconds,
        createdAt: createdAt,
      );
}

extension CallEntityMapper on Call {
  data.Call toModel() => data.Call(
        id: id,
        callerId: callerId,
        caller: caller?.toModel(),
        receiverId: receiverId,
        receiver: receiver?.toModel(),
        groupId: groupId,
        type: type,
        status: status,
        startedAt: startedAt,
        endedAt: endedAt,
        durationSeconds: durationSeconds,
        createdAt: createdAt,
      );
}
