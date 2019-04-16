var game2048 = (function(){
	var $window = window; //윈도우객체
	var $is_drag = false; //드래그시작
	var $startPosition; //시작좌표
	var $lastPosition; //끝좌표
	var $location;
	var $is_dragging = false;
	var $data = [];
	var $el = document.getElementById("table2048");
	return {
		init : function(){

			this.event($el);
			this.create($el); //초기화
			this.random(); //렌덤생성

			console.log($data);
		},
		random : function(){
			var emptyArr = [];
			$data.forEach(function(colData, i){
				colData.forEach(function(rowData, j){
					if( !rowData ){
						emptyArr.push([i, j]);
					}
				});
			});

			var r = Math.floor(Math.random() * emptyArr.length);
			var random = emptyArr[r];
			$data[random[0]][random[1]] = 2;
			this.draw();
		},
		draw : function(){
			$data.forEach(function(colData, i){
				colData.forEach(function(rowData, j){
					if( rowData > 0 ){
						$el.children[i].children[j].textContent = rowData;
					}else{
						$el.children[i].children[j].textContent = "";
					}
				});
			});
		},
		create : function(el){
			var fragment = document.createDocumentFragment();
			[1,2,3,4].forEach(function(){
				var colData = [];
				$data.push(colData);
				var tr = document.createElement("tr");
				fragment.appendChild(tr);
				[1,2,3,4].forEach(function(){
					colData.push(0);
					var td = document.createElement('td');
					tr.appendChild(td);
				});
			});
			el.appendChild(fragment);
		},
		event : function(el){
			
			el.addEventListener("mousedown", function(event){
				//console.log("mousedown", event);
				$startPosition = [event.clientX, event.clientY];
				$is_drag = true;
			});

			el.addEventListener("mousemove", function(event){
				if( $is_drag ){
					//console.log("mousemove", event);
					$is_dragging = true;
				}
			});

			el.addEventListener("mouseup", function(event){
				//console.log("mouseup", event);
				if( $is_dragging ){
					$lastPosition = [event.clientX, event.clientY];
					var xGap = $lastPosition[0] - $startPosition[0];
					var yGap = $lastPosition[1] - $startPosition[1];

					if( xGap < 0 && Math.abs(xGap) / Math.abs(yGap) > 1){
						$location = "left";
					}else if( xGap > 0 && Math.abs(xGap) / Math.abs(yGap) > 1){
						$location = "right";
					}else if( yGap > 0 && Math.abs(xGap) / Math.abs(yGap) < 1){
						$location = "down";
					}else if( yGap < 0 && Math.abs(xGap) / Math.abs(yGap) < 1){
						$location = "up";
					}
					console.log( $location );
				}
				$is_drag = false;
				$is_dragging = false;

				switch($location){
					case 'left' :
					break;
					case 'right' :
					break;
					case 'down' :
					break;
					case 'up' :
					break;
				}
			});
		}
	}
})();