const PacketAddTime = require('./PacketAddTime');
const PacketAddUser = require('./PacketAddUser');
const PacketBuyBuilding = require('./PacketBuyBuilding');
const PacketGetUsers = require('./PacketGetUsers');
const PacketNextRound = require('./PacketNextRound');
const PacketSellBuilding = require('./PacketSellBuilding');
const PacketSetMoney = require('./PacketSetMoney');
const PacketSetOwnedBuildings = require('./PacketSetOwnedBuildings');
const PacketSetPrice = require('./PacketSetPrice');
const PacketStartGame = require('./PacketStartGame');

module.exports = [
	PacketAddTime,
	PacketAddUser,
	PacketBuyBuilding,
	PacketGetUsers,
	PacketNextRound,
	PacketSellBuilding,
	PacketSetMoney,
	PacketSetOwnedBuildings,
	PacketSetPrice,
	PacketStartGame
];
