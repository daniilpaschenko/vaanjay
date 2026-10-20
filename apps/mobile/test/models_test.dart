import 'package:flutter_test/flutter_test.dart';

import 'package:vaanjay/core/models/models.dart';

void main() {
  group('User.fromJson', () {
    test('parses the API/snake_case contract', () {
      final user = User.fromJson({
        'id': 'u1',
        'username': 'kumar',
        'email': 'kumar@example.com',
        'phone_number': '+919000000000',
        'full_name': 'Kumar',
        'bio': 'hello',
        'profile_pic_url': 'https://example.com/a.png',
        'is_verified': true,
        'badge_type': 'blue',
        'language_preference': 'ta',
        'content_language_preference': 'en',
        'is_private': true,
        'follower_count': 42,
        'following_count': 7,
        'post_count': 3,
        'is_following': true,
        'created_at': '2026-01-02T03:04:05Z',
      });

      expect(user.id, 'u1');
      expect(user.fullName, 'Kumar');
      expect(user.isVerified, isTrue);
      expect(user.badgeType, 'blue');
      expect(user.contentLanguagePreference, 'en');
      expect(user.isPrivate, isTrue);
      expect(user.followerCount, 42);
      expect(user.isFollowing, isTrue);
      expect(user.createdAt, DateTime.utc(2026, 1, 2, 3, 4, 5));
    });

    test('is defensive about missing and null fields', () {
      final user = User.fromJson({'id': 'u2', 'username': 'a', 'email': 'a'});

      expect(user.fullName, '');
      expect(user.bio, isNull);
      expect(user.profilePicUrl, isNull);
      expect(user.isVerified, isFalse);
      expect(user.languagePreference, 'ta');
      expect(user.followerCount, 0);
      expect(user.createdAt, isNull);
    });
  });

  group('Post.fromJson', () {
    test('parses media lists, counts and nested user', () {
      final post = Post.fromJson({
        'id': 'p1',
        'user_id': 'u1',
        'media_urls': ['a.jpg', 'b.jpg'],
        'caption': 'hi',
        'type': 'photo',
        'audience': 'followers',
        'like_count': 10,
        'is_liked': true,
        'hashtags': ['tamil', 'chennai'],
        'user': {
          'id': 'u1',
          'username': 'kumar',
          'email': 'k@example.com',
          'full_name': 'Kumar',
        },
      });

      expect(post.userId, 'u1');
      expect(post.mediaUrls, ['a.jpg', 'b.jpg']);
      expect(post.audience, 'followers');
      expect(post.likeCount, 10);
      expect(post.isLiked, isTrue);
      expect(post.hashtags, ['tamil', 'chennai']);
      expect(post.user?.username, 'kumar');
    });
  });

  group('Conversation.fromJson', () {
    test('parses nested last_message', () {
      final conversation = Conversation.fromJson({
        'id': 'c1',
        'type': 'private',
        'created_by': 'u1',
        'unread_count': 2,
        'last_message': {
          'id': 'm1',
          'conversation_id': 'c1',
          'sender_id': 'u2',
          'content': 'vanakkam',
          'message_type': 'text',
        },
      });

      expect(conversation.unreadCount, 2);
      expect(conversation.lastMessage?.content, 'vanakkam');
      expect(conversation.lastMessage?.senderId, 'u2');
    });
  });

  group('AppNotification.fromJson', () {
    test('parses read flag and createdAt', () {
      final notification = AppNotification.fromJson({
        'id': 'n1',
        'user_id': 'u1',
        'type': 'like',
        'message': 'Kumar liked your post',
        'is_read': false,
        'created_at': '2026-02-01T10:00:00Z',
      });

      expect(notification.type, 'like');
      expect(notification.message, 'Kumar liked your post');
      expect(notification.isRead, isFalse);
      expect(notification.createdAt, DateTime.utc(2026, 2, 1, 10));
    });
  });

  group('freezed models', () {
    test('have value equality and copyWith', () {
      const a = User(id: 'u1', username: 'kumar', fullName: 'Kumar');
      const b = User(id: 'u1', username: 'kumar', fullName: 'Kumar');

      expect(a, equals(b));
      expect(a.copyWith(fullName: 'Kumar R'), isNot(equals(a)));
      expect(a.copyWith(fullName: 'Kumar R').fullName, 'Kumar R');
    });

    test('toJson emits snake_case keys and skips nulls', () {
      const post = Post(
        id: 'p1',
        userId: 'u1',
        mediaUrls: ['a.jpg'],
        likeCount: 3,
      );

      final json = post.toJson();
      expect(json['user_id'], 'u1');
      expect(json['media_urls'], ['a.jpg']);
      expect(json['like_count'], 3);
      expect(json.containsKey('caption'), isFalse);
    });

    test('serialize round-trip preserves data', () {
      const original = Message(
        id: 'm1',
        conversationId: 'c1',
        senderId: 'u2',
        content: 'vanakkam',
      );

      expect(Message.fromJson(original.toJson()), equals(original));
    });
  });
}
