// GENERATED CODE - DO NOT MODIFY BY HAND
// coverage:ignore-file
// ignore_for_file: type=lint, type=warning, deprecated_member_use, deprecated_member_use_from_same_package
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'user.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// dart format off
T _$identity<T>(T value) => value;

/// @nodoc
mixin _$User {

 String get id; String get username; String get email; String get phoneNumber; String get fullName; String? get bio; String? get profilePicUrl; String? get websiteUrl; bool get isVerified; String? get badgeType; bool get isAdmin; String get languagePreference; String get contentLanguagePreference; bool get isPrivate; bool get isActive; String? get gender; String? get district; DateTime? get lastSeen; int get followerCount; int get followingCount; int get postCount; bool get isFollowing; bool get isFollowRequested; bool get isBlocked; DateTime? get createdAt; DateTime? get updatedAt;
/// Create a copy of User
/// with the given fields replaced by the non-null parameter values.
@JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
$UserCopyWith<User> get copyWith => _$UserCopyWithImpl<User>(this as User, _$identity);

  /// Serializes this User to a JSON map.
  Map<String, dynamic> toJson();


@override
bool operator ==(Object other) {
  final _this = this as User;
  return identical(this, other) || (other.runtimeType == runtimeType&&other is User&&(identical(other.id, _this.id) || other.id == _this.id)&&(identical(other.username, _this.username) || other.username == _this.username)&&(identical(other.email, _this.email) || other.email == _this.email)&&(identical(other.phoneNumber, _this.phoneNumber) || other.phoneNumber == _this.phoneNumber)&&(identical(other.fullName, _this.fullName) || other.fullName == _this.fullName)&&(identical(other.bio, _this.bio) || other.bio == _this.bio)&&(identical(other.profilePicUrl, _this.profilePicUrl) || other.profilePicUrl == _this.profilePicUrl)&&(identical(other.websiteUrl, _this.websiteUrl) || other.websiteUrl == _this.websiteUrl)&&(identical(other.isVerified, _this.isVerified) || other.isVerified == _this.isVerified)&&(identical(other.badgeType, _this.badgeType) || other.badgeType == _this.badgeType)&&(identical(other.isAdmin, _this.isAdmin) || other.isAdmin == _this.isAdmin)&&(identical(other.languagePreference, _this.languagePreference) || other.languagePreference == _this.languagePreference)&&(identical(other.contentLanguagePreference, _this.contentLanguagePreference) || other.contentLanguagePreference == _this.contentLanguagePreference)&&(identical(other.isPrivate, _this.isPrivate) || other.isPrivate == _this.isPrivate)&&(identical(other.isActive, _this.isActive) || other.isActive == _this.isActive)&&(identical(other.gender, _this.gender) || other.gender == _this.gender)&&(identical(other.district, _this.district) || other.district == _this.district)&&(identical(other.lastSeen, _this.lastSeen) || other.lastSeen == _this.lastSeen)&&(identical(other.followerCount, _this.followerCount) || other.followerCount == _this.followerCount)&&(identical(other.followingCount, _this.followingCount) || other.followingCount == _this.followingCount)&&(identical(other.postCount, _this.postCount) || other.postCount == _this.postCount)&&(identical(other.isFollowing, _this.isFollowing) || other.isFollowing == _this.isFollowing)&&(identical(other.isFollowRequested, _this.isFollowRequested) || other.isFollowRequested == _this.isFollowRequested)&&(identical(other.isBlocked, _this.isBlocked) || other.isBlocked == _this.isBlocked)&&(identical(other.createdAt, _this.createdAt) || other.createdAt == _this.createdAt)&&(identical(other.updatedAt, _this.updatedAt) || other.updatedAt == _this.updatedAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
  final _this = this as User;
  return Object.hashAll([runtimeType,_this.id,_this.username,_this.email,_this.phoneNumber,_this.fullName,_this.bio,_this.profilePicUrl,_this.websiteUrl,_this.isVerified,_this.badgeType,_this.isAdmin,_this.languagePreference,_this.contentLanguagePreference,_this.isPrivate,_this.isActive,_this.gender,_this.district,_this.lastSeen,_this.followerCount,_this.followingCount,_this.postCount,_this.isFollowing,_this.isFollowRequested,_this.isBlocked,_this.createdAt,_this.updatedAt]);
}

@override
String toString() {
  final _this = this as User;
  return 'User(id: ${_this.id}, username: ${_this.username}, email: ${_this.email}, phoneNumber: ${_this.phoneNumber}, fullName: ${_this.fullName}, bio: ${_this.bio}, profilePicUrl: ${_this.profilePicUrl}, websiteUrl: ${_this.websiteUrl}, isVerified: ${_this.isVerified}, badgeType: ${_this.badgeType}, isAdmin: ${_this.isAdmin}, languagePreference: ${_this.languagePreference}, contentLanguagePreference: ${_this.contentLanguagePreference}, isPrivate: ${_this.isPrivate}, isActive: ${_this.isActive}, gender: ${_this.gender}, district: ${_this.district}, lastSeen: ${_this.lastSeen}, followerCount: ${_this.followerCount}, followingCount: ${_this.followingCount}, postCount: ${_this.postCount}, isFollowing: ${_this.isFollowing}, isFollowRequested: ${_this.isFollowRequested}, isBlocked: ${_this.isBlocked}, createdAt: ${_this.createdAt}, updatedAt: ${_this.updatedAt})';
}


}

/// @nodoc
abstract mixin class $UserCopyWith<$Res>  {
  factory $UserCopyWith(User value, $Res Function(User) _then) = _$UserCopyWithImpl;
@useResult
$Res call({
 String id, String username, String email, String phoneNumber, String fullName, String? bio, String? profilePicUrl, String? websiteUrl, bool isVerified, String? badgeType, bool isAdmin, String languagePreference, String contentLanguagePreference, bool isPrivate, bool isActive, String? gender, String? district, DateTime? lastSeen, int followerCount, int followingCount, int postCount, bool isFollowing, bool isFollowRequested, bool isBlocked, DateTime? createdAt, DateTime? updatedAt
});




}
/// @nodoc
class _$UserCopyWithImpl<$Res>
    implements $UserCopyWith<$Res> {
  _$UserCopyWithImpl(this._self, this._then);

  final User _self;
  final $Res Function(User) _then;

/// Create a copy of User
/// with the given fields replaced by the non-null parameter values.
@pragma('vm:prefer-inline') @override $Res call({Object? id = null,Object? username = null,Object? email = null,Object? phoneNumber = null,Object? fullName = null,Object? bio = freezed,Object? profilePicUrl = freezed,Object? websiteUrl = freezed,Object? isVerified = null,Object? badgeType = freezed,Object? isAdmin = null,Object? languagePreference = null,Object? contentLanguagePreference = null,Object? isPrivate = null,Object? isActive = null,Object? gender = freezed,Object? district = freezed,Object? lastSeen = freezed,Object? followerCount = null,Object? followingCount = null,Object? postCount = null,Object? isFollowing = null,Object? isFollowRequested = null,Object? isBlocked = null,Object? createdAt = freezed,Object? updatedAt = freezed,}) {
  return _then(User(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,username: null == username ? _self.username : username // ignore: cast_nullable_to_non_nullable
as String,email: null == email ? _self.email : email // ignore: cast_nullable_to_non_nullable
as String,phoneNumber: null == phoneNumber ? _self.phoneNumber : phoneNumber // ignore: cast_nullable_to_non_nullable
as String,fullName: null == fullName ? _self.fullName : fullName // ignore: cast_nullable_to_non_nullable
as String,bio: freezed == bio ? _self.bio : bio // ignore: cast_nullable_to_non_nullable
as String?,profilePicUrl: freezed == profilePicUrl ? _self.profilePicUrl : profilePicUrl // ignore: cast_nullable_to_non_nullable
as String?,websiteUrl: freezed == websiteUrl ? _self.websiteUrl : websiteUrl // ignore: cast_nullable_to_non_nullable
as String?,isVerified: null == isVerified ? _self.isVerified : isVerified // ignore: cast_nullable_to_non_nullable
as bool,badgeType: freezed == badgeType ? _self.badgeType : badgeType // ignore: cast_nullable_to_non_nullable
as String?,isAdmin: null == isAdmin ? _self.isAdmin : isAdmin // ignore: cast_nullable_to_non_nullable
as bool,languagePreference: null == languagePreference ? _self.languagePreference : languagePreference // ignore: cast_nullable_to_non_nullable
as String,contentLanguagePreference: null == contentLanguagePreference ? _self.contentLanguagePreference : contentLanguagePreference // ignore: cast_nullable_to_non_nullable
as String,isPrivate: null == isPrivate ? _self.isPrivate : isPrivate // ignore: cast_nullable_to_non_nullable
as bool,isActive: null == isActive ? _self.isActive : isActive // ignore: cast_nullable_to_non_nullable
as bool,gender: freezed == gender ? _self.gender : gender // ignore: cast_nullable_to_non_nullable
as String?,district: freezed == district ? _self.district : district // ignore: cast_nullable_to_non_nullable
as String?,lastSeen: freezed == lastSeen ? _self.lastSeen : lastSeen // ignore: cast_nullable_to_non_nullable
as DateTime?,followerCount: null == followerCount ? _self.followerCount : followerCount // ignore: cast_nullable_to_non_nullable
as int,followingCount: null == followingCount ? _self.followingCount : followingCount // ignore: cast_nullable_to_non_nullable
as int,postCount: null == postCount ? _self.postCount : postCount // ignore: cast_nullable_to_non_nullable
as int,isFollowing: null == isFollowing ? _self.isFollowing : isFollowing // ignore: cast_nullable_to_non_nullable
as bool,isFollowRequested: null == isFollowRequested ? _self.isFollowRequested : isFollowRequested // ignore: cast_nullable_to_non_nullable
as bool,isBlocked: null == isBlocked ? _self.isBlocked : isBlocked // ignore: cast_nullable_to_non_nullable
as bool,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,updatedAt: freezed == updatedAt ? _self.updatedAt : updatedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}

}


/// Adds pattern-matching-related methods to [User].
extension UserPatterns on User {
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

@optionalTypeArgs TResult maybeMap<TResult extends Object?>(TResult Function( _User value)?  $default,{required TResult orElse(),}){
final _that = this;
switch (_that) {
case _User() when $default != null:
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

@optionalTypeArgs TResult map<TResult extends Object?>(TResult Function( _User value)  $default,){
final _that = this;
switch (_that) {
case _User():
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

@optionalTypeArgs TResult? mapOrNull<TResult extends Object?>(TResult? Function( _User value)?  $default,){
final _that = this;
switch (_that) {
case _User() when $default != null:
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

@optionalTypeArgs TResult maybeWhen<TResult extends Object?>(TResult Function( String id,  String username,  String email,  String phoneNumber,  String fullName,  String? bio,  String? profilePicUrl,  String? websiteUrl,  bool isVerified,  String? badgeType,  bool isAdmin,  String languagePreference,  String contentLanguagePreference,  bool isPrivate,  bool isActive,  String? gender,  String? district,  DateTime? lastSeen,  int followerCount,  int followingCount,  int postCount,  bool isFollowing,  bool isFollowRequested,  bool isBlocked,  DateTime? createdAt,  DateTime? updatedAt)?  $default,{required TResult orElse(),}) {final _that = this;
switch (_that) {
case _User() when $default != null:
return $default(_that.id,_that.username,_that.email,_that.phoneNumber,_that.fullName,_that.bio,_that.profilePicUrl,_that.websiteUrl,_that.isVerified,_that.badgeType,_that.isAdmin,_that.languagePreference,_that.contentLanguagePreference,_that.isPrivate,_that.isActive,_that.gender,_that.district,_that.lastSeen,_that.followerCount,_that.followingCount,_that.postCount,_that.isFollowing,_that.isFollowRequested,_that.isBlocked,_that.createdAt,_that.updatedAt);case _:
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

@optionalTypeArgs TResult when<TResult extends Object?>(TResult Function( String id,  String username,  String email,  String phoneNumber,  String fullName,  String? bio,  String? profilePicUrl,  String? websiteUrl,  bool isVerified,  String? badgeType,  bool isAdmin,  String languagePreference,  String contentLanguagePreference,  bool isPrivate,  bool isActive,  String? gender,  String? district,  DateTime? lastSeen,  int followerCount,  int followingCount,  int postCount,  bool isFollowing,  bool isFollowRequested,  bool isBlocked,  DateTime? createdAt,  DateTime? updatedAt)  $default,) {final _that = this;
switch (_that) {
case _User():
return $default(_that.id,_that.username,_that.email,_that.phoneNumber,_that.fullName,_that.bio,_that.profilePicUrl,_that.websiteUrl,_that.isVerified,_that.badgeType,_that.isAdmin,_that.languagePreference,_that.contentLanguagePreference,_that.isPrivate,_that.isActive,_that.gender,_that.district,_that.lastSeen,_that.followerCount,_that.followingCount,_that.postCount,_that.isFollowing,_that.isFollowRequested,_that.isBlocked,_that.createdAt,_that.updatedAt);case _:
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

@optionalTypeArgs TResult? whenOrNull<TResult extends Object?>(TResult? Function( String id,  String username,  String email,  String phoneNumber,  String fullName,  String? bio,  String? profilePicUrl,  String? websiteUrl,  bool isVerified,  String? badgeType,  bool isAdmin,  String languagePreference,  String contentLanguagePreference,  bool isPrivate,  bool isActive,  String? gender,  String? district,  DateTime? lastSeen,  int followerCount,  int followingCount,  int postCount,  bool isFollowing,  bool isFollowRequested,  bool isBlocked,  DateTime? createdAt,  DateTime? updatedAt)?  $default,) {final _that = this;
switch (_that) {
case _User() when $default != null:
return $default(_that.id,_that.username,_that.email,_that.phoneNumber,_that.fullName,_that.bio,_that.profilePicUrl,_that.websiteUrl,_that.isVerified,_that.badgeType,_that.isAdmin,_that.languagePreference,_that.contentLanguagePreference,_that.isPrivate,_that.isActive,_that.gender,_that.district,_that.lastSeen,_that.followerCount,_that.followingCount,_that.postCount,_that.isFollowing,_that.isFollowRequested,_that.isBlocked,_that.createdAt,_that.updatedAt);case _:
  return null;

}
}

}

/// @nodoc
@JsonSerializable()

class _User implements User {
  const _User({this.id = '', this.username = '', this.email = '', this.phoneNumber = '', this.fullName = '', this.bio, this.profilePicUrl, this.websiteUrl, this.isVerified = false, this.badgeType, this.isAdmin = false, this.languagePreference = 'ta', this.contentLanguagePreference = 'ta', this.isPrivate = false, this.isActive = true, this.gender, this.district, this.lastSeen, this.followerCount = 0, this.followingCount = 0, this.postCount = 0, this.isFollowing = false, this.isFollowRequested = false, this.isBlocked = false, this.createdAt, this.updatedAt});
  factory _User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);

@override@JsonKey() final  String id;
@override@JsonKey() final  String username;
@override@JsonKey() final  String email;
@override@JsonKey() final  String phoneNumber;
@override@JsonKey() final  String fullName;
@override final  String? bio;
@override final  String? profilePicUrl;
@override final  String? websiteUrl;
@override@JsonKey() final  bool isVerified;
@override final  String? badgeType;
@override@JsonKey() final  bool isAdmin;
@override@JsonKey() final  String languagePreference;
@override@JsonKey() final  String contentLanguagePreference;
@override@JsonKey() final  bool isPrivate;
@override@JsonKey() final  bool isActive;
@override final  String? gender;
@override final  String? district;
@override final  DateTime? lastSeen;
@override@JsonKey() final  int followerCount;
@override@JsonKey() final  int followingCount;
@override@JsonKey() final  int postCount;
@override@JsonKey() final  bool isFollowing;
@override@JsonKey() final  bool isFollowRequested;
@override@JsonKey() final  bool isBlocked;
@override final  DateTime? createdAt;
@override final  DateTime? updatedAt;

/// Create a copy of User
/// with the given fields replaced by the non-null parameter values.
@override @JsonKey(includeFromJson: false, includeToJson: false)
@pragma('vm:prefer-inline')
_$UserCopyWith<_User> get copyWith => __$UserCopyWithImpl<_User>(this, _$identity);

@override
Map<String, dynamic> toJson() {
  return _$UserToJson(this, );
}

@override
bool operator ==(Object other) {
    return identical(this, other) || (other.runtimeType == runtimeType&&other is _User&&(identical(other.id, id) || other.id == id)&&(identical(other.username, username) || other.username == username)&&(identical(other.email, email) || other.email == email)&&(identical(other.phoneNumber, phoneNumber) || other.phoneNumber == phoneNumber)&&(identical(other.fullName, fullName) || other.fullName == fullName)&&(identical(other.bio, bio) || other.bio == bio)&&(identical(other.profilePicUrl, profilePicUrl) || other.profilePicUrl == profilePicUrl)&&(identical(other.websiteUrl, websiteUrl) || other.websiteUrl == websiteUrl)&&(identical(other.isVerified, isVerified) || other.isVerified == isVerified)&&(identical(other.badgeType, badgeType) || other.badgeType == badgeType)&&(identical(other.isAdmin, isAdmin) || other.isAdmin == isAdmin)&&(identical(other.languagePreference, languagePreference) || other.languagePreference == languagePreference)&&(identical(other.contentLanguagePreference, contentLanguagePreference) || other.contentLanguagePreference == contentLanguagePreference)&&(identical(other.isPrivate, isPrivate) || other.isPrivate == isPrivate)&&(identical(other.isActive, isActive) || other.isActive == isActive)&&(identical(other.gender, gender) || other.gender == gender)&&(identical(other.district, district) || other.district == district)&&(identical(other.lastSeen, lastSeen) || other.lastSeen == lastSeen)&&(identical(other.followerCount, followerCount) || other.followerCount == followerCount)&&(identical(other.followingCount, followingCount) || other.followingCount == followingCount)&&(identical(other.postCount, postCount) || other.postCount == postCount)&&(identical(other.isFollowing, isFollowing) || other.isFollowing == isFollowing)&&(identical(other.isFollowRequested, isFollowRequested) || other.isFollowRequested == isFollowRequested)&&(identical(other.isBlocked, isBlocked) || other.isBlocked == isBlocked)&&(identical(other.createdAt, createdAt) || other.createdAt == createdAt)&&(identical(other.updatedAt, updatedAt) || other.updatedAt == updatedAt));
}

@JsonKey(includeFromJson: false, includeToJson: false)
@override
int get hashCode {
    return Object.hashAll([runtimeType,id,username,email,phoneNumber,fullName,bio,profilePicUrl,websiteUrl,isVerified,badgeType,isAdmin,languagePreference,contentLanguagePreference,isPrivate,isActive,gender,district,lastSeen,followerCount,followingCount,postCount,isFollowing,isFollowRequested,isBlocked,createdAt,updatedAt]);
}

@override
String toString() {
    return 'User(id: $id, username: $username, email: $email, phoneNumber: $phoneNumber, fullName: $fullName, bio: $bio, profilePicUrl: $profilePicUrl, websiteUrl: $websiteUrl, isVerified: $isVerified, badgeType: $badgeType, isAdmin: $isAdmin, languagePreference: $languagePreference, contentLanguagePreference: $contentLanguagePreference, isPrivate: $isPrivate, isActive: $isActive, gender: $gender, district: $district, lastSeen: $lastSeen, followerCount: $followerCount, followingCount: $followingCount, postCount: $postCount, isFollowing: $isFollowing, isFollowRequested: $isFollowRequested, isBlocked: $isBlocked, createdAt: $createdAt, updatedAt: $updatedAt)';
}


}

/// @nodoc
abstract mixin class _$UserCopyWith<$Res> implements $UserCopyWith<$Res> {
  factory _$UserCopyWith(_User value, $Res Function(_User) _then) = __$UserCopyWithImpl;
@override @useResult
$Res call({
 String id, String username, String email, String phoneNumber, String fullName, String? bio, String? profilePicUrl, String? websiteUrl, bool isVerified, String? badgeType, bool isAdmin, String languagePreference, String contentLanguagePreference, bool isPrivate, bool isActive, String? gender, String? district, DateTime? lastSeen, int followerCount, int followingCount, int postCount, bool isFollowing, bool isFollowRequested, bool isBlocked, DateTime? createdAt, DateTime? updatedAt
});




}
/// @nodoc
class __$UserCopyWithImpl<$Res>
    implements _$UserCopyWith<$Res> {
  __$UserCopyWithImpl(this._self, this._then);

  final _User _self;
  final $Res Function(_User) _then;

/// Create a copy of User
/// with the given fields replaced by the non-null parameter values.
@override @pragma('vm:prefer-inline') $Res call({Object? id = null,Object? username = null,Object? email = null,Object? phoneNumber = null,Object? fullName = null,Object? bio = freezed,Object? profilePicUrl = freezed,Object? websiteUrl = freezed,Object? isVerified = null,Object? badgeType = freezed,Object? isAdmin = null,Object? languagePreference = null,Object? contentLanguagePreference = null,Object? isPrivate = null,Object? isActive = null,Object? gender = freezed,Object? district = freezed,Object? lastSeen = freezed,Object? followerCount = null,Object? followingCount = null,Object? postCount = null,Object? isFollowing = null,Object? isFollowRequested = null,Object? isBlocked = null,Object? createdAt = freezed,Object? updatedAt = freezed,}) {
  return _then(_User(
id: null == id ? _self.id : id // ignore: cast_nullable_to_non_nullable
as String,username: null == username ? _self.username : username // ignore: cast_nullable_to_non_nullable
as String,email: null == email ? _self.email : email // ignore: cast_nullable_to_non_nullable
as String,phoneNumber: null == phoneNumber ? _self.phoneNumber : phoneNumber // ignore: cast_nullable_to_non_nullable
as String,fullName: null == fullName ? _self.fullName : fullName // ignore: cast_nullable_to_non_nullable
as String,bio: freezed == bio ? _self.bio : bio // ignore: cast_nullable_to_non_nullable
as String?,profilePicUrl: freezed == profilePicUrl ? _self.profilePicUrl : profilePicUrl // ignore: cast_nullable_to_non_nullable
as String?,websiteUrl: freezed == websiteUrl ? _self.websiteUrl : websiteUrl // ignore: cast_nullable_to_non_nullable
as String?,isVerified: null == isVerified ? _self.isVerified : isVerified // ignore: cast_nullable_to_non_nullable
as bool,badgeType: freezed == badgeType ? _self.badgeType : badgeType // ignore: cast_nullable_to_non_nullable
as String?,isAdmin: null == isAdmin ? _self.isAdmin : isAdmin // ignore: cast_nullable_to_non_nullable
as bool,languagePreference: null == languagePreference ? _self.languagePreference : languagePreference // ignore: cast_nullable_to_non_nullable
as String,contentLanguagePreference: null == contentLanguagePreference ? _self.contentLanguagePreference : contentLanguagePreference // ignore: cast_nullable_to_non_nullable
as String,isPrivate: null == isPrivate ? _self.isPrivate : isPrivate // ignore: cast_nullable_to_non_nullable
as bool,isActive: null == isActive ? _self.isActive : isActive // ignore: cast_nullable_to_non_nullable
as bool,gender: freezed == gender ? _self.gender : gender // ignore: cast_nullable_to_non_nullable
as String?,district: freezed == district ? _self.district : district // ignore: cast_nullable_to_non_nullable
as String?,lastSeen: freezed == lastSeen ? _self.lastSeen : lastSeen // ignore: cast_nullable_to_non_nullable
as DateTime?,followerCount: null == followerCount ? _self.followerCount : followerCount // ignore: cast_nullable_to_non_nullable
as int,followingCount: null == followingCount ? _self.followingCount : followingCount // ignore: cast_nullable_to_non_nullable
as int,postCount: null == postCount ? _self.postCount : postCount // ignore: cast_nullable_to_non_nullable
as int,isFollowing: null == isFollowing ? _self.isFollowing : isFollowing // ignore: cast_nullable_to_non_nullable
as bool,isFollowRequested: null == isFollowRequested ? _self.isFollowRequested : isFollowRequested // ignore: cast_nullable_to_non_nullable
as bool,isBlocked: null == isBlocked ? _self.isBlocked : isBlocked // ignore: cast_nullable_to_non_nullable
as bool,createdAt: freezed == createdAt ? _self.createdAt : createdAt // ignore: cast_nullable_to_non_nullable
as DateTime?,updatedAt: freezed == updatedAt ? _self.updatedAt : updatedAt // ignore: cast_nullable_to_non_nullable
as DateTime?,
  ));
}


}

// dart format on
