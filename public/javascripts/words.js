$(function(){
	var curr_l = "A";
	var curr_word ="Absorption";
	$(".alph a").click(function(e){
		e.preventDefault();
		var letter = $(this).data("letter");
		var c = $(this).data("category").toLowerCase();
		$(".alph a[data-letter="+curr_l+"]").removeClass("pure-menu-selected");
		$(this).addClass("pure-menu-selected");
		$(".list ul[data-letter="+letter+"]").show();
		$(".list ul[data-letter="+curr_l+"]").hide();
		var l = letter.toLowerCase();
		console.log("first");
		$.get('/letterVids', {letter: l, category:c},
			function(data) {
				console.log("second");
				if (data.success === "error"){
					console.log("ERROR");
				} else {
					var source = "{{#each vids}} <div id='{{word}}' class='word-vid'><div class='word-title'>{{word}}</div><div class='word-video'><video src='{{url}}' controls></video></div></div>{{/each}}";
					var template = Handlebars.compile(source);
					var context = data;
					var html = template(context);
					console.log("third");
					console.log("HEY"+html);
					$('.videos').html(html);
				}
			}, "json");
	});

	$(".word a").click(function(e){
		e.preventDefault();
		var word = $(this).data("word");
		$("#"+curr_word).hide();
		$("#"+word).show();
		curr_word=word;
	});
});