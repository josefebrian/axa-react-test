import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { set, get } from 'idb-keyval';
import Modal from 'react-bootstrap/Modal';

import { fetchUserList, usersSelector } from './reducer';

import Logo from 'assets/images/users.png';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector(usersSelector);

  const [showLogin, setShowLogin] = useState(false)
  const [activeUser, setActiveUser] = useState(null)

  useEffect(() => {
    dispatch(fetchUserList());
    getUserActive();
  }, [])

  /* 
  get active user from idb (local storage) and
  navigate to posts page if there is an active user on idb
  */
  const getUserActive = async () => {
    const activeUser = await get("activeUser");

    if (activeUser?.id) navigate("posts");
  }

  // save active user into idb (local storage)
  const saveUserActive = async () => {
    await set("activeUser", activeUser);

    setActiveUser(null);
    navigate("posts")
  }

  return (
    <>
      <div className="text-center px-10">
        <p className="text-2xl pt-4 font-bold">Users</p>
        <div className="pt-2 grid grid-cols-5 gap-4">
          {userList.map((val, index) => (
            <div key={index} className="border-[1px] border-red-1 cursor-pointer rounded-lg"
              onClick={() => {
                setShowLogin(true);
                setActiveUser(val);
              }}
            >
              <div className="flex flex-col justify-center items-center py-4">
                <div className="pb-4">
                  <img src={Logo} alt="Logo" />
                </div>
                <div>
                  {val.username}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        show={showLogin}
        onHide={() => {
          setShowLogin(false)
          setActiveUser(null)
        }}
        keyboard={false}
        dialogClassName="modal-25w"
      >
        <Modal.Header className="justify-center">
          <Modal.Title className="text-base font-bold">
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-[40px] py-[24px] bg-gray-2">
          <div className="mb-4 pb-4 pt-2 px-2 border-[2px] border-gray-1 rounded-lg drop-shadow-sm">
            <div className="flex justify-center pb-4">
              <img src={Logo} alt="Logo" />
            </div>
            <div className='text-left pb-1'>
              UserName : {activeUser?.username}
            </div>
            <div className='text-left pb-1'>
              Name : {activeUser?.name}
            </div>
            <div className='text-left pb-1'>
              Phone : {activeUser?.phone}
            </div>
            <div className='text-left pb-1'>
              Website : {activeUser?.website}
            </div>
            <div className='text-left'>
              Company : {activeUser?.company.name}
            </div>
          </div>

          <p className="text-base text-center">
            Are you sure you want to login into this account ?
          </p>
          <div className="flex justify-center pt-3">
            <button
              className="border-[1px] border-gray-5 rounded-md mx-[4px] flex-[0.3_0.3_auto]"
              onClick={() => {
                setShowLogin(false);
                setActiveUser(null);
              }}
            >
              Cancel
            </button>
            <button
              className="border-[1px] border-red-2 rounded-md mx-[4px] flex-[0.3_0.3_auto] py-[13px] bg-red-2 text-white"
              onClick={saveUserActive}
            >
              Confirm
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
