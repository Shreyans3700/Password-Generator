import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState("");

  //ref hook
  const passwordReference = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "~`!@#%^&*(){}'<>?|+-_=";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  let copyPasswordToClipBoard = useCallback(() => {
    passwordReference.current?.select();
    // passwordReference.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <h1 className="text-4xl text-center text-white">Password Generator</h1>
      <div
        className="w-full max-w-md mx-auto shadow-md rounded-lg
      px-4 my-8 text-orange-500 bg-gray-700 text-center "
      >
        Password
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 mx-3 my-3 rounded-md"
            placeholder="password"
            readOnly
            ref={passwordReference}
          />
          <button
            className="outline-none bg-blue-700 text-white
          px-3 py-0.5 shrink-0 my-3 rounded-md"
            onClick={copyPasswordToClipBoard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer my-1"
              onChange={(event) => {
                setLength(event.target.value);
              }}
            />
            <label> Length :{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterId">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
