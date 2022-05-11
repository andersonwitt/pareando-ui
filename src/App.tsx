import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import React, { useEffect, useState } from "react";
import { AppBar } from "./components/atoms/AppBar";

const worker: Worker = new Worker("./workers/worker.js");

function App() {
  const [name, setName] = useState("");
  const [items, setItems] = useState<string[]>([
    "anderson",
    "carlos",
    "jordan",
    "alin",
    "ana",
    "fabian",
    "vinicius",
    "giovany",
    "joao",
    "leandro",
  ]);

  useEffect(() => {
    worker.onmessage = (event: MessageEvent) => {
      const { data } = event;
      setTeams(data);
    };
  }, []);

  //const [items, setItems] = useState<string[]>([]);

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

  const handleClickGenerateGroups = () => {
    worker.postMessage(items);
  };

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
              onClick={handleClickGenerateGroups}
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
