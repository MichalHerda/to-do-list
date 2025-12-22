function UserInfo({ username, onLogout }) {
  return (
    <div className="w-full flex justify-between items-center px-6 py-3 border-b border-gray-700 bg-gray-800">
      <span className="text-gray-300">
        Logged in as <strong className="text-white">{username}</strong>
      </span>

      <button
        onClick={onLogout}
        className="text-sm text-red-400 hover:text-red-300"
      >
        Logout
      </button>
    </div>
  )
}

export default UserInfo
