var DetailControl=function(a){this.detailUrl=a;this.defaultAnchor=BMAP_ANCHOR_BOTTOM_RIGHT;this.defaultOffset=new BMap.Size(4,3)};DetailControl.prototype=new BMap.Control();DetailControl.prototype.initialize=function(c){var b=document.createElement("a");b.appendChild(document.createTextNode("查看详情"));b.href=this.detailUrl;b.target="_blank";b.style.color="#36c";b.style.fontWeight="bold";b.style.textDecoration="none";b.id="mapControl-checkDetail";c.getContainer().appendChild(b);return b};var ResultType={RT_Normal:0,RT_CityList:1,RT_Empty:2};BMap.Factory=BMap.Factory||function(){};BMap.Factory.Base=BMap.Factory.Base||function(){};BMap.Factory.Base.prototype.generator=function(b){if(this.Params){for(var a=this.Params.length-1;a>=0;--a){if(b[this.Params[a]]){this[this.Params[a]]=b[this.Params[a]]}}}this.map=this.containerPrefix?new BMap.Map(this.containerPrefix+"-map"):null;return this};BMap.Factory.Base.prototype.updateCurrentCity=function(a){if(baidu.g(this.containerPrefix+"-city")){baidu.g(this.containerPrefix+"-city").innerHTML=a}return this};BMap.Factory.Base.prototype.cityListHandler=function(f){this.resultType=ResultType.RT_CityList;if(!(this.markerUid)){this.map.zoomTo(2)}var e=baidu.g(this.containerPrefix+"-result");if(!e){return}var b=[];if(this.city!="\u5168\u56fd"){if(!(this.city.indexOf("\u7701")!=-1)&&!(this.city.indexOf("\u81ea\u6cbb\u5dde")!=-1)){b.push("在<b>"+this.city+"</b>没找到相关的地点。<br /><br />")}b.push("在以下城市找到结果，请选择城市：<br />")}else{b.push("有多个城市有结果，请您选择：<br />")}b.push('<table cellspacing="1" cellpadding="0"><tr>');var d=0;var g=12;for(var a=0,c=f.length;a<c;++a){var h=Math.ceil(baidu.string.getByteLength(f[a].city+"("+f[a].numResults+")")/g);if(h>3){b.push('</tr><tr><td width="100%" colspan="3"><a herf="#" onclick="lrmInstance.searchKeyWord(\''+this.query+"','"+f[a].city+"');return false;\">"+f[a].city+"</a>("+f[a].numResults+")</td></tr><tr>");d=0}else{if(h+d>3){b.push('</tr><tr><td width="'+33*h+'%" colspan="'+h+'"><a herf="#" onclick="lrmInstance.searchKeyWord(\''+this.query+"','"+f[a].city+"');return false;\">"+f[a].city+"</a>("+f[a].numResults+")</td>");d=h}else{b.push('<td width="'+33*h+'%" colspan="'+h+'"><a herf="#" onclick="lrmInstance.searchKeyWord(\''+this.query+"','"+f[a].city+"');return false;\">"+f[a].city+"</a>("+f[a].numResults+")</td>");d+=h}}}b.push("</tr></table>");e.innerHTML=b.join("");return this};BMap.Factory.Base.prototype.emptyResultHandler=function(){if(this.searchKeyWordflag&&!(this.secondSearchflag)){this.secondSearchInChina(this.query)}else{this.resultType=ResultType.RT_Empty;if(!(this.markerUid)){this.map.zoomTo(2)}var a=baidu.g(this.containerPrefix+"-result");if(!a){return}if(this.secondSearchflag){a.innerHTML="在<b>"+this.city+"</b>"+(this.city=="\u5168\u56fd"?"":"及<b>全国</b>")+"范围内未找到相关地点，抱歉。<br /><br /><br /><br /><br /><br /><br /><br />百度建议您：<br /><ul><li>看看输入的文字是否有误</li><li>尝试更换输入文字：去掉过于冗长的部分，并用空格键将多个关键词分开</li></ul>"}else{a.innerHTML="在<b>"+this.city+"</b>范围内未找到相关地点，抱歉。<br /><br /><br /><br /><br /><br /><br /><br />百度建议您：<br /><ul><li>看看输入的文字是否有误</li><li>尝试更换输入文字：去掉过于冗长的部分，并用空格键将多个关键词分开</li></ul>"}}};BMap.Factory.Base.prototype.pageMaker=function(e,a){if(a==1){return""}var f,d;if(e-1<1){f=1;d=a<4?a:4}else{if(e+2>a){f=(a-3>0)?a-3:1;d=a}else{f=e-1;d=a<e+2?a:e+2}}var c='<div class="page">';if(f>1){c+='<a href="#" onclick="lrmInstance.gotoPage(0);return false;">首页</a>'}if(e!=f){c+='<a href="#" onclick="lrmInstance.gotoPage('+(e-2)+');return false;">上一页</a>'}for(var b=f;b<=d;++b){if(e==b){c+="<span>["+b+"]</span>"}else{c+='<a href="#" class="num" onclick="lrmInstance.gotoPage('+(b-1)+');return false;">['+b+"]</a>"}}if(e!=d){c+='<a href="#" onclick="lrmInstance.gotoPage('+e+');return false;">下一页</a>'}c+="</div>";return c};BMap.Factory.Base.prototype.normalResultHandler=function(g){this.resultType=ResultType.RT_Normal;var j=false,d=false,e=false;var h=baidu.trim(g.keyword);if(h=="\u5168\u56fd"){e=true}else{if(h&&g.city.indexOf(h)==0){var m=g.city.substr(h.length);if(m==""||m=="\u7701"||m=="\u5e02"||m=="\u81ea\u6cbb\u533a"||m=="\u81ea\u6cbb\u5dde"||m=="\u5730\u533a"||m=="\u7279\u522b\u884c\u653f\u533a"){if(g.getNumPois()){if(g.city.indexOf("\u5e02")!=-1||g.city.indexOf("\u53bf")!=-1){j=true}else{d=true}}}}}if(g.city=="\u5168\u56fd"&&h=="\u53f0\u6e7e"){d=true}this.pcflag=false;if(j||d||e){this.pcflag=true}if(!this.zoom){if(j){this.markWithTitleAndAdrress(g.getPoi(0),12,null,true)}else{if(d){this.markWithTitleAndAdrress(g.getPoi(0),8,null,true)}else{if(e){this.markWithTitleAndAdrress(g.getPoi(0),4,null,true)}}}}var a=baidu.g(this.containerPrefix+"-result");if(!a){return}if(this.pcflag){a.innerHTML=""}else{var b=g.getNumPages();var c=g.getPageIndex()+1;var l=g.getCurrentNumPois();var k='<a href="#" onclick="return false;" id="'+this.containerPrefix+'-result-top">&nbsp;</a><div id="'+this.containerPrefix+'-rlist">';for(var f=0;f<l;++f){var n=g.getPoi(f);k+='<a id="result-'+n.uid+'" class="result"><span class="result-tip" onclick="var that=this;lrmInstance.markWithTitleAndAdrress({point:new BMap.Point('+n.point.lng+","+n.point.lat+"),title:'"+n.title+"',address:'"+n.address+"',uid:'"+n.uid+"'},"+(this.pcflag?"-1":"null")+',that);">&nbsp;</span><span class="result-title" onclick="var that=this;lrmInstance.markWithTitleAndAdrress({point:new BMap.Point('+n.point.lng+","+n.point.lat+"),title:'"+n.title+"',address:'"+n.address+"',uid:'"+n.uid+"'},"+(this.pcflag?"-1":"null")+',that);">'+n.title+"</span><br />"+(n.address?("地址："+n.address):"&nbsp;")+"</a>"}a.innerHTML=k+"</div>"+this.pageMaker(c,b);baidu.g(this.containerPrefix+"-result-top").focus()}return this};BMap.Factory.Base.prototype.markWithTitleAndAdrress=function(a,e,d,f){if(this.marker){this.map.removeOverlay(this.marker)}if(e!=-1){e=e||14;this.map.zoomTo(e);this.zoom=e}this.map.panTo(a.point);if(typeof f!="undefined"&&f||typeof d!="undefined"&&d&&!this.nomark&&this.markerUid==a.uid){this.nomark=true}else{this.marker=new BMap.Marker(a.point);var c='<h4 style="font-size:14px; font-weight:bold; color:#CE5423; margin-bottom:8px;">'+a.title+"</h4>"+(a.address?("<p>地址："+a.address+"</p>"):"");var b=new BMap.InfoWindow(c,{width:0,height:0});this.marker.addEventListener("click",function(){this.openInfoWindow(b)});this.map.addOverlay(this.marker);this.markerPos=a.point;this.markerUid=a.uid;this.markerTitle=a.title;this.markerAddress=a.address;this.nomark=false}if(baidu.g(this.containerPrefix+"-rlist")){baidu.each(baidu.q("result",this.containerPrefix+"-rlist","a"),function(h,g){baidu.removeClass(h,"selected")});if(d&&!this.nomark){baidu.addClass(d.parentNode,"selected")}}};BMap.Factory.LocalResultsMarker=BMap.Factory.LocalResultsMarker||function(){BMap.Factory.Base.call(this);this.Params=["containerPrefix","query","city","zoom","center","markerPos","markerUid","markerTitle","markerAddress","nomark"]};BMap.Factory.lrm=BMap.Factory.LocalResultsMarker;baidu.inherits(BMap.Factory.lrm,BMap.Factory.Base);BMap.Factory.lrm.prototype.clearMarker=function(){this.markerUid="";this.markerTitle="";this.markerAddress="";this.markerPos=null;if(this.marker){this.map.removeOverlay(this.marker)}};BMap.Factory.lrm.prototype.updateSelectedResult=function(d){if(!d){return}if(!(baidu.g(this.containerPrefix+"-result"))){return}baidu.each(baidu.q("result",this.containerPrefix+"-result","div"),function(f,e){baidu.removeClass(f,"selected")});var b=d.getCurrentNumPois();for(var c=b-1;c>=0;--c){var a=d.getPoi(c);if(a.point.equals(this.markerPos)&&a.title==this.markerTitle&&this.markerUid==a.uid){baidu.g("result-"+a.uid)&&!this.nomark&&baidu.addClass("result-"+a.uid,"selected")}}};BMap.Factory.lrm.prototype.callback=function(c){if(!c){this.emptyResultHandler();return}this.city=c.city;this.query=c.keyword;this.updateCurrentCity(c.city);this.moreResultsUrl=c.moreResultsUrl;if(this.detailControl){this.map.removeControl(this.detailControl)}if(this.moreResultsUrl){this.detailControl=new DetailControl(this.moreResultsUrl);this.map.addControl(this.detailControl)}var e=c.getCityList();var d=c.getNumPois();if(e.length>0){this.cityListHandler(e)}else{if(d<=0){this.emptyResultHandler()}else{this.normalResultHandler(c)}}if(this.searchCallbackList){for(var b=0,a=this.searchCallbackList.length;b<a;++b){this.searchCallbackList[b]()}}};BMap.Factory.lrm.prototype.addSearchCallback=function(a){this.searchCallbackList=this.searchCallbackList?this.searchCallbackList:[];this.searchCallbackList.push(a)};BMap.Factory.lrm.prototype.searchInner=function(c,d,a){var b=this;this.gotoPageFlag=false;this.local=new BMap.LocalSearch(d,{renderOptions:{autoViewport:true,selectFirstResult:false},onSearchComplete:function(e){b.callback(e);if(a&&!b.gotoPageFlag){a(e)}b.updateSelectedResult(e)}});this.local.search(c)};BMap.Factory.lrm.prototype.gotoPage=function(a){this.gotoPageFlag=true;this.local.gotoPage(a)};BMap.Factory.lrm.prototype.search=function(b,c,a){this.secondSearchflag=false;this.searchInner(b,c,a)};BMap.Factory.lrm.prototype.secondSearchInChina=function(b){this.secondSearchflag=true;var a=this;this.searchInner(b,"\u5168\u56fd",function(c){if(c&&c.getNumPois()){a.markWithTitleAndAdrress(c.getPoi(0))}})};BMap.Factory.lrm.prototype.searchKeyWord=function(b,c){this.searchKeyWordflag=true;var a=this;if(b){this.search(b,c,function(d){if(d&&d.getNumPois()){a.markWithTitleAndAdrress(d.getPoi(0),a.pcflag?-1:null,null,a.pcflag)}})}else{this.searchCity(c)}};BMap.Factory.lrm.prototype.searchCity=function(a){this.searchKeyWordflag=false;this.clearMarker();var b=this;var c=baidu.trim(baidu.g("sw-word").value);this.search(c||a,a,c?function(d){if(d&&d.getNumPois()){b.markWithTitleAndAdrress(d.getPoi(0),b.pcflag?-1:null,null,b.pcflag)}}:function(){});baidu.hide("change-city-dialog")};BMap.Factory.lrm.prototype.init=function(){var a=this;this.map.centerAndZoom(a.markerPos,a.zoom);this.map.addControl(new BMap.NavigationControl({type:BMAP_NAVIGATION_CONTROL_SMALL}));this.map.addControl(new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,offset:new BMap.Size(4,21)}));this.search(a.query,a.city,function(b){if(a.markerUid){a.markWithTitleAndAdrress({title:a.markerTitle,address:a.markerAddress,uid:a.markerUid,point:a.markerPos},a.zoom,null,a.nomark)}else{if(a.resultType==ResultType.RT_Normal){if(b&&b.getNumPois()){a.markWithTitleAndAdrress(b.getPoi(0),-1,null,a.nomark)}}}if(a.center.lng&&a.center.lat){a.map.centerAndZoom(a.center,a.map.getZoom())}})};