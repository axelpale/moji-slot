// Euler-Mascheroni constant
const euler = 0.577215664901532

const harmonic = (n) => {
  // Get approximate of n:th harmonic number.
  // https://www.johndcook.com/blog/2017/04/18/computing-harmonic-numbers/
  if (n === 0) {
    return 0
  }
  if (n === 1) {
    return 1
  }
  return Math.log(n) + euler + (1 / (2 * n)) - (1 / (12 * n * n))
}

exports.sample = (n) => {
  // Pick randomly from a population of n units.
  // Return the frequency rank of the picked unit.
  // The frequency distribution follows Zipf's law.
  //
  const R = Math.random()
  const H = harmonic(n)

  let rank = 1
  let prob = 0

  while (rank < n) {
    prob += 1 / (H * rank)
    if (prob > R) {
      return rank
    }
    rank += 1
  }

  // If n non-positive
  return 0
}
