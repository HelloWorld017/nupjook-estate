class Building {
	constructor(game, {uid, id, name, type, price, group, position}) {
		this.game = game;
		this.uid = uid;
		this.id = id;
		this.name = name;
		this.type = type;
		this.price = price;
		this.lastPrice = null;
		this.initialPrice = price;
		this.group = group;
		this.owner = null;
		this.position = position;
	}

	get buildingData() {
		return {
			uid: this.uid,
			id: this.id,
			name: this.name,
			type: this.type,
			price: this.price,
			lastPrice: this.lastPrice,
			initialPrice: this.initialPrice,
			group: this.group,
			owner: this.owner,
			position: this.position
		}
	}
}

module.exports = Building;
