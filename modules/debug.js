var KeyCode = {
  DEBUG : 68, // 'D'
  PAUSE : 80  // 'P'
}
var Debug = function()
{
  this.population = null;
  this.debugMode = false;
  this.paused = false;
  this.statsInterval = null;

  var self = this;

  $(document).bind("keyup", function(e)
  {
    if(e.shiftKey && e.keyCode == KeyCode.DEBUG)
    {
      self.debugMode = !self.debugMode;

      (self.debugMode) ? self.Start() : self.Stop();
    }

    if(e.shiftKey && e.keyCode == KeyCode.PAUSE)
    {
      self.paused = !self.paused;

      (self.paused) ? self.Paused() : self.Resume();
    }
  });
};

// Might be necessary if we want to build more functionality to Debug class
Debug.prototype = {
  Init: function(population)
  {
    this.population = population;
  },

  Start: function()
  {
    var self = this;
    Stats.show(self.population);
    this.statsInterval = setInterval(function(){ Stats.show(self.population); }, 1000);
  },

  Stop: function()
  {
    Stats.hide();
    clearInterval(this.statsInterval);
  },

  Paused: function()
  {
    $('.overlay')
      .show()
      .fadeOut(1200);

  },

  Resume: function()
  {
    $('.overlay')
      .stop(true, true)
      .hide();
  },

  IsPaused: function()
  {
    return this.paused;
  },

  IsDebugMode: function()
  {
    return this.debugMode;
  }
}

var debug = new Debug();
