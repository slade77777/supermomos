import { useRouter } from "next/router";
import Header from "../components/header";
import Image from "next/image";

const Detail = () => {
  const router = useRouter();
  const data = router.query as any;
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#942F70] to-[#FEF452] px-20 pb-20">
      <Header />
      <div className="flex flex-row gap-4 mt-20">
        <div className="w-1/2">
          <div className="text-3xl font-bold bg-[#942F70] w-fit text-white px-2">
            {data.title}
          </div>
          <div className="flex flex-row gap-4 items-center mt-8">
            <Image
              width={36}
              height={36}
              layout={"fixed"}
              src="/images/calendar.svg"
              alt="calendar"
            />
            <p className="text-xl font-bold">
              {new Date(data.startAt).toLocaleString("en-GB", {
                timeZone: "UTC",
              })}
            </p>
          </div>
          <div className="flex flex-row gap-4 items-center mt-8">
            <Image
              width={36}
              height={36}
              layout={"fixed"}
              src="/images/location.svg"
              alt="location"
            />
            <p className="text-xl font-bold">{data.venue}</p>
          </div>
          <div className="flex flex-row gap-4 items-center mt-8">
            <Image
              width={36}
              height={36}
              layout={"fixed"}
              src="/images/capacity.svg"
              alt="capacity"
            />
            <p className="text-xl font-bold">{data.capacity}</p>
            <Image
              width={36}
              height={36}
              layout={"fixed"}
              src="/images/cost.svg"
              alt="cost"
            />
            <p className="text-xl font-bold">{data.price}</p>
          </div>
          <p className="text-md mt-12">{data.description}</p>
        </div>
        <div className="w-1/2">
          <div className="relative cursor-pointer bg-[#F2F2F2]/5 w-98 h-96 rounded-bl-3xl rounded-tr-3xl">
            <Image src={data.banner} layout="fill" alt="bannerChoosing" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
