// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'conversation.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_ConversationMember _$ConversationMemberFromJson(Map<String, dynamic> json) =>
    _ConversationMember(
      conversationId: json['conversation_id'] as String? ?? '',
      userId: json['user_id'] as String? ?? '',
      role: json['role'] as String? ?? 'member',
      joinedAt: json['joined_at'] == null
          ? null
          : DateTime.parse(json['joined_at'] as String),
      user: json['user'] == null
          ? null
          : User.fromJson(json['user'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$ConversationMemberToJson(_ConversationMember instance) =>
    <String, dynamic>{
      'conversation_id': instance.conversationId,
      'user_id': instance.userId,
      'role': instance.role,
      'joined_at': ?instance.joinedAt?.toIso8601String(),
      'user': ?instance.user?.toJson(),
    };

_Conversation _$ConversationFromJson(Map<String, dynamic> json) =>
    _Conversation(
      id: json['id'] as String? ?? '',
      type: json['type'] as String? ?? 'private',
      name: json['name'] as String?,
      groupPicUrl: json['group_pic_url'] as String?,
      createdBy: json['created_by'] as String? ?? '',
      lastMessage: json['last_message'] == null
          ? null
          : Message.fromJson(json['last_message'] as Map<String, dynamic>),
      unreadCount: (json['unread_count'] as num?)?.toInt() ?? 0,
      members:
          (json['members'] as List<dynamic>?)
              ?.map(
                (e) => ConversationMember.fromJson(e as Map<String, dynamic>),
              )
              .toList() ??
          const <ConversationMember>[],
      createdAt: json['created_at'] == null
          ? null
          : DateTime.parse(json['created_at'] as String),
    );

Map<String, dynamic> _$ConversationToJson(_Conversation instance) =>
    <String, dynamic>{
      'id': instance.id,
      'type': instance.type,
      'name': ?instance.name,
      'group_pic_url': ?instance.groupPicUrl,
      'created_by': instance.createdBy,
      'last_message': ?instance.lastMessage?.toJson(),
      'unread_count': instance.unreadCount,
      'members': instance.members.map((e) => e.toJson()).toList(),
      'created_at': ?instance.createdAt?.toIso8601String(),
    };
