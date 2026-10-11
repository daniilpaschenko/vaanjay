import '../entities/entities.dart';

abstract class AuthInterface {
  Future<void> sendOtp(String phoneNumber);

  Future<User> verifyOtp({
    required String phoneNumber,
    required String otp,
  });

  Future<User> register({
    required String phoneNumber,
    required String fullName,
    required String username,
    String? password,
    String? email,
  });

  Future<User> login({
    required String phoneNumber,
    required String password,
  });

  Future<void> forgotPassword(String phoneNumber);

  Future<void> resetPassword({
    required String phoneNumber,
    required String otp,
    required String newPassword,
  });

  Future<User?> currentUser();

  Future<void> logout();
}
