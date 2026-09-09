
## useEffect de carregamento
O primeiro useEffect está localizado no arquivo App.js e é responsável por carregar as metas salvas no AsyncStorage quando o aplicativo é iniciado. Ele utiliza AsyncStorage.getItem() para recuperar os dados armazenados e JSON.parse() para transformar os dados em um array novamente.
## useEffect de salvamento
O segundo useEffect, também localizado no App.js, é responsável por salvar as metas no AsyncStorage sempre que o array metas é alterado. Para isso, utiliza JSON.stringify() para transformar o array em texto antes de armazená-lo com AsyncStorage.setItem().
Dessa forma, as metas permanecem salvas mesmo depois que o aplicativo é fechado e aberto novamente.
