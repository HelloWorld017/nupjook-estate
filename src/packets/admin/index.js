const PacketAddTime = require('./PacketAddTime');
const PacketAddUser = require('./PacketAddUser');
const PacketBuyBuilding = require('./PacketBuyBuilding');
const PacketGetUsers = require('./PacketGetUsers');
const PacketGetJournals = require('./PacketGetJournals');
const PacketNextRound = require('./PacketNextRound');
const PacketSellBuilding = require('./PacketSellBuilding');
const PacketSetGameState = require('./PacketSetGameState');
const PacketSetMoney = require('./PacketSetMoney');
const PacketSetOwnedBuildings = require('./PacketSetOwnedBuildings');
const PacketSetPrice = require('./PacketSetPrice');

module.exports = [
	PacketAddTime,
	PacketAddUser,
	PacketBuyBuilding,
	PacketGetUsers,
	PacketGetJournals,
	PacketNextRound,
	PacketSellBuilding,
	PacketSetGameState,
	PacketSetMoney,
	PacketSetOwnedBuildings,
	PacketSetPrice
];
