// src/hooks/useConfirmDialog.ts
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface UseConfirmDialogResult {
  open: boolean;
  show: () => void;
  hide: () => void;
  confirm: (action: () => void) => void;
  ConfirmDialog: React.FC;
}

const useConfirmDialog = (): UseConfirmDialogResult => {
  const [open, setOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

  const show = () => {
    setOpen(true);
  };

  const hide = () => {
    setOpen(false);
  };

  const confirm = (action: () => void) => {
    setOnConfirm(() => action);
    show();
  };

  const ConfirmDialog: React.FC = () => (
    <Dialog open={open} onClose={hide}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this raport? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={hide} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            hide();
          }}
          color="secondary"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { open, show, hide, confirm, ConfirmDialog };
};

export default useConfirmDialog;
