import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAlbumList, albumsSelector } from './reducer';

function App() {
  const dispatch = useDispatch();

  const albumsList = useSelector(albumsSelector);

  useEffect(() => {
    dispatch(fetchAlbumList());
  }, [])

  useEffect(() => {
    if (albumsList) {
      console.log("albumsList", albumsList);
    }
  }, [albumsList])

  return (
    <div className="text-center">
      <div className="mt-20 grid grid-cols-3 gap-4">
        {albumsList.map((val, index) => (
          <div key={index}>
            {val.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
