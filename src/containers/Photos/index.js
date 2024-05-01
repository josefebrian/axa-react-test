import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPhotosList, photosSelector } from './reducer';

function App() {
  const dispatch = useDispatch();

  const photosList = useSelector(photosSelector);

  useEffect(() => {
    dispatch(fetchPhotosList());
  }, [])

  useEffect(() => {
    if (photosList) {
      console.log("photosList", photosList);
    }
  }, [photosList])

  return (
    <div className="text-center">
      <div className="mt-20 grid grid-cols-3 gap-4">
        {photosList.map((val, index) => (
          <div key={index}>
            {val.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
