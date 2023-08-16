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
declare let PlotConfig: {
    isPlotting: boolean;
    startTimeIndex: number;
};
declare let LayoutMelodyContourPlot: {
    title: string;
    plot_bgcolor: string;
    paper_bgcolor: string;
    autosize: boolean;
    width: number;
    height: number;
    xaxis: {
        type: string;
        title: string;
    };
    yaxis: {
        autorange: boolean;
        range: number[];
        type: string;
        title: string;
    };
};
declare let LayoutChromaPlot: {
    title: string;
    plot_bgcolor: string;
    paper_bgcolor: string;
    autosize: boolean;
    width: number;
    height: number;
    xaxis: {
        autorange: boolean;
        time: string;
        title: string;
    };
    yaxis: {
        title: string;
        range: number[];
    };
};
declare let LayoutSpectrogramPlot: {
    title: string;
    plot_bgcolor: string;
    paper_bgcolor: string;
    autosize: boolean;
    width: number;
    height: number;
    xaxis: {
        title: string;
        autorange: boolean;
        time: string;
    };
    yaxis: {
        title: string;
        range: null;
        type: string;
    };
};
/**
 * Base class for essentia.js-plot*
 * @class
 */
declare class EssentiaPlot {
    Plotly: any;
    options: any;
    isPlotting: boolean;
    startTimeIndex: number;
    /**
     *Creates an instance of EssentiaPlot.
    * @param {*} Plotly plotly.js global import object (see https://plotly.com/javascript/)
    * @param {*} [options=CONFIG] config options for the plot
    * @constructs
    */
    constructor(Plotly: any, options?: any);
    /**
     * Returns evenly spaced samples, calculated over the interval [start, stop].
     * @param {*} start The starting value of the sequence.
     * @param {*} stop The end value of the sequence
     * @param {*} num Number of samples to generate. Must be non-negative.
     * @returns {Array}
     * @memberof EssentiaPlot
     */
    makeLinearSpace(start: any, stop: any, num: any): any[];
}
/**
 * @class PlotMelodyContour
 * @extends {EssentiaPlot}
 */
declare class PlotMelodyContour extends EssentiaPlot {
    Plotly: any;
    divId: string;
    plotLayout: any;
    /**
     * Creates an instance of PlotMelodyContour
     * @param {*} Plotly plotly.js global object import (see https://plotly.com/javascript/)
     * @param {string} divId HTML div container id
     * @param {*} [plotLayout=LayoutMelodyContour]
     * @constructs
     */
    constructor(Plotly: any, divId: string, plotLayout?: any);
    /**
     * Create the single line plot with the given input array using Plotly.js
     * @method
     * @param {Float32Array} featureArray 1D feature input array
     * @param {string} plotTitle title of the plot
     * @param {number} audioFrameSize length of input audio data in samples
     * @param {number} audioSampleRate sample rate of input audio
     * @memberof PlotMelodyContour
     */
    create(featureArray: Float32Array, plotTitle: string, audioFrameSize: any, audioSampleRate: any): void;
    /**
     * Destroy the existing Plotly traces
     * @method
     * @memberof PlotMelodyContour
     */
    destroy(): void;
}
/**
 * @class PlotHeatmap
 * @extends {EssentiaPlot}
 */
declare class PlotHeatmap extends EssentiaPlot {
    Plotly: any;
    divId: string;
    plotType: string;
    plotLayout: any;
    yAxis: any;
    /**
     *Creates an instance of PlotHeatmap
    * @param {*} Plotly plotly.js global object import (see https://plotly.com/javascript/)
    * @param {string} divId HTML div container id
    * @param {string} [plotType='chroma'] type of plot to configure the y-axis
    * @param {*} [plotLayout=LayoutSpectrogramPlot]
    * @constructs
    */
    constructor(Plotly: any, divId: string, plotType?: string, plotLayout?: any);
    /**
     * Create Plotly.js heatmap plot with given input array and type
     * @param {Array} featureArray 2D feature array where 'x' axis denotes temporal evolution of features
     * @param {string} plotTitle title of the plot
     * @param {*} audioFrameSize length of input audio data in samples
     * @param {*} audioSampleRate sample rate of input audio
     * @param {*} [hopSize=0] hopSize used for the feture extraction if applies.
     * @param {string} [colorscale='Jet']
     * @memberof PlotHeatmap
     */
    create(featureArray: any, plotTitle: string, audioFrameSize: number, audioSampleRate: number, hopSize: number, colorscale?: string): void;
    /**
     * Destroy the existing Plotly plot traces
     * @method
     * @memberof PlotHeatmap
     */
    destroy(): void;
}
export { EssentiaPlot, PlotMelodyContour, PlotHeatmap, LayoutMelodyContourPlot, LayoutChromaPlot, LayoutSpectrogramPlot, PlotConfig };
