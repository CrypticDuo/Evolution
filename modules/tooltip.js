function Tooltip(){}

Tooltip.prototype = {
  show: function(organism)
  {
    div = document.createElement("div");
    $(div).empty();

    div.style.left = organism.location.x + organism.radius;
    div.style.top = organism.location.y + organism.radius;
    div.setAttribute('class', 'tooltip');

    var table = document.createElement("table");

    table.appendChild(this.createRow('organism', "# " + organism.ID));
    table.appendChild(this.createRow('generation', organism.generation));
    table.appendChild(
      this.createRow(
        'velocity',
        Stats.roundToDecimal(organism.velocity.mag(), 3)));
    table.appendChild(
      this.createRow('energy',
        Stats.roundToDecimal(organism.energy, 0)));
    table.appendChild(
      this.createRow('mass',
        Stats.roundToDecimal(organism.mass, 3)));

    div.appendChild(table);
    document.body.appendChild(div);
  },

  createRow: function(labelText, valueText)
  {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var label = document.createElement("label");
    var value = document.createElement("value");

    label.innerHTML = labelText;
    value.innerHTML = valueText;

    tr.appendChild(td);
    td.appendChild(label);
    td.appendChild(value);
    return tr;
  }
}