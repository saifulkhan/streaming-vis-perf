/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.User = (function () {
  /**
   * Properties of a User.
   * @exports IUser
   * @interface IUser
   * @property {string|null} [name] User name
   * @property {number|Long|null} [favoriteNumber] User favoriteNumber
   * @property {string|null} [favoriteColor] User favoriteColor
   */

  /**
   * Constructs a new User.
   * @exports User
   * @classdesc Represents a User.
   * @implements IUser
   * @constructor
   * @param {IUser=} [properties] Properties to set
   */
  function User(properties) {
    if (properties)
      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
        if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]];
  }

  /**
   * User name.
   * @member {string} name
   * @memberof User
   * @instance
   */
  User.prototype.name = "";

  /**
   * User favoriteNumber.
   * @member {number|Long} favoriteNumber
   * @memberof User
   * @instance
   */
  User.prototype.favoriteNumber = $util.Long
    ? $util.Long.fromBits(0, 0, false)
    : 0;

  /**
   * User favoriteColor.
   * @member {string} favoriteColor
   * @memberof User
   * @instance
   */
  User.prototype.favoriteColor = "";

  /**
   * Creates a new User instance using the specified properties.
   * @function create
   * @memberof User
   * @static
   * @param {IUser=} [properties] Properties to set
   * @returns {User} User instance
   */
  User.create = function create(properties) {
    return new User(properties);
  };

  /**
   * Encodes the specified User message. Does not implicitly {@link User.verify|verify} messages.
   * @function encode
   * @memberof User
   * @static
   * @param {IUser} message User message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  User.encode = function encode(message, writer) {
    if (!writer) writer = $Writer.create();
    if (message.name != null && Object.hasOwnProperty.call(message, "name"))
      writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.name);
    if (
      message.favoriteNumber != null &&
      Object.hasOwnProperty.call(message, "favoriteNumber")
    )
      writer.uint32(/* id 2, wireType 0 =*/ 16).int64(message.favoriteNumber);
    if (
      message.favoriteColor != null &&
      Object.hasOwnProperty.call(message, "favoriteColor")
    )
      writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.favoriteColor);
    return writer;
  };

  /**
   * Encodes the specified User message, length delimited. Does not implicitly {@link User.verify|verify} messages.
   * @function encodeDelimited
   * @memberof User
   * @static
   * @param {IUser} message User message or plain object to encode
   * @param {$protobuf.Writer} [writer] Writer to encode to
   * @returns {$protobuf.Writer} Writer
   */
  User.encodeDelimited = function encodeDelimited(message, writer) {
    return this.encode(message, writer).ldelim();
  };

  /**
   * Decodes a User message from the specified reader or buffer.
   * @function decode
   * @memberof User
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @param {number} [length] Message length if known beforehand
   * @returns {User} User
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  User.decode = function decode(reader, length) {
    console.log(reader);

    if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
    var end = length === undefined ? reader.len : reader.pos + length,
      message = new $root.User();
    while (reader.pos < end) {
      var tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.favoriteNumber = reader.int64();
          break;
        case 3:
          message.favoriteColor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  };

  /**
   * Decodes a User message from the specified reader or buffer, length delimited.
   * @function decodeDelimited
   * @memberof User
   * @static
   * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
   * @returns {User} User
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  User.decodeDelimited = function decodeDelimited(reader) {
    if (!(reader instanceof $Reader)) reader = new $Reader(reader);
    return this.decode(reader, reader.uint32());
  };

  /**
   * Verifies a User message.
   * @function verify
   * @memberof User
   * @static
   * @param {Object.<string,*>} message Plain object to verify
   * @returns {string|null} `null` if valid, otherwise the reason why it is not
   */
  User.verify = function verify(message) {
    if (typeof message !== "object" || message === null)
      return "object expected";
    if (message.name != null && message.hasOwnProperty("name"))
      if (!$util.isString(message.name)) return "name: string expected";
    if (
      message.favoriteNumber != null &&
      message.hasOwnProperty("favoriteNumber")
    )
      if (
        !$util.isInteger(message.favoriteNumber) &&
        !(
          message.favoriteNumber &&
          $util.isInteger(message.favoriteNumber.low) &&
          $util.isInteger(message.favoriteNumber.high)
        )
      )
        return "favoriteNumber: integer|Long expected";
    if (
      message.favoriteColor != null &&
      message.hasOwnProperty("favoriteColor")
    )
      if (!$util.isString(message.favoriteColor))
        return "favoriteColor: string expected";
    return null;
  };

  /**
   * Creates a User message from a plain object. Also converts values to their respective internal types.
   * @function fromObject
   * @memberof User
   * @static
   * @param {Object.<string,*>} object Plain object
   * @returns {User} User
   */
  User.fromObject = function fromObject(object) {
    if (object instanceof $root.User) return object;
    var message = new $root.User();
    if (object.name != null) message.name = String(object.name);
    if (object.favoriteNumber != null)
      if ($util.Long)
        (message.favoriteNumber = $util.Long.fromValue(
          object.favoriteNumber,
        )).unsigned = false;
      else if (typeof object.favoriteNumber === "string")
        message.favoriteNumber = parseInt(object.favoriteNumber, 10);
      else if (typeof object.favoriteNumber === "number")
        message.favoriteNumber = object.favoriteNumber;
      else if (typeof object.favoriteNumber === "object")
        message.favoriteNumber = new $util.LongBits(
          object.favoriteNumber.low >>> 0,
          object.favoriteNumber.high >>> 0,
        ).toNumber();
    if (object.favoriteColor != null)
      message.favoriteColor = String(object.favoriteColor);
    return message;
  };

  /**
   * Creates a plain object from a User message. Also converts values to other types if specified.
   * @function toObject
   * @memberof User
   * @static
   * @param {User} message User
   * @param {$protobuf.IConversionOptions} [options] Conversion options
   * @returns {Object.<string,*>} Plain object
   */
  User.toObject = function toObject(message, options) {
    if (!options) options = {};
    var object = {};
    if (options.defaults) {
      object.name = "";
      if ($util.Long) {
        var long = new $util.Long(0, 0, false);
        object.favoriteNumber =
          options.longs === String
            ? long.toString()
            : options.longs === Number
            ? long.toNumber()
            : long;
      } else object.favoriteNumber = options.longs === String ? "0" : 0;
      object.favoriteColor = "";
    }
    if (message.name != null && message.hasOwnProperty("name"))
      object.name = message.name;
    if (
      message.favoriteNumber != null &&
      message.hasOwnProperty("favoriteNumber")
    )
      if (typeof message.favoriteNumber === "number")
        object.favoriteNumber =
          options.longs === String
            ? String(message.favoriteNumber)
            : message.favoriteNumber;
      else
        object.favoriteNumber =
          options.longs === String
            ? $util.Long.prototype.toString.call(message.favoriteNumber)
            : options.longs === Number
            ? new $util.LongBits(
                message.favoriteNumber.low >>> 0,
                message.favoriteNumber.high >>> 0,
              ).toNumber()
            : message.favoriteNumber;
    if (
      message.favoriteColor != null &&
      message.hasOwnProperty("favoriteColor")
    )
      object.favoriteColor = message.favoriteColor;
    return object;
  };

  /**
   * Converts this User to JSON.
   * @function toJSON
   * @memberof User
   * @instance
   * @returns {Object.<string,*>} JSON object
   */
  User.prototype.toJSON = function toJSON() {
    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
  };

  return User;
})();

module.exports = $root;
