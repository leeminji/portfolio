var tictactoe = (function(){
    var $window = window;
    var $app = null;
    var $table = null;
    var $level = 3;
    var $data = [];
    var $turn = "X";
    var $result = false;
    var $resultData = [];
    var $resetButton = null;
    var $msgText = null;
    return {
        init : function(){
            $app = document.getElementById("app");
            $table = document.createElement("table");
            $app.appendChild($table);
            
            //테이블을 만든다.
            this.createTable();
            console.log( $data );
        },
        createTable : function(){
            var tr = null;
            var td = null;
            for(var i=0; i<$level;i++){
                tr = document.createElement("tr");
                $table.appendChild(tr);
                $data.push([]);
                for( var j=0;j<$level;j++){
                    td = document.createElement("td");
                    //인덱스 넣기(찾아서 판단할값)
                    td.index = {"line": i, "col": j};
                    tr.appendChild(td);
                    td.addEventListener("click", this.clickEvent);
                    $data[i].push(td);
                }
            }
        },
        clickEvent : function(ev){
            if( $result ) return;
            var currentTarget = ev.target;
            //빈칸인경우
            if( currentTarget.innerText == ""){
                if( $resultData.length == $level*$level-1 ) tictactoe.resetGame();
                
                //넣는다!
                currentTarget.innerText = $turn;
                $resultData.push(currentTarget.innerText);
                
                //판단
                var result = null;
                result = tictactoe.resultGame(currentTarget);
                if( result ){
                    $result = true;
                    tictactoe.resetGame(result);
                }
                //변환
                $turn = $turn === "X" ? "O" : "X";

            }else{
            //빈칸이 아닌경우
                console.log( "이미 채워져있는 칸입니다.");
            }
        },
        //인덱스를 넣지 않았을때는 data 배열에서 for문을 돌려서 판단.
        getDataIndexOf : function(target){
            var _sel = null;
            $data.forEach((line, line_index)=>{
                line.forEach((data, data_index)=>{
                    if( data == target ){
                        _sel = {"line":line_index, "data":data_index};
                    }
                });
            })
            return _sel;
        },
        resetGame : function(_msg){
            if( $msgText == null){
                $msgText = document.createElement("div");
                $msgText.innerText = _msg == undefined ? "비겼습니다" : _msg;
                $app.appendChild($msgText);
            }
            if( $resetButton == null ){
                $resetButton = document.createElement("button");
                $resetButton.innerText = "리셋버튼";
                $app.appendChild($resetButton);
                
                $resetButton.addEventListener("click",  tictactoe.onClickReset);
            }
        },
        onClickReset: function(ev){
            $resultData = [];
            $data.forEach((line)=>{
                line.forEach((col)=>{
                    col.innerText = "";
                })
            });
            $msgText.innerText = null;
            $msgText.remove();
            $msgText = null;
            $resetButton.removeEventListener("click",  tictactoe.onClickReset);
            $resetButton.remove();
            $resetButton = null;
            $result = false;
        },
        //이겼는지판단(수정필요)
        resultGame : function(target){
            var line = target.index.line;
            var col = target.index.col;

            //1. 가로
            if( $data[line][0].innerText == $turn && 
                $data[line][1].innerText == $turn &&
                $data[line][2].innerText == $turn ){
                return $turn+"이 승리하였습니다";
            }

            //2. 세로
            if( $data[0][col].innerText == $turn && 
                $data[1][col].innerText == $turn &&
                $data[2][col].innerText == $turn ){
                return $turn+"이 승리하였습니다";
            }

            //대각선
            if( line == col ){
               if($data[0][0].innerText == $turn &&
                  $data[1][1].innerText == $turn &&
                  $data[2][2].innerText == $turn ){
                  return $turn+"이 승리하였습니다";
               }
            }

            if( Math.abs(line-col) == 2 || line-col == 0 ){
              if( $data[0][2].innerText == $turn &&
                  $data[1][1].innerText == $turn &&
                  $data[2][0].innerText == $turn ){
                  return $turn+"이 승리하였습니다";
               }    
            }
            return false;
        }
    }
})();