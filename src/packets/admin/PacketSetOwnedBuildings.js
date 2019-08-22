const AdminPacket = require('./AdminPacket');

class PacketSetOwnedBuildings extends AdminPacket {
	doHandle({userUid, buildings}) {
		const user = this.game.users[userUid];
		if(!user) return {
			ok: false,
			reason: "No such user"
		};

		let failingBuilding;
		const canSet = buildings.every(buildingUid => {
			if(
				!this.game.buildings[buildingUid] ||
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

		user.buildings = buildings;

		this.game.addJournal(
			'admin.setOwnedBuildings',
			{
				userUid, buildings
			}
		);

		return {
			ok: true
		};
	}

	static get name() {
		return "setOwnedBuildings";
	}
}

module.exports = PacketSetOwnedBuildings;
