/**********************************************************
	TSW Roll For Role
	https://github.com/AliceOrwell/TSW-Roll-For-Role/

	Copyright (c) 2017 AliceOrwell
	Released under the MIT license
 **********************************************************/

var rolePresets = {
  "Custom": [],
  "Eidolon Elite": [
    "Main Tank", "Off Tank", "Healer", "DABS", "DABS", "DPS", "DPS", "DPS", "DPS"
  ],
  "Flappy NM": [
    "Tank (Red)", "Tank (Purple)", "Healer", "DABS (Red)", "DABS (Purple)",
    "Shade 1", "Shade 2", "Shade 2", "Backup"
  ],
  "NYR Elite": [
    "DPS Tank", "Healtank", "DABS", "DABS", "SF", "SF", "DPS", "DPS", "DPS"
  ]
};


var assignment = function( subject, object ) {
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
    var output = this.subject + " := " + this.object;
    return output;
  }

  return this;
};

var tswRollForRole = {
  roleExtracter: function( roles ) {
    if ( roles == "" ) {
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

      var ass = new assignment( subject, object );
      assignments.push( ass );
    }
    return assignments;
  },
  roleData: function( preset ) {
    if ( rolePresets.hasOwnProperty(preset) ) {
      var p = rolePresets[preset];
      p = p.toString()
      p = p.split(',').join('\n');  // Replace all commas for newlines
      return p;
    }
    return "";
  },
  format: function( assignments ) {
    var output = assignments.length + " Assignment(s)";
    if ( assignments.length == 0 ) {
      return output;
    }

    output += " -- " + assignments[0].toString();
    for(var i = 1; i < assignments.length; i++) {
      output +=  " :: " + assignments[i].toString();
    }
    return output;
  }
};
