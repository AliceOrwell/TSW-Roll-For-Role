/**********************************************************
	TSW Roll For Role
	https://github.com/AliceOrwell/TSW-Roll-For-Role/

	Copyright (c) 2017 AliceOrwell
	Released under the MIT license
 **********************************************************/

var tswRollForRole = {
	settings: {
		roleSeperator: ": ",
		assignSeperator: " -- "
	},
	rolePresets: {
		"Custom": [],
		"Eidolon Elite": [
			"Main Tank", "Off Tank", "Healer", "DABS", "DABS", "DPS", "DPS", "DPS",
			"DPS", "DPS"
		],
		"Eidolon NM": [
			"Tank", "Healer", "DABS", "DABS", "Shield DPS", "DPS", "DPS", "DPS",
			"DPS", "DPS"
		],
		"Eidolon NM Alt": [
			"Tank & Shot Caller", "Healer", "DABS", "DABS", "DPS/Off Tank", "Blue DPS SF",
			"Blue DPS", "Red DPS", "Red DPS", "DPS/Backup Leech"
		],
		"Flappy Elite": [
			"Main Tank", "Healtank", "DABS", "DABS", "Shadekiller", "DPS", "DPS",
			"DPS", "DPS", "DPS"
		],
		"Flappy NM": [
			"Tank (Red)", "Tank (Purple)", "Healer", "DABS (Red)", "DABS (Purple)",
			"Shade 1", "Shade 2", "Shade 2", "Backup", "Backup"
		],
		"Flappy NM Alt": [
			"Tank (Purple) & Shot Caller", "DPS w SF/Off Tank (Red)", "Healer w SF/Healer",
			"DABS (Red)", "DABS (Purple)", "Shade 1", "Shade 2", "DPS w Ice Mani+OV", "DPS w Ice Mani+OV",
			"DPS w SF/DPS"
		],
		"NYR Elite": [
			"DPS Tank", "Healtank", "DABS", "DABS", "SF", "SF", "DPS", "DPS",
			"DPS", "DPS"
		],
		"NYR NM (old)": [
			"Tank (Red)", "Tank (Purple)", "Healer", "Healtank", "Support", "DABS WW1",
			"DABS WW2", "DPS WW1", "DPS WW2", "DPS"
		],
		"NYR NM": [
			"Tank (Red)", "Tank (Purple)", "Healer", "Placeholder", "DPS (Mid range) - DABS",
			"DPS (Mid range) - DABS", "DPS (Mid range)", "DPS (Mid range)", "DPS (Close range)", 
			"DPS (Close range)"
		],
		"Dungeon": [
			"Tank", "Healer", "DPS", "DPS", "DPS"
		]
	},
	models: {
		assignments: function () {
			this.numPeople = 0;
			this.numRoles =  0;
			this.list = [];
			this.toString = function() {
				var roles = this.numRoles;
				var people = this.numPeople;

				// Add Role count
				var output = roles + " Role";
				if ( roles != 1 ) {
					output += "s";
				}
				output += ", ";

				// Add People count
				output += people + " ";
				if ( people === 1 ) {
					output += "Person";
				}
				else {
					output += "People";
				}

				if ( roles === 0  || people === 0 ) {
					return output;
				}

				output += " :: " + this.list[0].toString();
				var sep = tswRollForRole.settings.assignSeperator;
				for(var i = 1; i < this.list.length; i++) {
					output +=  sep + this.list[i].toString();
				}

				return output;
			};
		},
		assignment: function( role, person ) {
			this.role = "UNASSIGNED";
			this.person = "UNASSIGNED";
			this.isRoleAssigned = false;
			this.isPersonAssigned = false;
			this.isAssigned = function() {
				return ( this.isRoleAssigned || this.isPersonAssigned );
			};

			if ( role ) {
				this.role = role;
				this.isRoleAssigned = true;
			}
			if ( person ) {
				this.person = person;
				this.isPersonAssigned = true;
			}

			this.toString = function() {
				var sep = tswRollForRole.settings.roleSeperator;
				var output = this.role + sep + this.person;
				if ( !this.isRoleAssigned ) {
					output = this.person + sep + this.role;
				}
				return output;
			};

			return this;
		}
	},
	roleData: function( preset ) {
		if ( this.rolePresets.hasOwnProperty(preset) ) {
			var p = this.rolePresets[preset];
			p = p.toString();
			p = p.split(',').join('\n');  // Replace all commas for newlines
			return p;
		}
		return "";
	},
	roleExtracter: function( roles ) {
		if ( roles === "" ) {
			return [];
		}
		return roles.split( '\n' );
	},
	assigner: function ( roles, people ) {
		var assignments = new this.models.assignments();
		assignments.numRoles = roles.length;
		assignments.numPeople = people.length;

		for( var i = 0; i < roles.length; i++ ) {
			var role = roles[i];
			var person = false;
			if ( i < people.length ) {  // If there are objects left to assign
				person = people[i];
			}

			var a = new this.models.assignment( role, person );
			assignments.list.push( a );
		}
		return assignments;
	},
	format: function( assignments ) {
		return assignments.toString();
	}
};
