import * as $protobuf from "protobufjs";
/** Properties of a Spectrograms. */
export interface ISpectrograms {

    /** Spectrograms spectrograms */
    spectrograms?: (Spectrograms.ISpectrogram[]|null);
}

/** Represents a Spectrograms. */
export class Spectrograms implements ISpectrograms {

    /**
     * Constructs a new Spectrograms.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISpectrograms);

    /** Spectrograms spectrograms. */
    public spectrograms: Spectrograms.ISpectrogram[];

    /**
     * Creates a new Spectrograms instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Spectrograms instance
     */
    public static create(properties?: ISpectrograms): Spectrograms;

    /**
     * Encodes the specified Spectrograms message. Does not implicitly {@link Spectrograms.verify|verify} messages.
     * @param message Spectrograms message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISpectrograms, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Spectrograms message, length delimited. Does not implicitly {@link Spectrograms.verify|verify} messages.
     * @param message Spectrograms message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISpectrograms, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Spectrograms message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Spectrograms
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Spectrograms;

    /**
     * Decodes a Spectrograms message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Spectrograms
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Spectrograms;

    /**
     * Verifies a Spectrograms message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Spectrograms message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Spectrograms
     */
    public static fromObject(object: { [k: string]: any }): Spectrograms;

    /**
     * Creates a plain object from a Spectrograms message. Also converts values to other types if specified.
     * @param message Spectrograms
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Spectrograms, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Spectrograms to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

export namespace Spectrograms {

    /** Properties of a Spectrogram. */
    interface ISpectrogram {

        /** Spectrogram timestamp */
        timestamp?: (string|null);

        /** Spectrogram baseline */
        baseline?: (string|null);

        /** Spectrogram polarization */
        polarization?: (string|null);

        /** Spectrogram phases */
        phases?: (number[]|null);
    }

    /** Represents a Spectrogram. */
    class Spectrogram implements ISpectrogram {

        /**
         * Constructs a new Spectrogram.
         * @param [properties] Properties to set
         */
        constructor(properties?: Spectrograms.ISpectrogram);

        /** Spectrogram timestamp. */
        public timestamp: string;

        /** Spectrogram baseline. */
        public baseline: string;

        /** Spectrogram polarization. */
        public polarization: string;

        /** Spectrogram phases. */
        public phases: number[];

        /**
         * Creates a new Spectrogram instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Spectrogram instance
         */
        public static create(properties?: Spectrograms.ISpectrogram): Spectrograms.Spectrogram;

        /**
         * Encodes the specified Spectrogram message. Does not implicitly {@link Spectrograms.Spectrogram.verify|verify} messages.
         * @param message Spectrogram message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Spectrograms.ISpectrogram, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Spectrogram message, length delimited. Does not implicitly {@link Spectrograms.Spectrogram.verify|verify} messages.
         * @param message Spectrogram message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Spectrograms.ISpectrogram, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Spectrogram message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Spectrogram
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Spectrograms.Spectrogram;

        /**
         * Decodes a Spectrogram message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Spectrogram
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Spectrograms.Spectrogram;

        /**
         * Verifies a Spectrogram message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Spectrogram message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Spectrogram
         */
        public static fromObject(object: { [k: string]: any }): Spectrograms.Spectrogram;

        /**
         * Creates a plain object from a Spectrogram message. Also converts values to other types if specified.
         * @param message Spectrogram
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Spectrograms.Spectrogram, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Spectrogram to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}