"use client";

import { Box, Button, FormControl, FormLabel, Grid, TextField, Typography } from "@mui/material";
import { useGuestsSection } from "@ratatouille/modules/order/react/sections/use-guests-sections";
import DeleteIcon from "@mui/icons-material/Delete";

export const GuestsSection = () => {
  const presenter = useGuestsSection();

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h5">Invités</Typography>
      <Grid sx={{ paddingTop: 2 }} rowSpacing={4}>
        {presenter.guests.map((guest, index) => (
          <Box key={Math.random()}>
            <GuestRow
              firstName={guest.firstName}
              lastName={guest.lastName}
              id={guest.id}
              age={guest.age}
              onChange={presenter.updateGuest}
              remove={presenter.removeGuest}
            />
          </Box>
          ))}
      </Grid>

      <Grid
        container
        direction={"row"}
        alignItems={"center"}
        spacing={1}
        marginTop={2}
      >
        <Grid item>
          <Button variant="contained" onClick={presenter.addGuest}>
            Ajouter
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={presenter.onNext} disabled={false}>
            Suivant
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
};

const GuestRow: React.FC<{
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  onChange: (id: string, key: string, value: any) => void;
  remove: (id: string) => void;
}> = ({
  id,
  firstName,
  lastName,
  age,
  onChange,
  remove
}) => {
  return (
    <Box>
      <Grid container direction={"row"} alignItems={"center"} spacing={1}>
        <Grid item>
          <FormControl>
            <FormLabel>Prénom</FormLabel>
            <TextField value={firstName} onChange={(e) => onChange(id, 'firstName', e.target.value)} />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Nom</FormLabel>
            <TextField value={lastName} onChange={(e) => onChange(id, 'lastName', e.target.value)} />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Âge</FormLabel>
            <TextField value={age} onChange={(e) => onChange(id, 'age', parseInt(e.target.value, 10))} />
          </FormControl>
        </Grid>
        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" onClick={() => remove(id)} color="error" startIcon={<DeleteIcon />}>
            Supprimer
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};