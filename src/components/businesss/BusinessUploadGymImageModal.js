import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FileService from "../../service/modelService/FileService";
import FileTypeEnum from "../../enum/FileTypeEnum";

const BusinessUploadGymImageModal = ({id, refreshData}) => {
    const [show, setShow] = useState(false);
    const [file, setFile] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fileChange = (event) => {
        event.preventDefault();

        let name = event.target.name;
        let file = event.target.files[0];
        let fileType = file.type;

        let validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];

        if (!validImageTypes.includes(fileType)) {
            alert('This file must be JPEG, JPG or PNG image');
            file = null;
            document.getElementById(name).value = null;
        }

        setFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(file == null){
            alert('The image is required');
            return;
        }

        let data = {
            file: file,
            file_type: FileTypeEnum.GYM_IMAGE,
            model_id: id,
        }

        await new FileService().store(data);

        refreshData();
        handleClose();
    };

    return (
        <>
            <Button variant="primary" className="btn regular-button rounded-4" onClick={handleShow}>
                Upload image
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-secondary-color'>
                    <Modal.Title>Upload image</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-secondary-color'>
                    <Form>
                        <Form.Group controlId="formImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={fileChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='modal-secondary-color'>
                    <Button variant="secondary" onClick={handleClose} className='rounded-4'>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} className='rounded-4'>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BusinessUploadGymImageModal;