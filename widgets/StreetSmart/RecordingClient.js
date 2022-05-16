function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}define([],function(){return function(){function RecordingClient(_ref){var config=_ref.config,apiKey=_ref.apiKey,map=_ref.map;_classCallCheck(this,RecordingClient);this.config=config;this.apiKey=apiKey;this.map=map;this._wfsClient=this._constructWfsClient()}RecordingClient.prototype._constructWfsClient=function _constructWfsClient(){var _config=this.config,token=_config.token,atlasHost=_config.atlasHost;if(!atlasHost){alert('Street Smart: atlasHost not configured!')}var authHeader={Authorization:'Basic '+token};return new CM.aperture.WfsRecordingClient({uriManager:new CM.aperture.WfsRecordingUriManager({apiKey:this.apiKey,dataUri:atlasHost+'/recording/wfs',withCredentials:true}),authHeaders:authHeader})};RecordingClient.prototype.load=function load(timeTravel){//GC: created an additional function that includes the options variable to show the dates of the recording if time travel was activated
if(timeTravel){var now=timeTravel;var date2='31';//Makes the end date 28 if the end month is February
if(now.getMonth()+1===1){date2='28'}//Makes the end date 30 if the end month is April, June, September, or November
if(now.getMonth()+1===3||now.getMonth()+1===5||now.getMonth()+1===8||now.getMonth()+1===10){date2='30'}//separate start and end dates by three months
var month1=now.getMonth();var month2=now.getMonth()+2;var year1=now.getFullYear();var year2=now.getFullYear();if(month1===0){month1='12';year1=now.getFullYear()-1}else if(month1<10){month1='0'+month1}if(month2===13){month2='01';year2=now.getFullYear()+1}else if(month2<10){month2='0'+month2}var options={dateRange:{from:year1+'-'+month1+'-01',to:year2+'-'+month2+'-'+date2}};var _map=this.map,_map$extent=_map.extent,xmin=_map$extent.xmin,ymin=_map$extent.ymin,xmax=_map$extent.xmax,ymax=_map$extent.ymax,wkid=_map.spatialReference.wkid;return this._wfsClient.requestWithinBBOX(xmin,ymin,xmax,ymax,wkid,options)}else{var _map2=this.map,_map2$extent=_map2.extent,_xmin=_map2$extent.xmin,_ymin=_map2$extent.ymin,_xmax=_map2$extent.xmax,_ymax=_map2$extent.ymax,_wkid=_map2.spatialReference.wkid;return this._wfsClient.requestWithinBBOX(_xmin,_ymin,_xmax,_ymax,_wkid)}};// load() {
//     const {
//         extent: { xmin, ymin, xmax, ymax },
//         spatialReference: { wkid }
//     } = this.map;
//
//     return this._wfsClient.requestWithinBBOX(
//         xmin, ymin, xmax, ymax, wkid
//     );
// }
return RecordingClient}()});