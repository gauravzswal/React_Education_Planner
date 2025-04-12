import { useEffect, useState } from "react";

function App() {
  const [subject, setSubject] = useState("");
  const [hour, setHour] = useState("");
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("savedData");
    return saved ? JSON.parse(saved) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("savedData", JSON.stringify(data));
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();
    const obj = {
      id: Date.now(),
      subject: subject,
      hour: Number(hour),
    };
    
    setSubject("");
    setHour("");
    setData([...data, obj]);
  }

  function handleAdd(id, sign) {
    const updatedData = data.map((obj) =>
      // obj.id === id
      //   ? sign === "+"
      //     ? { ...obj, hour: obj.hour + 1 }
      //     : { ...obj, hour: obj.hour - 1 }
      //   : obj
      obj.id === id && sign === "+" ? { ...obj, hour: obj.hour + 1 } : { ...obj, hour: obj.hour - 1 }
    );
    setData(updatedData);
  }

  console.log(data);

  return (
    <>
      <div className=" flex flex-col w-[40vw] m-auto mt-30 gap-4">
        <h1 className=" text-2xl font-bold">Geekster Education Planner</h1>
        <form action="" className="flex mt-4 gap-4">
          <input
            type="text"
            placeholder="Subject"
            className="border-1 p-2 rounded-lg"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <input
            type="number"
            placeholder="Hours"
            className="border-1 p-2 rounded-lg w-20"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />
          <button
            type="submit"
            className="px-2 py-2 border-1 rounded-lg w-20 bg-pink-400 cursor-pointer"
            onClick={handleSubmit}
          >
            Add
          </button>
        </form>

        {data.length > 0 &&
          data.map((obj) => {
            return (
              <div className="flex gap-2 items-center">
                <p className="text-white">
                  {obj.subject} - {obj.hour} Hours
                </p>
                <div
                  onClick={() => {
                    handleAdd(obj.id, "+");
                  }}
                  className=" w-8 h-8 text-center border-1 rounded  bg-green-400 cursor-pointer text-white border-none "
                >
                  +
                </div>
                <div
                  onClick={() => {
                    handleAdd(obj.id, "-");
                  }}
                  className="w-8 h-8 text-center border-1 rounded  bg-red-400 cursor-pointer text-white border-none "
                >
                  -
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
