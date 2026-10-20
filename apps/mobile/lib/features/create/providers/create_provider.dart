import 'package:flutter_riverpod/flutter_riverpod.dart';

class CreateState {
  const CreateState({this.postType});

  final String? postType;
}

class CreateNotifier extends Notifier<CreateState> {
  @override
  CreateState build() => const CreateState();

  void select(String type) => state = CreateState(postType: type);

  void reset() => state = const CreateState();
}

final createProvider = NotifierProvider<CreateNotifier, CreateState>(
  CreateNotifier.new,
);
