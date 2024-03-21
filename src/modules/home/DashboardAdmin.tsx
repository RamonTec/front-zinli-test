import React from 'react';
import { useState, useEffect } from 'react';
import { getPosts, aprovePost, deletePost } from '../../shared/rest/post';
import { PostModel } from '../../shared/types';
import { toast } from 'react-toastify';
import { LoaderRequest } from '../../components/loaders';
import { CardPostAdmin } from '../../components/postCardAdmin';
import { ModalDetail } from '../../components/modalDetail';
import { CardPostDetailAdmin } from '../../components/postDetailAdmin';
import { Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MyPagination from '../../components/MyPagination';

const HomeAdmin: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [postsData, setPostsData] = useState<PostModel[]>([]);
  const [show, setShow] = useState(false);
  const [postDetail, setOnePostDetail] = useState<PostModel | null>();
  const [selectedStatus, setSelectedStatus] = useState<string>('published');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const fetchQueryPosts = async () => {
    const postFetch = await getPosts(selectedStatus, startDate as Date, endDate as Date, currentPage, 10);
    setPostsData(postFetch.posts);
  }

  const fetchAprovePost = async (_status: string) => {
    const postFetch = await aprovePost(postDetail?._id as string, _status);
    setLoading(false);
    if (postFetch.status === 200) {
      toggleShow();
      setOnePostDetail(null);
      fetchQueryPosts();
      toast.success("Post aprove", {
        position: "top-right"
      });
    } else {
      toast.success("Error updating post, try again", {
        position: "top-right"
      });
    }
  }

  const fetchDeletePost = async (_status: string) => {
    const postFetch = await deletePost(postDetail?._id as string, _status);
    setLoading(false);
    if (postFetch.status === 200) {
      toggleShow();
      setOnePostDetail(null);
      fetchQueryPosts();
      toast.success("Post deleted", {
        position: "top-right"
      });
    } else {
      toast.success("Error updating post, try again", {
        position: "top-right"
      });
    }
  }

  const handleAprovePost = () => {
    setLoading(true);
    fetchAprovePost('published');
  }

  const handleDeletePost = () => {
    setLoading(true);
    fetchDeletePost('deleted');
  }

  useEffect(() => {
    fetchQueryPosts();
  }, [selectedStatus, currentPage]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      { loading ?? <LoaderRequest></LoaderRequest> }

      <div className="row  d-flex justify-content-center align-items-center">
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
          <Form.Select value={selectedStatus} onChange={handleChange}>
            <option value="published">Published</option>
            <option value="deleted">Deleted</option>
            <option value="drafted">Drafted</option>
          </Form.Select>
        </div>
      </div>

      <ModalDetail
        action={() => handleClose()}
        showModal={show}
        aprovePost={() => handleAprovePost()}
        deletedPost={() => handleDeletePost()}
      >
        <CardPostDetailAdmin
          message={postDetail?.message as string}
          likes={postDetail?.likes?.length}
          author={postDetail?.author as string}
          image={postDetail?.image}
        />
      </ModalDetail>

      { postsData.length === 0 ? (
        <div style={{ marginTop: '10%' }}>
          <p className='text-danger-emphasis fs-5 fw-bold text-center'>No records found</p>
        </div>
      ) : null }

      <div>
        {postsData.map((postData, index) => (
          <CardPostAdmin
            key={index}
            message={postData.message}
            likes={postData?.likes?.length}
            author={postData.author}
            action={() => {
              console.log('--- here');
              setOnePostDetail(postData);
              toggleShow();
            }}
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

export default HomeAdmin;