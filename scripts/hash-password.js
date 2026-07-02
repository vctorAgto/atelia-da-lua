const bcrypt = require('bcryptjs')

const senha = process.argv[2]

if (!senha) {
  console.log('Uso: npm run hash-password -- suasenha')
  process.exit(1)
}

const hash = bcrypt.hashSync(senha, 10)
console.log('\nCole isso na variável ADMIN_PASSWORD_HASH:\n')
console.log(hash)
console.log()
