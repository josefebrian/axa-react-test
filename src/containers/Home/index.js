import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserList, usersSelector } from './reducer';

function App() {
  const dispatch = useDispatch();

  const userList = useSelector(usersSelector);

  useEffect(() => {
    dispatch(fetchUserList());
  }, [])

  useEffect(() => {
    if (userList) {
      console.log("userList", userList);
    }
  }, [userList])

  return (
    <div className="text-center">
      <div className="mt-20 grid grid-cols-3 gap-4">
        {userList.map((val, index) => (
          <div key={index}>
            {val.username}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
