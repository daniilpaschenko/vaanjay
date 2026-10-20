// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint, type=warning, deprecated_member_use, deprecated_member_use_from_same_package
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'live_stream.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$LiveStream {

 String get id; String get userId; User? get user; String? get title; String? get topicTag; int get viewerCount; bool get isActive; DateTime? get startedAt; DateTime? get endedAt; String? get coHostId; String? get replayUrl;
/// Create a copy of LiveStream
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$LiveStreamCopyWith<LiveStream> get copyWith => _$LiveStreamCopyWithImpl<LiveStream>(this as LiveStream, _$identity);

  /// Serializes this LiveStream to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  final _this = this as LiveStream;
  return identical(this, other) || (other.runtimeType == runtimeType&&other is LiveStream&&(identical(other.id, _this.id) || other.id == _this.id)&&(identical(other.userId, _this.userId) || other.userId == _this.userId)&&(identical(other.user, _this.user) || other.user == _this.user)&&(identical(other.title, _this.title) || other.title == _this.title)&&(identical(other.topicTag, _this.topicTag) || other.topicTag == _this.topicTag)&&(identical(other.viewerCount, _this.viewerCount) || other.viewerCount == _this.viewerCount)&&(identical(other.isActive, _this.isActive) || other.isActive == _this.isActive)&&(identical(other.startedAt, _this.startedAt) || other.startedAt == _this.startedAt)&&(identical(other.endedAt, _this.endedAt) || other.endedAt == _this.endedAt)&&(identical(other.coHostId, _this.coHostId) || other.coHostId == _this.coHostId)&&(identical(other.replayUrl, _this.replayUrl) || other.replayUrl == _this.replayUrl));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
  final _this = this as LiveStream;
  return Object.hash(runtimeType,_this.id,_this.userId,_this.user,_this.title,_this.topicTag,_this.viewerCount,_this.isActive,_this.startedAt,_this.endedAt,_this.coHostId,_this.replayUrl);
}

@override
String toString() {
  final _this = this as LiveStream;
  return 'LiveStream(id: ${_this.id}, userId: ${_this.userId}, user: ${_this.user}, title: ${_this.title}, topicTag: ${_this.topicTag}, viewerCount: ${_this.viewerCount}, isActive: ${_this.isActive}, startedAt: ${_this.startedAt}, endedAt: ${_this.endedAt}, coHostId: ${_this.coHostId}, replayUrl: ${_this.replayUrl})';
}


}

/// @nodoc
abstract mixin class $LiveStreamCopyWith<$Res>  {
  factory $LiveStreamCopyWith(LiveStream value, $Res Function(LiveStream) _then) = _$LiveStreamCopyWithImpl;
@useResult
$Res call({
 String id, String userId, User? user, String? title, String? topicTag, int viewerCount, bool isActive, DateTime? startedAt, DateTime? endedAt, String? coHostId, String? replayUrl
});


$UserCopyWith<$Res>? get user;

}
/// @nodoc
class _$LiveStreamCopyWithImpl<$Res>
    implements $LiveStreamCopyWith<$Res> {
  _$LiveStreamCopyWithImpl(this._self, this._then);

  final LiveStream _self;
  final $Res Function(LiveStream) _then;

/// Create a copy of LiveStream
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? userId = null,Object? user = freezed,Object? title = freezed,Object? topicTag = freezed,Object? viewerCount = null,Object? isActive = null,Object? startedAt = freezed,Object? endedAt = freezed,Object? coHostId = freezed,Object? replayUrl = freezed,}) {
  return _then(LiveStream(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,userId: null == userId ? _self.userId : userId // ignore: cast_nullable_to_non_nullable
as String,user: freezed == user ? _self.user : user // ignore: cast_nullable_to_non_nullable
as User?,title: freezed == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String?,topicTag: freezed == topicTag ? _self.topicTag : topicTag // ignore: cast_nullable_to_non_nullable
as String?,viewerCount: null == viewerCount ? _self.viewerCount : viewerCount // ignore: cast_nullable_to_non_nullable
as int,isActive: null == isActive ? _self.isActive : isActive // ignore: cast_nullable_to_non_nullable
as bool,startedAt: freezed == startedAt ? _self.startedAt : startedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,endedAt: freezed == endedAt ? _self.endedAt : endedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,coHostId: freezed == coHostId ? _self.coHostId : coHostId // ignore: cast_nullable_to_non_nullable
as String?,replayUrl: freezed == replayUrl ? _self.replayUrl : replayUrl // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}
/// Create a copy of LiveStream
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


/// Adds pattern-matching-related methods to [LiveStream].
extension LiveStreamPatterns on LiveStream {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _LiveStream value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _LiveStream() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _LiveStream value)  $default,){
final _that = this;
switch (_that) {
case _LiveStream():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _LiveStream value)?  $default,){
final _that = this;
switch (_that) {
case _LiveStream() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String userId,  User? user,  String? title,  String? topicTag,  int viewerCount,  bool isActive,  DateTime? startedAt,  DateTime? endedAt,  String? coHostId,  String? replayUrl)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _LiveStream() when $default != null:
return $default(_that.id,_that.userId,_that.user,_that.title,_that.topicTag,_that.viewerCount,_that.isActive,_that.startedAt,_that.endedAt,_that.coHostId,_that.replayUrl);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String userId,  User? user,  String? title,  String? topicTag,  int viewerCount,  bool isActive,  DateTime? startedAt,  DateTime? endedAt,  String? coHostId,  String? replayUrl)  $default,) {final _that = this;
switch (_that) {
case _LiveStream():
return $default(_that.id,_that.userId,_that.user,_that.title,_that.topicTag,_that.viewerCount,_that.isActive,_that.startedAt,_that.endedAt,_that.coHostId,_that.replayUrl);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String userId,  User? user,  String? title,  String? topicTag,  int viewerCount,  bool isActive,  DateTime? startedAt,  DateTime? endedAt,  String? coHostId,  String? replayUrl)?  $default,) {final _that = this;
switch (_that) {
case _LiveStream() when $default != null:
return $default(_that.id,_that.userId,_that.user,_that.title,_that.topicTag,_that.viewerCount,_that.isActive,_that.startedAt,_that.endedAt,_that.coHostId,_that.replayUrl);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _LiveStream implements LiveStream {
  const _LiveStream({this.id = '', this.userId = '', this.user, this.title, this.topicTag, this.viewerCount = 0, this.isActive = false, this.startedAt, this.endedAt, this.coHostId, this.replayUrl});
  factory _LiveStream.fromJson(Map<String, dynamic> json) => _$LiveStreamFromJson(json);

@override@JsonKey() final  String id;
@override@JsonKey() final  String userId;
@override final  User? user;
@override final  String? title;
@override final  String? topicTag;
@override@JsonKey() final  int viewerCount;
@override@JsonKey() final  bool isActive;
@override final  DateTime? startedAt;
@override final  DateTime? endedAt;
@override final  String? coHostId;
@override final  String? replayUrl;

/// Create a copy of LiveStream
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$LiveStreamCopyWith<_LiveStream> get copyWith => __$LiveStreamCopyWithImpl<_LiveStream>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$LiveStreamToJson(this, );
}

@override
bool operator ==(Object other) {
    return identical(this, other) || (other.runtimeType == runtimeType&&other is _LiveStream&&(identical(other.id, id) || other.id == id)&&(identical(other.userId, userId) || other.userId == userId)&&(identical(other.user, user) || other.user == user)&&(identical(other.title, title) || other.title == title)&&(identical(other.topicTag, topicTag) || other.topicTag == topicTag)&&(identical(other.viewerCount, viewerCount) || other.viewerCount == viewerCount)&&(identical(other.isActive, isActive) || other.isActive == isActive)&&(identical(other.startedAt, startedAt) || other.startedAt == startedAt)&&(identical(other.endedAt, endedAt) || other.endedAt == endedAt)&&(identical(other.coHostId, coHostId) || other.coHostId == coHostId)&&(identical(other.replayUrl, replayUrl) || other.replayUrl == replayUrl));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
    return Object.hash(runtimeType,id,userId,user,title,topicTag,viewerCount,isActive,startedAt,endedAt,coHostId,replayUrl);
}

@override
String toString() {
    return 'LiveStream(id: $id, userId: $userId, user: $user, title: $title, topicTag: $topicTag, viewerCount: $viewerCount, isActive: $isActive, startedAt: $startedAt, endedAt: $endedAt, coHostId: $coHostId, replayUrl: $replayUrl)';
}


}

/// @nodoc
abstract mixin class _$LiveStreamCopyWith<$Res> implements $LiveStreamCopyWith<$Res> {
  factory _$LiveStreamCopyWith(_LiveStream value, $Res Function(_LiveStream) _then) = __$LiveStreamCopyWithImpl;
@override @useResult
$Res call({
 String id, String userId, User? user, String? title, String? topicTag, int viewerCount, bool isActive, DateTime? startedAt, DateTime? endedAt, String? coHostId, String? replayUrl
});


@override $UserCopyWith<$Res>? get user;

}
/// @nodoc
class __$LiveStreamCopyWithImpl<$Res>
    implements _$LiveStreamCopyWith<$Res> {
  __$LiveStreamCopyWithImpl(this._self, this._then);

  final _LiveStream _self;
  final $Res Function(_LiveStream) _then;

/// Create a copy of LiveStream
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? userId = null,Object? user = freezed,Object? title = freezed,Object? topicTag = freezed,Object? viewerCount = null,Object? isActive = null,Object? startedAt = freezed,Object? endedAt = freezed,Object? coHostId = freezed,Object? replayUrl = freezed,}) {
  return _then(_LiveStream(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,userId: null == userId ? _self.userId : userId // ignore: cast_nullable_to_non_nullable
as String,user: freezed == user ? _self.user : user // ignore: cast_nullable_to_non_nullable
as User?,title: freezed == title ? _self.title : title // ignore: cast_nullable_to_non_nullable
as String?,topicTag: freezed == topicTag ? _self.topicTag : topicTag // ignore: cast_nullable_to_non_nullable
as String?,viewerCount: null == viewerCount ? _self.viewerCount : viewerCount // ignore: cast_nullable_to_non_nullable
as int,isActive: null == isActive ? _self.isActive : isActive // ignore: cast_nullable_to_non_nullable
as bool,startedAt: freezed == startedAt ? _self.startedAt : startedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,endedAt: freezed == endedAt ? _self.endedAt : endedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,coHostId: freezed == coHostId ? _self.coHostId : coHostId // ignore: cast_nullable_to_non_nullable
as String?,replayUrl: freezed == replayUrl ? _self.replayUrl : replayUrl // ignore: cast_nullable_to_non_nullable
as String?,
  ));
}

/// Create a copy of LiveStream
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
