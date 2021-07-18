var PalavrasCruzadas = {};

var time = 0;
var interval = setInterval(() => {
	time++;
	$("#time").html(time + " segundos");
}, 1000);

$(document).ready((e) => {
	PalavrasCruzadas = {
		init: () => {
			PalavrasCruzadas.Scrabble = $("#Scrabble");
			PalavrasCruzadas.ScrabbleFoundWords = $("#DropScrabbleFoundWords");
			PalavrasCruzadas.makeScrable();
			PalavrasCruzadas.handlerFunctions();
		},

		Scrabble: {},
		ScrabbleFoundWords: {},
		DownloadWords: [],
		FoundWords: [],
		WordsList: [],

		WordIsHide: true,
		getWordtoMake: () => {
			let word = "";
			let words = PalavrasCruzadas.DownloadWords;

			while (1) {
				var r = Math.floor(Math.random() * words.length - 1) + 1;
				if (PalavrasCruzadas.WordsList.indexOf(words[r]) === -1) {
					word = words[r];
					PalavrasCruzadas.WordsList.push(word);
					break;
				}
			}

			return word;
		},

		getRamdomCharAscii: () => {
			let maxAscii = 122;
			let minAscii = 97;

			let ascii =
				Math.floor(Math.random() * (maxAscii - minAscii + 1)) + minAscii;
			return String.fromCharCode(ascii);
		},

		showWords: () => {
			$(".ScrabbleWords").animate({ opacity: 0 }, "fast", function () {
				$(this).css({ "background-color": "green" }).animate({ opacity: 1 });
				$(this).css({ color: "white" }).animate({ opacity: 1 });
				$(this).css({ border: "solid white 1px" }).animate({ opacity: 1 });
			});
			$("#ScrabbleShowWordsBtn").val("Esconder Palavras");
			PalavrasCruzadas.WordIsHide = false;
		},
		hideWords: () => {
			$(".ScrabbleWords").each((i, e) => {
				if (PalavrasCruzadas.FoundWords.indexOf($(e).data("object")) > -1) {
					return;
				}
				$(e).animate({ opacity: 0 }, "fast", function () {
					$(this).css({ "background-color": "white" }).animate({ opacity: 1 });
					$(this).css({ color: "black" }).animate({ opacity: 1 });
				});
			});
			$("#ScrabbleShowWordsBtn").val("Mostrar palavras");
			PalavrasCruzadas.WordIsHide = true;
		},

		GameOver() {
			clearInterval(interval);
			alert("Parabéns! Fim de Jogo");
		},

		getScrabbleWords: () => {
			let words = [];
			$.ajax({
				url: "/cacapalavras/palavras",
				method: "GET",
				async: false,
				success: function (response) {
					words = JSON.parse(response);
				},
				error: function (error) {},
			});
			PalavrasCruzadas.DownloadWords = words;
			return words;
		},

		clearScrabble: () => {
			PalavrasCruzadas.Scrabble.empty();
			PalavrasCruzadas.ScrabbleFoundWords.empty();
			PalavrasCruzadas.FoundWords = [];
			PalavrasCruzadas.WordsList = [];
			PalavrasCruzadas.WordIsHide = true;
			PalavrasCruzadas.getScrabbleWords();
		},

		makeScrable: () => {
			let pos_qnt = $("#ScrabblePosQnt").val();
			PalavrasCruzadas.clearScrabble();

			for (let i = 0; i < pos_qnt; i++) {
				let word = PalavrasCruzadas.getWordtoMake();
				if (word.length > pos_qnt) {
					i--;
					continue;
				}
				let tableLines = "";

				let drag_mask = "draggable_" + word;

				tableLines += "<div class='row'>";
				let max = pos_qnt - word.length;
				let min = 0;
				var isReverse = Math.random() < 0.5;
				let word_text = word;
				if (isReverse) {
					word_text = word.split("").reverse().join("");
				}
				let initFrom = Math.floor(Math.random() * (max - min + 1)) + min;
				for (let i2 = 0; i2 < pos_qnt; i2++) {
					if (word && word_text[i2 - initFrom]) {
						tableLines +=
							"<div class='col-md-1 " +
							drag_mask +
							" ScrabbleWords' data-object='" +
							word +
							"' >" +
							word_text[i2 - initFrom] +
							"</div>";
					} else {
						tableLines +=
							"<div class='col-md-1'>" +
							PalavrasCruzadas.getRamdomCharAscii() +
							"</div>";
					}
				}

				let jqLines = $(tableLines);
				PalavrasCruzadas.Scrabble.append(jqLines);

				let Words = $("." + drag_mask);

				let hidden_row = "".padStart(word.length * 2, "_ ");
				hidden_row = hidden_row.slice(0, -1);
				drop_li = "<li class='drop'>" + hidden_row + "</li>";
				$("#DropScrabbleFoundWords").append($(drop_li));

				Words.draggable({
					revert: "invalid",
					helper: function (event) {
						var helperList = $('<ul class="draggable-helper">');
						if ($(this).is("." + drag_mask)) {
							helperList.append(
								$(this)
									.siblings("." + drag_mask)
									.addBack()
									.clone()
							);
						} else {
							helperList.append($(this).clone());
						}
						return helperList;
					},
				});
			}
			$("#DropScrabbleFoundWords").droppable({
				drop: function (event, ui) {
					let droppedObject = ui.draggable.data("object"); // get object type
					if (PalavrasCruzadas.FoundWords.indexOf(droppedObject) > -1) {
						return 0;
					}

					let $this = $(this);
					let found = 0;
					$("#DropScrabbleFoundWords")
						.find("li")
						.each((i, e) => {
							let atualString = $(e).text().replace(/\ /g, "");
							if (
								droppedObject.length == atualString.length &&
								atualString.includes("_", 0)
							) {
								PalavrasCruzadas.FoundWords.push(droppedObject);
								$(".draggable_" + droppedObject).css(
									"background-color",
									"green"
								);
								$(".draggable_" + droppedObject).css("color", "white");

								$(e).empty();
								$(e).append(droppedObject);

								if (
									PalavrasCruzadas.WordsList.length ===
									PalavrasCruzadas.FoundWords.length
								) {
									PalavrasCruzadas.GameOver();
								}
								return false;
							}
						});
				},
			});
		},
		handlerFunctions: () => {
			$("#ScrabbleShowWordsBtn").on("click", (e) => {
				if (PalavrasCruzadas.WordIsHide) {
					PalavrasCruzadas.showWords();
				} else {
					PalavrasCruzadas.hideWords();
				}
			});

			$("#ScrabblePosQnt").on("change", (e) => {
				PalavrasCruzadas.clearScrabble();
				PalavrasCruzadas.makeScrable();
			});

			$("#ScrabbleReloadBtn").on("click", (e) => {
				PalavrasCruzadas.clearScrabble();
				PalavrasCruzadas.makeScrable();
			});
		},
	};

	PalavrasCruzadas.init();
});
