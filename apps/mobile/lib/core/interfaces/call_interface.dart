import '../entities/entities.dart';

abstract class CallInterface {
  Future<Call> initiateCall({
    required String receiverId,
    String type = 'audio',
  });

  Future<Call> getCall(String callId);

  Future<Paginated<Call>> getCallHistory({int page = 1});

  Future<void> acceptCall(String callId);

  Future<void> declineCall(String callId);

  Future<void> endCall(String callId);
}
