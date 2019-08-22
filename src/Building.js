class Building {
	constructor(game, {uid, id, name, type, price, group}) {
		this.game = game;
		this.uid = uid;
		this.id = id;
		this.name = name;
		this.type = type;
		this.price = price;
		this.initialPrice = price;
		this.group = group;
		this.owner = null;
	}

	get buildingData() {
		return {
			uid: this.uid,
			id: this.id,
			name: this.name,
			type: this.type,
			price: this.price,
			initialPrice: this.initialPrice,
			group: this.group,
			owner: this.owner
		}
	}
}

module.exports = Building;
