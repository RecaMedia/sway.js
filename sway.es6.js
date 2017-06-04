class Sway {

  constructor(element, options = null) {
    // Get and wrap element, also set necessary styles
    this.wrapper = document.getElementById(element);
    this.menu = document.createElement("div");
    this.wrapper.childNodes.forEach(function(child){
      this.menu.appendChild(child);
    }, this);
    this.menu.style.position = 'absolute';
    this.wrapper.innerHTML = '';
    this.wrapper.appendChild(this.menu);
    this.wrapper.style.position = 'relative';

    // Available axis
    this.axis = ['x','y'];

    // Default options
    this.options = Object.assign({}, {
      enableXAxis: true,
      enableYAxis: true,
      reverseX: false,
      reverseY: false,
      swayPercentage: 100
    },options)

    // Initialize functionality
    this.init();
  }

  init() {
    var _self = this;
    // On init, get window height and width for later usage
    this.screen_width = window.innerWidth;
    this.screen_height = window.innerHeight;

    // Set lister to get x & y values and call sway() on event
    window.addEventListener("mousemove", function(event){
      _self.mouse_x = event.x;
      _self.mouse_y = event.y;
      _self.sway();
    });
  }

  sway() {
    // Get both values from each axis
    let x_per = Math.round((this.mouse_x / this.screen_width) * 100);
    let y_per = Math.round((this.mouse_y / this.screen_height) * 100);

    // Loop through each of the available axis
    this.axis.forEach(function(axis) {
      // Get enableAxis option
      let enableAxis = 'enable' + axis.toUpperCase() + 'Axis';

      // Get reverse option
      let reverse = 'reverse' + axis.toUpperCase();
      
      // Check if axis is enabled
      if (this.options[enableAxis]) {
        // Get value of current axis
        let this_axis = eval(axis + '_per');
        // Calculate the offset
        let offset = this.options.swayPercentage * 0.01;

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
}

export default Sway;