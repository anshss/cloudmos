import { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import { makeStyles } from "tss-react/mui";
import { updateDeploymentLocalData } from "@src/utils/deploymentLocalDataUtils";
import { Snackbar } from "@src/components/shared/Snackbar";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from "@mui/material";
import { setRoyaltyRate } from "../../utils/evmContractInteraction";

const useStyles = makeStyles()(theme => ({
  dialogContent: {
    padding: "1rem"
  },
  dialogActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }
}));

export const RoyaltyRateModal = ({modelId, isOpen, onClose}) => {

  if (!isOpen) return null;
  const { classes } = useStyles();
  const formRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
        royalty: ""
    }
  });

  async function onSubmit() {
    let royaltyRate = getValues("royalty");
    console.log("entered royalty rate", royaltyRate)
    await setRoyaltyRate(modelId, royaltyRate)
  }

  return (
    <Dialog open={!!modelId}  maxWidth="xs" fullWidth>
      <DialogTitle>Update Royalty %</DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="royalty"
              render={({ field }) => {
                return <TextField {...field} autoFocus type="text" variant="outlined" label="Enter %" onChange={e => field.onChange(e.target.value)}/>;
              }}
            />
          </FormControl>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" type="submit" color="secondary" onClick={() => {onSubmit}}>Update</Button>
      </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
