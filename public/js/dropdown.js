$(".range li a").click(function () {
  $(".range:first-child").html($(this).text() + ' <span class="caret"></span>');
});

$(".method li a").click(function () {
  $(".selectcolor.method").html($(this).text());
});

$(".cate li a").click(function () {
  $(".selectcolor.cate").html($(this).text());
});

$(".reg li a").click(function () {
  $(".reg:first-child").html($(this).text() + ' <span class="caret"></span>');
});

$(".more li a").click(function () {
  $(".more:first-child").html($(this).text() + ' <span class="caret"></span>');
});

$(".less li a").click(function () {
  $(".less:first-child").html($(this).text() + ' <span class="caret"></span>');
});

$(".rqcate li").click(function () {
  $(".rqcate:first-child").html($(this).text() + ' <span class="caret"></span>');
});

$(".rqperiod li").click(function () {
  $(".rqperiod:first-child").html($(this).text() + ' <span class="caret"></span>');
});

$(".rqmethod li").click(function () {
  $(".rqmethod:first-child").html($(this).text() + ' <span class="caret"></span>');
});

$(".rqreg li").click(function () {
  $(".rqreg:first-child").html($(this).text() + ' <span class="caret"></span>');
});
