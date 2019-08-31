//
// Varying-ratio reinforcement schedule
//
// Small wins are common.
// Large wins are rare.
//
// Bid is exactly at estimate.
//

// Some attributes:
// - const bid = 5
// - const smallestWin = 1

//
// Problem description: Find enjoyable power-law factor r so that
// the estimated win equals the bid. The law must be a discrete probability
// distribution.
//

// A discrete power-law probability distribution:
// I first looked into Pareto distribution which is continuous and then
// found Zipf's law, which is discrete.

// Zipf's law builds on simple rank-frequency inverse relation.
// Applied to our case, this yields:
// - P(Win = smallestWin) = X
// - P(Win = 2*smallestWin) = X/2
// - P(Win = 3*...) = X/3

// Zipf's PMF: (1 / k^s) / H_Ns, where:
// - k is the rank
// - s is the characterizing exponent
// - H_Ns = sum for n=[1, N] of (1 / n^s)
// - N is the number of possible rewards.

// Example. Let s = 1 and N = 3
// Then:
// - H_Ns = 1/1 + 1/2 + 1/3 = 1.8333...
// - k = 1: PMF = (1 / 1) / H_Ns = 0.5454...
// - k = 2: PMF = (1 / 2) / H_Ns = 0.2727...
// - k = 3: PMF = (1 / 3) / H_Ns = 0.1818...
// Sum equals to 1.

// Zipf's Mean: H_Ns-1 / H_Ns
// Mean win of the example:
// - H_Ns-1 = 3
// - H_Ns = 1.8333...
// - Mean = 1.6363...

// How to incorporate no-win?
// - Win prices are arbitrary. We can compute the mean win estimate
//   easily as we already know the propabilities thanks to PMF.
// - const wins = [0, 1, 2, 3, 4, ...] boring win distribution.

// If bet = 1:
// - At 1st win 0 credits with 0.545454... prob
// - At 2nd win 1 credit with 0.2727... prob.

// How big must 3rd win be to justify bet = 1?
//
// Weighted average:
// - Mean = Bet = 0 * 0.5454... + 1 * 0.2727... + X * 0.1818... = 1
// => X = 4

// Thus we get a win prices:
const wins = [0, 1, 4]

// Let us try it out.
const BET = 1
const N = wins.length
const H = wins.reduce((acc, w, i) => acc + 1 / (i + 1), 0)

// Probabilities for wins.
const P = wins.map((w, i) => 1 / (H * (i + 1)))

const sample = () => {
  // Return index of win.
  const r = Math.random()
  let i = 0
  let cumPro = 0
  while (i < P.length) {
    cumPro += P[i]
    if (cumPro > r) {
      return i
    }
    i += 1
  }
  // Should not get this far
  return P.length - 1
}

const play = (state) => {
  const i = sample()
  const win = wins[i]
  return {
    bet: BET,
    lastWin: win,
    funds: state.funds - BET + win
  }
}

exports.sample = () => {
  const i = sample()
  return wins[i]
}


// Provide some initial state and begin gambling:
// > let state = play({funds: 5})
// > state = play(state)

// Wow it works!
