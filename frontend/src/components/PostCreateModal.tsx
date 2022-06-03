import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { CreatePost } from './Types';

interface ModalProps {
  header: string;
  handleModal: (newPost: CreatePost) => void;
  closeModal: () => void;
  post: CreatePost;
}

interface PostPart {
  creator: string;
  title: string;
  content: string;
}

const style = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

export default function PostCreateModal({ handleModal, header, closeModal, post }: ModalProps) {
  const [postPart, setPostPart] = React.useState<PostPart>({ content: '', creator: '', title: '' });

  const handleClose = () => {
    closeModal();
    // setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case 'creator-field':
        setPostPart((state) => {
          return { ...state, creator: event.target.value };
        });
        break;
      case 'title-field':
        setPostPart((state) => {
          return { ...state, title: event.target.value };
        });
        break;
      case 'content-field':
        setPostPart((state) => {
          return { ...state, content: event.target.value };
        });
        break;
      default:
        setPostPart({ content: '', creator: '', title: '' });
    }
  };

  const handleSaveBtn = () => {
    handleModal(post);
  };

  return (
    <div>
      <Modal open onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {header}
          </Typography>
          <Box
            sx={{
              width: '100%',
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              // alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 0',
            }}
          >
            <TextField
              sx={{ marginBottom: 2 }}
              id="creator-field"
              label="Creator"
              variant="outlined"
              value={postPart.creator}
              onChange={handleChange}
            />
            <TextField
              sx={{ marginBottom: 2 }}
              id="title-field"
              label="Title"
              variant="outlined"
              value={postPart.title}
              onChange={handleChange}
            />
          </Box>
          <TextField
            sx={{ marginBottom: 2 }}
            id="content-field"
            label="Content"
            multiline
            maxRows={6}
            value={postPart.content}
            onChange={handleChange}
          />

          <Button onClick={handleSaveBtn} sx={{ margin: 2 }} variant="contained" color="success">
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
