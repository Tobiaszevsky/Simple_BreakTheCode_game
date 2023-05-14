$(document).ready(function(){
    var currentColor = "white";
    var currentBoardCells = ["board40", "board41", "board42", "board43"];
    var currentPegCells = ["peg40", "peg41", "peg42", "peg43"]
    var currentRow = 11;
    var possibleColors = ["blue", "green", "red", "yellow", "orange", "pink"];
    var hasWon = false;

    var cell1Color, cell2Color, cell3Color, cell4Color;

    var colors = {
        "rgb(0, 128, 0)": "green",
        "rgb(255, 255, 0)": "yellow",
        "rgb(255, 0, 0)": "red",
        "rgb(0, 0, 255)": "blue",
        "rgb(255, 192, 203)": "pink",
        "rgb(255, 165, 0)": "orange"
    }

    var code = [
        possibleColors[Math.floor(Math.random()*6)], 
        possibleColors[Math.floor(Math.random()*6)],
        possibleColors[Math.floor(Math.random()*6)],
        possibleColors[Math.floor(Math.random()*6)]
    ];

    for(let i = 0; i < 44; i++){
        let cell = "<div class=\"boardCell\" id=board"+i+"></div>"
        $(".board").append(cell);
    }
    for(let i = 0; i < 44; i++){
        let cell = "<div class=\"pegCell\" id=peg"+i+"></div>"
        $(".pegs").append(cell);
    }
    $(".board").css("grid-template-rows", "repeat(11,73.18px)");
    $(".board").css("grid-template-columns", "repeat(4,73.18px)");
    $(".boardCell").css("border", "1px solid rgba(5, 15, 102, 0.993)");
    $(".boardCell").css("border-radius", "50%");
    $(".boardCell").css("background-color", "white");

    $(".pegs").css("grid-template-rows", "repeat(22,36.59px)");
    $(".pegs").css("grid-template-columns", "repeat(2,36.59px");
    $(".pegCell").css("border", "1px solid black");
    $(".pegCell").css("border-radius", "50%")
    $(".pegCell").css("background-color", "gray")

    $(".color").each(function(){
        let color = $(this).attr("id");
        $(this).css("background-color", color);
    });
    $(".color").click(function(){
        let color = $(this).attr("id");
        currentColor = color;
        $(".currentColor").css("background-color", color);
    });
    $(".boardCell").click(function(){
        var id = $(this).attr("id");

        if(isValid(id)){
            $(this).css("background-color", currentColor);
        }
    });
    $(".submit").click(function(){
        if(document.getElementById("board"+((currentRow*4)-1)).style.backgroundColor!=="white" ||
        document.getElementById("board"+((currentRow*4)-2)).style.backgroundColor!=="white" ||
        document.getElementById("board"+((currentRow*4)-3)).style.backgroundColor!=="white" ||
        document.getElementById("board"+((currentRow*4)-4)).style.backgroundColor!=="white" ){
            updatePegs();
            checkWin();
            changeCurrentRow();
        }
    });
    function changeCurrentRow(){
        currentRow -= 1;
        var mult = 4;

        currentBoardCells = [
            "board" + (currentRow*mult-4), 
            "board" + (currentRow*mult-3), 
            "board" + (currentRow*mult-2), 
            "board" + (currentRow*mult-1)];
        currentPegCells = [
            "peg" + (currentRow*mult-4), 
            "peg" + (currentRow*mult-3), 
            "peg" + (currentRow*mult-2), 
            "peg" + (currentRow*mult-1)];
            if(currentRow==0){
                $("#secretColor1").css("background-color", code[0]);
                $("#secretColor2").css("background-color", code[1]);
                $("#secretColor3").css("background-color", code[2]);
                $("#secretColor4").css("background-color", code[3]);
                gameOver(false);
            }
    }
    function isValid(id){
        if(currentBoardCells.includes(id) && hasWon === false){
            return true;
        }
        return false;
    }
    function gameOver(win){
        if(win ==true){
        let content = document.getElementById("content");
        let code=document.getElementById("code");
        let gameOver = document.getElementById("gameOver");
        content.style.display="none";
        code.style.display="grid";
        code.style.margin="auto";
        gameOver.style.display="block";
        document.getElementById("text").innerHTML="Congratulations!<br> You've broke the code";
        }
        else{
            let content = document.getElementById("content");
            let code=document.getElementById("code");
            let gameOver = document.getElementById("gameOver");
            content.style.display="none";
            code.style.display="grid";
            code.style.margin="auto";
            gameOver.style.display="block";
            document.getElementById("text").innerHTML="Game Over!<br> GG";
        }
    }
    function checkWin(){
        if(code[0] === cell1Color &&
            code[1] === cell2Color &&
            code[2] === cell3Color &&
            code[3] === cell4Color){
            hasWon = true;
            $("#secretColor1").css("background-color", code[0]);
            $("#secretColor2").css("background-color", code[1]);
            $("#secretColor3").css("background-color", code[2]);
            $("#secretColor4").css("background-color", code[3]);
            gameOver(true);
        }

        return hasWon; 
    }
    function updatePegs(){
        let cell1 = $("#"+currentBoardCells[0]);
        let cell2 = $("#"+currentBoardCells[1]);
        let cell3 = $("#"+currentBoardCells[2]);
        let cell4 = $("#"+currentBoardCells[3]);

        cell1Color = colors[cell1.css("background-color")];
        cell2Color = colors[cell2.css("background-color")];
        cell3Color = colors[cell3.css("background-color")];
        cell4Color = colors[cell4.css("background-color")];

        let peg1 = $("#"+currentPegCells[0]);
        let peg2 = $("#"+currentPegCells[1]);
        let peg3 = $("#"+currentPegCells[2]);
        let peg4 = $("#"+currentPegCells[3]);

        let pegs = [peg1, peg2, peg3, peg4];
        let filledPegs = [];
        let chosenCells = [];
        let codeCopy = [...code];
        if(code[0] === cell1Color){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            let index = codeCopy.indexOf(cell1Color);
            if(index > -1){
                codeCopy.splice(index, 1);
            }
            chosenCells.push(1);
            pegs[num-1].css("background-color", "red");
        }
        if(code[1] === cell2Color){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            let index = codeCopy.indexOf(cell2Color);
            if(index > -1){
                codeCopy.splice(index, 1);
            }

            chosenCells.push(2);

            pegs[num-1].css("background-color", "red");
        }
        if(code[2] === cell3Color){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            let index = codeCopy.indexOf(cell3Color);
            if(index > -1){
                codeCopy.splice(index, 1);
            }

            chosenCells.push(3);

            pegs[num-1].css("background-color", "red");
        }
        if(code[3] === cell4Color){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            let index = codeCopy.indexOf(cell4Color);
            if(index > -1){
                codeCopy.splice(index, 1);
            }

            chosenCells.push(4);

            pegs[num-1].css("background-color", "red");
        }

        if(codeCopy.includes(cell1Color) && !chosenCells.includes(1)){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            pegs[num-1].css("background-color", "white");
        }       
        if(codeCopy.includes(cell2Color) && !chosenCells.includes(2)){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            pegs[num-1].css("background-color", "white");
        }    
        if(codeCopy.includes(cell3Color) && !chosenCells.includes(3)){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            pegs[num-1].css("background-color", "white");
        }    
        if(codeCopy.includes(cell4Color) && !chosenCells.includes(4)){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);
            pegs[num-1].css("background-color", "white");
        }     
    }
    function randomNum14(nums){
        let num = Math.floor(Math.random()*4) + 1;
        while(nums.includes(num)){
            num = Math.floor(Math.random()*4) + 1;
        }
        return num;
    }
});