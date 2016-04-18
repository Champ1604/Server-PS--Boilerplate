function getIdOfText(value) {
	return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}
exports.getDamage = getDamage = function(move, pokeName, targetName, pokeAppropriateAttack, pokeLevel, targetAppropriateDef, weather, pokeAbility, targetHasFurCoat, pokeCritStage) {
	var moves = require("../data/moves.js").BattleMovedex;
	var base = moves[move].basePower;
	var dex = require("../data/pokedex.js").BattlePokedex;
	if (targetHasFurCoat) {
		targetAppropriateDef = targetAppropriateDef * 2;
	}
	Array.prototype.getIdOfText = function() {
		return getIdOfText(this.join("19088i3ho9iuhfiefjbmwijl3ihr93y8oueyfhjwe8io")).split("19088i3ho9iuhfiefjbmwijl3ihr93y8oueyfhjwe8io");
	};
	function getModifiers(moveType, moveName, weather, critStage, hasAdaptability, pokeType, targetType, pokeType2, targetType2) {
		// Type effectiveness object
		var typeChart = {
			"bug": {
				"weak": ['fire', 'flying', 'rock'],
				"resistant": ['fighting', 'grass', 'ground'],
				"immune": []
			},
			"normal": {
				"weak": ['fighting'],
				"resistant": [],
				"immune": ['ghost']
			},
			"fire": {
				"weak": ['rock', 'ground', 'water'],
				"resistant": ['bug', 'fairy', 'fire', 'grass', 'ice', 'steel'],
				"immune": []
			},
			"water": {
				"weak": ['electric', 'grass'],
				"resistant": ['fire', 'ice', 'steel', 'water'],
				"immune": []
			},
			"electric": {
				"weak": ['ground'],
				"resistant": ['electric', 'flying', 'steel'],
				"immune": []
			},
			"grass": {
				"weak": ['bug', 'fire', 'flying', 'ice', 'poison'],
				"resistant": ['electric', 'grass', 'ground', 'water'],
				"immune": []
			},
			"ice": {
				"weak": ['fighting', 'fire', 'rock', 'steel'],
				"resistant": ['ice'],
				"immune": []
			},
			"fighting": {
				"weak": ['fairy', 'flying', 'psychic'],
				"resistant": ['bug', 'dark', 'rock'],
				"immune": []
			},
			"poison": {
				"weak": ['ground', 'psychic'],
				"resistant": ['bug', 'fairy', 'fighting', 'grass', 'poison'],
				"immune": []
			},
			"ground": {
				"weak": ['grass', 'ice', 'water'],
				"resistant": ['poison', 'rock'],
				"immune": ['electric']
			},
			"flying": {
				"weak": ['electric', 'ice', 'rock'],
				"resistant": ['bug', 'fighting', 'grass'],
				"immune": ['ground']
			},
			"psychic": {
				"weak": ['bug', 'dark', 'ghost'],
				"resistant": ['fighting', 'psychic'],
				"immune": []
			},
			"rock": {
				"weak": ['fighting', 'grass', 'ground', 'steel', 'water'],
				"resistant": ['fire', 'flying', 'normal', 'poison'],
				"immune": []
			},
			"ghost": {
				"weak": ['dark', 'ghost'],
				"resistant": ['bug', 'poison'],
				"immune": ['fighting', 'normal']
			},
			"dragon": {
				"weak": ['dragon', 'fairy', 'ice'],
				"resistant": ['electric', 'fire', 'grass', 'water'],
				"immune": []
			},
			"dark": {
				"weak": ['bug', 'fairy', 'fighting'],
				"resistant": ['dark', 'ghost'],
				"immune": ['psychic']
			},
			"steel": {
				"weak": ['fighting', 'fire', 'ground'],
				"resistant": ['bug', 'dragon', 'fairy', 'flying', 'grass', 'ice', 'normal', 'psychic', 'rock', 'steel'],
				"immune": ['poison']
			},
			"fairy": {
				"weak": ['poison', 'steel'],
				"resistant": ['bug', 'dark', 'fighting'],
				"immune": ['dragon']
			}
		};
		// Check if array includes item (In my experience, Node.js does not support indexOf on arrays or Array.prototype.includes)
		Array.prototype.includes = function(elem) {
			for (var i = 0; i < this.length; i++) {
				if (this[i] === elem) return true;
			}
			return false;
		};
		// Get modifier for type effectiveness
		function getEffectiveness(type1, type2, type3) {
			var effect = 0;
			if (typeChart[type2].weak.includes(type1)) effect += 2;
			if (typeChart[type2].resistant.includes(type1)) effect -= 2;
			if (type3) {
				if (typeChart[type3].weak.includes(type1)) effect += 2;
				if (typeChart[type3].resistant.includes(type1)) effect -= 2;
			}
			if (effect === 0) effect = 1;
			if (type3) {
				if (typeChart[type3].immune.includes(type1)) effect = 0;
			}
			if (typeChart[type2].immune.includes(type1)) effect = 0;
			return effect;
		}
		var rand = Math.floor((Math.random() * 0.15 + 0.85) * 100) / 100;
		// Different probability for different crit stages
		switch (critStage) {
			case "0":
				if (Math.floor(Math.random() * 16) + 1 === 1) {
					var crit = 1.5;
				}
				else {
					var crit = 1;
				}
				break;
			case "1":
				if (Math.floor(Math.random() * 8) + 1 === 1) {
					var crit = 1.5;
				}
				else {
					var crit = 1
				}
				break;
			case "2":
				if ((Math.floor(Math.random() * 2)) + 1 === 2) {
					var crit = 1.5
				}
				else {
					var crit = 1
				}
				break;
			case "3":
				var crit = 1.5
				break;
			default:
				var crit = 1
				break;
		}
		switch (weather) {
			case "rain":
				if (moveType === "water") var weath = 1.5
				if (moveType === "fire") var weath = 0.5
				break;
			case "heavyrain":
				if (moveType === "fire") var weath = 0
				if (moveType === "water") var weath = 1.5
				break;
			case "harshsun":
				if (moveType === "fire") var weath = 1.5
				if (moveType === "water") var weath = 0.5
				break;
			case "extremesun":
				if (moveType === "fire") var weath = 1.5
				if (moveType === "water") var weath = 0
			case "hail":
				if (moveName === "solarbeam") var weath = 0.5
				break;
			case "strongwinds":
				if (getEffectiveness(moveType, "flying") > 1) var weath = 0.5
				break;
		}
		if (weath === undefined) {
			// Default weather modifier to 1 (Can't check if weather is falsey because it could be 0 in some cases)
			weath = 1;
		}
		if (pokeType === moveType || pokeType2 === moveType) {
			// STAB (Same Type Attack Bonus)
			if (hasAdaptability) {
				var stab = 2;
			}
			else {
				var stab = 1.5;
			}
		}
		else {
			var stab = 1
		}
		return stab * crit * weath * getEffectiveness(moveType, targetType, targetType2) * rand;
	}
	// Check and account for absence of second types
	if (dex[targetName].types.length > 1 && dex[pokeName].types.length > 1) {
		return ((2 * pokeLevel + 10) / 250 * (pokeAppropriateAttack / targetAppropriateDef) * base + 2) * getModifiers(getIdOfText(moves[move].type), moves[move].id, weather, pokeCritStage, pokeAbility === "adaptability", getIdOfText(dex[pokeName].types[0]), getIdOfText(dex[targetName].types[0]), getIdOfText(dex[pokeName].types[1]), getIdOfText(dex[targetName].types[1]))
	}
	else {
		if (dex[targetName].types.length === 1 && dex[pokeName].types.length === 1) {
			return ((2 * pokeLevel + 10) / 250 * (pokeAppropriateAttack / targetAppropriateDef) * base + 2) * getModifiers(getIdOfText(moves[move].type), moves[move].id, weather, pokeCritStage, pokeAbility === "adaptability", getIdOfText(dex[pokeName].types[0]), getIdOfText(dex[targetName].types[0]))
		}
		else {
			if (dex[pokeName].types.length === 1) {
				return ((2 * pokeLevel + 10) / 250 * (pokeAppropriateAttack / targetAppropriateDef) * base + 2) * getModifiers(getIdOfText(moves[move].type), moves[move].id, weather, pokeCritStage, pokeAbility === "adaptability", getIdOfText(dex[pokeName].types[0]), getIdOfText(dex[targetName].types[0]), undefined, getIdOfText(dex[targetName].types[1]))
			}
			else {
				return ((2 * pokeLevel + 10) / 250 * (pokeAppropriateAttack / targetAppropriateDef) * base + 2) * getModifiers(getIdOfText(moves[move].type), moves[move].id, weather, pokeCritStage, pokeAbility === "adaptability", getIdOfText(dex[pokeName].types[0]), getIdOfText(dex[targetName].types[0]), getIdOfText(dex[pokeName].types[1]))
			}
		}
	}
}
// SYNTAX: getDamage(moveName, attackerName, targetName, attackerAppropriateAttack, attackerLevel, targetAppropriateDefense, weather, attackerAbility, targetHasFurCoat, attackerCritStage)
