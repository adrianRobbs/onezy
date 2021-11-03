import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";

function App() {
  return (
    <>
      <h1>Home</h1>
      <Link href="/login">
        <a>login</a>
      </Link>
      <br />
      <Link href="/profile">
        <a>Profile</a>
      </Link>
    </>
  );
}

export default App;
