/**
 * @license
 * Copyright (C) 2006-2020  Music Technology Group - Universitat Pompeu Fabra
 *
 * This file is part of Essentia
 *
 * Essentia is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation (FSF), either version 3 of the License, or (at your
 * option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the Affero GNU General Public License
 * version 3 along with this program.  If not, see http://www.gnu.org/licenses/
 */
import { EssentiaTFInputExtractorOutput } from "./types";
/**
 * Class with methods for computing common feature input representations required
 * for the inference of Essentia-Tensorflow.js pre-trained models using EssentiaWASM
 * backend which is imported from `essentia-wasm*.js` builds.
 * @class
 * @example
 * // Create `EssentiaTFInputExtractor` instance by passing EssentiaWASM import object and `extractorType` value.
 * const extractor = new EssentiaTFInputExtractor(EssentiaWASM, "musicnn");
 * // Compute feature for a given frame of audio signal
 * let featureMusiCNN = extractor.compute(audioSignalFrame);
 * // Change the feature extractor with a new setting for VGGish input
 * extractor.extractorType = "vggish";
 * let featureVGGish = extractor.compute(audioSignalFrame);
 * // Delete and shutdown the extractor instance if you don't need it anymore.
 * extractor.delete();
 * extractor.shutdown();
 */
declare class EssentiaTFInputExtractor {
    /**
    * @property {EssentiaJS} this.essentia an instance of `EssentiaWASM.EssentiaJS`.
    * @property {string} this.extractorType type of the choosen extractor (eg. 'muscinn', 'vggish' or 'tempocnn').
    */
    essentia: any;
    extractorType: string;
    protected module: any;
    protected frameSize: number;
    private sampleRate;
    /**
    * @constructs
    * @param {EssentiaWASM} EssentiaWASM Essentia WASM emcripten global module object
    * @param {string} [extractorType='musicnn'] type of the desired extractor type (eg. 'muscinn', 'vggish' or 'tempocnn').
    * @param {boolean} [isDebug=false] whether to enable EssentiaWASM internal debugger for logs.
    */
    constructor(EssentiaWASM: any, extractorType?: string, isDebug?: boolean);
    /**
     * Convert a typed JS Float32Array into VectorFloat type.
     * @method
     * @param {Float32Array} inputArray input Float32 typed array.
     * @returns {VectorFloat} returns converted VectorFloat array.
     * @memberof EssentiaTFInputExtractor
     */
    arrayToVector(inputArray: Float32Array): any;
    /**
     * Convert an input VectorFloat array into typed JS Float32Array
     * @method
     * @param {VectorFloat} inputVector input VectorFloat array
     * @returns {Float32Array} returns converted JS typed array
     * @memberof EssentiaTFInputExtractor
     */
    vectorToArray(inputVector: any): Float32Array;
    /**
     * Decode and returns the audio buffer from an given audio url or blob uri using Web Audio API. (NOTE: This doesn't work on Safari browser)
     * @async
     * @method
     * @param {string} audioURL web url or blob uri of a audio file
     * @param {AudioContext} webAudioCtx an instance of Web Audio API `AudioContext`
     * @returns {Promise<AudioBuffer>} decoded audio buffer as a promise
     * @memberof EssentiaTFInputExtractor
     */
    getAudioBufferFromURL(audioURL: string, webAudioCtx: AudioContext): Promise<AudioBuffer>;
    /**
     * Convert an AudioBuffer object to a Mono audio signal array. The audio signal is downmixed
     * to mono using essentia `MonoMixer` algorithm if the audio buffer has 2 channels of audio.
     * Throws an expection if the input AudioBuffer object has more than 2 channels of audio.
     * @method
     * @param {AudioBuffer} buffer `AudioBuffer` object decoded from an audio file.
     * @returns {Float32Array} audio channel data. (downmixed to mono if its stereo signal).
     * @memberof EssentiaTFInputExtractor
     */
    audioBufferToMonoSignal(buffer: AudioBuffer): Float32Array;
    /**
     * Downsample a audio buffer to a target audio sample rate using the Web Audio API
     * NOTE: This method will only works on web-browsers which supports the Web Audio API.
     * @method
     * @param {AudioBuffer} sourceBuffer `AudioBuffer` object decoded from an audio file.
     * @returns {Float32Array} decoded audio buffer object
     * @memberof EssentiaTFInputExtractor
     */
    downsampleAudioBuffer(sourceBuffer: AudioBuffer): Promise<Float32Array>;
    /**
     * This method compute the pre-configured features for a given audio signal frame.
     * It throws an exception if the size of audioFrame is not equal to the pre-configured
     * audioFrame size for the selected `extractorType` setting.
     * @method
     * @param {Float32Array} audioFrame a frame of audio signal as Float32 typed JS array.
     * @returns {EssentiaTFInputExtractorOutput} returns the computed feature for the input the given audio frame.
     * @memberof EssentiaTFInputExtractor
     */
    compute(audioFrame: Float32Array | any[]): EssentiaTFInputExtractorOutput;
    /**
     * This method compute the pre-configured feature for a whole audio signal.
     * It is a wrapper on top of the `compute` method. It throws an exception
     * if the size of audioFrame is not equal to the pre-configured size.
     * @method
     * @param {Float32Array} audioSignal decoded audio signal as Float32 typed JS array.
     * @param {number} hopSize? optional param for specifying hopSize for overlapping-frames. By default use none.
     * @returns {EssentiaTFInputExtractorOutput} returns the computed frame-wise feature for the given audio signal.
     * @memberof EssentiaTFInputExtractor
     */
    computeFrameWise(audioSignal: Float32Array, hopSize?: number): EssentiaTFInputExtractorOutput;
    /**
     * Delete essentia session and frees the memory.
     * @method
     * @returns {null}
     * @memberof EssentiaTFInputExtractor
     */
    delete(): void;
    /**
     * This method shutdown all the instance of Essentia WASM and frees the memory.
     * NOTE: If you want to just free the memory of the pre-configured extractor,
     * use `this.extractor.delete()` instead.
     * @method
     * @returns {null}
     * @memberof EssentiaTFInputExtractor
     */
    shutdown(): void;
}
export { EssentiaTFInputExtractor };
