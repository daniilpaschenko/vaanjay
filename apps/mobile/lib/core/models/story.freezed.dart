// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint, type=warning, deprecated_member_use, deprecated_member_use_from_same_package
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'story.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$Story {

 String get id; String get userId; String get mediaUrl; String? get caption; String get type; DateTime? get expiresAt; int get viewCount; List<String> get viewers; User? get user; DateTime? get createdAt;
/// Create a copy of Story
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$StoryCopyWith<Story> get copyWith => _$StoryCopyWithImpl<Story>(this as Story, _$identity);

  /// Serializes this Story to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  final _this = this as Story;
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Story&&(identical(other.id, _this.id) || other.id == _this.id)&&(identical(other.userId, _this.userId) || other.userId == _this.userId)&&(identical(other.mediaUrl, _this.mediaUrl) || other.mediaUrl == _this.mediaUrl)&&(identical(other.caption, _this.caption) || other.caption == _this.caption)&&(identical(other.type, _this.type) || other.type == _this.type)&&(identical(other.expiresAt, _this.expiresAt) || other.expiresAt == _this.expiresAt)&&(identical(other.viewCount, _this.viewCount) || other.viewCount == _this.viewCount)&&const DeepCollectionEquality().equals(other.viewers, _this.viewers)&&(identical(other.user, _this.user) || other.user == _this.user)&&(identical(other.createdAt, _this.createdAt) || other.createdAt == _this.createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
  final _this = this as Story;
  return Object.hash(runtimeType,_this.id,_this.userId,_this.mediaUrl,_this.caption,_this.type,_this.expiresAt,_this.viewCount,const DeepCollectionEquality().hash(_this.viewers),_this.user,_this.createdAt);
}

@override
String toString() {
  final _this = this as Story;
  return 'Story(id: ${_this.id}, userId: ${_this.userId}, mediaUrl: ${_this.mediaUrl}, caption: ${_this.caption}, type: ${_this.type}, expiresAt: ${_this.expiresAt}, viewCount: ${_this.viewCount}, viewers: ${_this.viewers}, user: ${_this.user}, createdAt: ${_this.createdAt})';
}


}

/// @nodoc
abstract mixin class $StoryCopyWith<$Res>  {
  factory $StoryCopyWith(Story value, $Res Function(Story) _then) = _$StoryCopyWithImpl;
@useResult
$Res call({
 String id, String userId, String mediaUrl, String? caption, String type, DateTime? expiresAt, int viewCount, List<String> viewers, User? user, DateTime? createdAt
});


$UserCopyWith<$Res>? get user;

}
/// @nodoc
class _$StoryCopyWithImpl<$Res>
    implements $StoryCopyWith<$Res> {
  _$StoryCopyWithImpl(this._self, this._then);

  final Story _self;
  final $Res Function(Story) _then;

/// Create a copy of Story
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? userId = null,Object? mediaUrl = null,Object? caption = freezed,Object? type = null,Object? expiresAt = freezed,Object? viewCount = null,Object? viewers = null,Object? user = freezed,Object? createdAt = freezed,}) {
  return _then(Story(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,userId: null == userId ? _self.userId : userId // ignore: cast_nullable_to_non_nullable
as String,mediaUrl: null == mediaUrl ? _self.mediaUrl : mediaUrl // ignore: cast_nullable_to_non_nullable
as String,caption: freezed == caption ? _self.caption : caption // ignore: cast_nullable_to_non_nullable
as String?,type: null == type ? _self.type : type // ignore: cast_nullable_to_non_nullable
as String,expiresAt: freezed == expiresAt ? _self.expiresAt : expiresAt // ignore: cast_nullable_to_non_nullable
as DateTime?,viewCount: null == viewCount ? _self.viewCount : viewCount // ignore: cast_nullable_to_non_nullable
as int,viewers: null == viewers ? _self.viewers : viewers // ignore: cast_nullable_to_non_nullable
as List<String>,user: freezed == user ? _self.user : user // ignore: cast_nullable_to_non_nullable
as User?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}
/// Create a copy of Story
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


/// Adds pattern-matching-related methods to [Story].
extension StoryPatterns on Story {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Story value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Story() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Story value)  $default,){
final _that = this;
switch (_that) {
case _Story():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Story value)?  $default,){
final _that = this;
switch (_that) {
case _Story() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String userId,  String mediaUrl,  String? caption,  String type,  DateTime? expiresAt,  int viewCount,  List<String> viewers,  User? user,  DateTime? createdAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Story() when $default != null:
return $default(_that.id,_that.userId,_that.mediaUrl,_that.caption,_that.type,_that.expiresAt,_that.viewCount,_that.viewers,_that.user,_that.createdAt);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String userId,  String mediaUrl,  String? caption,  String type,  DateTime? expiresAt,  int viewCount,  List<String> viewers,  User? user,  DateTime? createdAt)  $default,) {final _that = this;
switch (_that) {
case _Story():
return $default(_that.id,_that.userId,_that.mediaUrl,_that.caption,_that.type,_that.expiresAt,_that.viewCount,_that.viewers,_that.user,_that.createdAt);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String userId,  String mediaUrl,  String? caption,  String type,  DateTime? expiresAt,  int viewCount,  List<String> viewers,  User? user,  DateTime? createdAt)?  $default,) {final _that = this;
switch (_that) {
case _Story() when $default != null:
return $default(_that.id,_that.userId,_that.mediaUrl,_that.caption,_that.type,_that.expiresAt,_that.viewCount,_that.viewers,_that.user,_that.createdAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Story implements Story {
  const _Story({this.id = '', this.userId = '', this.mediaUrl = '', this.caption, this.type = 'image', this.expiresAt, this.viewCount = 0,  List<String> viewers = const <String>[], this.user, this.createdAt}): _viewers = viewers;
  factory _Story.fromJson(Map<String, dynamic> json) => _$StoryFromJson(json);

@override@JsonKey() final  String id;
@override@JsonKey() final  String userId;
@override@JsonKey() final  String mediaUrl;
@override final  String? caption;
@override@JsonKey() final  String type;
@override final  DateTime? expiresAt;
@override@JsonKey() final  int viewCount;
 final  List<String> _viewers;
@override@JsonKey() List<String> get viewers {
  if (_viewers is EqualUnmodifiableListView) return _viewers;
  // ignore: implicit_dynamic_type
  return EqualUnmodifiableListView(_viewers);
}

@override final  User? user;
@override final  DateTime? createdAt;

/// Create a copy of Story
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$StoryCopyWith<_Story> get copyWith => __$StoryCopyWithImpl<_Story>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$StoryToJson(this, );
}

@override
bool operator ==(Object other) {
    return identical(this, other) || (other.runtimeType == runtimeType&&other is _Story&&(identical(other.id, id) || other.id == id)&&(identical(other.userId, userId) || other.userId == userId)&&(identical(other.mediaUrl, mediaUrl) || other.mediaUrl == mediaUrl)&&(identical(other.caption, caption) || other.caption == caption)&&(identical(other.type, type) || other.type == type)&&(identical(other.expiresAt, expiresAt) || other.expiresAt == expiresAt)&&(identical(other.viewCount, viewCount) || other.viewCount == viewCount)&&const DeepCollectionEquality().equals(other.viewers, _viewers)&&(identical(other.user, user) || other.user == user)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
    return Object.hash(runtimeType,id,userId,mediaUrl,caption,type,expiresAt,viewCount,const DeepCollectionEquality().hash(_viewers),user,createdAt);
}

@override
String toString() {
    return 'Story(id: $id, userId: $userId, mediaUrl: $mediaUrl, caption: $caption, type: $type, expiresAt: $expiresAt, viewCount: $viewCount, viewers: $viewers, user: $user, createdAt: $createdAt)';
}


}

/// @nodoc
abstract mixin class _$StoryCopyWith<$Res> implements $StoryCopyWith<$Res> {
  factory _$StoryCopyWith(_Story value, $Res Function(_Story) _then) = __$StoryCopyWithImpl;
@override @useResult
$Res call({
 String id, String userId, String mediaUrl, String? caption, String type, DateTime? expiresAt, int viewCount, List<String> viewers, User? user, DateTime? createdAt
});


@override $UserCopyWith<$Res>? get user;

}
/// @nodoc
class __$StoryCopyWithImpl<$Res>
    implements _$StoryCopyWith<$Res> {
  __$StoryCopyWithImpl(this._self, this._then);

  final _Story _self;
  final $Res Function(_Story) _then;

/// Create a copy of Story
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? userId = null,Object? mediaUrl = null,Object? caption = freezed,Object? type = null,Object? expiresAt = freezed,Object? viewCount = null,Object? viewers = null,Object? user = freezed,Object? createdAt = freezed,}) {
  return _then(_Story(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,userId: null == userId ? _self.userId : userId // ignore: cast_nullable_to_non_nullable
as String,mediaUrl: null == mediaUrl ? _self.mediaUrl : mediaUrl // ignore: cast_nullable_to_non_nullable
as String,caption: freezed == caption ? _self.caption : caption // ignore: cast_nullable_to_non_nullable
as String?,type: null == type ? _self.type : type // ignore: cast_nullable_to_non_nullable
as String,expiresAt: freezed == expiresAt ? _self.expiresAt : expiresAt // ignore: cast_nullable_to_non_nullable
as DateTime?,viewCount: null == viewCount ? _self.viewCount : viewCount // ignore: cast_nullable_to_non_nullable
as int,viewers: null == viewers ? _self._viewers : viewers // ignore: cast_nullable_to_non_nullable
as List<String>,user: freezed == user ? _self.user : user // ignore: cast_nullable_to_non_nullable
as User?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

/// Create a copy of Story
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
