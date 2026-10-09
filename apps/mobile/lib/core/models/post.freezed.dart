// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint, type=warning, deprecated_member_use, deprecated_member_use_from_same_package
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'post.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$Post {

 String get id; String get userId; List<String> get mediaUrls; String? get caption; String? get location; String get type; String get audience; bool get isArchived; int get likeCount; int get dislikeCount; int get commentCount; int get repostCount; bool get isLiked; bool get isDisliked; bool get isSaved; bool get isReposted; List<String> get hashtags; List<String> get taggedUsers; User? get user; DateTime? get createdAt;
/// Create a copy of Post
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$PostCopyWith<Post> get copyWith => _$PostCopyWithImpl<Post>(this as Post, _$identity);

  /// Serializes this Post to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  final _this = this as Post;
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Post&&(identical(other.id, _this.id) || other.id == _this.id)&&(identical(other.userId, _this.userId) || other.userId == _this.userId)&&const DeepCollectionEquality().equals(other.mediaUrls, _this.mediaUrls)&&(identical(other.caption, _this.caption) || other.caption == _this.caption)&&(identical(other.location, _this.location) || other.location == _this.location)&&(identical(other.type, _this.type) || other.type == _this.type)&&(identical(other.audience, _this.audience) || other.audience == _this.audience)&&(identical(other.isArchived, _this.isArchived) || other.isArchived == _this.isArchived)&&(identical(other.likeCount, _this.likeCount) || other.likeCount == _this.likeCount)&&(identical(other.dislikeCount, _this.dislikeCount) || other.dislikeCount == _this.dislikeCount)&&(identical(other.commentCount, _this.commentCount) || other.commentCount == _this.commentCount)&&(identical(other.repostCount, _this.repostCount) || other.repostCount == _this.repostCount)&&(identical(other.isLiked, _this.isLiked) || other.isLiked == _this.isLiked)&&(identical(other.isDisliked, _this.isDisliked) || other.isDisliked == _this.isDisliked)&&(identical(other.isSaved, _this.isSaved) || other.isSaved == _this.isSaved)&&(identical(other.isReposted, _this.isReposted) || other.isReposted == _this.isReposted)&&const DeepCollectionEquality().equals(other.hashtags, _this.hashtags)&&const DeepCollectionEquality().equals(other.taggedUsers, _this.taggedUsers)&&(identical(other.user, _this.user) || other.user == _this.user)&&(identical(other.createdAt, _this.createdAt) || other.createdAt == _this.createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
  final _this = this as Post;
  return Object.hashAll([runtimeType,_this.id,_this.userId,const DeepCollectionEquality().hash(_this.mediaUrls),_this.caption,_this.location,_this.type,_this.audience,_this.isArchived,_this.likeCount,_this.dislikeCount,_this.commentCount,_this.repostCount,_this.isLiked,_this.isDisliked,_this.isSaved,_this.isReposted,const DeepCollectionEquality().hash(_this.hashtags),const DeepCollectionEquality().hash(_this.taggedUsers),_this.user,_this.createdAt]);
}

@override
String toString() {
  final _this = this as Post;
  return 'Post(id: ${_this.id}, userId: ${_this.userId}, mediaUrls: ${_this.mediaUrls}, caption: ${_this.caption}, location: ${_this.location}, type: ${_this.type}, audience: ${_this.audience}, isArchived: ${_this.isArchived}, likeCount: ${_this.likeCount}, dislikeCount: ${_this.dislikeCount}, commentCount: ${_this.commentCount}, repostCount: ${_this.repostCount}, isLiked: ${_this.isLiked}, isDisliked: ${_this.isDisliked}, isSaved: ${_this.isSaved}, isReposted: ${_this.isReposted}, hashtags: ${_this.hashtags}, taggedUsers: ${_this.taggedUsers}, user: ${_this.user}, createdAt: ${_this.createdAt})';
}


}

/// @nodoc
abstract mixin class $PostCopyWith<$Res>  {
  factory $PostCopyWith(Post value, $Res Function(Post) _then) = _$PostCopyWithImpl;
@useResult
$Res call({
 String id, String userId, List<String> mediaUrls, String? caption, String? location, String type, String audience, bool isArchived, int likeCount, int dislikeCount, int commentCount, int repostCount, bool isLiked, bool isDisliked, bool isSaved, bool isReposted, List<String> hashtags, List<String> taggedUsers, User? user, DateTime? createdAt
});


$UserCopyWith<$Res>? get user;

}
/// @nodoc
class _$PostCopyWithImpl<$Res>
    implements $PostCopyWith<$Res> {
  _$PostCopyWithImpl(this._self, this._then);

  final Post _self;
  final $Res Function(Post) _then;

/// Create a copy of Post
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? userId = null,Object? mediaUrls = null,Object? caption = freezed,Object? location = freezed,Object? type = null,Object? audience = null,Object? isArchived = null,Object? likeCount = null,Object? dislikeCount = null,Object? commentCount = null,Object? repostCount = null,Object? isLiked = null,Object? isDisliked = null,Object? isSaved = null,Object? isReposted = null,Object? hashtags = null,Object? taggedUsers = null,Object? user = freezed,Object? createdAt = freezed,}) {
  return _then(Post(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,userId: null == userId ? _self.userId : userId // ignore: cast_nullable_to_non_nullable
as String,mediaUrls: null == mediaUrls ? _self.mediaUrls : mediaUrls // ignore: cast_nullable_to_non_nullable
as List<String>,caption: freezed == caption ? _self.caption : caption // ignore: cast_nullable_to_non_nullable
as String?,location: freezed == location ? _self.location : location // ignore: cast_nullable_to_non_nullable
as String?,type: null == type ? _self.type : type // ignore: cast_nullable_to_non_nullable
as String,audience: null == audience ? _self.audience : audience // ignore: cast_nullable_to_non_nullable
as String,isArchived: null == isArchived ? _self.isArchived : isArchived // ignore: cast_nullable_to_non_nullable
as bool,likeCount: null == likeCount ? _self.likeCount : likeCount // ignore: cast_nullable_to_non_nullable
as int,dislikeCount: null == dislikeCount ? _self.dislikeCount : dislikeCount // ignore: cast_nullable_to_non_nullable
as int,commentCount: null == commentCount ? _self.commentCount : commentCount // ignore: cast_nullable_to_non_nullable
as int,repostCount: null == repostCount ? _self.repostCount : repostCount // ignore: cast_nullable_to_non_nullable
as int,isLiked: null == isLiked ? _self.isLiked : isLiked // ignore: cast_nullable_to_non_nullable
as bool,isDisliked: null == isDisliked ? _self.isDisliked : isDisliked // ignore: cast_nullable_to_non_nullable
as bool,isSaved: null == isSaved ? _self.isSaved : isSaved // ignore: cast_nullable_to_non_nullable
as bool,isReposted: null == isReposted ? _self.isReposted : isReposted // ignore: cast_nullable_to_non_nullable
as bool,hashtags: null == hashtags ? _self.hashtags : hashtags // ignore: cast_nullable_to_non_nullable
as List<String>,taggedUsers: null == taggedUsers ? _self.taggedUsers : taggedUsers // ignore: cast_nullable_to_non_nullable
as List<String>,user: freezed == user ? _self.user : user // ignore: cast_nullable_to_non_nullable
as User?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}
/// Create a copy of Post
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


/// Adds pattern-matching-related methods to [Post].
extension PostPatterns on Post {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Post value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Post() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Post value)  $default,){
final _that = this;
switch (_that) {
case _Post():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Post value)?  $default,){
final _that = this;
switch (_that) {
case _Post() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String userId,  List<String> mediaUrls,  String? caption,  String? location,  String type,  String audience,  bool isArchived,  int likeCount,  int dislikeCount,  int commentCount,  int repostCount,  bool isLiked,  bool isDisliked,  bool isSaved,  bool isReposted,  List<String> hashtags,  List<String> taggedUsers,  User? user,  DateTime? createdAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Post() when $default != null:
return $default(_that.id,_that.userId,_that.mediaUrls,_that.caption,_that.location,_that.type,_that.audience,_that.isArchived,_that.likeCount,_that.dislikeCount,_that.commentCount,_that.repostCount,_that.isLiked,_that.isDisliked,_that.isSaved,_that.isReposted,_that.hashtags,_that.taggedUsers,_that.user,_that.createdAt);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String userId,  List<String> mediaUrls,  String? caption,  String? location,  String type,  String audience,  bool isArchived,  int likeCount,  int dislikeCount,  int commentCount,  int repostCount,  bool isLiked,  bool isDisliked,  bool isSaved,  bool isReposted,  List<String> hashtags,  List<String> taggedUsers,  User? user,  DateTime? createdAt)  $default,) {final _that = this;
switch (_that) {
case _Post():
return $default(_that.id,_that.userId,_that.mediaUrls,_that.caption,_that.location,_that.type,_that.audience,_that.isArchived,_that.likeCount,_that.dislikeCount,_that.commentCount,_that.repostCount,_that.isLiked,_that.isDisliked,_that.isSaved,_that.isReposted,_that.hashtags,_that.taggedUsers,_that.user,_that.createdAt);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String userId,  List<String> mediaUrls,  String? caption,  String? location,  String type,  String audience,  bool isArchived,  int likeCount,  int dislikeCount,  int commentCount,  int repostCount,  bool isLiked,  bool isDisliked,  bool isSaved,  bool isReposted,  List<String> hashtags,  List<String> taggedUsers,  User? user,  DateTime? createdAt)?  $default,) {final _that = this;
switch (_that) {
case _Post() when $default != null:
return $default(_that.id,_that.userId,_that.mediaUrls,_that.caption,_that.location,_that.type,_that.audience,_that.isArchived,_that.likeCount,_that.dislikeCount,_that.commentCount,_that.repostCount,_that.isLiked,_that.isDisliked,_that.isSaved,_that.isReposted,_that.hashtags,_that.taggedUsers,_that.user,_that.createdAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Post implements Post {
  const _Post({this.id = '', this.userId = '',  List<String> mediaUrls = const <String>[], this.caption, this.location, this.type = 'photo', this.audience = 'public', this.isArchived = false, this.likeCount = 0, this.dislikeCount = 0, this.commentCount = 0, this.repostCount = 0, this.isLiked = false, this.isDisliked = false, this.isSaved = false, this.isReposted = false,  List<String> hashtags = const <String>[],  List<String> taggedUsers = const <String>[], this.user, this.createdAt}): _mediaUrls = mediaUrls,_hashtags = hashtags,_taggedUsers = taggedUsers;
  factory _Post.fromJson(Map<String, dynamic> json) => _$PostFromJson(json);

@override@JsonKey() final  String id;
@override@JsonKey() final  String userId;
 final  List<String> _mediaUrls;
@override@JsonKey() List<String> get mediaUrls {
  if (_mediaUrls is EqualUnmodifiableListView) return _mediaUrls;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_mediaUrls);
}

@override final  String? caption;
@override final  String? location;
@override@JsonKey() final  String type;
@override@JsonKey() final  String audience;
@override@JsonKey() final  bool isArchived;
@override@JsonKey() final  int likeCount;
@override@JsonKey() final  int dislikeCount;
@override@JsonKey() final  int commentCount;
@override@JsonKey() final  int repostCount;
@override@JsonKey() final  bool isLiked;
@override@JsonKey() final  bool isDisliked;
@override@JsonKey() final  bool isSaved;
@override@JsonKey() final  bool isReposted;
 final  List<String> _hashtags;
@override@JsonKey() List<String> get hashtags {
  if (_hashtags is EqualUnmodifiableListView) return _hashtags;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_hashtags);
}

 final  List<String> _taggedUsers;
@override@JsonKey() List<String> get taggedUsers {
  if (_taggedUsers is EqualUnmodifiableListView) return _taggedUsers;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_taggedUsers);
}

@override final  User? user;
@override final  DateTime? createdAt;

/// Create a copy of Post
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$PostCopyWith<_Post> get copyWith => __$PostCopyWithImpl<_Post>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$PostToJson(this, );
}

@override
bool operator ==(Object other) {
    return identical(this, other) || (other.runtimeType == runtimeType&&other is _Post&&(identical(other.id, id) || other.id == id)&&(identical(other.userId, userId) || other.userId == userId)&&const DeepCollectionEquality().equals(other.mediaUrls, _mediaUrls)&&(identical(other.caption, caption) || other.caption == caption)&&(identical(other.location, location) || other.location == location)&&(identical(other.type, type) || other.type == type)&&(identical(other.audience, audience) || other.audience == audience)&&(identical(other.isArchived, isArchived) || other.isArchived == isArchived)&&(identical(other.likeCount, likeCount) || other.likeCount == likeCount)&&(identical(other.dislikeCount, dislikeCount) || other.dislikeCount == dislikeCount)&&(identical(other.commentCount, commentCount) || other.commentCount == commentCount)&&(identical(other.repostCount, repostCount) || other.repostCount == repostCount)&&(identical(other.isLiked, isLiked) || other.isLiked == isLiked)&&(identical(other.isDisliked, isDisliked) || other.isDisliked == isDisliked)&&(identical(other.isSaved, isSaved) || other.isSaved == isSaved)&&(identical(other.isReposted, isReposted) || other.isReposted == isReposted)&&const DeepCollectionEquality().equals(other.hashtags, _hashtags)&&const DeepCollectionEquality().equals(other.taggedUsers, _taggedUsers)&&(identical(other.user, user) || other.user == user)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
    return Object.hashAll([runtimeType,id,userId,const DeepCollectionEquality().hash(_mediaUrls),caption,location,type,audience,isArchived,likeCount,dislikeCount,commentCount,repostCount,isLiked,isDisliked,isSaved,isReposted,const DeepCollectionEquality().hash(_hashtags),const DeepCollectionEquality().hash(_taggedUsers),user,createdAt]);
}

@override
String toString() {
    return 'Post(id: $id, userId: $userId, mediaUrls: $mediaUrls, caption: $caption, location: $location, type: $type, audience: $audience, isArchived: $isArchived, likeCount: $likeCount, dislikeCount: $dislikeCount, commentCount: $commentCount, repostCount: $repostCount, isLiked: $isLiked, isDisliked: $isDisliked, isSaved: $isSaved, isReposted: $isReposted, hashtags: $hashtags, taggedUsers: $taggedUsers, user: $user, createdAt: $createdAt)';
}


}

/// @nodoc
abstract mixin class _$PostCopyWith<$Res> implements $PostCopyWith<$Res> {
  factory _$PostCopyWith(_Post value, $Res Function(_Post) _then) = __$PostCopyWithImpl;
@override @useResult
$Res call({
 String id, String userId, List<String> mediaUrls, String? caption, String? location, String type, String audience, bool isArchived, int likeCount, int dislikeCount, int commentCount, int repostCount, bool isLiked, bool isDisliked, bool isSaved, bool isReposted, List<String> hashtags, List<String> taggedUsers, User? user, DateTime? createdAt
});


@override $UserCopyWith<$Res>? get user;

}
/// @nodoc
class __$PostCopyWithImpl<$Res>
    implements _$PostCopyWith<$Res> {
  __$PostCopyWithImpl(this._self, this._then);

  final _Post _self;
  final $Res Function(_Post) _then;

/// Create a copy of Post
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? userId = null,Object? mediaUrls = null,Object? caption = freezed,Object? location = freezed,Object? type = null,Object? audience = null,Object? isArchived = null,Object? likeCount = null,Object? dislikeCount = null,Object? commentCount = null,Object? repostCount = null,Object? isLiked = null,Object? isDisliked = null,Object? isSaved = null,Object? isReposted = null,Object? hashtags = null,Object? taggedUsers = null,Object? user = freezed,Object? createdAt = freezed,}) {
  return _then(_Post(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,userId: null == userId ? _self.userId : userId // ignore: cast_nullable_to_non_nullable
as String,mediaUrls: null == mediaUrls ? _self._mediaUrls : mediaUrls // ignore: cast_nullable_to_non_nullable
as List<String>,caption: freezed == caption ? _self.caption : caption // ignore: cast_nullable_to_non_nullable
as String?,location: freezed == location ? _self.location : location // ignore: cast_nullable_to_non_nullable
as String?,type: null == type ? _self.type : type // ignore: cast_nullable_to_non_nullable
as String,audience: null == audience ? _self.audience : audience // ignore: cast_nullable_to_non_nullable
as String,isArchived: null == isArchived ? _self.isArchived : isArchived // ignore: cast_nullable_to_non_nullable
as bool,likeCount: null == likeCount ? _self.likeCount : likeCount // ignore: cast_nullable_to_non_nullable
as int,dislikeCount: null == dislikeCount ? _self.dislikeCount : dislikeCount // ignore: cast_nullable_to_non_nullable
as int,commentCount: null == commentCount ? _self.commentCount : commentCount // ignore: cast_nullable_to_non_nullable
as int,repostCount: null == repostCount ? _self.repostCount : repostCount // ignore: cast_nullable_to_non_nullable
as int,isLiked: null == isLiked ? _self.isLiked : isLiked // ignore: cast_nullable_to_non_nullable
as bool,isDisliked: null == isDisliked ? _self.isDisliked : isDisliked // ignore: cast_nullable_to_non_nullable
as bool,isSaved: null == isSaved ? _self.isSaved : isSaved // ignore: cast_nullable_to_non_nullable
as bool,isReposted: null == isReposted ? _self.isReposted : isReposted // ignore: cast_nullable_to_non_nullable
as bool,hashtags: null == hashtags ? _self._hashtags : hashtags // ignore: cast_nullable_to_non_nullable
as List<String>,taggedUsers: null == taggedUsers ? _self._taggedUsers : taggedUsers // ignore: cast_nullable_to_non_nullable
as List<String>,user: freezed == user ? _self.user : user // ignore: cast_nullable_to_non_nullable
as User?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

/// Create a copy of Post
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
