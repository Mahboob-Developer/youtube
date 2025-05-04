import VList from "./VList";
import Api from "./VideoList.json"; 

export default async function VideoList() {
  const videoList = Api.videoList;
  return (
    <>
      <div className=" row">
        {videoList.map((list, index) => {
          return (
            <div className="col-md-4" key={index}>
              <VList list={list} />
            </div>
          );
        })}
      </div>
    </>
  );
}
