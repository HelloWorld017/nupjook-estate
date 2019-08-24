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
		const executeOne = (targets, type, change) => {
			targets.forEach(buildingUid => {
				switch(type) {
					case 'normal':
						const changeAmount = this.game.buildings[buildingUid].initialPrice === 4000 ? 400 : 300;
						this.game.buildings[buildingUid].price += change * changeAmount;
						break;

					case 'multiplier':
						this.game.buildings[buildingUid].price *= change;
						break;

					case 'fixed':
						this.game.buildings[buildingUid].price = change;
						break;

					case 'all':
						change.forEach(changeObject => {
							executeOne(changeObject.targets, changeObject.type, changeObject.change);
						});
				}
			});
		};

		executeOne(this.targets, this.type, this.change);
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
