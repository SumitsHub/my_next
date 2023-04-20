import React, { useEffect, useRef, useState } from 'react'
import { submitComment } from '../services'

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const commentElement = useRef()
  const nameElement = useRef()
  const emailElement = useRef()
  const storeDataElement = useRef()

  useEffect(()=>{
    nameElement.current.value = window.localStorage.getItem('name');
    emailElement.current.value = window.localStorage.getItem('email');
  }, [])

  const handleCommentSubmit = () => {
    setError(false)
    const { value: comment } = commentElement.current
    const { value: name } = nameElement.current
    const { value: email } = emailElement.current
    const { value: storeData } = storeDataElement.current
    if (!comment || !name || !email) {
      setError(true)
      return
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    }

    if (storeData) {
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    } else {
      window.localStorage.removeItem('name')
      window.localStorage.removeItem('email')
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
    })
  }
  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">Leave a comment</h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          ref={commentElement}
          className="w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          type="text"
          ref={nameElement}
          className="w-full rounded-lg bg-gray-100 py-2 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Name"
          name="name"
        />
        <input
          type="text"
          ref={emailElement}
          className="w-full rounded-lg bg-gray-100 py-2 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Email"
          name="email"
        />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4">
        <div>
          <input
            type="checkbox"
            ref={storeDataElement}
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            htmlFor="storeDate"
            className="ml-2 cursor-pointer text-gray-500"
          >
            Save my email and name for the next time I comment
          </label>
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-500">All fields are required!</p>
      )}

      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmit}
          className="ease inline-block cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg text-white transition duration-500 hover:bg-indigo-900"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="float-right mt-3 text-xl font-semibold text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentsForm
