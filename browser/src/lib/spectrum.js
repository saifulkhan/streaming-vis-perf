/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Spectrum = (function() {

    /**
     * Properties of a Spectrum.
     * @exports ISpectrum
     * @interface ISpectrum
     * @property {string|null} [timestamp] Spectrum timestamp
     * @property {number|Long|null} [xMin] Spectrum xMin
     * @property {number|Long|null} [xMax] Spectrum xMax
     * @property {number|Long|null} [yMin] Spectrum yMin
     * @property {number|null} [yMax] Spectrum yMax
     * @property {Array.<number>|null} [data] Spectrum data
     */

    /**
     * Constructs a new Spectrum.
     * @exports Spectrum
     * @classdesc Represents a Spectrum.
     * @implements ISpectrum
     * @constructor
     * @param {ISpectrum=} [properties] Properties to set
     */
    function Spectrum(properties) {
        this.data = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Spectrum timestamp.
     * @member {string} timestamp
     * @memberof Spectrum
     * @instance
     */
    Spectrum.prototype.timestamp = "";

    /**
     * Spectrum xMin.
     * @member {number|Long} xMin
     * @memberof Spectrum
     * @instance
     */
    Spectrum.prototype.xMin = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Spectrum xMax.
     * @member {number|Long} xMax
     * @memberof Spectrum
     * @instance
     */
    Spectrum.prototype.xMax = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Spectrum yMin.
     * @member {number|Long} yMin
     * @memberof Spectrum
     * @instance
     */
    Spectrum.prototype.yMin = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Spectrum yMax.
     * @member {number} yMax
     * @memberof Spectrum
     * @instance
     */
    Spectrum.prototype.yMax = 0;

    /**
     * Spectrum data.
     * @member {Array.<number>} data
     * @memberof Spectrum
     * @instance
     */
    Spectrum.prototype.data = $util.emptyArray;

    /**
     * Creates a new Spectrum instance using the specified properties.
     * @function create
     * @memberof Spectrum
     * @static
     * @param {ISpectrum=} [properties] Properties to set
     * @returns {Spectrum} Spectrum instance
     */
    Spectrum.create = function create(properties) {
        return new Spectrum(properties);
    };

    /**
     * Encodes the specified Spectrum message. Does not implicitly {@link Spectrum.verify|verify} messages.
     * @function encode
     * @memberof Spectrum
     * @static
     * @param {ISpectrum} message Spectrum message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Spectrum.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.timestamp);
        if (message.xMin != null && Object.hasOwnProperty.call(message, "xMin"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.xMin);
        if (message.xMax != null && Object.hasOwnProperty.call(message, "xMax"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.xMax);
        if (message.yMin != null && Object.hasOwnProperty.call(message, "yMin"))
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.yMin);
        if (message.yMax != null && Object.hasOwnProperty.call(message, "yMax"))
            writer.uint32(/* id 5, wireType 1 =*/41).double(message.yMax);
        if (message.data != null && message.data.length) {
            writer.uint32(/* id 6, wireType 2 =*/50).fork();
            for (var i = 0; i < message.data.length; ++i)
                writer.double(message.data[i]);
            writer.ldelim();
        }
        return writer;
    };

    /**
     * Encodes the specified Spectrum message, length delimited. Does not implicitly {@link Spectrum.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Spectrum
     * @static
     * @param {ISpectrum} message Spectrum message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Spectrum.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Spectrum message from the specified reader or buffer.
     * @function decode
     * @memberof Spectrum
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Spectrum} Spectrum
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Spectrum.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Spectrum();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.timestamp = reader.string();
                break;
            case 2:
                message.xMin = reader.int64();
                break;
            case 3:
                message.xMax = reader.int64();
                break;
            case 4:
                message.yMin = reader.int64();
                break;
            case 5:
                message.yMax = reader.double();
                break;
            case 6:
                if (!(message.data && message.data.length))
                    message.data = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.data.push(reader.double());
                } else
                    message.data.push(reader.double());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Spectrum message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Spectrum
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Spectrum} Spectrum
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Spectrum.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Spectrum message.
     * @function verify
     * @memberof Spectrum
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Spectrum.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!$util.isString(message.timestamp))
                return "timestamp: string expected";
        if (message.xMin != null && message.hasOwnProperty("xMin"))
            if (!$util.isInteger(message.xMin) && !(message.xMin && $util.isInteger(message.xMin.low) && $util.isInteger(message.xMin.high)))
                return "xMin: integer|Long expected";
        if (message.xMax != null && message.hasOwnProperty("xMax"))
            if (!$util.isInteger(message.xMax) && !(message.xMax && $util.isInteger(message.xMax.low) && $util.isInteger(message.xMax.high)))
                return "xMax: integer|Long expected";
        if (message.yMin != null && message.hasOwnProperty("yMin"))
            if (!$util.isInteger(message.yMin) && !(message.yMin && $util.isInteger(message.yMin.low) && $util.isInteger(message.yMin.high)))
                return "yMin: integer|Long expected";
        if (message.yMax != null && message.hasOwnProperty("yMax"))
            if (typeof message.yMax !== "number")
                return "yMax: number expected";
        if (message.data != null && message.hasOwnProperty("data")) {
            if (!Array.isArray(message.data))
                return "data: array expected";
            for (var i = 0; i < message.data.length; ++i)
                if (typeof message.data[i] !== "number")
                    return "data: number[] expected";
        }
        return null;
    };

    /**
     * Creates a Spectrum message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Spectrum
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Spectrum} Spectrum
     */
    Spectrum.fromObject = function fromObject(object) {
        if (object instanceof $root.Spectrum)
            return object;
        var message = new $root.Spectrum();
        if (object.timestamp != null)
            message.timestamp = String(object.timestamp);
        if (object.xMin != null)
            if ($util.Long)
                (message.xMin = $util.Long.fromValue(object.xMin)).unsigned = false;
            else if (typeof object.xMin === "string")
                message.xMin = parseInt(object.xMin, 10);
            else if (typeof object.xMin === "number")
                message.xMin = object.xMin;
            else if (typeof object.xMin === "object")
                message.xMin = new $util.LongBits(object.xMin.low >>> 0, object.xMin.high >>> 0).toNumber();
        if (object.xMax != null)
            if ($util.Long)
                (message.xMax = $util.Long.fromValue(object.xMax)).unsigned = false;
            else if (typeof object.xMax === "string")
                message.xMax = parseInt(object.xMax, 10);
            else if (typeof object.xMax === "number")
                message.xMax = object.xMax;
            else if (typeof object.xMax === "object")
                message.xMax = new $util.LongBits(object.xMax.low >>> 0, object.xMax.high >>> 0).toNumber();
        if (object.yMin != null)
            if ($util.Long)
                (message.yMin = $util.Long.fromValue(object.yMin)).unsigned = false;
            else if (typeof object.yMin === "string")
                message.yMin = parseInt(object.yMin, 10);
            else if (typeof object.yMin === "number")
                message.yMin = object.yMin;
            else if (typeof object.yMin === "object")
                message.yMin = new $util.LongBits(object.yMin.low >>> 0, object.yMin.high >>> 0).toNumber();
        if (object.yMax != null)
            message.yMax = Number(object.yMax);
        if (object.data) {
            if (!Array.isArray(object.data))
                throw TypeError(".Spectrum.data: array expected");
            message.data = [];
            for (var i = 0; i < object.data.length; ++i)
                message.data[i] = Number(object.data[i]);
        }
        return message;
    };

    /**
     * Creates a plain object from a Spectrum message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Spectrum
     * @static
     * @param {Spectrum} message Spectrum
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Spectrum.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.data = [];
        if (options.defaults) {
            object.timestamp = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.xMin = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.xMin = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.xMax = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.xMax = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.yMin = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.yMin = options.longs === String ? "0" : 0;
            object.yMax = 0;
        }
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            object.timestamp = message.timestamp;
        if (message.xMin != null && message.hasOwnProperty("xMin"))
            if (typeof message.xMin === "number")
                object.xMin = options.longs === String ? String(message.xMin) : message.xMin;
            else
                object.xMin = options.longs === String ? $util.Long.prototype.toString.call(message.xMin) : options.longs === Number ? new $util.LongBits(message.xMin.low >>> 0, message.xMin.high >>> 0).toNumber() : message.xMin;
        if (message.xMax != null && message.hasOwnProperty("xMax"))
            if (typeof message.xMax === "number")
                object.xMax = options.longs === String ? String(message.xMax) : message.xMax;
            else
                object.xMax = options.longs === String ? $util.Long.prototype.toString.call(message.xMax) : options.longs === Number ? new $util.LongBits(message.xMax.low >>> 0, message.xMax.high >>> 0).toNumber() : message.xMax;
        if (message.yMin != null && message.hasOwnProperty("yMin"))
            if (typeof message.yMin === "number")
                object.yMin = options.longs === String ? String(message.yMin) : message.yMin;
            else
                object.yMin = options.longs === String ? $util.Long.prototype.toString.call(message.yMin) : options.longs === Number ? new $util.LongBits(message.yMin.low >>> 0, message.yMin.high >>> 0).toNumber() : message.yMin;
        if (message.yMax != null && message.hasOwnProperty("yMax"))
            object.yMax = options.json && !isFinite(message.yMax) ? String(message.yMax) : message.yMax;
        if (message.data && message.data.length) {
            object.data = [];
            for (var j = 0; j < message.data.length; ++j)
                object.data[j] = options.json && !isFinite(message.data[j]) ? String(message.data[j]) : message.data[j];
        }
        return object;
    };

    /**
     * Converts this Spectrum to JSON.
     * @function toJSON
     * @memberof Spectrum
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Spectrum.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Spectrum;
})();

module.exports = $root;
