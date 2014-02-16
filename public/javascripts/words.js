$(function(){
	var curr_l = "A";
	var curr_word ="Absorption";
	$(".alph a").click(function(e){
		e.preventDefault();
		var l = $(this).data("letter");
		$(".alph a[data-letter="+curr_l+"]").removeClass("pure-menu-selected");
		$(this).addClass("pure-menu-selected");
		$(".list ul[data-letter="+l+"]").show();
		$(".list ul[data-letter="+curr_l+"]").hide();
		$.get('/letter_vids', {letter: l.toLowerCase()})
	});

	$(".word a").click(function(e){
		e.preventDefault();
		var word = $(this).data("word");
		$("#"+curr_word).hide();
		$("#"+word).show();
		curr_word=word;
	});
});