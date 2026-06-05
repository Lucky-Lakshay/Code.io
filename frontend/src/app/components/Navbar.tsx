export default function Navbar({ username, onLeave }) {
  return (
    <nav className="w-full flex justify-between p-2 items-center">
      <div className="font-bold">Code.io</div>
      <div className="">{username}</div>
      <button onClick={onLeave} className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white font-medium rounded transition-colors">Leave Room</button>
    </nav>
  );
}