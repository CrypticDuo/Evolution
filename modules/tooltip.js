function Tooltip()
{
	this.div = document.createElement("div");
}

Tooltip.prototype = {
	show: function(organism)
	{
		this.render(organism);

	},

	render: function(organism)
	{
		$(this.div).empty();

		this.div.style.left = organism.location.x + organism.radius;
		this.div.style.top = organism.location.y + organism.radius;
		this.div.setAttribute('class', 'tooltip');

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

		this.div.appendChild(table);
		document.body.appendChild(this.div);
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