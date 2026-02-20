const HOUSES = /** @type {const} */ (['G', 'H', 'R', 'S'])

export function createInitialScores() {
  return { G: 0, H: 0, R: 0, S: 0 }
}

export function applyScores(scores, delta) {
  // delta is an object like {g: 25, r: 50}
  for (const k of HOUSES) scores[k] += Number(delta?.[k.toLowerCase()] ?? 0)
}

export function pickHouse(scores) {
  // deterministic tie-break: highest score, then fixed priority G>R>H>S (you can change)
  const order = ['G', 'R', 'H', 'S']
  return order
    .map((k) => ({ k, v: scores[k] }))
    .sort((a, b) => b.v - a.v)[0].k
}

export function houseMeta(houseKey) {
  switch (houseKey) {
    case 'G':
      return { key: 'G', name: 'Gryffindor', vibe: 'bravery, helping others and chivalry' }
    case 'H':
      return { key: 'H', name: 'Hufflepuff', vibe: 'hard work, patience, loyalty and fair play' }
    case 'R':
      return { key: 'R', name: 'Ravenclaw', vibe: 'intelligence, knowledge, planning ahead and wit' }
    case 'S':
      return { key: 'S', name: 'Slytherin', vibe: 'ambition, cunningness, heritage and resourcefulness' }
    default:
      return { key: '?', name: 'Unknown', vibe: '' }
  }
}