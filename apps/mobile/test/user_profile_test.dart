import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:vaanjay/features/auth/data/models/user_profile_model.dart';
import 'package:vaanjay/features/auth/domain/entities/user_profile.dart';

void main() {
  group('UserProfileModel', () {
    test('fromMap maps fields, timestamps and defaults', () {
      final created = DateTime.utc(2026, 1, 2, 3, 4, 5);

      final model = UserProfileModel.fromMap('uid-1', {
        'phoneNumber': '+919876543210',
        'fullName': 'Test User',
        'bio': 'Hello',
        'websiteUrl': 'https://example.com',
        'gender': 'female',
        'createdAt': Timestamp.fromDate(created),
      });

      expect(model.uid, 'uid-1');
      expect(model.phoneNumber, '+919876543210');
      expect(model.fullName, 'Test User');
      expect(model.bio, 'Hello');
      expect(model.websiteUrl, 'https://example.com');
      expect(model.gender, 'female');
      expect(model.isPrivate, isFalse);
      expect(model.languagePreference, 'ta');
      expect(model.createdAt?.toUtc(), created);
      expect(model.updatedAt, isNull);
    });

    test('toMap keeps values and drops nulls', () {
      final map = UserProfileModel(
        uid: 'uid-1',
        phoneNumber: '+91',
        isPrivate: true,
      ).toMap();

      expect(map['uid'], 'uid-1');
      expect(map['phoneNumber'], '+91');
      expect(map['isPrivate'], isTrue);
      expect(map['languagePreference'], 'ta');
      expect(map.containsKey('fullName'), isFalse);
      expect(map.containsKey('username'), isFalse);
      expect(map.containsKey('bio'), isFalse);
      expect(map.containsKey('createdAt'), isFalse);
    });

    test('toEntity converts the data model into a domain entity', () {
      final created = DateTime.utc(2026, 1, 2);
      final entity = UserProfileModel(
        uid: 'uid-1',
        phoneNumber: '+919876543210',
        fullName: 'Test User',
        username: 'test',
        bio: 'Hello',
        websiteUrl: 'https://example.com',
        gender: 'female',
        isPrivate: true,
        createdAt: created,
      ).toEntity();

      expect(entity, isA<UserProfile>());
      expect(entity.uid, 'uid-1');
      expect(entity.phoneNumber, '+919876543210');
      expect(entity.fullName, 'Test User');
      expect(entity.username, 'test');
      expect(entity.bio, 'Hello');
      expect(entity.websiteUrl, 'https://example.com');
      expect(entity.gender, 'female');
      expect(entity.isPrivate, isTrue);
      expect(entity.createdAt, created);
    });
  });
}
