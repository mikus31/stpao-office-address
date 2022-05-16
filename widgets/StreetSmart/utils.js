define(["esri/SpatialReference","esri/geometry/Point"],function(SpatialReference,Point){"use strict";return{proj4:null,DEG_TO_RAD:Math.PI/180,RAD_TO_DEG:180/Math.PI,toRadians:function toRadians(deg){return deg*this.DEG_TO_RAD},toDegrees:function toDegrees(rad){return rad*this.RAD_TO_DEG},setProj4:function setProj4(proj4){this.proj4=proj4},/**
         * transform a point with Proj4js
         * (use this function if no serverside transformation is needed (for a point)
         * If source srs is the same as target srs ignore transformation
         * @param sourceGeom point to transform
         * @param targetSrs srs to transform the point to
         * @returns {Point} the (original) transformed point
         */transformProj4js:function transformProj4js(sourceGeom,targetSrs,backupSRS){//NB: Only works with points.
//No transformation needed if source SRS == target SRS
if(sourceGeom.spatialReference.wkid===targetSrs){//this will return a new saved measurement
return sourceGeom}else if(sourceGeom.spatialReference.wkid===backupSRS){//GC: added a backup SRS for the latestWkid
//this will return a new saved measurement
return sourceGeom}var sourceEpsg="EPSG:"+sourceGeom.spatialReference.wkid;var destEpsg="EPSG:"+targetSrs;if(sourceEpsg==="EPSG:102100"){sourceEpsg="EPSG:3857"}if(destEpsg==="EPSG:102100"){destEpsg="EPSG:3857"}var source=this.proj4(sourceEpsg);//var dest = this.proj4(destEpsg);
//GC: looks for an error exception if the proj4 function cannot find the destination projection
//if error is caught, then the destination projection is the same as the source projection
try{var dest=this.proj4(destEpsg)}catch(err){//var dest = source;
alert("Editable layer SRS (Spatial Reference System) does not match Street Smart SRS: Please make them match to save measurements.");var dest=this.proj4(destEpsg)}var p=this.proj4(source,dest).forward([sourceGeom.x,sourceGeom.y]);//this will NOT return a new saved measurement
return new Point(p[0],p[1],new SpatialReference({wkid:parseInt(targetSrs)}))}}});