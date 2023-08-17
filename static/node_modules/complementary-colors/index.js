var Color = require("color");

var complementaryColors = function (colorInput) {

    this.color = Color(colorInput);
    this.hslColor = Color(this.color.hslString());
};

complementaryColors.prototype.primary = function () {
    return [
        this.hslColor.rgb()
    ]
};

complementaryColors.prototype.complementary = function () {
    return [
        this.hslColor.rgb(),
        this.hslColor.rotate(180).rgb()
    ]
};

complementaryColors.prototype.triad = function () {
    return [
        this.hslColor.rgb(),
        this.hslColor.rotate(120).rgb(),
        this.hslColor.rotate(120).rgb()
    ]
};

complementaryColors.prototype.analogous = function () {
    return [
        this.hslColor.rotate(-30).rgb(),
        this.hslColor.rgb(),
        this.hslColor.rotate(30).rgb()
    ]
};

complementaryColors.prototype.splitComplementary = function () {
    return [
        this.hslColor.rgb(),
        this.hslColor.rotate(-30).rgb(),
        this.hslColor.rotate(30).rgb()
    ]
};

complementaryColors.prototype.tetradic = function () {
    return [
        this.hslColor.rgb(),
        this.hslColor.rotate(90).rgb(),
        this.hslColor.rotate(180).rgb(),
        this.hslColor.rotate(240).rgb()
    ]
};

complementaryColors.prototype.square = function () {
    return [
        this.hslColor.rgb(),
        this.hslColor.rotate(90).rgb(),
        this.hslColor.rotate(180).rgb(),
        this.hslColor.rotate(270).rgb()
    ]
};

module.exports = complementaryColors;
