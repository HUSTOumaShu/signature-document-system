/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[1],{562:function(xa,ta,h){h.r(ta);var ra=h(0),na=h(314);xa=h(558);h=h(480);var oa=window,ia=function(ka){function ha(y,ba){var r=ka.call(this,y,ba)||this;r.url=y;r.range=ba;r.request=new XMLHttpRequest;r.request.open("GET",r.url,!0);oa.Uint8Array&&(r.request.responseType="arraybuffer");r.request.setRequestHeader("X-Requested-With","XMLHttpRequest");r.status=na.a.NOT_STARTED;return r}Object(ra.c)(ha,ka);return ha}(xa.ByteRangeRequest);
xa=function(ka){function ha(y,ba,r,n){y=ka.call(this,y,ba,r,n)||this;y.zD=ia;return y}Object(ra.c)(ha,ka);ha.prototype.IA=function(y,ba){return y+"/bytes="+ba.start+","+(ba.stop?ba.stop:"")};return ha}(xa["default"]);Object(h.a)(xa);Object(h.b)(xa);ta["default"]=xa}}]);}).call(this || window)