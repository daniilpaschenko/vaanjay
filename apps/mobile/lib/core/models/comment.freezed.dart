// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint, type=warning, deprecated_member_use, deprecated_member_use_from_same_package
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'comment.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$Comment {

 String get id; String get targetId; String get targetType; String get userId; String get content; String? get parentCommentId; int get likeCount; bool get isLiked; User? get user; List<Comment> get replies; DateTime? get createdAt;
/// Create a copy of Comment
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$CommentCopyWith<Comment> get copyWith => _$CommentCopyWithImpl<Comment>(this as Comment, _$identity);

  /// Serializes this Comment to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  final _this = this as Comment;
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Comment&&(identical(other.id, _this.id) || other.id == _this.id)&&(identical(other.targetId, _this.targetId) || other.targetId == _this.targetId)&&(identical(other.targetType, _this.targetType) || other.targetType == _this.targetType)&&(identical(other.userId, _this.userId) || other.userId == _this.userId)&&(identical(other.content, _this.content) || other.content == _this.content)&&(identical(other.parentCommentId, _this.parentCommentId) || other.parentCommentId == _this.parentCommentId)&&(identical(other.likeCount, _this.likeCount) || other.likeCount == _this.likeCount)&&(identical(other.isLiked, _this.isLiked) || other.isLiked == _this.isLiked)&&(identical(other.user, _this.user) || other.user == _this.user)&&const DeepCollectionEquality().equals(other.replies, _this.replies)&&(identical(other.createdAt, _this.createdAt) || other.createdAt == _this.createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
  final _this = this as Comment;
  return Object.hash(runtimeType,_this.id,_this.targetId,_this.targetType,_this.userId,_this.content,_this.parentCommentId,_this.likeCount,_this.isLiked,_this.user,const DeepCollectionEquality().hash(_this.replies),_this.createdAt);
}

@override
String toString() {
  final _this = this as Comment;
  return 'Comment(id: ${_this.id}, targetId: ${_this.targetId}, targetType: ${_this.targetType}, userId: ${_this.userId}, content: ${_this.content}, parentCommentId: ${_this.parentCommentId}, likeCount: ${_this.likeCount}, isLiked: ${_this.isLiked}, user: ${_this.user}, replies: ${_this.replies}, createdAt: ${_this.createdAt})';
}


}

/// @nodoc
abstract mixin class $CommentCopyWith<$Res>  {
  factory $CommentCopyWith(Comment value, $Res Function(Comment) _then) = _$CommentCopyWithImpl;
@useResult
$Res call({
 String id, String targetId, String targetType, String userId, String content, String? parentCommentId, int likeCount, bool isLiked, User? user, List<Comment> replies, DateTime? createdAt
});


$UserCopyWith<$Res>? get user;

}
/// @nodoc
class _$CommentCopyWithImpl<$Res>
    implements $CommentCopyWith<$Res> {
  _$CommentCopyWithImpl(this._self, this._then);

  final Comment _self;
  final $Res Function(Comment) _then;

/// Create a copy of Comment
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? targetId = null,Object? targetType = null,Object? userId = null,Object? content = null,Object? parentCommentId = freezed,Object? likeCount = null,Object? isLiked = null,Object? user = freezed,Object? replies = null,Object? createdAt = freezed,}) {
  return _then(Comment(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,targetId: null == targetId ? _self.targetId : targetId // ignore: cast_nullable_to_non_nullable
as String,targetType: null == targetType ? _self.targetType : targetType // ignore: cast_nullable_to_non_nullable
as String,userId: null == userId ? _self.userId : userId // ignore: cast_nullable_to_non_nullable
as String,content: null == content ? _self.content : content // ignore: cast_nullable_to_non_nullable
as String,parentCommentId: freezed == parentCommentId ? _self.parentCommentId : parentCommentId // ignore: cast_nullable_to_non_nullable
as String?,likeCount: null == likeCount ? _self.likeCount : likeCount // ignore: cast_nullable_to_non_nullable
as int,isLiked: null == isLiked ? _self.isLiked : isLiked // ignore: cast_nullable_to_non_nullable
as bool,user: freezed == user ? _self.user : user // ignore: cast_nullable_to_non_nullable
as User?,replies: null == replies ? _self.replies : replies // ignore: cast_nullable_to_non_nullable
as List<Comment>,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}
/// Create a copy of Comment
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


/// Adds pattern-matching-related methods to [Comment].
extension CommentPatterns on Comment {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Comment value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Comment() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Comment value)  $default,){
final _that = this;
switch (_that) {
case _Comment():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Comment value)?  $default,){
final _that = this;
switch (_that) {
case _Comment() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String targetId,  String targetType,  String userId,  String content,  String? parentCommentId,  int likeCount,  bool isLiked,  User? user,  List<Comment> replies,  DateTime? createdAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Comment() when $default != null:
return $default(_that.id,_that.targetId,_that.targetType,_that.userId,_that.content,_that.parentCommentId,_that.likeCount,_that.isLiked,_that.user,_that.replies,_that.createdAt);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String targetId,  String targetType,  String userId,  String content,  String? parentCommentId,  int likeCount,  bool isLiked,  User? user,  List<Comment> replies,  DateTime? createdAt)  $default,) {final _that = this;
switch (_that) {
case _Comment():
return $default(_that.id,_that.targetId,_that.targetType,_that.userId,_that.content,_that.parentCommentId,_that.likeCount,_that.isLiked,_that.user,_that.replies,_that.createdAt);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String targetId,  String targetType,  String userId,  String content,  String? parentCommentId,  int likeCount,  bool isLiked,  User? user,  List<Comment> replies,  DateTime? createdAt)?  $default,) {final _that = this;
switch (_that) {
case _Comment() when $default != null:
return $default(_that.id,_that.targetId,_that.targetType,_that.userId,_that.content,_that.parentCommentId,_that.likeCount,_that.isLiked,_that.user,_that.replies,_that.createdAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Comment implements Comment {
  const _Comment({this.id = '', this.targetId = '', this.targetType = 'post', this.userId = '', this.content = '', this.parentCommentId, this.likeCount = 0, this.isLiked = false, this.user,  List<Comment> replies = const <Comment>[], this.createdAt}): _replies = replies;
  factory _Comment.fromJson(Map<String, dynamic> json) => _$CommentFromJson(json);

@override@JsonKey() final  String id;
@override@JsonKey() final  String targetId;
@override@JsonKey() final  String targetType;
@override@JsonKey() final  String userId;
@override@JsonKey() final  String content;
@override final  String? parentCommentId;
@override@JsonKey() final  int likeCount;
@override@JsonKey() final  bool isLiked;
@override final  User? user;
 final  List<Comment> _replies;
@override@JsonKey() List<Comment> get replies {
  if (_replies is EqualUnmodifiableListView) return _replies;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_replies);
}

@override final  DateTime? createdAt;

/// Create a copy of Comment
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$CommentCopyWith<_Comment> get copyWith => __$CommentCopyWithImpl<_Comment>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$CommentToJson(this, );
}

@override
bool operator ==(Object other) {
    return identical(this, other) || (other.runtimeType == runtimeType&&other is _Comment&&(identical(other.id, id) || other.id == id)&&(identical(other.targetId, targetId) || other.targetId == targetId)&&(identical(other.targetType, targetType) || other.targetType == targetType)&&(identical(other.userId, userId) || other.userId == userId)&&(identical(other.content, content) || other.content == content)&&(identical(other.parentCommentId, parentCommentId) || other.parentCommentId == parentCommentId)&&(identical(other.likeCount, likeCount) || other.likeCount == likeCount)&&(identical(other.isLiked, isLiked) || other.isLiked == isLiked)&&(identical(other.user, user) || other.user == user)&&const DeepCollectionEquality().equals(other.replies, _replies)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
    return Object.hash(runtimeType,id,targetId,targetType,userId,content,parentCommentId,likeCount,isLiked,user,const DeepCollectionEquality().hash(_replies),createdAt);
}

@override
String toString() {
    return 'Comment(id: $id, targetId: $targetId, targetType: $targetType, userId: $userId, content: $content, parentCommentId: $parentCommentId, likeCount: $likeCount, isLiked: $isLiked, user: $user, replies: $replies, createdAt: $createdAt)';
}


}

/// @nodoc
abstract mixin class _$CommentCopyWith<$Res> implements $CommentCopyWith<$Res> {
  factory _$CommentCopyWith(_Comment value, $Res Function(_Comment) _then) = __$CommentCopyWithImpl;
@override @useResult
$Res call({
 String id, String targetId, String targetType, String userId, String content, String? parentCommentId, int likeCount, bool isLiked, User? user, List<Comment> replies, DateTime? createdAt
});


@override $UserCopyWith<$Res>? get user;

}
/// @nodoc
class __$CommentCopyWithImpl<$Res>
    implements _$CommentCopyWith<$Res> {
  __$CommentCopyWithImpl(this._self, this._then);

  final _Comment _self;
  final $Res Function(_Comment) _then;

/// Create a copy of Comment
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? targetId = null,Object? targetType = null,Object? userId = null,Object? content = null,Object? parentCommentId = freezed,Object? likeCount = null,Object? isLiked = null,Object? user = freezed,Object? replies = null,Object? createdAt = freezed,}) {
  return _then(_Comment(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,targetId: null == targetId ? _self.targetId : targetId // ignore: cast_nullable_to_non_nullable
as String,targetType: null == targetType ? _self.targetType : targetType // ignore: cast_nullable_to_non_nullable
as String,userId: null == userId ? _self.userId : userId // ignore: cast_nullable_to_non_nullable
as String,content: null == content ? _self.content : content // ignore: cast_nullable_to_non_nullable
as String,parentCommentId: freezed == parentCommentId ? _self.parentCommentId : parentCommentId // ignore: cast_nullable_to_non_nullable
as String?,likeCount: null == likeCount ? _self.likeCount : likeCount // ignore: cast_nullable_to_non_nullable
as int,isLiked: null == isLiked ? _self.isLiked : isLiked // ignore: cast_nullable_to_non_nullable
as bool,user: freezed == user ? _self.user : user // ignore: cast_nullable_to_non_nullable
as User?,replies: null == replies ? _self._replies : replies // ignore: cast_nullable_to_non_nullable
as List<Comment>,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

/// Create a copy of Comment
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

// dart format on
