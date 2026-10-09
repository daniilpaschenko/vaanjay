// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint, type=warning, deprecated_member_use, deprecated_member_use_from_same_package
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'upi_transaction.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$UPITransaction {

 String get id; String get senderId; User? get sender; String get receiverId; User? get receiver; double get amount; String get upiRefId; String get status; String? get note; DateTime? get createdAt;
/// Create a copy of UPITransaction
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$UPITransactionCopyWith<UPITransaction> get copyWith => _$UPITransactionCopyWithImpl<UPITransaction>(this as UPITransaction, _$identity);

  /// Serializes this UPITransaction to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  final _this = this as UPITransaction;
  return identical(this, other) || (other.runtimeType == runtimeType&&other is UPITransaction&&(identical(other.id, _this.id) || other.id == _this.id)&&(identical(other.senderId, _this.senderId) || other.senderId == _this.senderId)&&(identical(other.sender, _this.sender) || other.sender == _this.sender)&&(identical(other.receiverId, _this.receiverId) || other.receiverId == _this.receiverId)&&(identical(other.receiver, _this.receiver) || other.receiver == _this.receiver)&&(identical(other.amount, _this.amount) || other.amount == _this.amount)&&(identical(other.upiRefId, _this.upiRefId) || other.upiRefId == _this.upiRefId)&&(identical(other.status, _this.status) || other.status == _this.status)&&(identical(other.note, _this.note) || other.note == _this.note)&&(identical(other.createdAt, _this.createdAt) || other.createdAt == _this.createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
  final _this = this as UPITransaction;
  return Object.hash(runtimeType,_this.id,_this.senderId,_this.sender,_this.receiverId,_this.receiver,_this.amount,_this.upiRefId,_this.status,_this.note,_this.createdAt);
}

@override
String toString() {
  final _this = this as UPITransaction;
  return 'UPITransaction(id: ${_this.id}, senderId: ${_this.senderId}, sender: ${_this.sender}, receiverId: ${_this.receiverId}, receiver: ${_this.receiver}, amount: ${_this.amount}, upiRefId: ${_this.upiRefId}, status: ${_this.status}, note: ${_this.note}, createdAt: ${_this.createdAt})';
}


}

/// @nodoc
abstract mixin class $UPITransactionCopyWith<$Res>  {
  factory $UPITransactionCopyWith(UPITransaction value, $Res Function(UPITransaction) _then) = _$UPITransactionCopyWithImpl;
@useResult
$Res call({
 String id, String senderId, User? sender, String receiverId, User? receiver, double amount, String upiRefId, String status, String? note, DateTime? createdAt
});


$UserCopyWith<$Res>? get sender;$UserCopyWith<$Res>? get receiver;

}
/// @nodoc
class _$UPITransactionCopyWithImpl<$Res>
    implements $UPITransactionCopyWith<$Res> {
  _$UPITransactionCopyWithImpl(this._self, this._then);

  final UPITransaction _self;
  final $Res Function(UPITransaction) _then;

/// Create a copy of UPITransaction
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? senderId = null,Object? sender = freezed,Object? receiverId = null,Object? receiver = freezed,Object? amount = null,Object? upiRefId = null,Object? status = null,Object? note = freezed,Object? createdAt = freezed,}) {
  return _then(UPITransaction(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,senderId: null == senderId ? _self.senderId : senderId // ignore: cast_nullable_to_non_nullable
as String,sender: freezed == sender ? _self.sender : sender // ignore: cast_nullable_to_non_nullable
as User?,receiverId: null == receiverId ? _self.receiverId : receiverId // ignore: cast_nullable_to_non_nullable
as String,receiver: freezed == receiver ? _self.receiver : receiver // ignore: cast_nullable_to_non_nullable
as User?,amount: null == amount ? _self.amount : amount // ignore: cast_nullable_to_non_nullable
as double,upiRefId: null == upiRefId ? _self.upiRefId : upiRefId // ignore: cast_nullable_to_non_nullable
as String,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String,note: freezed == note ? _self.note : note // ignore: cast_nullable_to_non_nullable
as String?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}
/// Create a copy of UPITransaction
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$UserCopyWith<$Res>? get sender {
    if (_self.sender == null) {
    return null;
  }

  return $UserCopyWith<$Res>(_self.sender!, (value) {
    return _then(_self.copyWith(sender: value));
  });
}/// Create a copy of UPITransaction
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


/// Adds pattern-matching-related methods to [UPITransaction].
extension UPITransactionPatterns on UPITransaction {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _UPITransaction value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _UPITransaction() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _UPITransaction value)  $default,){
final _that = this;
switch (_that) {
case _UPITransaction():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _UPITransaction value)?  $default,){
final _that = this;
switch (_that) {
case _UPITransaction() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String senderId,  User? sender,  String receiverId,  User? receiver,  double amount,  String upiRefId,  String status,  String? note,  DateTime? createdAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _UPITransaction() when $default != null:
return $default(_that.id,_that.senderId,_that.sender,_that.receiverId,_that.receiver,_that.amount,_that.upiRefId,_that.status,_that.note,_that.createdAt);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String senderId,  User? sender,  String receiverId,  User? receiver,  double amount,  String upiRefId,  String status,  String? note,  DateTime? createdAt)  $default,) {final _that = this;
switch (_that) {
case _UPITransaction():
return $default(_that.id,_that.senderId,_that.sender,_that.receiverId,_that.receiver,_that.amount,_that.upiRefId,_that.status,_that.note,_that.createdAt);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String senderId,  User? sender,  String receiverId,  User? receiver,  double amount,  String upiRefId,  String status,  String? note,  DateTime? createdAt)?  $default,) {final _that = this;
switch (_that) {
case _UPITransaction() when $default != null:
return $default(_that.id,_that.senderId,_that.sender,_that.receiverId,_that.receiver,_that.amount,_that.upiRefId,_that.status,_that.note,_that.createdAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _UPITransaction implements UPITransaction {
  const _UPITransaction({this.id = '', this.senderId = '', this.sender, this.receiverId = '', this.receiver, this.amount = 0, this.upiRefId = '', this.status = 'pending', this.note, this.createdAt});
  factory _UPITransaction.fromJson(Map<String, dynamic> json) => _$UPITransactionFromJson(json);

@override@JsonKey() final  String id;
@override@JsonKey() final  String senderId;
@override final  User? sender;
@override@JsonKey() final  String receiverId;
@override final  User? receiver;
@override@JsonKey() final  double amount;
@override@JsonKey() final  String upiRefId;
@override@JsonKey() final  String status;
@override final  String? note;
@override final  DateTime? createdAt;

/// Create a copy of UPITransaction
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$UPITransactionCopyWith<_UPITransaction> get copyWith => __$UPITransactionCopyWithImpl<_UPITransaction>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$UPITransactionToJson(this, );
}

@override
bool operator ==(Object other) {
    return identical(this, other) || (other.runtimeType == runtimeType&&other is _UPITransaction&&(identical(other.id, id) || other.id == id)&&(identical(other.senderId, senderId) || other.senderId == senderId)&&(identical(other.sender, sender) || other.sender == sender)&&(identical(other.receiverId, receiverId) || other.receiverId == receiverId)&&(identical(other.receiver, receiver) || other.receiver == receiver)&&(identical(other.amount, amount) || other.amount == amount)&&(identical(other.upiRefId, upiRefId) || other.upiRefId == upiRefId)&&(identical(other.status, status) || other.status == status)&&(identical(other.note, note) || other.note == note)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
    return Object.hash(runtimeType,id,senderId,sender,receiverId,receiver,amount,upiRefId,status,note,createdAt);
}

@override
String toString() {
    return 'UPITransaction(id: $id, senderId: $senderId, sender: $sender, receiverId: $receiverId, receiver: $receiver, amount: $amount, upiRefId: $upiRefId, status: $status, note: $note, createdAt: $createdAt)';
}


}

/// @nodoc
abstract mixin class _$UPITransactionCopyWith<$Res> implements $UPITransactionCopyWith<$Res> {
  factory _$UPITransactionCopyWith(_UPITransaction value, $Res Function(_UPITransaction) _then) = __$UPITransactionCopyWithImpl;
@override @useResult
$Res call({
 String id, String senderId, User? sender, String receiverId, User? receiver, double amount, String upiRefId, String status, String? note, DateTime? createdAt
});


@override $UserCopyWith<$Res>? get sender;@override $UserCopyWith<$Res>? get receiver;

}
/// @nodoc
class __$UPITransactionCopyWithImpl<$Res>
    implements _$UPITransactionCopyWith<$Res> {
  __$UPITransactionCopyWithImpl(this._self, this._then);

  final _UPITransaction _self;
  final $Res Function(_UPITransaction) _then;

/// Create a copy of UPITransaction
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? senderId = null,Object? sender = freezed,Object? receiverId = null,Object? receiver = freezed,Object? amount = null,Object? upiRefId = null,Object? status = null,Object? note = freezed,Object? createdAt = freezed,}) {
  return _then(_UPITransaction(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,senderId: null == senderId ? _self.senderId : senderId // ignore: cast_nullable_to_non_nullable
as String,sender: freezed == sender ? _self.sender : sender // ignore: cast_nullable_to_non_nullable
as User?,receiverId: null == receiverId ? _self.receiverId : receiverId // ignore: cast_nullable_to_non_nullable
as String,receiver: freezed == receiver ? _self.receiver : receiver // ignore: cast_nullable_to_non_nullable
as User?,amount: null == amount ? _self.amount : amount // ignore: cast_nullable_to_non_nullable
as double,upiRefId: null == upiRefId ? _self.upiRefId : upiRefId // ignore: cast_nullable_to_non_nullable
as String,status: null == status ? _self.status : status // ignore: cast_nullable_to_non_nullable
as String,note: freezed == note ? _self.note : note // ignore: cast_nullable_to_non_nullable
as String?,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

/// Create a copy of UPITransaction
/// with the given fields replaced by the non-null parameter values.
@override
@pragma('vm:prefer-inline')
$UserCopyWith<$Res>? get sender {
    if (_self.sender == null) {
    return null;
  }

  return $UserCopyWith<$Res>(_self.sender!, (value) {
    return _then(_self.copyWith(sender: value));
  });
}/// Create a copy of UPITransaction
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
