const argumento = process.argv[2].toLowerCase()

const game = ['pedra', 'papel', 'tesoura']
const pcChoise = Math.floor(Math.random() * game.length)
const npc = game[pcChoise]

if (argumento === 'pedra' || argumento === 'papel' || argumento === 'tesoura') {
  console.log(`Você escolheu ${argumento} e o computador escolheu ${npc}.`)

  if (argumento === 'pedra' && npc === 'tesoura') {
    console.log('Você ganhou!')
  }
  if (argumento === 'pedra' && npc === 'papel') {
    console.log('Você perdeu!')
  }
  if (argumento === 'papel' && npc === 'tesoura') {
    console.log('Você perdeu!')
  }
  if (argumento === 'papel' && npc === 'pedra') {
    console.log('Você ganhou!')
  }
  if (argumento === 'tesoura' && npc === 'papel') {
    console.log('Você ganhou!')
  }
  if (argumento === 'tesoura' && npc === 'pedra') {
    console.log('Você perdeu!')
  }
  if (argumento === npc) {
    console.log('Empate!')
  }
} else {
  console.log('Escolha "pedra", "papel" ou "tesoura"')
}
