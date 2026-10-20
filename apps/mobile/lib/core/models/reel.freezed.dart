// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint, type=warning, deprecated_member_use, deprecated_member_use_from_same_package
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'reel.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$Reel {

 String get id; String get userId; String get videoUrl; String? get thumbnailUrl; String? get caption; String? get audioId; int get durationSeconds; int get viewCount; int get likeCount; int get dislikeCount; int get commentCount; bool get isLiked; bool get isDisliked; bool get isSaved; List<String> get hashtags; User? get user; DateTime? get createdAt;
/// Create a copy of Reel
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ReelCopyWith<Reel> get copyWith => _$ReelCopyWithImpl<Reel>(this as Reel, _$identity);

  /// Serializes this Reel to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  final _this = this as Reel;
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Reel&&(identical(other.id, _this.id) || other.id == _this.id)&&(identical(other.userId, _this.userId) || other.userId == _this.userId)&&(identical(other.videoUrl, _this.videoUrl) || other.videoUrl == _this.videoUrl)&&(identical(other.thumbnailUrl, _this.thumbnailUrl) || other.thumbnailUrl == _this.thumbnailUrl)&&(identical(other.caption, _this.caption) || other.caption == _this.caption)&&(identical(other.audioId, _this.audioId) || other.audioId == _this.audioId)&&(identical(other.durationSeconds, _this.durationSeconds) || other.durationSeconds == _this.durationSeconds)&&(identical(other.viewCount, _this.viewCount) || other.viewCount == _this.viewCount)&&(identical(other.likeCount, _this.likeCount) || other.likeCount == _this.likeCount)&&(identical(other.dislikeCount, _this.dislikeCount) || other.dislikeCount == _this.dislikeCount)&&(identical(other.commentCount, _this.commentCount) || other.commentCount == _this.commentCount)&&(identical(other.isLiked, _this.isLiked) || other.isLiked == _this.isLiked)&&(identical(other.isDisliked, _this.isDisliked) || other.isDisliked == _this.isDisliked)&&(identical(other.isSaved, _this.isSaved) || other.isSaved == _this.isSaved)&&const DeepCollectionEquality().equals(other.hashtags, _this.hashtags)&&(identical(other.user, _this.user) || other.user == _this.user)&&(identical(other.createdAt, _this.createdAt) || other.createdAt == _this.createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
  final _this = this as Reel;
  return Object.hash(runtimeType,_this.id,_this.userId,_this.videoUrl,_this.thumbnailUrl,_this.caption,_this.audioId,_this.durationSeconds,_this.viewCount,_this.likeCount,_this.dislikeCount,_this.commentCount,_this.isLiked,_this.isDisliked,_this.isSaved,const DeepCollectionEquality().hash(_this.hashtags),_this.user,_this.createdAt);
}

@override
String toString() {
  final _this = this as Reel;
  return 'Reel(id: ${_this.id}, userId: ${_this.userId}, videoUrl: ${_this.videoUrl}, thumbnailUrl: ${_this.thumbnailUrl}, caption: ${_this.caption}, audioId: ${_this.audioId}, durationSeconds: ${_this.durationSeconds}, viewCount: ${_this.viewCount}, likeCount: ${_this.likeCount}, dislikeCount: ${_this.dislikeCount}, commentCount: ${_this.commentCount}, isLiked: ${_this.isLiked}, isDisliked: ${_this.isDisliked}, isSaved: ${_this.isSaved}, hashtags: ${_this.hashtags}, user: ${_this.user}, createdAt: ${_this.createdAt})';
}


}

/// @nodoc
abstract mixin class $ReelCopyWith<$Res>  {
  factory $ReelCopyWith(Reel value, $Res Function(Reel) _then) = _$ReelCopyWithImpl;
@useResult
$Res call({
 String id, String userId, String videoUrl, String? thumbnailUrl, String? caption, String? audioId, int durationSeconds, int viewCount, int likeCount, int dislikeCount, int commentCount, bool isLiked, bool isDisliked, bool isSaved, List<String> hashtags, User? user, DateTime? createdAt
});


$UserCopyWith<$Res>? get user;

}
/// @nodoc
class _$ReelCopyWithImpl<$Res>
    implements $ReelCopyWith<$Res> {
  _$ReelCopyWithImpl(this._self, this._then);

  final Reel _self;
  final $Res Function(Reel) _then;

/// Create a copy of Reel
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? userId = null,Object? videoUrl = null,Object? thumbnailUrl = freezed,Object? caption = freezed,Object? audioId = freezed,Object? durationSeconds = null,Object? viewCount = null,Object? likeCount = null,Object? dislikeCount = null,Object? commentCount = null,Object? isLiked = null,Object? isDisliked = null,Object? isSaved = null,Object? hashtags = null,Object? user = freezed,Object? createdAt = freezed,}) {
  return _then(Reel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,userId: null == userId ? _self.userId : userId // ignore: cast_nullable_to_non_nullable
as String,videoUrl: null == videoUrl ? _self.videoUrl : videoUrl // ignore: cast_nullable_to_non_nullable
as String,thumbnailUrl: freezed == thumbnailUrl ? _self.thumbnailUrl : thumbnailUrl // ignore: cast_nullable_to_non_nullable
as String?,caption: freezed == caption ? _self.caption : caption // ignore: cast_nullable_to_non_nullable
as String?,audioId: freezed == audioId ? _self.audioId : audioId // ignore: cast_nullable_to_non_nullable
as String?,durationSeconds: null == durationSeconds ? _self.durationSeconds : durationSeconds // ignore: cast_nullable_to_non_nullable
as int,viewCount: null == viewCount ? _self.viewCount : viewCount // ignore: cast_nullable_to_non_nullable
as int,likeCount: null == likeCount ? _self.likeCount : likeCount // ignore: cast_nullable_to_non_nullable
as int,dislikeCount: null == dislikeCount ? _self.dislikeCount : dislikeCount // ignore: cast_nullable_to_non_nullable
as int,commentCount: null == commentCount ? _self.commentCount : commentCount // ignore: cast_nullable_to_non_nullable
as int,isLiked: null == isLiked ? _self.isLiked : isLiked // ignore: cast_nullable_to_non_nullable
as bool,isDisliked: null == isDisliked ? _self.isDisliked : isDisliked // ignore: cast_nullable_to_non_nullable
as bool,isSaved: null == isSaved ? _self.isSaved : isSaved // ignore: cast_nullable_to_non_nullable
as bool,hashtags: null == hashtags ? _self.hashtags : hashtags // ignore: cast_nullable_to_non_nullable
as List<String>,user: freezed == user ? _self.user : user // ignore: cast_nullable_to_non_nullable
as User?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}
/// Create a copy of Reel
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


/// Adds pattern-matching-related methods to [Reel].
extension ReelPatterns on Reel {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Reel value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Reel() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Reel value)  $default,){
final _that = this;
switch (_that) {
case _Reel():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Reel value)?  $default,){
final _that = this;
switch (_that) {
case _Reel() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String userId,  String videoUrl,  String? thumbnailUrl,  String? caption,  String? audioId,  int durationSeconds,  int viewCount,  int likeCount,  int dislikeCount,  int commentCount,  bool isLiked,  bool isDisliked,  bool isSaved,  List<String> hashtags,  User? user,  DateTime? createdAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Reel() when $default != null:
return $default(_that.id,_that.userId,_that.videoUrl,_that.thumbnailUrl,_that.caption,_that.audioId,_that.durationSeconds,_that.viewCount,_that.likeCount,_that.dislikeCount,_that.commentCount,_that.isLiked,_that.isDisliked,_that.isSaved,_that.hashtags,_that.user,_that.createdAt);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String userId,  String videoUrl,  String? thumbnailUrl,  String? caption,  String? audioId,  int durationSeconds,  int viewCount,  int likeCount,  int dislikeCount,  int commentCount,  bool isLiked,  bool isDisliked,  bool isSaved,  List<String> hashtags,  User? user,  DateTime? createdAt)  $default,) {final _that = this;
switch (_that) {
case _Reel():
return $default(_that.id,_that.userId,_that.videoUrl,_that.thumbnailUrl,_that.caption,_that.audioId,_that.durationSeconds,_that.viewCount,_that.likeCount,_that.dislikeCount,_that.commentCount,_that.isLiked,_that.isDisliked,_that.isSaved,_that.hashtags,_that.user,_that.createdAt);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String userId,  String videoUrl,  String? thumbnailUrl,  String? caption,  String? audioId,  int durationSeconds,  int viewCount,  int likeCount,  int dislikeCount,  int commentCount,  bool isLiked,  bool isDisliked,  bool isSaved,  List<String> hashtags,  User? user,  DateTime? createdAt)?  $default,) {final _that = this;
switch (_that) {
case _Reel() when $default != null:
return $default(_that.id,_that.userId,_that.videoUrl,_that.thumbnailUrl,_that.caption,_that.audioId,_that.durationSeconds,_that.viewCount,_that.likeCount,_that.dislikeCount,_that.commentCount,_that.isLiked,_that.isDisliked,_that.isSaved,_that.hashtags,_that.user,_that.createdAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Reel implements Reel {
  const _Reel({this.id = '', this.userId = '', this.videoUrl = '', this.thumbnailUrl, this.caption, this.audioId, this.durationSeconds = 0, this.viewCount = 0, this.likeCount = 0, this.dislikeCount = 0, this.commentCount = 0, this.isLiked = false, this.isDisliked = false, this.isSaved = false,  List<String> hashtags = const <String>[], this.user, this.createdAt}): _hashtags = hashtags;
  factory _Reel.fromJson(Map<String, dynamic> json) => _$ReelFromJson(json);

@override@JsonKey() final  String id;
@override@JsonKey() final  String userId;
@override@JsonKey() final  String videoUrl;
@override final  String? thumbnailUrl;
@override final  String? caption;
@override final  String? audioId;
@override@JsonKey() final  int durationSeconds;
@override@JsonKey() final  int viewCount;
@override@JsonKey() final  int likeCount;
@override@JsonKey() final  int dislikeCount;
@override@JsonKey() final  int commentCount;
@override@JsonKey() final  bool isLiked;
@override@JsonKey() final  bool isDisliked;
@override@JsonKey() final  bool isSaved;
 final  List<String> _hashtags;
@override@JsonKey() List<String> get hashtags {
  if (_hashtags is EqualUnmodifiableListView) return _hashtags;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_hashtags);
}

@override final  User? user;
@override final  DateTime? createdAt;

/// Create a copy of Reel
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ReelCopyWith<_Reel> get copyWith => __$ReelCopyWithImpl<_Reel>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ReelToJson(this, );
}

@override
bool operator ==(Object other) {
    return identical(this, other) || (other.runtimeType == runtimeType&&other is _Reel&&(identical(other.id, id) || other.id == id)&&(identical(other.userId, userId) || other.userId == userId)&&(identical(other.videoUrl, videoUrl) || other.videoUrl == videoUrl)&&(identical(other.thumbnailUrl, thumbnailUrl) || other.thumbnailUrl == thumbnailUrl)&&(identical(other.caption, caption) || other.caption == caption)&&(identical(other.audioId, audioId) || other.audioId == audioId)&&(identical(other.durationSeconds, durationSeconds) || other.durationSeconds == durationSeconds)&&(identical(other.viewCount, viewCount) || other.viewCount == viewCount)&&(identical(other.likeCount, likeCount) || other.likeCount == likeCount)&&(identical(other.dislikeCount, dislikeCount) || other.dislikeCount == dislikeCount)&&(identical(other.commentCount, commentCount) || other.commentCount == commentCount)&&(identical(other.isLiked, isLiked) || other.isLiked == isLiked)&&(identical(other.isDisliked, isDisliked) || other.isDisliked == isDisliked)&&(identical(other.isSaved, isSaved) || other.isSaved == isSaved)&&const DeepCollectionEquality().equals(other.hashtags, _hashtags)&&(identical(other.user, user) || other.user == user)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
    return Object.hash(runtimeType,id,userId,videoUrl,thumbnailUrl,caption,audioId,durationSeconds,viewCount,likeCount,dislikeCount,commentCount,isLiked,isDisliked,isSaved,const DeepCollectionEquality().hash(_hashtags),user,createdAt);
}

@override
String toString() {
    return 'Reel(id: $id, userId: $userId, videoUrl: $videoUrl, thumbnailUrl: $thumbnailUrl, caption: $caption, audioId: $audioId, durationSeconds: $durationSeconds, viewCount: $viewCount, likeCount: $likeCount, dislikeCount: $dislikeCount, commentCount: $commentCount, isLiked: $isLiked, isDisliked: $isDisliked, isSaved: $isSaved, hashtags: $hashtags, user: $user, createdAt: $createdAt)';
}


}

/// @nodoc
abstract mixin class _$ReelCopyWith<$Res> implements $ReelCopyWith<$Res> {
  factory _$ReelCopyWith(_Reel value, $Res Function(_Reel) _then) = __$ReelCopyWithImpl;
@override @useResult
$Res call({
 String id, String userId, String videoUrl, String? thumbnailUrl, String? caption, String? audioId, int durationSeconds, int viewCount, int likeCount, int dislikeCount, int commentCount, bool isLiked, bool isDisliked, bool isSaved, List<String> hashtags, User? user, DateTime? createdAt
});


@override $UserCopyWith<$Res>? get user;

}
/// @nodoc
class __$ReelCopyWithImpl<$Res>
    implements _$ReelCopyWith<$Res> {
  __$ReelCopyWithImpl(this._self, this._then);

  final _Reel _self;
  final $Res Function(_Reel) _then;

/// Create a copy of Reel
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? userId = null,Object? videoUrl = null,Object? thumbnailUrl = freezed,Object? caption = freezed,Object? audioId = freezed,Object? durationSeconds = null,Object? viewCount = null,Object? likeCount = null,Object? dislikeCount = null,Object? commentCount = null,Object? isLiked = null,Object? isDisliked = null,Object? isSaved = null,Object? hashtags = null,Object? user = freezed,Object? createdAt = freezed,}) {
  return _then(_Reel(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,userId: null == userId ? _self.userId : userId // ignore: cast_nullable_to_non_nullable
as String,videoUrl: null == videoUrl ? _self.videoUrl : videoUrl // ignore: cast_nullable_to_non_nullable
as String,thumbnailUrl: freezed == thumbnailUrl ? _self.thumbnailUrl : thumbnailUrl // ignore: cast_nullable_to_non_nullable
as String?,caption: freezed == caption ? _self.caption : caption // ignore: cast_nullable_to_non_nullable
as String?,audioId: freezed == audioId ? _self.audioId : audioId // ignore: cast_nullable_to_non_nullable
as String?,durationSeconds: null == durationSeconds ? _self.durationSeconds : durationSeconds // ignore: cast_nullable_to_non_nullable
as int,viewCount: null == viewCount ? _self.viewCount : viewCount // ignore: cast_nullable_to_non_nullable
as int,likeCount: null == likeCount ? _self.likeCount : likeCount // ignore: cast_nullable_to_non_nullable
as int,dislikeCount: null == dislikeCount ? _self.dislikeCount : dislikeCount // ignore: cast_nullable_to_non_nullable
as int,commentCount: null == commentCount ? _self.commentCount : commentCount // ignore: cast_nullable_to_non_nullable
as int,isLiked: null == isLiked ? _self.isLiked : isLiked // ignore: cast_nullable_to_non_nullable
as bool,isDisliked: null == isDisliked ? _self.isDisliked : isDisliked // ignore: cast_nullable_to_non_nullable
as bool,isSaved: null == isSaved ? _self.isSaved : isSaved // ignore: cast_nullable_to_non_nullable
as bool,hashtags: null == hashtags ? _self._hashtags : hashtags // ignore: cast_nullable_to_non_nullable
as List<String>,user: freezed == user ? _self.user : user // ignore: cast_nullable_to_non_nullable
as User?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

/// Create a copy of Reel
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
