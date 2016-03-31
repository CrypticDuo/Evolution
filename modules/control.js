var Control = function() {
    this.paused = false;
    this.defaultInterval = 1;
    this.land = null;

    var self = this;
    var tooltipHandler = function(e){ self.tooltipHandler(self, e); }

    this.listenOnPlay(tooltipHandler);
    this.listenOnPause(tooltipHandler);
    this.listenOnForward();
    this.listenOnBackward();
}

// TODO: move to util.js
function isWithinCircle(pointX, pointY, circleX, circleY, radius)
{
  return (Math.pow((pointX - circleX), 2) + Math.pow((pointY - circleY), 2)) < Math.pow(radius,2);
}

Control.prototype = {
  init: function(land, interval)
  {
    this.land = land;
    this.interval = interval;
    this.defaultInterval = interval;

    this.updateSpeed();
  },

  pause: function()
  {
    $('.pause').toggleClass('on');
    $('.play').toggleClass('on');
    this.paused = true;
  },

  resume: function()
  {
    $('.pause').toggleClass('on');
    $('.play').toggleClass('on');
    this.paused = false;
  },

  forward: function()
  {
    this.interval /= 2;
    this.interval = this.defaultInterval/this.interval >= 16 ? this.defaultInterval/16 : this.interval;
    this.updateSpeed();
  },

  backward: function()
  {
    this.interval *= 2;
    this.interval = this.defaultInterval/this.interval <= 0.125 ? this.defaultInterval/0.125 : this.interval;
    this.updateSpeed();
  },

  show: function()
  {
    $('.control').show();
  },

  hide: function()
  {
    $('.control').hide();
  },

  updateSpeed: function()
  {
    $('.speed').html(this.defaultInterval / this.interval + "x");
  },

  listenOnPlay: function(tooltipHandler)
  {
    var self = this;

    $(document).on('click', '.play', function(e)
    {
      if(!self.paused)
      {
        self.interval = self.defaultInterval;
        self.updateSpeed();
        return;
      }

      self.resume();
      $('.tooltip').remove();
      $(document).unbind('click', tooltipHandler);
    });
  },

  listenOnPause: function(tooltipHandler)
  {
    var self = this;

    $(document).on('click', '.pause', function(e)
    {
      if(self.paused)
      {
        return;
      }

      self.pause();
      $(document).bind('click', tooltipHandler);
    });
  },

  listenOnForward: function()
  {
    var self = this;

    $(document).on('click', '.forward', function(e)
    {
      if(self.paused)
      {
        return;
      }

      self.forward();
    });
  },

  listenOnBackward: function()
  {
    var self = this;

    $(document).on('click', '.backward', function(e)
    {
      if(self.paused)
      {
        return;
      }

      self.backward();
    });
  },

  tooltipHandler: function(self, e)
  {
    $('.tooltip').remove();
    for(var i = 0; i < self.land.population.length; i++)
    {
      var organism = self.land.population[i];
      if (isWithinCircle(e.pageX - 9,
                         e.pageY - 9,
                         organism.location.x,
                         organism.location.y,
                         organism.radius))
      {
        var tooltip = new Tooltip();
        tooltip.show(organism);
      }
    }
  }
}
