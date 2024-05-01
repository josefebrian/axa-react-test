import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';

import {
  fetchPhotosList,
  photosSelector
} from './reducer';

import CloseLogo from 'assets/images/close-icon.png';
import BackLogo from 'assets/images/arrow-left-icon.png';
import { Loader } from 'components';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: albumsId } = useParams();

  const { records: photosRecord, loading } = useSelector(photosSelector);

  const [photosList, setPhotosList] = useState(null)
  const [showPhoto, setShowPhoto] = useState(false)
  const [activePhoto, setActivePhoto] = useState(null)

  useEffect(() => {
    dispatch(fetchPhotosList({ id: albumsId }));
  }, [albumsId])

  useEffect(() => {
    if (photosRecord?.length > 0) setPhotosList(photosRecord);
  }, [photosRecord])

  return (
    <>
      <div className="text-center">
        <div className="grid grid-cols-3 items-center pt-4">
          <div className="flex items-center gap-2">
            <div>
              <img className="cursor-pointer" width={24} src={BackLogo} alt="BackLogo" onClick={() => navigate("/albums")} />
            </div>
            <p className="text-lg font-bold">Back</p>
          </div>
          <p className="text-2xl font-bold">Photos</p>
        </div>
        {loading && (
          <div className="text-center flex justify-center pt-10">
            <Loader />
          </div>
        )}

        {!loading && (
          <div className="pt-2 grid grid-cols-3 gap-4">
            <>
              {photosList?.map((val, index) => (
                <>
                  <div key={index} className="border-[1px] border-red-1 cursor-pointer rounded-lg px-4"
                    onClick={() => {
                      setShowPhoto(true);
                      setActivePhoto(val);
                    }}
                  >
                    <div className="flex flex-col justify-center items-center py-4">
                      <div className="pb-4">
                        <img src={val.thumbnailUrl} alt="thumbnail" />
                      </div>
                      <div className="font-bold text-lg">
                        {val.title}
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </>
          </div>
        )}
      </div>

      <Modal
        show={showPhoto}
        onHide={() => {
          setShowPhoto(false)
          setActivePhoto(null)
        }}
        keyboard={false}
        dialogClassName="modal-25w"
      >
        <Modal.Header className="justify-end">
          <Modal.Title>
            <img className="cursor-pointer" width={12} src={CloseLogo} alt="CloseLogo"
              onClick={() => {
                setShowPhoto(false)
                setActivePhoto(null)
              }}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-[40px] py-[24px] bg-gray-2">
          <div className="mb-4 pb-4 pt-2 px-2">
            <div className="flex justify-center pb-4">
              <img src={activePhoto?.url} alt="Logo" />
            </div>
            <div className='text-center text-2xl font-bold'>
              {activePhoto?.title}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
