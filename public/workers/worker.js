function compareArrays(a1, a2) {
  return a1.length === a2.length && a1.every((value) => a2.includes(value));
}

const createGroupShuffled = (players = []) => {
  // Função para embaralhar um array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledPlayers = shuffleArray(players);
  const rounds = [];

  const playersPerTeam = 2; // Defina o número de jogadores em cada time

  if (shuffledPlayers.length % playersPerTeam !== 0) {
    shuffledPlayers.push("alone");
  }

  const totalPlayers = shuffledPlayers.length;
  const totalRounds = totalPlayers - 1;

  for (let round = 0; round < totalRounds; round++) {
    const roundMatches = [];
    const usedPlayers = new Set();

    for (let i = 0; i < totalPlayers / playersPerTeam; i++) {
      const team = [];

      for (let j = 0; j < playersPerTeam; j++) {
        let playerIndex;
        do {
          playerIndex = Math.floor(Math.random() * totalPlayers);
        } while (usedPlayers.has(playerIndex));
        usedPlayers.add(playerIndex);

        team.push(shuffledPlayers[playerIndex]);
      }

      roundMatches.push(team);
    }

    rounds.push(roundMatches);
  }

  return rounds;
};

self.onmessage = (e) => {
  const { data } = e;

  const returned = () =>
    new Promise((resolve) => {
      const result = createGroupShuffled(data);
      resolve(result);
    });

  (async () => {
    const result = await returned();
    self.postMessage(result);
  })();
};
