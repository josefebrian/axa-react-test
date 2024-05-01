import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { get } from 'idb-keyval';
import { toast, ToastContainer } from 'react-toastify';

import Modal from 'react-bootstrap/Modal';

import {
  commentsSelector,
  deleteComment,
  deletePost,
  editComment,
  editPost,
  fetchComments,
  fetchPostList,
  postsSelector
} from './reducer';

import CloseLogo from 'assets/images/close-icon.png';
import EditLogo from 'assets/images/edit-icon.png';
import DeleteLogo from 'assets/images/delete-icon.png';
import { Loader } from 'components';

function App() {
  const dispatch = useDispatch();

  const postsRecords = useSelector(postsSelector);
  const { records, loading } = useSelector(commentsSelector);

  const [activeUser, setActiveUser] = useState(null)
  const [showPost, setShowPost] = useState(false)
  const [activePost, setActivePost] = useState(null)
  const [postsList, setPostsList] = useState(null)
  const [commentList, setCommentList] = useState(null)
  const [activeComments, setActiveComments] = useState(null)
  const [showDelete, setShowDelete] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  useEffect(() => {
    dispatch(fetchPostList());
    getUserActive();
  }, [])

  useEffect(() => {
    if (postsRecords?.length > 0) setPostsList(postsRecords);
  }, [postsRecords])

  useEffect(() => {
    if (records?.length > 0) setCommentList(records);
  }, [records])

  // get active user from idb (local storage)
  const getUserActive = async () => {
    const activeUser = await get("activeUser");
    if (activeUser?.id) setActiveUser(activeUser);
  }

  // get post comments by id
  const getActivePost = async (id) => {
    dispatch(fetchComments({ id }))
  }

  // handle edit and delete of comment and post
  const handleAction = async (action, type, id) => {
    if (type === "comment") {
      if (action === "delete") {
        dispatch(deleteComment({ id }))

        const comments = commentList.filter(val => val.id !== id);
        setCommentList(comments);
        setShowDelete(false);
        setShowPost(true);

        toast.success('Successfully Delete Comment', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
      else if (action === "edit") {
        dispatch(editComment(activeComments))

        const comment = commentList.map(val => {
          if (val.id === id) return { ...activeComments }
          return { ...val }
        })

        setCommentList(comment);
        setShowEdit(false);
        setShowPost(true);

        toast.success('Successfully Edit Comment', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    }
    else if (type === "post") {
      if (action === "delete") {
        dispatch(deletePost({ id }))

        const posts = postsList.filter(val => val.id !== id);
        setPostsList(posts);
        setShowDelete(false);
        setShowPost(false);

        toast.success('Successfully Delete Post', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
      else if (action === "edit") {
        dispatch(editPost(activePost))

        const posts = postsList.map(val => {
          if (val.id === id) return { ...activePost }
          return { ...val }
        })

        setPostsList(posts);
        setShowEdit(false);
        setShowPost(false);

        toast.success('Successfully Edit Post', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    }
  }

  return (
    <>
      <div className="text-center">
        <p className="text-2xl pt-4 font-bold">Posts</p>
        <div className="pt-2 grid grid-cols-3 gap-4">
          {postsList?.map((val, index) => (
            <>
              {val?.userId === activeUser?.id && (
                <div key={index} className="border-[1px] border-red-1 cursor-pointer rounded-lg px-4"
                  onClick={() => {
                    getActivePost(val?.id);
                    setShowPost(true);
                    setActivePost(val);
                  }}
                >
                  <div className="flex flex-col justify-center items-center py-4">
                    <div className="pb-2 font-bold text-lg">
                      {val.title}
                    </div>
                    <div>
                      {val.body}
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>

      {/* Modal Post */}
      <Modal
        show={showPost}
        onHide={() => {
          setShowPost(false);
          setActivePost(null);
          setCommentList(null);
        }}
        keyboard={false}
        dialogClassName="modal-100w"
        size='xl'
      >
        <Modal.Header className="justify-end">
          <Modal.Title>
            <img className="cursor-pointer" width={12} src={CloseLogo} alt="CloseLogo"
              onClick={() => {
                setShowPost(false);
                setActivePost(null);
                setCommentList(null);
              }}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-[40px] py-[24px] bg-gray-2">
          {loading && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}

          {!loading && (
            <>
              <div className="mb-4 rounded-lg drop-shadow-sm">
                <div className="flex items-center gap-2 text-left text-lg font-bold pb-2">
                  <div>
                    {activePost?.title}
                  </div>
                  <div>
                    <img className="cursor-pointer" width={16} src={EditLogo} alt="EditLogo"
                      onClick={() => {
                        setShowEdit("post");
                        setShowPost(false);
                      }}
                    />
                  </div>
                  <div>
                    <img className="cursor-pointer" width={16} src={DeleteLogo} alt="DeleteLogo"
                      onClick={() => {
                        setShowDelete("post");
                        setShowPost(false);
                      }}
                    />
                  </div>
                </div>
                <div className='text-left pb-1'>
                  {activePost?.body}
                </div>
              </div>

              <p className="font-bold pb-1">Comments</p>
              {commentList?.length > 0 ? (
                <div className="bg-gray-4 px-2 py-2">
                  {(commentList || []).map(val => (
                    <div className="py-2">
                      <div className="flex items-center gap-2 text-left font-bold">
                        <div>
                          {val?.email}
                        </div>
                        <div>
                          <img className="cursor-pointer" width={14} src={EditLogo} alt="EditLogo"
                            onClick={() => {
                              setShowEdit("comment");
                              setShowPost(false);
                              setActiveComments(val);
                            }}
                          />
                        </div>
                        <div>
                          <img className="cursor-pointer" width={14} src={DeleteLogo} alt="DeleteLogo"
                            onClick={() => {
                              setShowDelete("comment");
                              setShowPost(false);
                              setActiveComments(val);
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        {val.body}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-4">
                  <div className="text-center py-2 font-bold">No Comments</div>
                </div>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Modal Delete */}
      <Modal
        show={showDelete}
        onHide={() => {
          setShowDelete(false);
          setShowPost(true);
          setActiveComments(null);
        }}
        keyboard={false}
        dialogClassName="modal-25w"
      >
        <Modal.Header className="justify-center">
          <Modal.Title className="text-base font-bold">
            Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-[40px] py-[24px] bg-gray-2">
          <p className="text-base text-center">
            {`Are you sure you want to delete this ${showDelete}`} ?
          </p>
          <div className="flex justify-center pt-3">
            <button
              className="border-[1px] border-gray-5 rounded-md mx-[4px] flex-[0.3_0.3_auto]"
              onClick={() => {
                setShowDelete(false);
                setShowPost(true);
                setActiveComments(null);
              }}
            >
              Cancel
            </button>
            <button
              className="border-[1px] border-red-2 rounded-md mx-[4px] flex-[0.3_0.3_auto] py-[13px] bg-red-2 text-white"
              onClick={() => {
                if (showDelete === "comment") handleAction("delete", showDelete, activeComments?.id)
                else if (showDelete === "post") handleAction("delete", showDelete, activePost?.id)
              }}
            >
              Confirm
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal Edit */}
      <Modal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
          setShowPost(true);
          setActiveComments(null);
        }}
        keyboard={false}
        dialogClassName="modal-100w"
      >
        <Modal.Header className="justify-center">
          <Modal.Title className="text-base font-bold">
            Edit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-[40px] py-[24px] bg-gray-2">
          {showEdit === "post" && (
            <>
              <div>Title</div>
              <div className="mt-1 mb-2">
                <input className="w-full border-[1px] border-solid border-gray-1 text-gray-3 rounded-lg p-2.5" value={activePost?.title}
                  onChange={(e) => {
                    const val = e.target.value
                    setActivePost({ ...activePost, title: val })
                  }}
                />
              </div>

              <div>Body</div>
              <div className="mt-1 mb-4">
                <textarea rows={6} className="w-full border-[1px] border-solid border-gray-1 text-gray-3 rounded-lg p-2.5" value={activePost?.body}
                  onChange={(e) => {
                    const val = e.target.value
                    setActivePost({ ...activePost, body: val })
                  }}
                />
              </div>
            </>
          )}

          {showEdit === "comment" && (
            <>
              <div>Name</div>
              <div className="mt-1 mb-2">
                <input className="w-full border-[1px] border-solid border-gray-1 text-gray-3 rounded-lg p-2.5" value={activeComments?.name}
                  onChange={(e) => {
                    const val = e.target.value
                    setActiveComments({ ...activeComments, name: val })
                  }}
                />
              </div>

              <div>Email</div>
              <div className="mt-1 mb-2">
                <input className="w-full border-[1px] border-solid border-gray-1 text-gray-3 rounded-lg p-2.5" value={activeComments?.email}
                  onChange={(e) => {
                    const val = e.target.value
                    setActiveComments({ ...activeComments, email: val })
                  }}
                />
              </div>

              <div>Body</div>
              <div className="mt-1 mb-4">
                <textarea rows={6} className="w-full border-[1px] border-solid border-gray-1 text-gray-3 rounded-lg p-2.5" value={activeComments?.body}
                  onChange={(e) => {
                    const val = e.target.value
                    setActiveComments({ ...activeComments, body: val })
                  }}
                />
              </div>
            </>
          )}

          <p className="text-base text-center">
            {`Save this ${showEdit}`} ?
          </p>
          <div className="flex justify-center pt-3">
            <button
              className="border-[1px] border-gray-5 rounded-md mx-[4px] flex-[0.3_0.3_auto]"
              onClick={() => {
                setShowEdit(false);
                setShowPost(true);
                setActiveComments(null);
              }}
            >
              Cancel
            </button>
            <button
              className="border-[1px] border-red-2 rounded-md mx-[4px] flex-[0.3_0.3_auto] py-[13px] bg-red-2 text-white"
              onClick={() => {
                if (showEdit === "comment") handleAction("edit", showEdit, activeComments?.id)
                else if (showEdit === "post") handleAction("edit", showEdit, activePost?.id)
              }}
            >
              Save
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <ToastContainer pauseOnFocusLoss={false} />
    </>
  );
}

export default App;
