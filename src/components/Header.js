import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { del, get } from 'idb-keyval';

import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';

import Logo from 'assets/images/users.png';

const Header = () => {
  const navigate = useNavigate();

  const [showLogout, setShowLogout] = useState(false)
  const [activeUser, setActiveUser] = useState(null)

  useEffect(() => {
    getUserActive();
  }, [])

  // get active user from idb (local storage)
  const getUserActive = async () => {
    const activeUser = await get("activeUser");
    if (activeUser?.id) setActiveUser(activeUser);
    else navigate("/")
  }

  // delete active user from idb (local storage) if the user logged out
  const handleLogout = async () => {
    setShowLogout(false);
    await del("activeUser");
    navigate("/")
  }

  return (
    <div className="cms-header">
      <div className="container">
        <div className="">
          <Dropdown align={{ sm: 'end' }}>
            <Dropdown.Toggle className="bg-gray-dark cms-header__account__wrapper">
              <div className="wrapper-user">
                <img src={Logo} alt="Logo" />
              </div>
              <span className="fs-12"> {activeUser?.username || "user"} </span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setShowLogout(true)}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Modal
        show={showLogout}
        onHide={() => setShowLogout(false)}
        keyboard={false}
        dialogClassName="modal-25w"
      >
        <Modal.Header className="justify-center">
          <Modal.Title className="text-base font-bold">
            Logout
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-[40px] py-[24px] bg-gray-2">
          <p className="text-base text-center">
            Are you sure you want to logout ?
          </p>
          <div className="flex justify-center pt-3">
            <button
              className="border-[1px] border-gray-5 rounded-md mx-[4px] flex-[0.3_0.3_auto]"
              onClick={() => setShowLogout(false)}
            >
              Cancel
            </button>
            <button
              className="border-[1px] border-red-2 rounded-md mx-[4px] flex-[0.3_0.3_auto] py-[13px] bg-red-2 text-white"
              onClick={handleLogout}
            >
              Confirm
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Header;
