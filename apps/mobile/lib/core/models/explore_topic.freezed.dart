// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint, type=warning, deprecated_member_use, deprecated_member_use_from_same_package
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'explore_topic.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$ExploreTopic {

 String get id; String get name; String? get nameTa; String get icon; int get postCount; String get category;
/// Create a copy of ExploreTopic
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$ExploreTopicCopyWith<ExploreTopic> get copyWith => _$ExploreTopicCopyWithImpl<ExploreTopic>(this as ExploreTopic, _$identity);

  /// Serializes this ExploreTopic to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  final _this = this as ExploreTopic;
  return identical(this, other) || (other.runtimeType == runtimeType&&other is ExploreTopic&&(identical(other.id, _this.id) || other.id == _this.id)&&(identical(other.name, _this.name) || other.name == _this.name)&&(identical(other.nameTa, _this.nameTa) || other.nameTa == _this.nameTa)&&(identical(other.icon, _this.icon) || other.icon == _this.icon)&&(identical(other.postCount, _this.postCount) || other.postCount == _this.postCount)&&(identical(other.category, _this.category) || other.category == _this.category));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
  final _this = this as ExploreTopic;
  return Object.hash(runtimeType,_this.id,_this.name,_this.nameTa,_this.icon,_this.postCount,_this.category);
}

@override
String toString() {
  final _this = this as ExploreTopic;
  return 'ExploreTopic(id: ${_this.id}, name: ${_this.name}, nameTa: ${_this.nameTa}, icon: ${_this.icon}, postCount: ${_this.postCount}, category: ${_this.category})';
}


}

/// @nodoc
abstract mixin class $ExploreTopicCopyWith<$Res>  {
  factory $ExploreTopicCopyWith(ExploreTopic value, $Res Function(ExploreTopic) _then) = _$ExploreTopicCopyWithImpl;
@useResult
$Res call({
 String id, String name, String? nameTa, String icon, int postCount, String category
});




}
/// @nodoc
class _$ExploreTopicCopyWithImpl<$Res>
    implements $ExploreTopicCopyWith<$Res> {
  _$ExploreTopicCopyWithImpl(this._self, this._then);

  final ExploreTopic _self;
  final $Res Function(ExploreTopic) _then;

/// Create a copy of ExploreTopic
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? name = null,Object? nameTa = freezed,Object? icon = null,Object? postCount = null,Object? category = null,}) {
  return _then(ExploreTopic(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,nameTa: freezed == nameTa ? _self.nameTa : nameTa // ignore: cast_nullable_to_non_nullable
as String?,icon: null == icon ? _self.icon : icon // ignore: cast_nullable_to_non_nullable
as String,postCount: null == postCount ? _self.postCount : postCount // ignore: cast_nullable_to_non_nullable
as int,category: null == category ? _self.category : category // ignore: cast_nullable_to_non_nullable
as String,
  ));
}

}


/// Adds pattern-matching-related methods to [ExploreTopic].
extension ExploreTopicPatterns on ExploreTopic {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _ExploreTopic value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _ExploreTopic() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _ExploreTopic value)  $default,){
final _that = this;
switch (_that) {
case _ExploreTopic():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _ExploreTopic value)?  $default,){
final _that = this;
switch (_that) {
case _ExploreTopic() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String name,  String? nameTa,  String icon,  int postCount,  String category)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _ExploreTopic() when $default != null:
return $default(_that.id,_that.name,_that.nameTa,_that.icon,_that.postCount,_that.category);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String name,  String? nameTa,  String icon,  int postCount,  String category)  $default,) {final _that = this;
switch (_that) {
case _ExploreTopic():
return $default(_that.id,_that.name,_that.nameTa,_that.icon,_that.postCount,_that.category);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String name,  String? nameTa,  String icon,  int postCount,  String category)?  $default,) {final _that = this;
switch (_that) {
case _ExploreTopic() when $default != null:
return $default(_that.id,_that.name,_that.nameTa,_that.icon,_that.postCount,_that.category);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _ExploreTopic implements ExploreTopic {
  const _ExploreTopic({this.id = '', this.name = '', this.nameTa, this.icon = '', this.postCount = 0, this.category = ''});
  factory _ExploreTopic.fromJson(Map<String, dynamic> json) => _$ExploreTopicFromJson(json);

@override@JsonKey() final  String id;
@override@JsonKey() final  String name;
@override final  String? nameTa;
@override@JsonKey() final  String icon;
@override@JsonKey() final  int postCount;
@override@JsonKey() final  String category;

/// Create a copy of ExploreTopic
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$ExploreTopicCopyWith<_ExploreTopic> get copyWith => __$ExploreTopicCopyWithImpl<_ExploreTopic>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$ExploreTopicToJson(this, );
}

@override
bool operator ==(Object other) {
    return identical(this, other) || (other.runtimeType == runtimeType&&other is _ExploreTopic&&(identical(other.id, id) || other.id == id)&&(identical(other.name, name) || other.name == name)&&(identical(other.nameTa, nameTa) || other.nameTa == nameTa)&&(identical(other.icon, icon) || other.icon == icon)&&(identical(other.postCount, postCount) || other.postCount == postCount)&&(identical(other.category, category) || other.category == category));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
    return Object.hash(runtimeType,id,name,nameTa,icon,postCount,category);
}

@override
String toString() {
    return 'ExploreTopic(id: $id, name: $name, nameTa: $nameTa, icon: $icon, postCount: $postCount, category: $category)';
}


}

/// @nodoc
abstract mixin class _$ExploreTopicCopyWith<$Res> implements $ExploreTopicCopyWith<$Res> {
  factory _$ExploreTopicCopyWith(_ExploreTopic value, $Res Function(_ExploreTopic) _then) = __$ExploreTopicCopyWithImpl;
@override @useResult
$Res call({
 String id, String name, String? nameTa, String icon, int postCount, String category
});




}
/// @nodoc
class __$ExploreTopicCopyWithImpl<$Res>
    implements _$ExploreTopicCopyWith<$Res> {
  __$ExploreTopicCopyWithImpl(this._self, this._then);

  final _ExploreTopic _self;
  final $Res Function(_ExploreTopic) _then;

/// Create a copy of ExploreTopic
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? name = null,Object? nameTa = freezed,Object? icon = null,Object? postCount = null,Object? category = null,}) {
  return _then(_ExploreTopic(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,name: null == name ? _self.name : name // ignore: cast_nullable_to_non_nullable
as String,nameTa: freezed == nameTa ? _self.nameTa : nameTa // ignore: cast_nullable_to_non_nullable
as String?,icon: null == icon ? _self.icon : icon // ignore: cast_nullable_to_non_nullable
as String,postCount: null == postCount ? _self.postCount : postCount // ignore: cast_nullable_to_non_nullable
as int,category: null == category ? _self.category : category // ignore: cast_nullable_to_non_nullable
as String,
  ));
}


}


/// @nodoc
mixin _$TrendingItem {

 String get type; String? get id; String? get tag; Post? get post; Reel? get reel; Hashtag? get hashtag; ExploreTopic? get topic; double get score;
/// Create a copy of TrendingItem
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$TrendingItemCopyWith<TrendingItem> get copyWith => _$TrendingItemCopyWithImpl<TrendingItem>(this as TrendingItem, _$identity);

  /// Serializes this TrendingItem to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  final _this = this as TrendingItem;
  return identical(this, other) || (other.runtimeType == runtimeType&&other is TrendingItem&&(identical(other.type, _this.type) || other.type == _this.type)&&(identical(other.id, _this.id) || other.id == _this.id)&&(identical(other.tag, _this.tag) || other.tag == _this.tag)&&(identical(other.post, _this.post) || other.post == _this.post)&&(identical(other.reel, _this.reel) || other.reel == _this.reel)&&(identical(other.hashtag, _this.hashtag) || other.hashtag == _this.hashtag)&&(identical(other.topic, _this.topic) || other.topic == _this.topic)&&(identical(other.score, _this.score) || other.score == _this.score));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
  final _this = this as TrendingItem;
  return Object.hash(runtimeType,_this.type,_this.id,_this.tag,_this.post,_this.reel,_this.hashtag,_this.topic,_this.score);
}

@override
String toString() {
  final _this = this as TrendingItem;
  return 'TrendingItem(type: ${_this.type}, id: ${_this.id}, tag: ${_this.tag}, post: ${_this.post}, reel: ${_this.reel}, hashtag: ${_this.hashtag}, topic: ${_this.topic}, score: ${_this.score})';
}


}

/// @nodoc
abstract mixin class $TrendingItemCopyWith<$Res>  {
  factory $TrendingItemCopyWith(TrendingItem value, $Res Function(TrendingItem) _then) = _$TrendingItemCopyWithImpl;
@useResult
$Res call({
 String type, String? id, String? tag, Post? post, Reel? reel, Hashtag? hashtag, ExploreTopic? topic, double score
});


$PostCopyWith<$Res>? get post;$ReelCopyWith<$Res>? get reel;$HashtagCopyWith<$Res>? get hashtag;$ExploreTopicCopyWith<$Res>? get topic;

}
/// @nodoc
class _$TrendingItemCopyWithImpl<$Res>
    implements $TrendingItemCopyWith<$Res> {
  _$TrendingItemCopyWithImpl(this._self, this._then);

  final TrendingItem _self;
  final $Res Function(TrendingItem) _then;

/// Create a copy of TrendingItem
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? type = null,Object? id = freezed,Object? tag = freezed,Object? post = freezed,Object? reel = freezed,Object? hashtag = freezed,Object? topic = freezed,Object? score = null,}) {
  return _then(TrendingItem(
type: null == type ? _self.type : type // ignore: cast_nullable_to_non_nullable
as String,id: freezed == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String?,tag: freezed == tag ? _self.tag : tag // ignore: cast_nullable_to_non_nullable
as String?,post: freezed == post ? _self.post : post // ignore: cast_nullable_to_non_nullable
as Post?,reel: freezed == reel ? _self.reel : reel // ignore: cast_nullable_to_non_nullable
as Reel?,hashtag: freezed == hashtag ? _self.hashtag : hashtag // ignore: cast_nullable_to_non_nullable
as Hashtag?,topic: freezed == topic ? _self.topic : topic // ignore: cast_nullable_to_non_nullable
as ExploreTopic?,score: null == score ? _self.score : score // ignore: cast_nullable_to_non_nullable
as double,
  ));
}
/// Create a copy of TrendingItem
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$PostCopyWith<$Res>? get post {
    if (_self.post == null) {
    return null;
  }

  return $PostCopyWith<$Res>(_self.post!, (value) {
    return _then(_self.copyWith(post: value));
  });
}/// Create a copy of TrendingItem
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ReelCopyWith<$Res>? get reel {
    if (_self.reel == null) {
    return null;
  }

  return $ReelCopyWith<$Res>(_self.reel!, (value) {
    return _then(_self.copyWith(reel: value));
  });
}/// Create a copy of TrendingItem
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$HashtagCopyWith<$Res>? get hashtag {
    if (_self.hashtag == null) {
    return null;
  }

  return $HashtagCopyWith<$Res>(_self.hashtag!, (value) {
    return _then(_self.copyWith(hashtag: value));
  });
}/// Create a copy of TrendingItem
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ExploreTopicCopyWith<$Res>? get topic {
    if (_self.topic == null) {
    return null;
  }

  return $ExploreTopicCopyWith<$Res>(_self.topic!, (value) {
    return _then(_self.copyWith(topic: value));
  });
}
}


/// Adds pattern-matching-related methods to [TrendingItem].
extension TrendingItemPatterns on TrendingItem {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _TrendingItem value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _TrendingItem() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _TrendingItem value)  $default,){
final _that = this;
switch (_that) {
case _TrendingItem():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _TrendingItem value)?  $default,){
final _that = this;
switch (_that) {
case _TrendingItem() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String type,  String? id,  String? tag,  Post? post,  Reel? reel,  Hashtag? hashtag,  ExploreTopic? topic,  double score)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _TrendingItem() when $default != null:
return $default(_that.type,_that.id,_that.tag,_that.post,_that.reel,_that.hashtag,_that.topic,_that.score);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String type,  String? id,  String? tag,  Post? post,  Reel? reel,  Hashtag? hashtag,  ExploreTopic? topic,  double score)  $default,) {final _that = this;
switch (_that) {
case _TrendingItem():
return $default(_that.type,_that.id,_that.tag,_that.post,_that.reel,_that.hashtag,_that.topic,_that.score);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String type,  String? id,  String? tag,  Post? post,  Reel? reel,  Hashtag? hashtag,  ExploreTopic? topic,  double score)?  $default,) {final _that = this;
switch (_that) {
case _TrendingItem() when $default != null:
return $default(_that.type,_that.id,_that.tag,_that.post,_that.reel,_that.hashtag,_that.topic,_that.score);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _TrendingItem implements TrendingItem {
  const _TrendingItem({this.type = '', this.id, this.tag, this.post, this.reel, this.hashtag, this.topic, this.score = 0});
  factory _TrendingItem.fromJson(Map<String, dynamic> json) => _$TrendingItemFromJson(json);

@override@JsonKey() final  String type;
@override final  String? id;
@override final  String? tag;
@override final  Post? post;
@override final  Reel? reel;
@override final  Hashtag? hashtag;
@override final  ExploreTopic? topic;
@override@JsonKey() final  double score;

/// Create a copy of TrendingItem
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$TrendingItemCopyWith<_TrendingItem> get copyWith => __$TrendingItemCopyWithImpl<_TrendingItem>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$TrendingItemToJson(this, );
}

@override
bool operator ==(Object other) {
    return identical(this, other) || (other.runtimeType == runtimeType&&other is _TrendingItem&&(identical(other.type, type) || other.type == type)&&(identical(other.id, id) || other.id == id)&&(identical(other.tag, tag) || other.tag == tag)&&(identical(other.post, post) || other.post == post)&&(identical(other.reel, reel) || other.reel == reel)&&(identical(other.hashtag, hashtag) || other.hashtag == hashtag)&&(identical(other.topic, topic) || other.topic == topic)&&(identical(other.score, score) || other.score == score));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
    return Object.hash(runtimeType,type,id,tag,post,reel,hashtag,topic,score);
}

@override
String toString() {
    return 'TrendingItem(type: $type, id: $id, tag: $tag, post: $post, reel: $reel, hashtag: $hashtag, topic: $topic, score: $score)';
}


}

/// @nodoc
abstract mixin class _$TrendingItemCopyWith<$Res> implements $TrendingItemCopyWith<$Res> {
  factory _$TrendingItemCopyWith(_TrendingItem value, $Res Function(_TrendingItem) _then) = __$TrendingItemCopyWithImpl;
@override @useResult
$Res call({
 String type, String? id, String? tag, Post? post, Reel? reel, Hashtag? hashtag, ExploreTopic? topic, double score
});


@override $PostCopyWith<$Res>? get post;@override $ReelCopyWith<$Res>? get reel;@override $HashtagCopyWith<$Res>? get hashtag;@override $ExploreTopicCopyWith<$Res>? get topic;

}
/// @nodoc
class __$TrendingItemCopyWithImpl<$Res>
    implements _$TrendingItemCopyWith<$Res> {
  __$TrendingItemCopyWithImpl(this._self, this._then);

  final _TrendingItem _self;
  final $Res Function(_TrendingItem) _then;

/// Create a copy of TrendingItem
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? type = null,Object? id = freezed,Object? tag = freezed,Object? post = freezed,Object? reel = freezed,Object? hashtag = freezed,Object? topic = freezed,Object? score = null,}) {
  return _then(_TrendingItem(
type: null == type ? _self.type : type // ignore: cast_nullable_to_non_nullable
as String,id: freezed == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String?,tag: freezed == tag ? _self.tag : tag // ignore: cast_nullable_to_non_nullable
as String?,post: freezed == post ? _self.post : post // ignore: cast_nullable_to_non_nullable
as Post?,reel: freezed == reel ? _self.reel : reel // ignore: cast_nullable_to_non_nullable
as Reel?,hashtag: freezed == hashtag ? _self.hashtag : hashtag // ignore: cast_nullable_to_non_nullable
as Hashtag?,topic: freezed == topic ? _self.topic : topic // ignore: cast_nullable_to_non_nullable
as ExploreTopic?,score: null == score ? _self.score : score // ignore: cast_nullable_to_non_nullable
as double,
  ));
}

/// Create a copy of TrendingItem
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$PostCopyWith<$Res>? get post {
    if (_self.post == null) {
    return null;
  }

  return $PostCopyWith<$Res>(_self.post!, (value) {
    return _then(_self.copyWith(post: value));
  });
}/// Create a copy of TrendingItem
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ReelCopyWith<$Res>? get reel {
    if (_self.reel == null) {
    return null;
  }

  return $ReelCopyWith<$Res>(_self.reel!, (value) {
    return _then(_self.copyWith(reel: value));
  });
}/// Create a copy of TrendingItem
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$HashtagCopyWith<$Res>? get hashtag {
    if (_self.hashtag == null) {
    return null;
  }

  return $HashtagCopyWith<$Res>(_self.hashtag!, (value) {
    return _then(_self.copyWith(hashtag: value));
  });
}/// Create a copy of TrendingItem
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$ExploreTopicCopyWith<$Res>? get topic {
    if (_self.topic == null) {
    return null;
  }

  return $ExploreTopicCopyWith<$Res>(_self.topic!, (value) {
    return _then(_self.copyWith(topic: value));
  });
}
}

// dart format on
