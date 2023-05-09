$(document).ready(function(){
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
$(".boardCell").css("border", "1px solid black");
$(".boardCell").css("border-radius", "50%");
$(".boardCell").css("background-color", "white");

$(".pegs").css("grid-template-rows", "repeat(22,36.59px)");
$(".pegs").css("grid-template-columns", "repeat(2,36.59px");
$(".pegCell").css("border", "1px solid black");
$(".pegCell").css("border-radius", "50%");
$(".pegCell").css("background-color", "gray");

$(".color").each(function(){
    let color = $(this).attr("id");
    $(this).css("background-color", color);
});

});