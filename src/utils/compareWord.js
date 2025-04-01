export const compareWord = (word, wordSelected, changeYouWon) => {

  // Contar caracteres
  if(typeof wordSelected === 'string') {
    if(word.toLowerCase() === wordSelected) {
      setTimeout(() => {
        changeYouWon(true)
      }, 1200)
    }
  }
  if(typeof wordSelected !== 'string') {
    if(wordSelected.every((e, index) => e === word[index])) {
      setTimeout(() => {
        changeYouWon(true)
      }, 1200)
    }
  }

  
  let response = []
  
  wordSelected = typeof wordSelected === 'string' ? wordSelected.split('') : wordSelected
  const letterQuantity = wordSelected.reduce((acc, cv) => {
    if(acc.hasOwnProperty(cv)) {
      acc[cv] += 1
    } else {
      acc[cv] = 1
    }
    return acc
  }, {})

  // Encontrar coincidencia perfecta
  for(let i = 0; i < word.length; i++) {
    const obj = { value: word[i], status: 'no'}
    if(word[i].toLowerCase() === wordSelected[i]) {
      response.push({...obj, status: 'perfect'})
      letterQuantity[word[i]] -= 1
    } else {
      response.push(obj)
    }
  }

  // Encontrar coincidencias imperfectas
  for(let i = 0; i < word.length; i++) {
    if(wordSelected.includes(word[i].toLowerCase()) && letterQuantity[word[i].toLowerCase()] !== 0 && response[i].status !== 'perfect') {
      const deleted = response.splice(i, 1)[0]
      response.splice(i, 0, {...deleted, status: 'imperfect'})
      letterQuantity[word[i].toLowerCase()] -= 1
    }
  }
  return response
}