import React, { useLayoutEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Alert } from '@mui/material';
import { PostProps } from './Types';
import PostChangeModal from './PostChangeModal';

export default function ListItem({ post, editable, deleteFunc, handleChangeModal }: PostProps) {
  const divRef = useRef(null);

  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    divRef.current.innerHTML = post.content;
  });

  const deleteBtnHandler = async () => {
    await deleteFunc(post.id);
  };

  const [openChangeModal, setOpenChangeModal] = useState(false);

  const closeChangeModal = () => {
    setOpenChangeModal(false);
  };

  const handleChangeBtn = () => {
    setOpenChangeModal(true);
  };

  return (
    <>
      {editable ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {openChangeModal ? (
            <PostChangeModal
              handleModal={handleChangeModal}
              header="Change post"
              closeModal={closeChangeModal}
              id={post.id}
              post={{
                content: post.content,
                creator: post.creator,
                title: post.title,
              }}
            />
          ) : null}
        </>
      ) : null}
      <Card variant="outlined" sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CardHeader title={post.title} subheader={`Creator: ${post.creator} | Date: ${post.pubDate}`} />
        <CardContent>
          <div className="content-wrapper" ref={divRef} />
        </CardContent>
        {editable ? (
          <CardActions>
            <Button onClick={handleChangeBtn} sx={{ margin: 2 }} variant="contained">
              Edit
            </Button>
            <Button onClick={deleteBtnHandler} sx={{ margin: 2 }} variant="contained" color="error">
              Delete
            </Button>
          </CardActions>
        ) : null}
      </Card>
    </>
  );
}
