var Debug = function()
{
  this.debugMode = true;
  this.statsInterval = null;

  var self = this;

  $("html").click(function()
  {
    self.debugMode = !self.debugMode;

    if(self.debugMode)
    {
      self.Start();
    }
    else
    {
      self.Stop();
    }
  });
};

// Might be necessary if we want to build more functionality to Debug class
Debug.prototype = {
  Start: function(population)
  {
    Stats.show(population);
    this.statsInterval = setInterval(function(){ Stats.show(population); }, 1000);
  },

  Stop: function()
  {
    Stats.hide();
    clearInterval(this.statsInterval);
  },

  IsDebugMode: function()
  {
    return this.debugMode;
  }
}

var debug = new Debug();
