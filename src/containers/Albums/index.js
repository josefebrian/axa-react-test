import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { get } from 'idb-keyval';

import {
  fetchAlbumList,
  albumsSelector
} from './reducer';

import BackLogo from 'assets/images/arrow-left-icon.png';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const albumsRecord = useSelector(albumsSelector);

  const [activeUser, setActiveUser] = useState(null)
  const [albumsList, setAlbumsList] = useState(null)

  useEffect(() => {
    dispatch(fetchAlbumList());
    getUserActive();
  }, [])

  useEffect(() => {
    if (albumsRecord?.length > 0) setAlbumsList(albumsRecord);
  }, [albumsRecord])

  // get active user from idb (local storage)
  const getUserActive = async () => {
    const activeUser = await get("activeUser");
    if (activeUser?.id) setActiveUser(activeUser);
  }

  return (
    <>
      <div className="text-center">
        <div className="grid grid-cols-3 items-center pt-4">
          <div className="flex items-center gap-2">
            <div>
              <img className="cursor-pointer" width={24} src={BackLogo} alt="BackLogo" onClick={() => navigate("/menu")} />
            </div>
            <p className="text-lg font-bold">Back</p>
          </div>
          <p className="text-2xl font-bold">Albums</p>
        </div>
        <div className="pt-2 grid grid-cols-3 gap-4">
          {albumsList?.map((val, index) => (
            <>
              {val?.userId === activeUser?.id && (
                <div key={index} className="border-[1px] border-red-1 cursor-pointer rounded-lg px-4"
                  onClick={() => {
                    navigate(`${val.id}/photos`)
                  }}
                >
                  <div className="flex flex-col justify-center items-center py-4">
                    <div className="font-bold text-lg">
                      {val.title}
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
