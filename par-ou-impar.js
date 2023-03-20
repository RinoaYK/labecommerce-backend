function getRndInteger (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const numero = process.argv[2]
const jogador = numero % 2 === 0 ? 'par' : 'impar'
var regra = /^[0-9]+$/

if (!numero.match(regra)) {
  console.log('Escolha par ou ímpar!')
} else {
  const npc = getRndInteger(0, 10)

  const computador = npc % 2 === 0 ? 'par' : 'impar'

  const soma = +numero + +npc
  const resultado = soma % 2 === 0 ? 'par' : 'impar'

  console.log(
    `Você escolheu ${numero}, ${jogador} e o computador escolheu ${npc}, ${computador}. A soma é ${soma}, ${resultado}.`
  )

  if (jogador === resultado && computador !== resultado) {
    console.log('Você ganhou!')
  } else if (jogador === resultado && computador === resultado) {
    console.log('Empate!')
  } else if (jogador !== resultado && computador === resultado) {
    console.log('Você perdeu!')
  } else {
    console.log('Ninguém ganhou!')
  }
}
