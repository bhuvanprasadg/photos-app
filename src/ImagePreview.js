/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from 'react';
import { ModalBody, ModalFooter, ModalHeader, Button, Modal } from 'reactstrap';

function ImagePreviewComponent(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <div>
            <img
                src={props.imgsrc}
                alt='here should be an image'
                onClick={toggle}
            />
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Image Full View : </ModalHeader>
                <ModalBody>
                    <img src={props.fullImg} alt='image in full screen mode' />
                </ModalBody>
                <ModalFooter>
                    <Button color='danger' onClick={toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
export default ImagePreviewComponent;
