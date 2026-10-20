// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint, type=warning, deprecated_member_use, deprecated_member_use_from_same_package
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'hashtag.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$Hashtag {

 String get id; String get tag; int get usageCount; bool get isTrending; String? get category; DateTime? get createdAt;
/// Create a copy of Hashtag
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$HashtagCopyWith<Hashtag> get copyWith => _$HashtagCopyWithImpl<Hashtag>(this as Hashtag, _$identity);

  /// Serializes this Hashtag to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  final _this = this as Hashtag;
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Hashtag&&(identical(other.id, _this.id) || other.id == _this.id)&&(identical(other.tag, _this.tag) || other.tag == _this.tag)&&(identical(other.usageCount, _this.usageCount) || other.usageCount == _this.usageCount)&&(identical(other.isTrending, _this.isTrending) || other.isTrending == _this.isTrending)&&(identical(other.category, _this.category) || other.category == _this.category)&&(identical(other.createdAt, _this.createdAt) || other.createdAt == _this.createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
  final _this = this as Hashtag;
  return Object.hash(runtimeType,_this.id,_this.tag,_this.usageCount,_this.isTrending,_this.category,_this.createdAt);
}

@override
String toString() {
  final _this = this as Hashtag;
  return 'Hashtag(id: ${_this.id}, tag: ${_this.tag}, usageCount: ${_this.usageCount}, isTrending: ${_this.isTrending}, category: ${_this.category}, createdAt: ${_this.createdAt})';
}


}

/// @nodoc
abstract mixin class $HashtagCopyWith<$Res>  {
  factory $HashtagCopyWith(Hashtag value, $Res Function(Hashtag) _then) = _$HashtagCopyWithImpl;
@useResult
$Res call({
 String id, String tag, int usageCount, bool isTrending, String? category, DateTime? createdAt
});




}
/// @nodoc
class _$HashtagCopyWithImpl<$Res>
    implements $HashtagCopyWith<$Res> {
  _$HashtagCopyWithImpl(this._self, this._then);

  final Hashtag _self;
  final $Res Function(Hashtag) _then;

/// Create a copy of Hashtag
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? tag = null,Object? usageCount = null,Object? isTrending = null,Object? category = freezed,Object? createdAt = freezed,}) {
  return _then(Hashtag(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,tag: null == tag ? _self.tag : tag // ignore: cast_nullable_to_non_nullable
as String,usageCount: null == usageCount ? _self.usageCount : usageCount // ignore: cast_nullable_to_non_nullable
as int,isTrending: null == isTrending ? _self.isTrending : isTrending // ignore: cast_nullable_to_non_nullable
as bool,category: freezed == category ? _self.category : category // ignore: cast_nullable_to_non_nullable
as String?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

}


/// Adds pattern-matching-related methods to [Hashtag].
extension HashtagPatterns on Hashtag {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Hashtag value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Hashtag() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Hashtag value)  $default,){
final _that = this;
switch (_that) {
case _Hashtag():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Hashtag value)?  $default,){
final _that = this;
switch (_that) {
case _Hashtag() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String tag,  int usageCount,  bool isTrending,  String? category,  DateTime? createdAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Hashtag() when $default != null:
return $default(_that.id,_that.tag,_that.usageCount,_that.isTrending,_that.category,_that.createdAt);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String tag,  int usageCount,  bool isTrending,  String? category,  DateTime? createdAt)  $default,) {final _that = this;
switch (_that) {
case _Hashtag():
return $default(_that.id,_that.tag,_that.usageCount,_that.isTrending,_that.category,_that.createdAt);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String tag,  int usageCount,  bool isTrending,  String? category,  DateTime? createdAt)?  $default,) {final _that = this;
switch (_that) {
case _Hashtag() when $default != null:
return $default(_that.id,_that.tag,_that.usageCount,_that.isTrending,_that.category,_that.createdAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Hashtag implements Hashtag {
  const _Hashtag({this.id = '', this.tag = '', this.usageCount = 0, this.isTrending = false, this.category, this.createdAt});
  factory _Hashtag.fromJson(Map<String, dynamic> json) => _$HashtagFromJson(json);

@override@JsonKey() final  String id;
@override@JsonKey() final  String tag;
@override@JsonKey() final  int usageCount;
@override@JsonKey() final  bool isTrending;
@override final  String? category;
@override final  DateTime? createdAt;

/// Create a copy of Hashtag
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$HashtagCopyWith<_Hashtag> get copyWith => __$HashtagCopyWithImpl<_Hashtag>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$HashtagToJson(this, );
}

@override
bool operator ==(Object other) {
    return identical(this, other) || (other.runtimeType == runtimeType&&other is _Hashtag&&(identical(other.id, id) || other.id == id)&&(identical(other.tag, tag) || other.tag == tag)&&(identical(other.usageCount, usageCount) || other.usageCount == usageCount)&&(identical(other.isTrending, isTrending) || other.isTrending == isTrending)&&(identical(other.category, category) || other.category == category)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
    return Object.hash(runtimeType,id,tag,usageCount,isTrending,category,createdAt);
}

@override
String toString() {
    return 'Hashtag(id: $id, tag: $tag, usageCount: $usageCount, isTrending: $isTrending, category: $category, createdAt: $createdAt)';
}


}

/// @nodoc
abstract mixin class _$HashtagCopyWith<$Res> implements $HashtagCopyWith<$Res> {
  factory _$HashtagCopyWith(_Hashtag value, $Res Function(_Hashtag) _then) = __$HashtagCopyWithImpl;
@override @useResult
$Res call({
 String id, String tag, int usageCount, bool isTrending, String? category, DateTime? createdAt
});




}
/// @nodoc
class __$HashtagCopyWithImpl<$Res>
    implements _$HashtagCopyWith<$Res> {
  __$HashtagCopyWithImpl(this._self, this._then);

  final _Hashtag _self;
  final $Res Function(_Hashtag) _then;

/// Create a copy of Hashtag
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? tag = null,Object? usageCount = null,Object? isTrending = null,Object? category = freezed,Object? createdAt = freezed,}) {
  return _then(_Hashtag(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,tag: null == tag ? _self.tag : tag // ignore: cast_nullable_to_non_nullable
as String,usageCount: null == usageCount ? _self.usageCount : usageCount // ignore: cast_nullable_to_non_nullable
as int,isTrending: null == isTrending ? _self.isTrending : isTrending // ignore: cast_nullable_to_non_nullable
as bool,category: freezed == category ? _self.category : category // ignore: cast_nullable_to_non_nullable
as String?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}


}

// dart format on
