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
				this.game.buildings[buildingUid].owner
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

		buildings.forEach(buildingUid => {
			this.game.buildings[buildingUid].owner = userUid;
		});

		user.buildings = buildings;

		this.game.addJournal(
			'admin.setOwnedBuildings',
			{
				userUid, buildings
			}
		);
		user.notifyUpdate();

		return {
			ok: true
		};
	}

	static get name() {
		return "setOwnedBuildings";
	}
}

module.exports = PacketSetOwnedBuildings;
