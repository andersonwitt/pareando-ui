import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import React, { useState } from "react";
import { AppBar } from "./components/atoms/AppBar";

function compareArrays(a1: any[], a2: any[]) {
  return a1.length === a2.length && a1.every((value) => a2.includes(value));
}

function App() {
  const [name, setName] = useState("");
  // const [items, setItems] = useState<string[]>([
  //   "Anderson",
  //   "Carlos",
  //   "Fabian",
  //   "João",
  //   "Jordan",
  //   "Giovany",
  //   "Leandro",
  // ]);
  const [items, setItems] = useState<string[]>([]);

  const [teams, setTeams] = useState<string[][][]>([]);

  const handleClicked = () => {
    setItems([...items, name]);
    setName("");
  };

  const handleRemoveClicked = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const createGroupShuffled = () => {
    debugger;
    const rounds: string[][][] = [];
    while (rounds.length < items.length) {
      let groups: string[][] = [];
      let array = [...items];
      while (array.length > 0) {
        const pair: string[] = [];
        let second = [...array];
        pair.push(
          second.splice(Math.floor(Math.random() * second.length), 1)[0]
        );

        if (second.length > 1) {
          pair.push(
            second.splice(Math.floor(Math.random() * second.length), 1)[0]
          );
        }
        const thereIsSomeItemEqual = rounds
          .flat()
          .some((item) => compareArrays(item, pair));

        if (!thereIsSomeItemEqual) {
          groups.push(pair);
          array = [...second];
          continue;
        }

        groups = [];
        array = [...items];
      }
      if (array.length === 0) {
        rounds.push(groups);
      }
    }
    setTeams(rounds);
  };

  // const createGroupShuffled = () => {
  //   debugger;
  //   //const rounds: string[][][] = [];
  //   //while (rounds.length < items.length) {
  //   const nPairs = items.length % 2 === 0 ? items.length : items.length + 1;
  //   const seila = (nPairs / 2) * items.length;
  //   let groups: string[][] = [];
  //   let array = [...items];
  //   while (groups.length < seila) {
  //     const pair: string[] = [];
  //     let second = [...array];
  //     pair.push(second.splice(Math.floor(Math.random() * second.length), 1)[0]);

  //     if (second.length > 0) {
  //       pair.push(
  //         second.splice(Math.floor(Math.random() * second.length), 1)[0]
  //       );
  //     }
  //     const thereIsSomeItemEqual = groups.some((item) =>
  //       compareArrays(item, pair)
  //     );

  //     //const isEmpty = pair.filter((item) => item).length <= 0;

  //     if (!thereIsSomeItemEqual) {
  //       groups.push(pair);
  //       array = [...second];
  //       continue;
  //     }

  //     //groups = [];
  //     array = [...items];
  //   }
  //   console.log(groups);
  //   // if (array.length === 0) {
  //   //   rounds.push(groups);
  //   // }
  //   //}
  //   //setTeams(rounds);
  // };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClicked();
    }
  };

  return (
    <div className="App">
      <AppBar />
      <Box width="100%" mt={7}>
        <Grid container spacing={2} style={{ padding: 15 }}>
          <Grid item xs={10}>
            <TextField
              onKeyDown={onKeyDown}
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Integrante"
              fullWidth
              margin="dense"
              variant="outlined"
              placeholder="Digite o nome."
            />
          </Grid>
          <Grid item xs={2}>
            <Box
              height="100%"
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button onClick={handleClicked} variant="outlined" fullWidth>
                Add
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {items.map((item, index) => (
              <Box
                alignItems="center"
                display="flex"
                justifyContent="space-between"
                key={index}
                width="100%"
              >
                <p>{item}</p>
                <Tooltip title="Remover">
                  <IconButton onClick={() => handleRemoveClicked(index)}>
                    <RemoveCircleOutlineOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={createGroupShuffled}
              fullWidth
            >
              Gerar Grupos
            </Button>
          </Grid>
          <Grid item xs={12}>
            {teams.map((team, index) => (
              <Box key={`group-${index}`}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  {team.map((pairs, teamIndex) => (
                    <p key={`pair-${teamIndex}`}>
                      {pairs.map((pair, pairIndex) => (
                        <>
                          {`${pair} `}
                          {pairIndex === 0 && pairs.length > 1 ? (
                            <div> - </div>
                          ) : null}
                        </>
                      ))}
                    </p>
                  ))}
                </Box>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
