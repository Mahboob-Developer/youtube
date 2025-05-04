import VideoWatch from "@/app/component/Watch/VideoWatch";
import Api from "@/app/component/Home/VideoList.json"; 
import RelatedVideo from "@/app/component/Watch/RelatedVideo";
import VList from "@/app/component/Home/VList";

// Get the video data from the static JSON
async function getVideoData(slug) {
  const video = Api; 
  const videoData = video.videoList.find((item) => item.slug === slug);
  const relatedVideo = video.videoList.filter((item) => item.slug !== slug);
  return { videoData, relatedVideo };
}

export default async function Page({ searchParams }) {
  const slug = searchParams.slug; 
  const { videoData, relatedVideo } = await getVideoData(slug);
  
  if (!videoData) {
    return <div>Video not found!</div>; 
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="container row">
        <div className="col-md-8 py-2 ">
          {/* Pass videoData as a prop to VideoWatch */}
          <VideoWatch video={videoData} />
        </div>
        <div className="col-md-4">
          {relatedVideo.map((video) => (
            <div key={video.slug}>
              <span  className="d-md-block d-none">
                <RelatedVideo video={video}/>
              </span>
              <span className="d-md-none d-block">
                <VList list={video}/>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
