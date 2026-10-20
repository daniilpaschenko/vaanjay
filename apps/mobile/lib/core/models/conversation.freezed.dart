// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint, type=warning, deprecated_member_use, deprecated_member_use_from_same_package
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'conversation.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$ConversationMember {

 String get conversationId; String get userId; String get role; DateTime? get joinedAt; User? get user;
/// Create a copy of ConversationMember
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ConversationMemberCopyWith<ConversationMember> get copyWith => _$ConversationMemberCopyWithImpl<ConversationMember>(this as ConversationMember, _$identity);

  /// Serializes this ConversationMember to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  final _this = this as ConversationMember;
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ConversationMember&&(identical(other.conversationId, _this.conversationId) || other.conversationId == _this.conversationId)&&(identical(other.userId, _this.userId) || other.userId == _this.userId)&&(identical(other.role, _this.role) || other.role == _this.role)&&(identical(other.joinedAt, _this.joinedAt) || other.joinedAt == _this.joinedAt)&&(identical(other.user, _this.user) || other.user == _this.user));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
  final _this = this as ConversationMember;
  return Object.hash(runtimeType,_this.conversationId,_this.userId,_this.role,_this.joinedAt,_this.user);
}

@override
String toString() {
  final _this = this as ConversationMember;
  return 'ConversationMember(conversationId: ${_this.conversationId}, userId: ${_this.userId}, role: ${_this.role}, joinedAt: ${_this.joinedAt}, user: ${_this.user})';
}


}

/// @nodoc
abstract mixin class $ConversationMemberCopyWith<$Res>  {
  factory $ConversationMemberCopyWith(ConversationMember value, $Res Function(ConversationMember) _then) = _$ConversationMemberCopyWithImpl;
@useResult
$Res call({
 String conversationId, String userId, String role, DateTime? joinedAt, User? user
});


$UserCopyWith<$Res>? get user;

}
/// @nodoc
class _$ConversationMemberCopyWithImpl<$Res>
    implements $ConversationMemberCopyWith<$Res> {
  _$ConversationMemberCopyWithImpl(this._self, this._then);

  final ConversationMember _self;
  final $Res Function(ConversationMember) _then;

/// Create a copy of ConversationMember
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? conversationId = null,Object? userId = null,Object? role = null,Object? joinedAt = freezed,Object? user = freezed,}) {
  return _then(ConversationMember(
conversationId: null == conversationId ? _self.conversationId : conversationId // ignore: cast_nullable_to_non_nullable
as String,userId: null == userId ? _self.userId : userId // ignore: cast_nullable_to_non_nullable
as String,role: null == role ? _self.role : role // ignore: cast_nullable_to_non_nullable
as String,joinedAt: freezed == joinedAt ? _self.joinedAt : joinedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,user: freezed == user ? _self.user : user // ignore: cast_nullable_to_non_nullable
as User?,
  ));
}
/// Create a copy of ConversationMember
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$UserCopyWith<$Res>? get user {
    if (_self.user == null) {
    return null;
  }

  return $UserCopyWith<$Res>(_self.user!, (value) {
    return _then(_self.copyWith(user: value));
  });
}
}


/// Adds pattern-matching-related methods to [ConversationMember].
extension ConversationMemberPatterns on ConversationMember {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _ConversationMember value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _ConversationMember() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _ConversationMember value)  $default,){
final _that = this;
switch (_that) {
case _ConversationMember():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _ConversationMember value)?  $default,){
final _that = this;
switch (_that) {
case _ConversationMember() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String conversationId,  String userId,  String role,  DateTime? joinedAt,  User? user)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _ConversationMember() when $default != null:
return $default(_that.conversationId,_that.userId,_that.role,_that.joinedAt,_that.user);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String conversationId,  String userId,  String role,  DateTime? joinedAt,  User? user)  $default,) {final _that = this;
switch (_that) {
case _ConversationMember():
return $default(_that.conversationId,_that.userId,_that.role,_that.joinedAt,_that.user);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String conversationId,  String userId,  String role,  DateTime? joinedAt,  User? user)?  $default,) {final _that = this;
switch (_that) {
case _ConversationMember() when $default != null:
return $default(_that.conversationId,_that.userId,_that.role,_that.joinedAt,_that.user);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _ConversationMember implements ConversationMember {
  const _ConversationMember({this.conversationId = '', this.userId = '', this.role = 'member', this.joinedAt, this.user});
  factory _ConversationMember.fromJson(Map<String, dynamic> json) => _$ConversationMemberFromJson(json);

@override@JsonKey() final  String conversationId;
@override@JsonKey() final  String userId;
@override@JsonKey() final  String role;
@override final  DateTime? joinedAt;
@override final  User? user;

/// Create a copy of ConversationMember
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ConversationMemberCopyWith<_ConversationMember> get copyWith => __$ConversationMemberCopyWithImpl<_ConversationMember>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ConversationMemberToJson(this, );
}

@override
bool operator ==(Object other) {
    return identical(this, other) || (other.runtimeType == runtimeType&&other is _ConversationMember&&(identical(other.conversationId, conversationId) || other.conversationId == conversationId)&&(identical(other.userId, userId) || other.userId == userId)&&(identical(other.role, role) || other.role == role)&&(identical(other.joinedAt, joinedAt) || other.joinedAt == joinedAt)&&(identical(other.user, user) || other.user == user));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
    return Object.hash(runtimeType,conversationId,userId,role,joinedAt,user);
}

@override
String toString() {
    return 'ConversationMember(conversationId: $conversationId, userId: $userId, role: $role, joinedAt: $joinedAt, user: $user)';
}


}

/// @nodoc
abstract mixin class _$ConversationMemberCopyWith<$Res> implements $ConversationMemberCopyWith<$Res> {
  factory _$ConversationMemberCopyWith(_ConversationMember value, $Res Function(_ConversationMember) _then) = __$ConversationMemberCopyWithImpl;
@override @useResult
$Res call({
 String conversationId, String userId, String role, DateTime? joinedAt, User? user
});


@override $UserCopyWith<$Res>? get user;

}
/// @nodoc
class __$ConversationMemberCopyWithImpl<$Res>
    implements _$ConversationMemberCopyWith<$Res> {
  __$ConversationMemberCopyWithImpl(this._self, this._then);

  final _ConversationMember _self;
  final $Res Function(_ConversationMember) _then;

/// Create a copy of ConversationMember
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? conversationId = null,Object? userId = null,Object? role = null,Object? joinedAt = freezed,Object? user = freezed,}) {
  return _then(_ConversationMember(
conversationId: null == conversationId ? _self.conversationId : conversationId // ignore: cast_nullable_to_non_nullable
as String,userId: null == userId ? _self.userId : userId // ignore: cast_nullable_to_non_nullable
as String,role: null == role ? _self.role : role // ignore: cast_nullable_to_non_nullable
as String,joinedAt: freezed == joinedAt ? _self.joinedAt : joinedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,user: freezed == user ? _self.user : user // ignore: cast_nullable_to_non_nullable
as User?,
  ));
}

/// Create a copy of ConversationMember
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$UserCopyWith<$Res>? get user {
    if (_self.user == null) {
    return null;
  }

  return $UserCopyWith<$Res>(_self.user!, (value) {
    return _then(_self.copyWith(user: value));
  });
}
}


/// @nodoc
mixin _$Conversation {

 String get id; String get type; String? get name; String? get groupPicUrl; String get createdBy; Message? get lastMessage; int get unreadCount; List<ConversationMember> get members; DateTime? get createdAt;
/// Create a copy of Conversation
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ConversationCopyWith<Conversation> get copyWith => _$ConversationCopyWithImpl<Conversation>(this as Conversation, _$identity);

  /// Serializes this Conversation to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  final _this = this as Conversation;
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Conversation&&(identical(other.id, _this.id) || other.id == _this.id)&&(identical(other.type, _this.type) || other.type == _this.type)&&(identical(other.name, _this.name) || other.name == _this.name)&&(identical(other.groupPicUrl, _this.groupPicUrl) || other.groupPicUrl == _this.groupPicUrl)&&(identical(other.createdBy, _this.createdBy) || other.createdBy == _this.createdBy)&&(identical(other.lastMessage, _this.lastMessage) || other.lastMessage == _this.lastMessage)&&(identical(other.unreadCount, _this.unreadCount) || other.unreadCount == _this.unreadCount)&&const DeepCollectionEquality().equals(other.members, _this.members)&&(identical(other.createdAt, _this.createdAt) || other.createdAt == _this.createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
  final _this = this as Conversation;
  return Object.hash(runtimeType,_this.id,_this.type,_this.name,_this.groupPicUrl,_this.createdBy,_this.lastMessage,_this.unreadCount,const DeepCollectionEquality().hash(_this.members),_this.createdAt);
}

@override
String toString() {
  final _this = this as Conversation;
  return 'Conversation(id: ${_this.id}, type: ${_this.type}, name: ${_this.name}, groupPicUrl: ${_this.groupPicUrl}, createdBy: ${_this.createdBy}, lastMessage: ${_this.lastMessage}, unreadCount: ${_this.unreadCount}, members: ${_this.members}, createdAt: ${_this.createdAt})';
}


}

/// @nodoc
abstract mixin class $ConversationCopyWith<$Res>  {
  factory $ConversationCopyWith(Conversation value, $Res Function(Conversation) _then) = _$ConversationCopyWithImpl;
@useResult
$Res call({
 String id, String type, String? name, String? groupPicUrl, String createdBy, Message? lastMessage, int unreadCount, List<ConversationMember> members, DateTime? createdAt
});


$MessageCopyWith<$Res>? get lastMessage;

}
/// @nodoc
class _$ConversationCopyWithImpl<$Res>
    implements $ConversationCopyWith<$Res> {
  _$ConversationCopyWithImpl(this._self, this._then);

  final Conversation _self;
  final $Res Function(Conversation) _then;

/// Create a copy of Conversation
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? type = null,Object? name = freezed,Object? groupPicUrl = freezed,Object? createdBy = null,Object? lastMessage = freezed,Object? unreadCount = null,Object? members = null,Object? createdAt = freezed,}) {
  return _then(Conversation(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,type: null == type ? _self.type : type // ignore: cast_nullable_to_non_nullable
as String,name: freezed == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String?,groupPicUrl: freezed == groupPicUrl ? _self.groupPicUrl : groupPicUrl // ignore: cast_nullable_to_non_nullable
as String?,createdBy: null == createdBy ? _self.createdBy : createdBy // ignore: cast_nullable_to_non_nullable
as String,lastMessage: freezed == lastMessage ? _self.lastMessage : lastMessage // ignore: cast_nullable_to_non_nullable
as Message?,unreadCount: null == unreadCount ? _self.unreadCount : unreadCount // ignore: cast_nullable_to_non_nullable
as int,members: null == members ? _self.members : members // ignore: cast_nullable_to_non_nullable
as List<ConversationMember>,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}
/// Create a copy of Conversation
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$MessageCopyWith<$Res>? get lastMessage {
    if (_self.lastMessage == null) {
    return null;
  }

  return $MessageCopyWith<$Res>(_self.lastMessage!, (value) {
    return _then(_self.copyWith(lastMessage: value));
  });
}
}


/// Adds pattern-matching-related methods to [Conversation].
extension ConversationPatterns on Conversation {
/// A variant of `map` that fallback to returning `orElse`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Conversation value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Conversation() when $default != null:
return $default(_that);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// Callbacks receives the raw object, upcasted.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case final Subclass2 value:
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Conversation value)  $default,){
final _that = this;
switch (_that) {
case _Conversation():
return $default(_that);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `map` that fallback to returning `null`.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case final Subclass value:
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Conversation value)?  $default,){
final _that = this;
switch (_that) {
case _Conversation() when $default != null:
return $default(_that);case _:
  return null;

}
}
/// A variant of `when` that fallback to an `orElse` callback.
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return orElse();
/// }
/// ```

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String type,  String? name,  String? groupPicUrl,  String createdBy,  Message? lastMessage,  int unreadCount,  List<ConversationMember> members,  DateTime? createdAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Conversation() when $default != null:
return $default(_that.id,_that.type,_that.name,_that.groupPicUrl,_that.createdBy,_that.lastMessage,_that.unreadCount,_that.members,_that.createdAt);case _:
  return orElse();

}
}
/// A `switch`-like method, using callbacks.
///
/// As opposed to `map`, this offers destructuring.
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case Subclass2(:final field2):
///     return ...;
/// }
/// ```

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String type,  String? name,  String? groupPicUrl,  String createdBy,  Message? lastMessage,  int unreadCount,  List<ConversationMember> members,  DateTime? createdAt)  $default,) {final _that = this;
switch (_that) {
case _Conversation():
return $default(_that.id,_that.type,_that.name,_that.groupPicUrl,_that.createdBy,_that.lastMessage,_that.unreadCount,_that.members,_that.createdAt);case _:
  throw StateError('Unexpected subclass');

}
}
/// A variant of `when` that fallback to returning `null`
///
/// It is equivalent to doing:
/// ```dart
/// switch (sealedClass) {
///   case Subclass(:final field):
///     return ...;
///   case _:
///     return null;
/// }
/// ```

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String type,  String? name,  String? groupPicUrl,  String createdBy,  Message? lastMessage,  int unreadCount,  List<ConversationMember> members,  DateTime? createdAt)?  $default,) {final _that = this;
switch (_that) {
case _Conversation() when $default != null:
return $default(_that.id,_that.type,_that.name,_that.groupPicUrl,_that.createdBy,_that.lastMessage,_that.unreadCount,_that.members,_that.createdAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Conversation implements Conversation {
  const _Conversation({this.id = '', this.type = 'private', this.name, this.groupPicUrl, this.createdBy = '', this.lastMessage, this.unreadCount = 0,  List<ConversationMember> members = const <ConversationMember>[], this.createdAt}): _members = members;
  factory _Conversation.fromJson(Map<String, dynamic> json) => _$ConversationFromJson(json);

@override@JsonKey() final  String id;
@override@JsonKey() final  String type;
@override final  String? name;
@override final  String? groupPicUrl;
@override@JsonKey() final  String createdBy;
@override final  Message? lastMessage;
@override@JsonKey() final  int unreadCount;
 final  List<ConversationMember> _members;
@override@JsonKey() List<ConversationMember> get members {
  if (_members is EqualUnmodifiableListView) return _members;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_members);
}

@override final  DateTime? createdAt;

/// Create a copy of Conversation
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ConversationCopyWith<_Conversation> get copyWith => __$ConversationCopyWithImpl<_Conversation>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ConversationToJson(this, );
}

@override
bool operator ==(Object other) {
    return identical(this, other) || (other.runtimeType == runtimeType&&other is _Conversation&&(identical(other.id, id) || other.id == id)&&(identical(other.type, type) || other.type == type)&&(identical(other.name, name) || other.name == name)&&(identical(other.groupPicUrl, groupPicUrl) || other.groupPicUrl == groupPicUrl)&&(identical(other.createdBy, createdBy) || other.createdBy == createdBy)&&(identical(other.lastMessage, lastMessage) || other.lastMessage == lastMessage)&&(identical(other.unreadCount, unreadCount) || other.unreadCount == unreadCount)&&const DeepCollectionEquality().equals(other.members, _members)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
    return Object.hash(runtimeType,id,type,name,groupPicUrl,createdBy,lastMessage,unreadCount,const DeepCollectionEquality().hash(_members),createdAt);
}

@override
String toString() {
    return 'Conversation(id: $id, type: $type, name: $name, groupPicUrl: $groupPicUrl, createdBy: $createdBy, lastMessage: $lastMessage, unreadCount: $unreadCount, members: $members, createdAt: $createdAt)';
}


}

/// @nodoc
abstract mixin class _$ConversationCopyWith<$Res> implements $ConversationCopyWith<$Res> {
  factory _$ConversationCopyWith(_Conversation value, $Res Function(_Conversation) _then) = __$ConversationCopyWithImpl;
@override @useResult
$Res call({
 String id, String type, String? name, String? groupPicUrl, String createdBy, Message? lastMessage, int unreadCount, List<ConversationMember> members, DateTime? createdAt
});


@override $MessageCopyWith<$Res>? get lastMessage;

}
/// @nodoc
class __$ConversationCopyWithImpl<$Res>
    implements _$ConversationCopyWith<$Res> {
  __$ConversationCopyWithImpl(this._self, this._then);

  final _Conversation _self;
  final $Res Function(_Conversation) _then;

/// Create a copy of Conversation
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? type = null,Object? name = freezed,Object? groupPicUrl = freezed,Object? createdBy = null,Object? lastMessage = freezed,Object? unreadCount = null,Object? members = null,Object? createdAt = freezed,}) {
  return _then(_Conversation(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,type: null == type ? _self.type : type // ignore: cast_nullable_to_non_nullable
as String,name: freezed == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String?,groupPicUrl: freezed == groupPicUrl ? _self.groupPicUrl : groupPicUrl // ignore: cast_nullable_to_non_nullable
as String?,createdBy: null == createdBy ? _self.createdBy : createdBy // ignore: cast_nullable_to_non_nullable
as String,lastMessage: freezed == lastMessage ? _self.lastMessage : lastMessage // ignore: cast_nullable_to_non_nullable
as Message?,unreadCount: null == unreadCount ? _self.unreadCount : unreadCount // ignore: cast_nullable_to_non_nullable
as int,members: null == members ? _self._members : members // ignore: cast_nullable_to_non_nullable
as List<ConversationMember>,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

/// Create a copy of Conversation
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$MessageCopyWith<$Res>? get lastMessage {
    if (_self.lastMessage == null) {
    return null;
  }

  return $MessageCopyWith<$Res>(_self.lastMessage!, (value) {
    return _then(_self.copyWith(lastMessage: value));
  });
}
}

// dart format on
