/*

| s /) <-- assume arc
|  /   )
| /     )
|-- a ---------> direction of organism
| \     )
|  \   )
| s \)
^
^---- perpendicular line relative to organism direction

a = angle
s = sideAngle
*/

function Vision(organism, range, angle){
  this.organism = organism;
  this.range = range;
  this.angle = angle;

  // default
  this.sideAngle = ((180 - angle) / 2) / 180 * Math.PI;
  this.startBound = 1.5 * Math.PI;
  this.endBound = 0.5 * Math.PI;
}

Vision.prototype = {
  draw: function(ctx)
  {
    var x = this.organism.location.x;
    var y = this.organism.location.y;
    var radius = this.organism.vision.range;

    var angleOfDirection = this.organism.getAngleOfDirection();

    // relative to perpendicular line bound
    var arcStartingAngle = this.startBound + angleOfDirection + this.sideAngle;
    var arcEndingAngle = this.endBound + angleOfDirection - this.sideAngle;

    var arcStartingPoint_x = x + radius * Math.cos(arcStartingAngle);
    var arcStartingPoint_y = y + radius * Math.sin(arcStartingAngle);
    var arcEndingPoint_x = x + radius * Math.cos(arcEndingAngle);
    var arcEndingPoint_y = y + radius * Math.sin(arcEndingAngle);

    ctx.strokeStyle = '#f3f3f3';

    // draw arc
    ctx.beginPath();
    ctx.arc(x, y, radius, arcStartingAngle, arcEndingAngle);
    ctx.stroke();

    // draw start of arc line
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(arcStartingPoint_x, arcStartingPoint_y);
    ctx.stroke();

    // draw end of arc line
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(arcEndingPoint_x, arcEndingPoint_y);
    ctx.stroke();
  },

  getRange: function()
  {
    return this.range;
  },

  isWithinVision: function(organism)
  {
    var diffBetweenOrganisms = organism.location.copy().sub(this.organism.location);
    var angleRelativeToThis = diffBetweenOrganisms.angle();

    var angleOfDirection = this.organism.getAngleOfDirection();
    var angleRad = this.angle * Math.PI / 180;

    var startingAngle = angleOfDirection - angleRad / 2;
    var endingAngle = angleOfDirection + angleRad / 2;

    var distanceBetweenOrganisms = this.organism.location.dist(organism.location);

    // Within range
    if(this.range >= distanceBetweenOrganisms) {
      // Within angle
      if(angleRelativeToThis > startingAngle
        && angleRelativeToThis < endingAngle) {
        return true;
      }
    }

    return false;
  }
}
