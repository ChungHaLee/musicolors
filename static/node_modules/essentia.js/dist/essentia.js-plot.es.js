/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

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
// default plot config for EssentiaPlot base class
var PlotConfig = {
    isPlotting: false,
    startTimeIndex: 0
};
// default layout settings for melody contour plots
var LayoutMelodyContourPlot = {
    title: "Melody Contour",
    plot_bgcolor: "transparent",
    paper_bgcolor: "#FCF7F7",
    autosize: false,
    width: 670,
    height: 300,
    xaxis: {
        type: "time",
        title: "Time"
    },
    yaxis: {
        autorange: false,
        range: [30, 3000],
        type: "linear",
        title: "Frequency (Hz)"
    }
};
// default layout settings for chroma heatmap plot
var LayoutChromaPlot = {
    title: "",
    plot_bgcolor: "transparent",
    paper_bgcolor: "#FCF7F7",
    autosize: false,
    width: 670,
    height: 300,
    xaxis: {
        autorange: true,
        time: 'Time',
        title: 'Time'
    },
    yaxis: {
        title: 'Pitch class',
        range: [0, 11]
    },
};
// default layout settings for spectrogram heatmap plot
var LayoutSpectrogramPlot = {
    title: "",
    plot_bgcolor: "transparent",
    paper_bgcolor: "#FCF7F7",
    autosize: false,
    width: 670,
    height: 300,
    xaxis: {
        title: 'Time',
        autorange: true,
        time: 'Time',
    },
    yaxis: {
        title: 'Bands',
        range: null,
        type: 'linear',
    },
};
/**
 * Base class for essentia.js-plot*
 * @class
 */
var EssentiaPlot = /** @class */ (function () {
    /**
     *Creates an instance of EssentiaPlot.
    * @param {*} Plotly plotly.js global import object (see https://plotly.com/javascript/)
    * @param {*} [options=CONFIG] config options for the plot
    * @constructs
    */
    function EssentiaPlot(Plotly, options) {
        if (options === void 0) { options = PlotConfig; }
        this.Plotly = Plotly;
        this.options = options;
        this.isPlotting = options.isPlotting;
        this.startTimeIndex = options.startTimeIndex;
    }
    /**
     * Returns evenly spaced samples, calculated over the interval [start, stop].
     * @param {*} start The starting value of the sequence.
     * @param {*} stop The end value of the sequence
     * @param {*} num Number of samples to generate. Must be non-negative.
     * @returns {Array}
     * @memberof EssentiaPlot
     */
    EssentiaPlot.prototype.makeLinearSpace = function (start, stop, num) {
        if (typeof num === "undefined")
            num = Math.max(Math.round(stop - start) + 1, 1);
        if (num < 2) {
            return num === 1 ? [start] : [];
        }
        var i, ret = Array(num);
        num--;
        for (i = num; i >= 0; i--) {
            ret[i] = (i * stop + (num - i) * start) / num;
        }
        return ret;
    };
    return EssentiaPlot;
}());
/**
 * @class PlotMelodyContour
 * @extends {EssentiaPlot}
 */
var PlotMelodyContour = /** @class */ (function (_super) {
    __extends(PlotMelodyContour, _super);
    /**
     * Creates an instance of PlotMelodyContour
     * @param {*} Plotly plotly.js global object import (see https://plotly.com/javascript/)
     * @param {string} divId HTML div container id
     * @param {*} [plotLayout=LayoutMelodyContour]
     * @constructs
     */
    function PlotMelodyContour(Plotly, divId, plotLayout) {
        if (plotLayout === void 0) { plotLayout = LayoutMelodyContourPlot; }
        var _this = _super.call(this, Plotly) || this;
        _this.Plotly = Plotly;
        _this.divId = divId;
        _this.plotLayout = plotLayout;
        return _this;
    }
    /**
     * Create the single line plot with the given input array using Plotly.js
     * @method
     * @param {Float32Array} featureArray 1D feature input array
     * @param {string} plotTitle title of the plot
     * @param {number} audioFrameSize length of input audio data in samples
     * @param {number} audioSampleRate sample rate of input audio
     * @memberof PlotMelodyContour
     */
    PlotMelodyContour.prototype.create = function (featureArray, plotTitle, audioFrameSize, audioSampleRate) {
        this.plotLayout.title = plotTitle;
        // time axis
        var timeAxis = this.makeLinearSpace(this.startTimeIndex, audioFrameSize / audioSampleRate, featureArray.length);
        // Create a plotly plot instance if a plot hasn't been created before
        if (!this.isPlotting) {
            this.Plotly.newPlot(this.divId, [{
                    x: timeAxis,
                    y: featureArray,
                    mode: 'lines',
                    line: { color: '#2B6FAC', width: 2 }
                }], this.plotLayout);
            this.isPlotting = true;
            this.startTimeIndex = timeAxis[timeAxis.length - 1];
        }
        else {
            timeAxis = this.makeLinearSpace(this.startTimeIndex, this.startTimeIndex + (audioFrameSize / audioSampleRate), featureArray.length);
            this.startTimeIndex = timeAxis[timeAxis.length - 1];
            this.Plotly.extendTraces(this.divId, {
                x: [timeAxis],
                y: [featureArray],
            }, [0]);
        }
    };
    /**
     * Destroy the existing Plotly traces
     * @method
     * @memberof PlotMelodyContour
     */
    PlotMelodyContour.prototype.destroy = function () {
        this.Plotly.deleteTraces(this.divId, 0);
        this.isPlotting = false;
        this.startTimeIndex = 0;
    };
    return PlotMelodyContour;
}(EssentiaPlot));
/**
 * @class PlotHeatmap
 * @extends {EssentiaPlot}
 */
var PlotHeatmap = /** @class */ (function (_super) {
    __extends(PlotHeatmap, _super);
    /**
     *Creates an instance of PlotHeatmap
    * @param {*} Plotly plotly.js global object import (see https://plotly.com/javascript/)
    * @param {string} divId HTML div container id
    * @param {string} [plotType='chroma'] type of plot to configure the y-axis
    * @param {*} [plotLayout=LayoutSpectrogramPlot]
    * @constructs
    */
    function PlotHeatmap(Plotly, divId, plotType, plotLayout) {
        if (plotType === void 0) { plotType = "chroma"; }
        if (plotLayout === void 0) { plotLayout = LayoutSpectrogramPlot; }
        var _this = _super.call(this, Plotly) || this;
        _this.Plotly = Plotly;
        _this.divId = divId;
        _this.plotType = plotType;
        _this.plotLayout = plotLayout;
        if (plotType === "chroma") {
            // we set chroma bin labels as yAxis for the heatmap
            _this.yAxis = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        }
        else if (plotType === "spectrogram") {
            _this.yAxis = null;
        }
        else {
            throw "Invalid value for argument 'plotType'. Should be either 'chroma' or 'spectrogram'";
        }
        return _this;
    }
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
    PlotHeatmap.prototype.create = function (featureArray, plotTitle, audioFrameSize, audioSampleRate, hopSize, colorscale) {
        if (colorscale === void 0) { colorscale = 'Jet'; }
        this.plotLayout.title = plotTitle;
        if (this.plotType === "spectrogram") {
            var numBands = featureArray[0].length;
            this.plotLayout.yaxis.range = [0, numBands + 1];
        }
        if (!this.isPlotting) {
            var heatmapFeature = void 0;
            var timeAxis = void 0;
            if ((featureArray[0].constructor === Array) || (featureArray[0].constructor === Float32Array)) {
                if (featureArray.length == 1) {
                    heatmapFeature = featureArray;
                    timeAxis = [this.startTimeIndex + hopSize / audioSampleRate, this.startTimeIndex + audioFrameSize / audioSampleRate];
                }
                else {
                    heatmapFeature = featureArray;
                    timeAxis = this.makeLinearSpace(this.startTimeIndex, audioFrameSize / audioSampleRate, heatmapFeature.length);
                }
            }
            else {
                throw "Got 1D array as input, expect a 2D array...";
            }
            var data = {
                x: timeAxis,
                y: this.yAxis,
                z: heatmapFeature,
                colorscale: colorscale,
                type: 'heatmap',
                transpose: true,
            };
            this.Plotly.newPlot(this.divId, [data], this.plotLayout);
            this.isPlotting = true;
            this.startTimeIndex = timeAxis[timeAxis.length - 1];
        }
        else {
            // realtime mode
            var heatmapFeature = void 0;
            var timeAxis = void 0;
            if ((featureArray[0].constructor === Array) || (featureArray[0].constructor === Float32Array)) {
                if (featureArray.length == 1) {
                    heatmapFeature = featureArray;
                    timeAxis = [this.startTimeIndex + hopSize / audioSampleRate, this.startTimeIndex + audioFrameSize / audioSampleRate];
                }
                else {
                    heatmapFeature = featureArray;
                    timeAxis = this.makeLinearSpace(this.startTimeIndex, audioFrameSize / audioSampleRate, heatmapFeature.length);
                }
            }
            else {
                throw "Got 1D array as input, expect a 2D array...";
            }
            this.startTimeIndex = timeAxis[timeAxis.length - 1];
            // realtime mode  
            this.Plotly.extendTraces(this.divId, {
                x: [timeAxis],
                z: [featureArray],
            }, [0]);
        }
    };
    /**
     * Destroy the existing Plotly plot traces
     * @method
     * @memberof PlotHeatmap
     */
    PlotHeatmap.prototype.destroy = function () {
        this.Plotly.deleteTraces(this.divId, 0);
        this.isPlotting = false;
        this.startTimeIndex = 0;
    };
    return PlotHeatmap;
}(EssentiaPlot));

export { EssentiaPlot, LayoutChromaPlot, LayoutMelodyContourPlot, LayoutSpectrogramPlot, PlotConfig, PlotHeatmap, PlotMelodyContour };
