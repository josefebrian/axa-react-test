import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPostList, postsSelector } from './reducer';

function App() {
  const dispatch = useDispatch();

  const postsList = useSelector(postsSelector);

  useEffect(() => {
    dispatch(fetchPostList());
  }, [])

  useEffect(() => {
    if (postsList) {
      console.log("postsList", postsList);
    }
  }, [postsList])

  return (
    <div className="text-center">
      <div className="mt-20 grid grid-cols-3 gap-4">
        {postsList.map((val, index) => (
          <div key={index}>
            {val.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
