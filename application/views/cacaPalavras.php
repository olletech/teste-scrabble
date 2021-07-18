<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="utf-8">
    <title>Teste Scrabble</title>
    <link rel="stylesheet" href="<?=base_url()?>assets/jqueryui/jquery-ui.min.css">
    <link rel="stylesheet" href="<?=base_url()?>assets/css/bootstrap/bootstrap.css">
    <link rel="stylesheet" href="<?=base_url()?>assets/css/cacapalavras.css">
</head>

<body>
    <div class="container-fluid">
        <div class="row pt-3 pb-3">
            <div class="col-md-6">
                <h4 class="card-title">Caça Palavras | <span class="badge badge-primary"><small>Tempo decorrido: <span
                                id="time"></span></small></span></h4>
            </div>

            <div class="col-md-2 form-inline">
                <div class="form-group row">
                    <label>Qtde de Posições: </label>
                    <input id="ScrabblePosQnt" min="6" max="12" type="number" class="form-control ml-2" value="11">
                </div>
            </div>
            <div class="col-md-4 text-right">

                <input class="btn btn-warning text-white text-uppercase" type="button" id="ScrabbleShowWordsBtn"
                    value="Mostrar palavras">

                <input class="btn btn-success text-uppercase" type="button" id="ScrabbleReloadBtn"
                    value="Reiniciar Jogo">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="card">

                    <div class="card-body">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-3">

                                    <div class="row">
                                        <div class="col">
                                            <label><strong>1</strong> - Palavras Encontradas:</label>
                                            <div class="card">
                                                <div class="card-body pt-3">
                                                    <div id="ScrabbleFoundWords mt-3">
                                                        <ul id="DropScrabbleFoundWords">

                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-9">
                                    <div class="row">
                                        <div class="col">
                                            <label><strong>2</strong> - Arraste as Palavras encontradas para o quadro
                                                <strong>1</strong></label>
                                            <div class="card">
                                                <div class="card-body">

                                                    <div id="ScrabbleContainer" class="container">

                                                        <div class="row">
                                                            <div class="col-md-12 " id="Scrabble"></div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="<?=base_url()?>assets/js/jquery-3.6.0.min.js"></script>
    <script src="<?=base_url()?>assets/jqueryui/jquery-ui.min.js"></script>
    <script src="<?=base_url()?>assets/js/bootstrap/bootstrap.js"></script>
    <script src="<?=base_url()?>assets/js/cacapalavras.js"></script>

</body>

</html>