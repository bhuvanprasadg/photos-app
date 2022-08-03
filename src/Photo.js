/* eslint-disable jsx-a11y/img-redundant-alt */
import ImagePreview from './ImagePreview';
function Photo(props) {
    return (
        <div className='card col-lg-3 col-md-5 col-sm-5 border displayInflex'>
            <ImagePreview imgsrc={props.imgsrc} fullImg={props.fullImg} />
            <div className='card-body'>
                <h5>
                    <b>{props.title}</b>
                </h5>
            </div>
        </div>
    );
}
export default Photo;
