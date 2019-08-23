class Event {
	constructor(game, {eventId, content, targets, type, change, round, tags}) {
		this.game = game;

		this.eventId = eventId;
		this.content = content;
		this.targets = targets;
		this.type = type;
		this.change = change;
		this.round = round;
		this.tags = tags;
	}

	execute() {
		this.targets.forEach(buildingUid => {
			switch(this.type) {
				case 'normal':
					const changeAmount = this.game.buildings[buildingUid].initialPrice === 4000 ? 400 : 300;
					this.game.buildings[buildingUid].price += this.change * changeAmount;
					break;

				case 'multiplier':
					this.game.buildings[buildingUid].price *= this.change;
					break;

				case 'fixed':
					this.game.buildings[buildingUid].price = this.change;
					break;
			}
		});
	}

	get eventData() {
		return {
			eventId: this.eventId,
			content: this.content,
			targets: this.targets,
			type: this.type,
			change: this.change,
			round: this.round,
			tags: this.tags
		};
	}
}

module.exports = Event;
