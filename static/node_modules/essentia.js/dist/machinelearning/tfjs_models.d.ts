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
import { InputMusiCNN, InputVGGish, EssentiaTFInputExtractorOutput } from './types';
/**
 * Base class for loading a pre-trained Essentia-Tensorflow.js model for inference
 * using TensorFlow.js.
 * @class
 */
declare class EssentiaTensorflowJSModel {
    model: any;
    protected audioSampleRate: number;
    protected tf: any;
    protected isReady: boolean;
    protected modelPath: string;
    protected IS_TRAIN: any;
    protected randomTensorInput: any;
    protected minimumInputFrameSize: any;
    constructor(tfjs: any, modelPath: string, verbose?: boolean);
    /**
     * Promise for loading & initialise an Essentia.js-TensorFlow.js model.
     * @async
     * @method
     * @memberof EssentiaTensorflowJSModel
     */
    initialize(): Promise<void>;
    /**
     * Converts an input 1D or 2D array into a 3D tensor (tfjs) given it's shape and required
     * patchSize. If `padding=true`, this method will zero-pad the input feature.
     *
     * @method
     * @param {Float32Array|any[]} inputFeatureArray input feature array as either 1D or 2D array
     * @param {any[]} inputShape shape of the input feature array in 2D.
     * @param {number} patchSize required patchSize to dynamically make batches of feature
     * @param {boolean} [zeroPadding=false] whether to enable zero-padding if less frames found for a batch.
     * @returns {tf.Tensor3D} returns the computed frame-wise feature for the given audio signal.
     * @memberof EssentiaTensorflowJSModel
     */
    arrayToTensorAsBatches(inputfeatureArray: Float32Array | any[], inputShape: any[], patchSize: number, zeroPadding?: boolean): any;
    dispose(): void;
    protected assertMinimumFeatureInputSize(inputFeature: EssentiaTFInputExtractorOutput): void;
    protected disambiguateExtraInputs(): any[];
}
/**
 * Class with methods for computing inference of
 * Essentia-Tensorflow.js MusiCNN-based pre-trained models.
 * The `predict` method expect an input audio feature computed
 * using `EssentiaTFInputExtractor`.
 * @class
 * @example
 *
 * // FEATURE EXTRACTION
 * // Create `EssentiaTFInputExtractor` instance by passing
 * // essentia-wasm import `EssentiaWASM` global object and `extractorType=musicnn`.
 * const inputFeatureExtractor = new EssentiaTFInputExtractor(EssentiaWASM, "musicnn");
 * // Compute feature for a given audio signal
 * let inputMusiCNN = inputFeatureExtractor.computeFrameWise(audioSignal);
 * // INFERENCE
 * const modelURL = "./autotagging/msd/msd-musicnn-1/model.json"
 * // Where `tf` is the global import object from the `@tensorflow/tfjs*` package.
 * const musicnn = new TensorflowMusiCNN(tf, modelURL);
 * // Promise for loading the model
 * await musicnn.initialize();
 * // Compute predictions for a given input feature.
 * let predictions = await musicnn.predict(inputMusiCNN);
 * @extends {EssentiaTensorflowJSModel}
 */
declare class TensorflowMusiCNN extends EssentiaTensorflowJSModel {
    constructor(tfjs: any, model_url: string, verbose?: boolean);
    /**
     * Run inference on the given audio feature input and returns the activations
     * @param {InputMusiCNN} inputFeature audio feature required by the MusiCNN model.
     * @param {boolean} [zeroPadding=false] whether to do zero-padding to the input feature.
     * @returns {array} activations of the output layer of the model
     * @memberof TensorflowMusiCNN
     */
    predict(inputFeature: InputMusiCNN, zeroPadding?: boolean): Promise<any[]>;
}
/**
* Class with methods for computing inference of
 * Essentia-Tensorflow.js VGGish-based pre-trained models.
 * The `predict` method expect an input audio feature computed
 * using `EssentiaTFInputExtractor`.
 * @class
 * @example
 * // FEATURE EXTRACTION
 * // Create `EssentiaTFInputExtractor` instance by passing
 * // essentia-wasm import `EssentiaWASM` global object and `extractorType=vggish`.
 * const inputFeatureExtractor = new EssentiaTFInputExtractor(EssentiaWASM, "vggish");
 * // Compute feature for a given audio signal array
 * let inputVGGish = inputFeatureExtractor.computeFrameWise(audioSignal);
 * // INFERENCE
 * const modelURL = "./classifiers/danceability/danceability-vggish-audioset-1/model.json"
 * // Where `tf` is the global import object from the `@tensorflow/tfjs*` package.
 * const vggish = new TensorflowVGGish(tf, modelURL);
 * // Promise for loading the model
 * await vggish.initialize();
 * // Compute predictions for a given input feature.
 * let predictions = await vggish.predict(inputVGGish);
 * @extends {EssentiaTensorflowJSModel}
 */
declare class TensorflowVGGish extends EssentiaTensorflowJSModel {
    constructor(tfjs: any, model_url: string, verbose?: boolean);
    /**
     * Run inference on the given audio feature input and returns the activations
     * @param {InputVGGish} inputFeature audio feature required by the VGGish model.
     * @param {boolean} [zeroPadding=false] whether to do zero-padding to the input feature.
     * @returns {array} activations of the output layer of the model
     * @memberof TensorflowVGGish
     */
    predict(inputFeature: InputVGGish, zeroPadding?: boolean): Promise<any[]>;
}
export { EssentiaTensorflowJSModel, TensorflowMusiCNN, TensorflowVGGish, };
