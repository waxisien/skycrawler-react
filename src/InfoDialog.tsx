import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { useQuery } from "@apollo/react-hooks";

import { STATS } from "src/lib/queries";
import { Stats } from "src/types";

import "./InfoDialog.css";

interface InfoDialogProps {
  open: boolean;
  onClose: () => void;
}

const InfoDialog = (props: InfoDialogProps): JSX.Element => {
  const { open, onClose } = props;
  const { loading, error, data } = useQuery(STATS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const stats: Stats = data.stats;
  const syncDate = new Date(Date.parse(stats.lastSynchronization));

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Info</DialogTitle>
      <p className="info-dialog-stats">
        Data from{" "}
        <a
          href="https://www.skyscrapercity.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          SkyscraperCity
        </a>
        .<br />
        <br />
        <b>{stats.totalBuildings}</b> buildings across{" "}
        <b>{stats.totalCities}</b> cities.
        <br />
        <br />
        Last synchronization: <b>{syncDate.toLocaleDateString()}</b>.
      </p>
    </Dialog>
  );
};

export default InfoDialog;
