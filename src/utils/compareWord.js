export const compareWord = (word, wordSelected, changeYouWon) => {

  if(word === wordSelected) {
    changeYouWon(true)
  }

  let response = []

  // Contar caracteres
  const letterQuantity = wordSelected.split("").reduce((acc, cv) => {
    if(acc.hasOwnProperty(cv)) {
      acc[cv] += 1
    } else {
      acc[cv] = 1
    }
    return acc
  }, {})

  console.log({letterQuantity, wordSelected})

  // Encontrar coincidencia perfecta
  for(let i = 0; i < word.length; i++) {
    const obj = { value: word[i], status: 'no'}
    if(word[i] === wordSelected[i]) {
      response.push({...obj, status: 'perfect'})
      letterQuantity[word[i]] -= 1
    } else {
      response.push(obj)
    }
  }

  // Encontrar coincidencias imperfectas
  for(let i = 0; i < word.length; i++) {
    if(wordSelected.includes(word[i]) && letterQuantity[word[i]] !== 0 && response[i].status !== 'perfect') {
      const deleted = response.splice(i, 1)[0]
      response.splice(i, 0, {...deleted, status: 'imperfect'})
      letterQuantity[word[i]] -= 1
    }
  }
  return response
}