import { useCallback, useState, useEffect, useRef, useLayoutEffect } from "react";
function App() {
  const [length, setLength] = useState(8);
  const [charAllow, setCharAllow] = useState(false);
  const [numberAllow, setNumberAllow] = useState(false);
  const [password, setPassword] = useState();
  const [copy, setCopy] = useState("copy");

  const passwordGenerator = useCallback(() => {
    let password = "";
    let string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let specialCharacters = `!@#$%^&*()_+-=[]{}|;:'",.<>?/\\~\``;
    let number = "0123456789";
    if (numberAllow) string += number;
    if (charAllow) string += specialCharacters;
    for (let i = 1; i <= length; i++) {
      let rand = Math.floor(Math.random() * string.length + 1);
      password += string.charAt(rand);
    }
    setPassword(password);
  }, [length, charAllow, numberAllow, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, charAllow, numberAllow, setPassword, passwordGenerator]);

  useEffect(()=>{
    setCopy("copy")
  },[password])
  const btnclick = useCallback(
    () => {
      passRef.current?.select()
      window.navigator.clipboard.writeText(password)
      setCopy("copied")
    },
    [password],
  )
  

  const passRef = useRef(null);

  return (
    <div className="w-full gap-3 max-w-md bg-gray-600 rounded-2xl py-3 flex flex-col">
      <h1 className="text-2xl font-extrabold text-black self-center">
        Password Generator
      </h1>
      <div className="flex gap-2 p-1">
        <input
          type="text"
          placeholder="password"
          readOnly
          ref={passRef}
          value={password}
          className="outline-none grow bg-gray-200 rounded text-orange-600 text-xl"
        />
        <button
          onClick={btnclick}
          className="px-5 text-xl py-1 font-bold rounded-2xl flex justify-center cursor-pointer hover:bg-blue-400 items-center bg-blue-300"
        >
          {copy}
        </button>
      </div>
      <div className="flex justify-center gap-2">
        <input
          type="range"
          min={8}
          max={25}
          value={length}
          className="cursor-pointer text-orange-600"
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
        <label className="bg-gray-300 px-2 py-1 rounded text-black font-semibold">
          length: {length}
        </label>
        <input
          type="checkbox"
          defaultChecked={numberAllow}
          onChange={() => {
            setNumberAllow((value) => !value);
          }}
        />
        <label>Numbers</label>
        <input
          type="checkbox"
          defaultChecked={charAllow}
          onChange={() => {
            setCharAllow((value) => !value);
          }}
        />
        <label>characters</label>
      </div>
    </div>
  );
}

export default App;
