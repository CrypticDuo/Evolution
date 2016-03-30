var KeyCode = {
  DEBUG : 68, // 'D'
  PAUSE : 80  // 'P'
}
var Debug = function()
{
  this.land = null;
  this.debugMode = false;
  this.statsInterval = null;
  this.control = new Control();

  var self = this;

  $(document).bind("keyup", function(e)
  {
    self.handleDebugMode(e);
  });
};

// Might be necessary if we want to build more functionality to Debug class
Debug.prototype = {
  init: function(land, interval)
  {
    this.control.init(land, interval);
    this.land = land;
  },

  start: function()
  {
    var self = this;
    Stats.show(self.land.population);
    this.control.show();
    this.statsInterval = setInterval(function(){ Stats.show(self.land.population); }, 1000);
  },

  stop: function()
  {
    Stats.hide();
    this.control.hide();
    clearInterval(this.statsInterval);
  },

  handleDebugMode: function(e)
  {
    if (e.shiftKey && e.keyCode == KeyCode.DEBUG)
    {
      this.debugMode = !this.debugMode;

      (this.debugMode) ? this.start() : this.stop();

      this.land.draw();
    }
  },

  isPaused: function()
  {
    return this.control.paused;
  },

  isDebugMode: function()
  {
    return this.debugMode;
  },

  getInterval: function()
  {
    return this.control.interval;
  }
}

var debug = new Debug();
