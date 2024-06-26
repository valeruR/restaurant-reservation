"use client";

import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, TextField, Typography, Checkbox } from "@mui/material";
import { useGuestsSection } from "@ratatouille/modules/order/react/sections/use-guests-sections";
import DeleteIcon from "@mui/icons-material/Delete";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering-domain-model";

export const GuestsSection = () => {
  const presenter = useGuestsSection();

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h5">Invités</Typography>
      <Grid sx={{ paddingTop: 2 }} rowSpacing={4}>
        {presenter.form.guests.map((guest, index) => (
          <Box key={guest.id}>
            <GuestRow
              firstName={guest.firstName}
              lastName={guest.lastName}
              id={guest.id}
              age={guest.age}
              isOrganizer={guest.id === presenter.form.organizedId}
              onChange={presenter.updateGuest}
              remove={presenter.removeGuest}
              changeOrganizer={presenter.changeOrganizer}
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
          <Button variant="contained" onClick={presenter.onNext} disabled={presenter.isSubmittable === false}>
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
  isOrganizer: boolean;
  onChange: <T extends keyof OrderingDomainModel.Guest>(
    id: string,
    key: T,
    value: OrderingDomainModel.Guest[T]
  ) => void;
  remove: (id: string) => void;
  changeOrganizer: (id: string) => void;
}> = ({
  id,
  firstName,
  lastName,
  age,
  isOrganizer,
  onChange,
  remove,
  changeOrganizer
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
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={isOrganizer}
                onChange={() => changeOrganizer(id)}
              />
            }
            label="Organisateur"
          />
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