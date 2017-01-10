/**********************************************************
	TSW Roll For Role
	https://github.com/AliceOrwell/TSW-Roll-For-Role/

	Copyright (c) 2017 AliceOrwell
	Released under the MIT license
 **********************************************************/

var tswRollForRole = {
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
    "Flappy Elite": [
      "Main Tank", "Healtank", "DABS", "DABS", "Shadekiller", "DPS", "DPS",
      "DPS", "DPS", "DPS"
    ],
    "Flappy NM": [
      "Tank (Red)", "Tank (Purple)", "Healer", "DABS (Red)", "DABS (Purple)",
      "Shade 1", "Shade 2", "Shade 2", "Backup", "Backup"
    ],
    "NYR Elite": [
      "DPS Tank", "Healtank", "DABS", "DABS", "SF", "SF", "DPS", "DPS",
      "DPS", "DPS"
    ],
    "NYR NM": [
      "Tank (Red)", "Tank (Purple)", "Healer", "Healtank", "Support", "DABS WW1",
      "DABS WW2", "DPS WW1", "DPS WW2", "DPS"
    ],
    "Dungeon": [
      "Tank", "Healer", "DPS", "DPS", "DPS"
    ]
  },
  models: {
    assignments: {
      numPeople: 0,
      numRoles: 0,
      list: []
    },
    assignment: function( subject, object ) {
      this.subject = "UNASSIGNED";
      this.object = "UNASSIGNED";
      this.isAssigned = false;

      if ( object ) {
        this.object = object;
        this.isAssigned = true;
      }
      if ( subject ) {
        this.subject = subject;
        this.isAssigned = true;
      }

      this.toString = function() {
        var output = this.subject + " = " + this.object;
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
    var assignments = [];

    var subjects = roles;
    var objects = people;
    if ( roles.length < people.length ) {
      subjects = people;
      objects = roles;
    }

    for( var i = 0; i < subjects.length; i++ ) {
      var subject = subjects[i];
      var object = false;
      if ( i < objects.length ) {  // If there are objects left to assign
        object = objects[i];
      }

      var ass = new this.models.assignment( subject, object );
      assignments.push( ass );
    }
    return assignments;
  },
  format: function( assignments ) {
    var output = assignments.length + " Assignment(s)";
    if ( assignments.length === 0 ) {
      return output;
    }

    output += ": " + assignments[0].toString();
    for(var i = 1; i < assignments.length; i++) {
      output +=  " -- " + assignments[i].toString();
    }
    return output;
  }
};
