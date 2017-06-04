'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sway = function () {
  function Sway(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Sway);

    // Get and wrap element, also set necessary styles
    this.wrapper = document.getElementById(element);
    this.menu = document.createElement("div");
    this.wrapper.childNodes.forEach(function (child) {
      this.menu.appendChild(child);
    }, this);
    this.menu.style.position = 'absolute';
    this.wrapper.innerHTML = '';
    this.wrapper.appendChild(this.menu);
    this.wrapper.style.position = 'relative';

    // Available axis
    this.axis = ['x', 'y'];

    // Default options
    this.options = Object.assign({}, {
      enableXAxis: true,
      enableYAxis: true,
      reverseX: false,
      reverseY: false,
      swayPercentage: 100
    }, options

    // Initialize functionality
    );this.init();
  }

  _createClass(Sway, [{
    key: 'init',
    value: function init() {
      var _self = this;
      // On init, get window height and width for later usage
      this.screen_width = window.innerWidth;
      this.screen_height = window.innerHeight;

      // Set lister to get x & y values and call sway() on event
      window.addEventListener("mousemove", function (event) {
        _self.mouse_x = event.x;
        _self.mouse_y = event.y;
        _self.sway();
      });
    }
  }, {
    key: 'sway',
    value: function sway() {
      // Get both values from each axis
      var x_per = Math.round(this.mouse_x / this.screen_width * 100);
      var y_per = Math.round(this.mouse_y / this.screen_height * 100);

      // Loop through each of the available axis
      this.axis.forEach(function (axis) {
        // Get enableAxis option
        var enableAxis = 'enable' + axis.toUpperCase() + 'Axis';

        // Get reverse option
        var reverse = 'reverse' + axis.toUpperCase();

        // Check if axis is enabled
        if (this.options[enableAxis]) {
          // Get value of current axis
          var this_axis = eval(axis + '_per');
          // Calculate the offset
          var offset = this.options.swayPercentage * 0.01;

          // Check if reverse is enabled
          if (this.options[reverse]) {
            this_axis = this_axis * -1;
          }

          // Apply offset
          this_axis = this_axis * offset;

          // Set style according to current axis
          this.menu.style[axis == 'x' ? 'left' : 'top'] = this_axis + 'px';
        }
      }, this);
    }
  }]);

  return Sway;
}();

exports.default = Sway;
