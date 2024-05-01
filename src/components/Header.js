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
        <Modal.Header style={{ justifyContent: 'center' }}>
          <Modal.Title style={{ fontSize: '16px', fontWeight: 'bold' }}>
            Logout
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="notifications" style={{ padding: "24px 40px", backgroundColor: '#F5F6F6' }}>
          <p style={{ fontSize: '16px', textAlign: 'center' }}>
            Are you sure you want to logout ?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '1rem' }}>
            <button
              style={{ flex: '0.3 0.3 auto', margin: '0 4px', padding: '10px 0', border: '1px solid #cccccc', borderRadius: '5px' }}
              onClick={() => setShowLogout(false)}
            >
              Cancel
            </button>
            <button
              style={{
                flex: '0.3 0.3 auto', margin: '0 4px', padding: '13px 0', backgroundColor: '#FF0C2B',
                color: 'white', border: '1px solid #FF0C2B', borderRadius: '5px'
              }}
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
