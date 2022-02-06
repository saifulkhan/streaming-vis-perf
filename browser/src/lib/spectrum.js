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
     * @property {number|null} [xMin] Spectrum xMin
     * @property {number|null} [xMax] Spectrum xMax
     * @property {number|null} [yMin] Spectrum yMin
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
     * @member {number} xMin
     * @memberof Spectrum
     * @instance
     */
    Spectrum.prototype.xMin = 0;

    /**
     * Spectrum xMax.
     * @member {number} xMax
     * @memberof Spectrum
     * @instance
     */
    Spectrum.prototype.xMax = 0;

    /**
     * Spectrum yMin.
     * @member {number} yMin
     * @memberof Spectrum
     * @instance
     */
    Spectrum.prototype.yMin = 0;

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
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.xMin);
        if (message.xMax != null && Object.hasOwnProperty.call(message, "xMax"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.xMax);
        if (message.yMin != null && Object.hasOwnProperty.call(message, "yMin"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.yMin);
        if (message.yMax != null && Object.hasOwnProperty.call(message, "yMax"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.yMax);
        if (message.data != null && message.data.length) {
            writer.uint32(/* id 6, wireType 2 =*/50).fork();
            for (var i = 0; i < message.data.length; ++i)
                writer.float(message.data[i]);
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
                message.xMin = reader.int32();
                break;
            case 3:
                message.xMax = reader.int32();
                break;
            case 4:
                message.yMin = reader.int32();
                break;
            case 5:
                message.yMax = reader.int32();
                break;
            case 6:
                if (!(message.data && message.data.length))
                    message.data = [];
                if ((tag & 7) === 2) {
                    var end2 = reader.uint32() + reader.pos;
                    while (reader.pos < end2)
                        message.data.push(reader.float());
                } else
                    message.data.push(reader.float());
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
            if (!$util.isInteger(message.xMin))
                return "xMin: integer expected";
        if (message.xMax != null && message.hasOwnProperty("xMax"))
            if (!$util.isInteger(message.xMax))
                return "xMax: integer expected";
        if (message.yMin != null && message.hasOwnProperty("yMin"))
            if (!$util.isInteger(message.yMin))
                return "yMin: integer expected";
        if (message.yMax != null && message.hasOwnProperty("yMax"))
            if (!$util.isInteger(message.yMax))
                return "yMax: integer expected";
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
            message.xMin = object.xMin | 0;
        if (object.xMax != null)
            message.xMax = object.xMax | 0;
        if (object.yMin != null)
            message.yMin = object.yMin | 0;
        if (object.yMax != null)
            message.yMax = object.yMax | 0;
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
            object.xMin = 0;
            object.xMax = 0;
            object.yMin = 0;
            object.yMax = 0;
        }
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            object.timestamp = message.timestamp;
        if (message.xMin != null && message.hasOwnProperty("xMin"))
            object.xMin = message.xMin;
        if (message.xMax != null && message.hasOwnProperty("xMax"))
            object.xMax = message.xMax;
        if (message.yMin != null && message.hasOwnProperty("yMin"))
            object.yMin = message.yMin;
        if (message.yMax != null && message.hasOwnProperty("yMax"))
            object.yMax = message.yMax;
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
