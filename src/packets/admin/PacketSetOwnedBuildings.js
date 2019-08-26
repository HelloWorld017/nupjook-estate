const AdminPacket = require('./AdminPacket');

class PacketSetOwnedBuildings extends AdminPacket {
	doHandle({userUid, buildings}) {
		const user = this.game.users[userUid];
		if(!user || !user.uid) return {
			ok: false,
			reason: "No such user"
		};

		let failingBuilding;
		const canSet = buildings.every(buildingUid => {
			if(
				!this.game.buildings[buildingUid] ||
				!this.game.buildings[buildingUid].uid ||
				(
					this.game.buildings[buildingUid].owner &&
					this.game.buildings[buildingUid].owner !== userUid
				)
			) {
				failingBuilding = buildingUid;
				return false;
			}

			return true;
		});

		if(!canSet) {
			return {
				ok: false,
				reason: `Building ${failingBuilding} already has owner or doesn't exists.`
			};
		}

		const updatedBuildings = [];

		buildings.forEach(buildingUid => {
			updatedBuildings.push(buildingUid);
			this.game.buildings[buildingUid].owner = userUid;
		});

		user.buildings.forEach(buildingUid => {
			updatedBuildings.push(buildingUid);
			this.game.buildings[buildingUid].owner = null;
		});

		const uniqueUpdatedBuildings = updatedBuildings.filter((item, index, array) => array.indexOf(item) === index);
		user.buildings = buildings;

		this.game.addJournal(
			'admin.setOwnedBuildings',
			{
				userUid, buildings
			}
		);
		user.notifyUpdate();
		uniqueUpdatedBuildings.forEach(buildingUid => {
			this.game.broadcastPacket('building.update', {building: this.game.buildings[buildingUid].buildingData});
		});

		return {
			ok: true
		};
	}

	static get name() {
		return "setOwnedBuildings";
	}
}

module.exports = PacketSetOwnedBuildings;
