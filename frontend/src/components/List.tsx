import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import axios from 'axios';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link, useLocation } from 'react-router-dom';
import { Alert, FormControl, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import ListItem from './ListItem';
// eslint-disable-next-line import/named
import { ChangePost, CreatePost, Post } from './Types';
import setSearchParams from '../helpers/Common';
import PostCreateModal from './PostCreateModal';

interface ListProps {
  editable: boolean;
}

interface PaginationObject {
  itemCount: number;
  page: number;
}

interface ParamsObject {
  take: number;
  skip: number;
  order: 'ASC' | 'DESC';
  orderField: string;
  searchField: string;
  search: string;
}

export default function List({ editable }: ListProps) {
  const ITEMS_PER_PAGE = 5;

  const [posts, setPosts] = useState<Post[]>([]);
  const [pending, setPending] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationObject>({
    itemCount: 3,
    page: 1,
  });

  const location = useLocation();

  const skip = ITEMS_PER_PAGE * (parseInt(location.search.split('=')[1], 10) - 1);

  const [params, setParams] = useState<ParamsObject>({
    take: ITEMS_PER_PAGE,
    skip: Number.isNaN(skip) ? 0 : skip,
    order: 'DESC',
    orderField: 'title',
    search: '',
    searchField: 'title',
  });

  // const getSearchString = () => {
  //   const url = new URL(location.pathname, `${process.env.REACT_APP_API_URL}/${location.pathname}`);
  //   setSearchParams(url, params);
  //   return `${location.pathname}/${url.search}`;
  // };

  const getSearchParamsString = () => {
    const url = new URL(location.pathname, `${process.env.REACT_APP_API_URL}/${location.pathname}`);
    setSearchParams(url, params);
    return url.search;
  };

  const getPosts = async (link: string): Promise<[Post[], number]> => {
    try {
      setPending(true);
      const resp = await axios.get(`/posts/${link}`);
      return resp.data;
    } catch (e) {
      return [[], 0];
    } finally {
      setPending(false);
    }
  };

  const Refresh = () => {
    const query = new URLSearchParams(location.search);

    getPosts(getSearchParamsString())
      .then((result) => {
        setPosts(result[0]);
        setPagination((state) => {
          return {
            ...state,
            itemCount: result[1],
            page: parseInt(query.get('page') || '1', 10),
          };
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    const url = new URL(location.pathname, `${process.env.REACT_APP_API_URL}/${location.pathname}`);
    setSearchParams(url, params);

    getPosts(url.search)
      .then((result) => {
        setPosts(result[0]);
        setPagination((state) => {
          return {
            ...state,
            itemCount: result[1],
            page: parseInt(query.get('page') || '1', 10),
          };
        });
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  }, [location.pathname, location.search, params]);

  const deleteItem = async (id: string) => {
    await axios.delete(`/posts/${id}`);
    Refresh();
  };

  const handleSearchSelectChange = (event: SelectChangeEvent) => {
    setParams((state) => {
      return { ...state, searchField: event.target.value as string };
    });
  };

  const handleSortBySelectChange = (event: SelectChangeEvent) => {
    setParams((state) => {
      return { ...state, orderField: event.target.value as string };
    });
  };

  const handleOrderSelectChange = (event: SelectChangeEvent) => {
    setParams((state) => {
      return { ...state, order: event.target.value as 'ASC' | 'DESC' };
    });
  };

  const handleSearchFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParams((state) => {
      return { ...state, search: event.target.value as string };
    });
    Refresh();
  };

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setParams((state) => {
      return { ...state, skip: ITEMS_PER_PAGE * (page - 1) };
    });
    Refresh();
  };

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  const closeCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleCreateModal = async (post: CreatePost | ChangePost) => {
    try {
      await axios.post('/posts', post);
    } catch (e: any) {
      setErrorMsg(e.message);
    }
    closeCreateModal();
    Refresh();
  };

  const handleChangeModal = async (id: string, post: CreatePost | ChangePost) => {
    try {
      await axios.patch(`/posts/${id}`, post);
    } catch (e: any) {
      setErrorMsg(e.message);
    }
    closeCreateModal();
    Refresh();
  };

  const handleCreateBtn = () => {
    setOpenCreateModal(true);
  };

  return (
    <Container component="main" sx={{ maxWidth: 700 }}>
      {editable ? (
        <>
          {openCreateModal ? (
            <PostCreateModal
              handleModal={handleCreateModal}
              header="New post"
              closeModal={closeCreateModal}
              post={{
                categories: ['Sample', 'Categories', 'Here'],
                content: '',
                contentSnippet: 'Sample content snippet',
                creator: '',
                link: 'https://sample.link.com',
                title: '',
              }}
            />
          ) : null}
          <Container sx={{ maxWidth: 700 }}>
            {errorMsg.length ? (
              <Alert severity="error" sx={{ mt: 5 }}>
                {errorMsg}
              </Alert>
            ) : null}
            <Button
              onClick={handleCreateBtn}
              sx={{ width: '100%', marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              variant="contained"
              color="success"
            >
              Create
            </Button>
          </Container>
        </>
      ) : null}
      <Container
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          onChange={handleSearchFieldChange}
          sx={{ flexGrow: 6 }}
        />
        <FormControl sx={{ flexGrow: 2, ml: 10, width: 20 }}>
          <InputLabel id="search-select-label">Search by</InputLabel>
          <Select
            labelId="search-select-label"
            id="search-select"
            value={params.searchField}
            onChange={handleSearchSelectChange}
            label="Search by"
            variant="outlined"
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="creator">Creator</MenuItem>
          </Select>
        </FormControl>
      </Container>
      <Container
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <FormControl sx={{ flexGrow: 2, ml: 10, width: 20 }}>
          <InputLabel id="sortBy-select-label">Sort by</InputLabel>
          <Select
            labelId="sortBy-select-label"
            id="sortBy-select"
            value={params.orderField}
            onChange={handleSortBySelectChange}
            label="Sort by"
            variant="outlined"
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="creator">Creator</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ flexGrow: 2, ml: 10, width: 20 }}>
          <InputLabel id="order-select-label">Order</InputLabel>
          <Select
            labelId="order-select-label"
            id="order-select"
            value={params.order}
            onChange={handleOrderSelectChange}
            label="Order"
            variant="outlined"
          >
            <MenuItem value="ASC">ASC</MenuItem>
            <MenuItem value="DESC">DESC</MenuItem>
          </Select>
        </FormControl>
      </Container>
      {pending ? (
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {posts.length ? (
            <>
              {posts.map((post) => (
                <ListItem
                  post={post}
                  editable={editable}
                  deleteFunc={deleteItem}
                  handleChangeModal={handleChangeModal}
                  key={post.id}
                />
              ))}
              <Pagination
                sx={{ marginTop: 8, marginBottom: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                page={pagination.page}
                count={Math.ceil(pagination.itemCount / params.take)}
                onChange={handlePaginationChange}
                defaultPage={1}
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={`${location.pathname}${item.page === 1 ? '' : `?page=${item.page}`}`}
                    {...item}
                  />
                )}
              />
            </>
          ) : (
            <Alert severity="error" sx={{ mt: 5 }}>
              Posts not found
            </Alert>
          )}
        </>
      )}
    </Container>
  );
}
