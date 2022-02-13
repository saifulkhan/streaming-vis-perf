/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Spectrograms = (function() {

    /**
     * Properties of a Spectrograms.
     * @exports ISpectrograms
     * @interface ISpectrograms
     * @property {Array.<Spectrograms.ISpectrogram>|null} [spectrograms] Spectrograms spectrograms
     */

    /**
     * Constructs a new Spectrograms.
     * @exports Spectrograms
     * @classdesc Represents a Spectrograms.
     * @implements ISpectrograms
     * @constructor
     * @param {ISpectrograms=} [properties] Properties to set
     */
    function Spectrograms(properties) {
        this.spectrograms = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Spectrograms spectrograms.
     * @member {Array.<Spectrograms.ISpectrogram>} spectrograms
     * @memberof Spectrograms
     * @instance
     */
    Spectrograms.prototype.spectrograms = $util.emptyArray;

    /**
     * Creates a new Spectrograms instance using the specified properties.
     * @function create
     * @memberof Spectrograms
     * @static
     * @param {ISpectrograms=} [properties] Properties to set
     * @returns {Spectrograms} Spectrograms instance
     */
    Spectrograms.create = function create(properties) {
        return new Spectrograms(properties);
    };

    /**
     * Encodes the specified Spectrograms message. Does not implicitly {@link Spectrograms.verify|verify} messages.
     * @function encode
     * @memberof Spectrograms
     * @static
     * @param {ISpectrograms} message Spectrograms message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Spectrograms.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.spectrograms != null && message.spectrograms.length)
            for (var i = 0; i < message.spectrograms.length; ++i)
                $root.Spectrograms.Spectrogram.encode(message.spectrograms[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Spectrograms message, length delimited. Does not implicitly {@link Spectrograms.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Spectrograms
     * @static
     * @param {ISpectrograms} message Spectrograms message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Spectrograms.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Spectrograms message from the specified reader or buffer.
     * @function decode
     * @memberof Spectrograms
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Spectrograms} Spectrograms
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Spectrograms.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Spectrograms();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.spectrograms && message.spectrograms.length))
                    message.spectrograms = [];
                message.spectrograms.push($root.Spectrograms.Spectrogram.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Spectrograms message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Spectrograms
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Spectrograms} Spectrograms
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Spectrograms.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Spectrograms message.
     * @function verify
     * @memberof Spectrograms
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Spectrograms.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.spectrograms != null && message.hasOwnProperty("spectrograms")) {
            if (!Array.isArray(message.spectrograms))
                return "spectrograms: array expected";
            for (var i = 0; i < message.spectrograms.length; ++i) {
                var error = $root.Spectrograms.Spectrogram.verify(message.spectrograms[i]);
                if (error)
                    return "spectrograms." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Spectrograms message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Spectrograms
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Spectrograms} Spectrograms
     */
    Spectrograms.fromObject = function fromObject(object) {
        if (object instanceof $root.Spectrograms)
            return object;
        var message = new $root.Spectrograms();
        if (object.spectrograms) {
            if (!Array.isArray(object.spectrograms))
                throw TypeError(".Spectrograms.spectrograms: array expected");
            message.spectrograms = [];
            for (var i = 0; i < object.spectrograms.length; ++i) {
                if (typeof object.spectrograms[i] !== "object")
                    throw TypeError(".Spectrograms.spectrograms: object expected");
                message.spectrograms[i] = $root.Spectrograms.Spectrogram.fromObject(object.spectrograms[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Spectrograms message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Spectrograms
     * @static
     * @param {Spectrograms} message Spectrograms
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Spectrograms.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.spectrograms = [];
        if (message.spectrograms && message.spectrograms.length) {
            object.spectrograms = [];
            for (var j = 0; j < message.spectrograms.length; ++j)
                object.spectrograms[j] = $root.Spectrograms.Spectrogram.toObject(message.spectrograms[j], options);
        }
        return object;
    };

    /**
     * Converts this Spectrograms to JSON.
     * @function toJSON
     * @memberof Spectrograms
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Spectrograms.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    Spectrograms.Spectrogram = (function() {

        /**
         * Properties of a Spectrogram.
         * @memberof Spectrograms
         * @interface ISpectrogram
         * @property {string|null} [timestamp] Spectrogram timestamp
         * @property {string|null} [baseline] Spectrogram baseline
         * @property {string|null} [polarization] Spectrogram polarization
         * @property {Array.<number>|null} [phases] Spectrogram phases
         */

        /**
         * Constructs a new Spectrogram.
         * @memberof Spectrograms
         * @classdesc Represents a Spectrogram.
         * @implements ISpectrogram
         * @constructor
         * @param {Spectrograms.ISpectrogram=} [properties] Properties to set
         */
        function Spectrogram(properties) {
            this.phases = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Spectrogram timestamp.
         * @member {string} timestamp
         * @memberof Spectrograms.Spectrogram
         * @instance
         */
        Spectrogram.prototype.timestamp = "";

        /**
         * Spectrogram baseline.
         * @member {string} baseline
         * @memberof Spectrograms.Spectrogram
         * @instance
         */
        Spectrogram.prototype.baseline = "";

        /**
         * Spectrogram polarization.
         * @member {string} polarization
         * @memberof Spectrograms.Spectrogram
         * @instance
         */
        Spectrogram.prototype.polarization = "";

        /**
         * Spectrogram phases.
         * @member {Array.<number>} phases
         * @memberof Spectrograms.Spectrogram
         * @instance
         */
        Spectrogram.prototype.phases = $util.emptyArray;

        /**
         * Creates a new Spectrogram instance using the specified properties.
         * @function create
         * @memberof Spectrograms.Spectrogram
         * @static
         * @param {Spectrograms.ISpectrogram=} [properties] Properties to set
         * @returns {Spectrograms.Spectrogram} Spectrogram instance
         */
        Spectrogram.create = function create(properties) {
            return new Spectrogram(properties);
        };

        /**
         * Encodes the specified Spectrogram message. Does not implicitly {@link Spectrograms.Spectrogram.verify|verify} messages.
         * @function encode
         * @memberof Spectrograms.Spectrogram
         * @static
         * @param {Spectrograms.ISpectrogram} message Spectrogram message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Spectrogram.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.timestamp);
            if (message.baseline != null && Object.hasOwnProperty.call(message, "baseline"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.baseline);
            if (message.polarization != null && Object.hasOwnProperty.call(message, "polarization"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.polarization);
            if (message.phases != null && message.phases.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (var i = 0; i < message.phases.length; ++i)
                    writer.uint32(message.phases[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified Spectrogram message, length delimited. Does not implicitly {@link Spectrograms.Spectrogram.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Spectrograms.Spectrogram
         * @static
         * @param {Spectrograms.ISpectrogram} message Spectrogram message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Spectrogram.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Spectrogram message from the specified reader or buffer.
         * @function decode
         * @memberof Spectrograms.Spectrogram
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Spectrograms.Spectrogram} Spectrogram
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Spectrogram.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Spectrograms.Spectrogram();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.timestamp = reader.string();
                    break;
                case 2:
                    message.baseline = reader.string();
                    break;
                case 3:
                    message.polarization = reader.string();
                    break;
                case 4:
                    if (!(message.phases && message.phases.length))
                        message.phases = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.phases.push(reader.uint32());
                    } else
                        message.phases.push(reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Spectrogram message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Spectrograms.Spectrogram
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Spectrograms.Spectrogram} Spectrogram
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Spectrogram.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Spectrogram message.
         * @function verify
         * @memberof Spectrograms.Spectrogram
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Spectrogram.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isString(message.timestamp))
                    return "timestamp: string expected";
            if (message.baseline != null && message.hasOwnProperty("baseline"))
                if (!$util.isString(message.baseline))
                    return "baseline: string expected";
            if (message.polarization != null && message.hasOwnProperty("polarization"))
                if (!$util.isString(message.polarization))
                    return "polarization: string expected";
            if (message.phases != null && message.hasOwnProperty("phases")) {
                if (!Array.isArray(message.phases))
                    return "phases: array expected";
                for (var i = 0; i < message.phases.length; ++i)
                    if (!$util.isInteger(message.phases[i]))
                        return "phases: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a Spectrogram message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Spectrograms.Spectrogram
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Spectrograms.Spectrogram} Spectrogram
         */
        Spectrogram.fromObject = function fromObject(object) {
            if (object instanceof $root.Spectrograms.Spectrogram)
                return object;
            var message = new $root.Spectrograms.Spectrogram();
            if (object.timestamp != null)
                message.timestamp = String(object.timestamp);
            if (object.baseline != null)
                message.baseline = String(object.baseline);
            if (object.polarization != null)
                message.polarization = String(object.polarization);
            if (object.phases) {
                if (!Array.isArray(object.phases))
                    throw TypeError(".Spectrograms.Spectrogram.phases: array expected");
                message.phases = [];
                for (var i = 0; i < object.phases.length; ++i)
                    message.phases[i] = object.phases[i] >>> 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a Spectrogram message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Spectrograms.Spectrogram
         * @static
         * @param {Spectrograms.Spectrogram} message Spectrogram
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Spectrogram.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.phases = [];
            if (options.defaults) {
                object.timestamp = "";
                object.baseline = "";
                object.polarization = "";
            }
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                object.timestamp = message.timestamp;
            if (message.baseline != null && message.hasOwnProperty("baseline"))
                object.baseline = message.baseline;
            if (message.polarization != null && message.hasOwnProperty("polarization"))
                object.polarization = message.polarization;
            if (message.phases && message.phases.length) {
                object.phases = [];
                for (var j = 0; j < message.phases.length; ++j)
                    object.phases[j] = message.phases[j];
            }
            return object;
        };

        /**
         * Converts this Spectrogram to JSON.
         * @function toJSON
         * @memberof Spectrograms.Spectrogram
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Spectrogram.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Spectrogram;
    })();

    return Spectrograms;
})();

module.exports = $root;
