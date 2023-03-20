const nome = process.argv[2]

console.log('Aplicativo Inciado!')

if (!nome) {
  console.log('Faltou o nome esperado')
} else {
  console.log(`Olá, ${nome}!`)
}
