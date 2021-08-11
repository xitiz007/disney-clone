import ShowThumbnail from "./ShowThumbnail";

function ShowsCollection({ shows, title }) 
{
  return (
    <section className="flex flex-col space-y-2 my-10 px-8 max-w-[1400px] mx-auto">
      <h2 className="font-semibold">{title}</h2>
      <div className="flex space-x-6 overflow-y-hidden overflow-x-scroll scrollbar-hide p-2 -m-2">
        {shows.map((show) => (
          <ShowThumbnail key={show.id} show={show} />
        ))}
      </div>
    </section>
  );
}

export default ShowsCollection
