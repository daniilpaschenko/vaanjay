// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint, type=warning, deprecated_member_use, deprecated_member_use_from_same_package
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'call.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$Call {

 String get id; String get callerId; User? get caller; String? get receiverId; User? get receiver; String? get groupId; String get type; String get status; DateTime? get startedAt; DateTime? get endedAt; int? get durationSeconds; DateTime? get createdAt;
/// Create a copy of Call
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$CallCopyWith<Call> get copyWith => _$CallCopyWithImpl<Call>(this as Call, _$identity);

  /// Serializes this Call to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  final _this = this as Call;
  return identical(this, other) || (other.runtimeType == runtimeType&&other is Call&&(identical(other.id, _this.id) || other.id == _this.id)&&(identical(other.callerId, _this.callerId) || other.callerId == _this.callerId)&&(identical(other.caller, _this.caller) || other.caller == _this.caller)&&(identical(other.receiverId, _this.receiverId) || other.receiverId == _this.receiverId)&&(identical(other.receiver, _this.receiver) || other.receiver == _this.receiver)&&(identical(other.groupId, _this.groupId) || other.groupId == _this.groupId)&&(identical(other.type, _this.type) || other.type == _this.type)&&(identical(other.status, _this.status) || other.status == _this.status)&&(identical(other.startedAt, _this.startedAt) || other.startedAt == _this.startedAt)&&(identical(other.endedAt, _this.endedAt) || other.endedAt == _this.endedAt)&&(identical(other.durationSeconds, _this.durationSeconds) || other.durationSeconds == _this.durationSeconds)&&(identical(other.createdAt, _this.createdAt) || other.createdAt == _this.createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
  final _this = this as Call;
  return Object.hash(runtimeType,_this.id,_this.callerId,_this.caller,_this.receiverId,_this.receiver,_this.groupId,_this.type,_this.status,_this.startedAt,_this.endedAt,_this.durationSeconds,_this.createdAt);
}

@override
String toString() {
  final _this = this as Call;
  return 'Call(id: ${_this.id}, callerId: ${_this.callerId}, caller: ${_this.caller}, receiverId: ${_this.receiverId}, receiver: ${_this.receiver}, groupId: ${_this.groupId}, type: ${_this.type}, status: ${_this.status}, startedAt: ${_this.startedAt}, endedAt: ${_this.endedAt}, durationSeconds: ${_this.durationSeconds}, createdAt: ${_this.createdAt})';
}


}

/// @nodoc
abstract mixin class $CallCopyWith<$Res>  {
  factory $CallCopyWith(Call value, $Res Function(Call) _then) = _$CallCopyWithImpl;
@useResult
$Res call({
 String id, String callerId, User? caller, String? receiverId, User? receiver, String? groupId, String type, String status, DateTime? startedAt, DateTime? endedAt, int? durationSeconds, DateTime? createdAt
});


$UserCopyWith<$Res>? get caller;$UserCopyWith<$Res>? get receiver;

}
/// @nodoc
class _$CallCopyWithImpl<$Res>
    implements $CallCopyWith<$Res> {
  _$CallCopyWithImpl(this._self, this._then);

  final Call _self;
  final $Res Function(Call) _then;

/// Create a copy of Call
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? callerId = null,Object? caller = freezed,Object? receiverId = freezed,Object? receiver = freezed,Object? groupId = freezed,Object? type = null,Object? status = null,Object? startedAt = freezed,Object? endedAt = freezed,Object? durationSeconds = freezed,Object? createdAt = freezed,}) {
  return _then(Call(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,callerId: null == callerId ? _self.callerId : callerId // ignore: cast_nullable_to_non_nullable
as String,caller: freezed == caller ? _self.caller : caller // ignore: cast_nullable_to_non_nullable
as User?,receiverId: freezed == receiverId ? _self.receiverId : receiverId // ignore: cast_nullable_to_non_nullable
as String?,receiver: freezed == receiver ? _self.receiver : receiver // ignore: cast_nullable_to_non_nullable
as User?,groupId: freezed == groupId ? _self.groupId : groupId // ignore: cast_nullable_to_non_nullable
as String?,type: null == type ? _self.type : type // ignore: cast_nullable_to_non_nullable
as String,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String,startedAt: freezed == startedAt ? _self.startedAt : startedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,endedAt: freezed == endedAt ? _self.endedAt : endedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,durationSeconds: freezed == durationSeconds ? _self.durationSeconds : durationSeconds // ignore: cast_nullable_to_non_nullable
as int?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}
/// Create a copy of Call
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$UserCopyWith<$Res>? get caller {
    if (_self.caller == null) {
    return null;
  }

  return $UserCopyWith<$Res>(_self.caller!, (value) {
    return _then(_self.copyWith(caller: value));
  });
}/// Create a copy of Call
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$UserCopyWith<$Res>? get receiver {
    if (_self.receiver == null) {
    return null;
  }

  return $UserCopyWith<$Res>(_self.receiver!, (value) {
    return _then(_self.copyWith(receiver: value));
  });
}
}


/// Adds pattern-matching-related methods to [Call].
extension CallPatterns on Call {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _Call value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _Call() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _Call value)  $default,){
final _that = this;
switch (_that) {
case _Call():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _Call value)?  $default,){
final _that = this;
switch (_that) {
case _Call() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String callerId,  User? caller,  String? receiverId,  User? receiver,  String? groupId,  String type,  String status,  DateTime? startedAt,  DateTime? endedAt,  int? durationSeconds,  DateTime? createdAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _Call() when $default != null:
return $default(_that.id,_that.callerId,_that.caller,_that.receiverId,_that.receiver,_that.groupId,_that.type,_that.status,_that.startedAt,_that.endedAt,_that.durationSeconds,_that.createdAt);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String callerId,  User? caller,  String? receiverId,  User? receiver,  String? groupId,  String type,  String status,  DateTime? startedAt,  DateTime? endedAt,  int? durationSeconds,  DateTime? createdAt)  $default,) {final _that = this;
switch (_that) {
case _Call():
return $default(_that.id,_that.callerId,_that.caller,_that.receiverId,_that.receiver,_that.groupId,_that.type,_that.status,_that.startedAt,_that.endedAt,_that.durationSeconds,_that.createdAt);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String callerId,  User? caller,  String? receiverId,  User? receiver,  String? groupId,  String type,  String status,  DateTime? startedAt,  DateTime? endedAt,  int? durationSeconds,  DateTime? createdAt)?  $default,) {final _that = this;
switch (_that) {
case _Call() when $default != null:
return $default(_that.id,_that.callerId,_that.caller,_that.receiverId,_that.receiver,_that.groupId,_that.type,_that.status,_that.startedAt,_that.endedAt,_that.durationSeconds,_that.createdAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _Call implements Call {
  const _Call({this.id = '', this.callerId = '', this.caller, this.receiverId, this.receiver, this.groupId, this.type = 'audio', this.status = 'initiated', this.startedAt, this.endedAt, this.durationSeconds, this.createdAt});
  factory _Call.fromJson(Map<String, dynamic> json) => _$CallFromJson(json);

@override@JsonKey() final  String id;
@override@JsonKey() final  String callerId;
@override final  User? caller;
@override final  String? receiverId;
@override final  User? receiver;
@override final  String? groupId;
@override@JsonKey() final  String type;
@override@JsonKey() final  String status;
@override final  DateTime? startedAt;
@override final  DateTime? endedAt;
@override final  int? durationSeconds;
@override final  DateTime? createdAt;

/// Create a copy of Call
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$CallCopyWith<_Call> get copyWith => __$CallCopyWithImpl<_Call>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$CallToJson(this, );
}

@override
bool operator ==(Object other) {
    return identical(this, other) || (other.runtimeType == runtimeType&&other is _Call&&(identical(other.id, id) || other.id == id)&&(identical(other.callerId, callerId) || other.callerId == callerId)&&(identical(other.caller, caller) || other.caller == caller)&&(identical(other.receiverId, receiverId) || other.receiverId == receiverId)&&(identical(other.receiver, receiver) || other.receiver == receiver)&&(identical(other.groupId, groupId) || other.groupId == groupId)&&(identical(other.type, type) || other.type == type)&&(identical(other.status, status) || other.status == status)&&(identical(other.startedAt, startedAt) || other.startedAt == startedAt)&&(identical(other.endedAt, endedAt) || other.endedAt == endedAt)&&(identical(other.durationSeconds, durationSeconds) || other.durationSeconds == durationSeconds)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
    return Object.hash(runtimeType,id,callerId,caller,receiverId,receiver,groupId,type,status,startedAt,endedAt,durationSeconds,createdAt);
}

@override
String toString() {
    return 'Call(id: $id, callerId: $callerId, caller: $caller, receiverId: $receiverId, receiver: $receiver, groupId: $groupId, type: $type, status: $status, startedAt: $startedAt, endedAt: $endedAt, durationSeconds: $durationSeconds, createdAt: $createdAt)';
}


}

/// @nodoc
abstract mixin class _$CallCopyWith<$Res> implements $CallCopyWith<$Res> {
  factory _$CallCopyWith(_Call value, $Res Function(_Call) _then) = __$CallCopyWithImpl;
@override @useResult
$Res call({
 String id, String callerId, User? caller, String? receiverId, User? receiver, String? groupId, String type, String status, DateTime? startedAt, DateTime? endedAt, int? durationSeconds, DateTime? createdAt
});


@override $UserCopyWith<$Res>? get caller;@override $UserCopyWith<$Res>? get receiver;

}
/// @nodoc
class __$CallCopyWithImpl<$Res>
    implements _$CallCopyWith<$Res> {
  __$CallCopyWithImpl(this._self, this._then);

  final _Call _self;
  final $Res Function(_Call) _then;

/// Create a copy of Call
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? callerId = null,Object? caller = freezed,Object? receiverId = freezed,Object? receiver = freezed,Object? groupId = freezed,Object? type = null,Object? status = null,Object? startedAt = freezed,Object? endedAt = freezed,Object? durationSeconds = freezed,Object? createdAt = freezed,}) {
  return _then(_Call(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,callerId: null == callerId ? _self.callerId : callerId // ignore: cast_nullable_to_non_nullable
as String,caller: freezed == caller ? _self.caller : caller // ignore: cast_nullable_to_non_nullable
as User?,receiverId: freezed == receiverId ? _self.receiverId : receiverId // ignore: cast_nullable_to_non_nullable
as String?,receiver: freezed == receiver ? _self.receiver : receiver // ignore: cast_nullable_to_non_nullable
as User?,groupId: freezed == groupId ? _self.groupId : groupId // ignore: cast_nullable_to_non_nullable
as String?,type: null == type ? _self.type : type // ignore: cast_nullable_to_non_nullable
as String,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String,startedAt: freezed == startedAt ? _self.startedAt : startedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,endedAt: freezed == endedAt ? _self.endedAt : endedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,durationSeconds: freezed == durationSeconds ? _self.durationSeconds : durationSeconds // ignore: cast_nullable_to_non_nullable
as int?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

/// Create a copy of Call
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$UserCopyWith<$Res>? get caller {
    if (_self.caller == null) {
    return null;
  }

  return $UserCopyWith<$Res>(_self.caller!, (value) {
    return _then(_self.copyWith(caller: value));
  });
}/// Create a copy of Call
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$UserCopyWith<$Res>? get receiver {
    if (_self.receiver == null) {
    return null;
  }

  return $UserCopyWith<$Res>(_self.receiver!, (value) {
    return _then(_self.copyWith(receiver: value));
  });
}
}

// dart format on
