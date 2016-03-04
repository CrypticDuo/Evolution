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

a = max_angle
s = side_angle
*/

function Vision(organism, range, max_angle){
  this.organism = organism;
  this.range = range;
  this.max_angle = max_angle;

  // default
  this.side_angle = ((180 - max_angle) / 2) / 180 * Math.PI;
  this.start_bound = 1.5 * Math.PI;
  this.end_bound = 0.5 * Math.PI;
}

Vision.prototype = {
  draw: function(ctx){
    var x = this.organism.location.x;
    var y = this.organism.location.y;
    var radius = this.organism.vision.range;

    var angleOfDirection = this.organism.getAngleOfDirection();

    // relative to perpendicular line bound
    var arc_starting_angle = this.start_bound + angleOfDirection + this.side_angle;
    var arc_ending_angle = this.end_bound + angleOfDirection - this.side_angle;

    var arc_starting_point_x = x + radius * Math.cos(arc_starting_angle);
    var arc_starting_point_y = y + radius * Math.sin(arc_starting_angle);
    var arc_ending_point_x = x + radius * Math.cos(arc_ending_angle);
    var arc_ending_point_y = y + radius * Math.sin(arc_ending_angle);

    ctx.strokeStyle = '#f3f3f3';

    // draw arc
    ctx.beginPath();
    ctx.arc(x, y, radius, arc_starting_angle, arc_ending_angle);
    ctx.stroke();

    // draw start of arc line
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(arc_starting_point_x, arc_starting_point_y);
    ctx.stroke();

    // draw end of arc line
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(arc_ending_point_x, arc_ending_point_y);
    ctx.stroke();
  },

  isWithinVision: function(organism)
  {
    var diffBetweenOrganisms = organism.location.copy().sub(this.organism.location);
    var angleRelativeToThis = diffBetweenOrganisms.angle();

    var angleOfDirection = this.organism.getAngleOfDirection();
    var maxAngleRad = this.max_angle * Math.PI / 180;

    var startingAngle = angleOfDirection - maxAngleRad / 2;
    var endingAngle = angleOfDirection + maxAngleRad / 2;

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
