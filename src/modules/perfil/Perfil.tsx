import React, { useState, useEffect } from 'react';
import { createPost, getPosts } from '../../shared/rest/post';
import { PostForm } from '../../components/postForm';
import { ErrorMessages, PostModel } from '../../shared/types';
import { GetUserLocalStorage } from '../../shared/utils/session.storage';
import { toast } from 'react-toastify';
import { LoaderRequest } from '../../components/loaders';
import { CardPost } from '../../components/postCard';
import { Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MyPagination from '../../components/MyPagination';

const Perfil: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [postsData, setPostsData] = useState<PostModel[]>([]);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchCreatePost = async (body: PostModel) => {
    const response = await createPost(body);
    setLoading(false);
    if (response.status === 200) {
      toast.success("Post creado!", {
        position: "top-right"
      });
      fetchQueryPosts();
      return
    }
    if (response.response.data.message === ErrorMessages.emailExist) {
      toast.error("No se pudo crear el post", {
        position: "top-right"
      });
      return
    }
  }

  const fetchRequest = (_dataForm: string) => {
    setLoading(true);
    const userStorage = GetUserLocalStorage();
    const postData: PostModel = {
      message: _dataForm,
      status: 'drafted',
      author: `${userStorage?.data.name} ${userStorage?.data.surname}`,
      create_at: new Date(),
      location: 'ubicacion provicional'
    }

    fetchCreatePost(postData);
  }

  const fetchQueryPosts = async () => {
    const status = 'published';
    const postFetch = await getPosts(status, startDate as Date, endDate as Date, currentPage, 10);
    setPostsData(postFetch.posts);
  }

  useEffect(() => {
    fetchQueryPosts();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      { loading ?? <LoaderRequest></LoaderRequest> }

      <div className="row justify-content-center align-items-center">
        <div className="col-md-2">
          <Form.Group controlId="startDate">
            <Form.Label className='text-warning-emphasis fs-6 fw-bold'>Fecha de inicio:</Form.Label>
            <br />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="YYYY/MM/DD"
              className="form-control"
            />
          </Form.Group>
        </div>
        <div className="col-md-2">
          <Form.Group controlId="endDate">
            <Form.Label className='text-warning-emphasis fs-6 fw-bold'>Fecha de fin:</Form.Label>
            <br />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="YYYY/MM/DD"
              className="form-control"
            />
          </Form.Group>

        </div>
        <div className="col-md-2">
          <Button variant="primary" onClick={() => fetchQueryPosts()}>
            Buscar
          </Button>
        </div>
        <div className="col-md-2">
          <PostForm action={fetchRequest} />
        </div>
      </div>

      { postsData.length === 0 ? (
        <div style={{ marginTop: '10%' }}>
          <p className='text-danger-emphasis fs-5 fw-bold text-center'>No records found</p>
        </div>
      ) : null }

      <div>
        {postsData.map((postData, index) => (
          <CardPost
            key={index}
            message={postData.message}
            likes={postData?.likes?.length}
            author={postData.author}
            image={postData.image}
          />
        ))}
      </div>

      <div className="d-flex flex-column align-items-center">
        <MyPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>

    </>
  );
}

export default Perfil;