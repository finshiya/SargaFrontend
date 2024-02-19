import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal'; 
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../style/delete.css';
import { Container } from 'react-bootstrap';

const DeleteModal = ({getDatas,deleteclose, dlt,id, selectedName}) => {

    const [remove, setRemove] = useState(id)


    useEffect(() => {
      setRemove(id)
    }, [id])
  

    const [show, setShow] = useState(dlt)

    useEffect(() => {
      setShow(dlt)
    }, [dlt])
  
    const handleModalClose = () => {
        deleteclose()
        setShow(false)
      }

    const onDelete = (_id) => {
      const response = axios.patch(`http://localhost:3000/support/${_id}`)
          .then(() => {
            if (response.status === 200) {
             
        toast.success('Data successfully added', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          className: 'toast-message',
        });
              }
            getDatas();
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
          });
      };
    



      return (
        <>
              <ToastContainer autoClose={50000} />

        <Modal show={show} backdrop="static" centered onHide={handleModalClose} animation={false} dialogClassName="delete-modal" >
          <Modal.Header closeButton >
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <Container>
            <p>Are you sure want to delete  <span style={{color:'red'}}>  {selectedName}</span>  ?  </p>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="primary" className="text-white" onClick={handleModalClose}>
              Cancel
            </Button> */}
            <Button style={{ background: '#e7e7e7', color: 'rgb(89 89 89)', border: '1px solid rgb(228 228 228)' }} onClick={handleModalClose}>
            Cancel
          </Button>
            <Button
              variant="success"
              className="text-white"
              onClick={() => {
                onDelete(remove); 
                handleModalClose();
              }}
            >
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      )
}

export default DeleteModal