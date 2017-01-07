$(document).ready(function() {


	var historydata={hist:[]};


	var source = $("#template").html();
	var template = Handlebars.compile(source);

	var socket = io('https://c92w0navalarm-atcrew3000.c9users.io');
	socket.on('mainsocket', function(data) {
		console.log(data.data);
	});
	
	
	$.ajax(
	{
		type: 'GET',
		url: "stamp.json",
		dataType: "json",
		success: function(data) {
			
			if(data.servers.length>0){
				data.servers.forEach(function(server){
					parseData(server);			
				});
			}
		},
		//error: loadError
	});
 
	

	var active = false;
	var actstr = '';

	socket.on('data', function(data) {

		parseData(data);

	});


	/*var data={data0:"DATADATDATDATDTAD"};
	var arr={array:[{data:100,subarray:[{d0:1000},{d0:2000},{d0:3000}]},{data:200,subarray:[{d0:1000}]},{data:300,subarray:[]}]};

	   var s0 = $("#t0").html(); 
	   var t0 = Handlebars.compile(s0);
	   $('#place').html(t0(data));
	   
	   var s1=$('#t1').html();
	   var t1=Handlebars.compile(s1);
	   $('#arrayplace').append(t1(arr));*/
	   
	   
	   
	   function parseData(data){
	   	if (data.sequenceCounter == 1) {
			$('ul.nav-tabs').html('');
			$('div.tab-content').html('');
		}

		var tab = '<li role="presentation" class="' + actstr + '"><a id="tablink-' + data.serverName + '" href="#' + data.serverName + '" aria-controls="' + data.serverName + '" role="tab" data-toggle="tab">' + data.serverName + '</a></li>';
		$('ul.nav-tabs').append(tab);
		var tabContent = '<div role="tabpanel" class="tab-pane ' + actstr + '" id="' + data.serverName + '"><div class="row"><div class="col-md-3"><canvas id="canvas-' + data.serverName + '" height="300" width="500"></canvas></div></div></div>';
		//var tabContent='<div role="tabpanel" class="tab-pane '+actstr+'" id="'+data.serverName+'"><div class="row"><div class="col-md-3"><div class=" ct-chart ct-perfect-fourth"></div></div></div></div>';
		$('div.tab-content').append(tabContent);

		data.array.forEach(function(_obj){
			_obj.serverName=data.serverName;
			
			if(_obj.hasOwnProperty('history')){
				if(_obj.history.length>0){
							
				_obj.history.forEach(function(ho){
				ho.lastmod=ho.lastmod.replace(" ","-");
				ho.lastmod=ho.lastmod.replace(":","-");
				ho.lastmod=ho.lastmod.replace(":","-");
				ho.lastmod=ho.lastmod.replace(".","-");
				ho.link=_obj.name+_obj.serverName+ho.lastmod;
				
				console.log(ho);
				
			var knowname=false;
			if(historydata.hist.length>0){
				historydata.hist.forEach(function(hio){
					if(hio.link===ho.link){
						hio.obj=ho;
						knowname=true;
					}
				});
			}
			if(historydata.hist.length==0 || !knowname){
					historydata.hist.push({link:ho.link, obj:ho});
			}
				
			});
		
				}
			}
		});
		
		

		$('#' + data.serverName).append(template(data));

		var _mods = data.array.reduce(function(prev, current) {
			if (current.diffsumm > 0)
				return ++prev;
			else
				return prev;
		}, 0);

		var _series = [(data.array.length - _mods), _mods];

		var __data = {
			labels: [
				"Без изменений",
				"Изменения"
			],
			datasets: [{
				data: _series,
				backgroundColor: [
					"#FF6384",
					"#36A2EB"
				],
				hoverBackgroundColor: [
					"#FF6384",
					"#36A2EB"
				]
			}]
		};


		var ctx = $("#canvas-" + data.serverName);
		var myPieChart = new Chart(ctx, {
			type: 'pie',
			data: __data
		});

	
		$('#restab a#tablink-' + data.serverName).tab('show');

		/*data.array.forEach(function(obj) {
		
			
		var _ctx = $('#cnvs-' + obj.serverName + '-' + obj.name);
			
		if(obj.hasOwnProperty('history')){
			
			if (obj.history.length > 0) {
		

				var d = obj.history.map(function(_obj) {
					return _obj.diffsumm;
				});
				var l = obj.history.map(function(_obj) {
					return _obj.lastmod;
				});

				var __d = {
					labels: l,
					datasets: [{
						data: d
					}]
				};

				var myLineChart = new Chart(_ctx, {
					type: 'line',
					data: __d
				});

			}
			
		}	
		});*/
		
		
		console.log(historydata);
		
		$("a.historylink").click(function(cobj){
			cobj.stopImmediatePropagation();
			cobj.preventDefault();
			
			var _html="";
			historydata.hist.forEach(function(ho){
				if(ho.link==$(cobj.currentTarget).attr('id')){
					_html=ho.obj.html;
				}
			});
			
			$('#mbody').html(_html);
			
			$('#modal').modal('show');
		});
	   }
	   

});