import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="text-center">
        <p className="text-2xl pt-4 font-bold">Menu</p>
        <div className="flex justify-between gap-4 pt-2">
          <div className="pt-2 w-1/2">
            <div className="border-[1px] border-red-1 cursor-pointer rounded-lg px-4"
              onClick={() => navigate("/posts")}
            >
              <div className="flex flex-col justify-center items-center py-4">
                <div className="pb-2 font-bold text-lg">
                  {"Posts"}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 w-1/2">
            <div className="border-[1px] border-red-1 cursor-pointer rounded-lg px-4"
              onClick={() => navigate("/albums")}
            >
              <div className="flex flex-col justify-center items-center py-4">
                <div className="pb-2 font-bold text-lg">
                  {"Albums"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
