import Head from "next/head";
import Header from "../components/header";
import Image from "next/image";
import {
  Input,
  Textarea,
  Checkbox,
  Radio,
  Button,
  Modal,
  useModal,
  Loading,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";

const banners = [
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_1.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_2.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_3.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_4.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_5.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_6.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_7.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_8.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_9.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_10.jpg",
];

const engines = ["Engineering", "Product", "Marketing", "Design"];

const schema = yup
  .object({
    title: yup.string().required("Please fill title"),
    startAt: yup.string().required("Please fill time"),
    venue: yup.string().required("Please fill venue"),
    capacity: yup.string().required("Please fill capacity"),
    price: yup.string().required("Please fill price"),
    description: yup.string().required("Please fill description"),
    banner: yup.string().required("Please fill banner"),
  })
  .required();

export default function Home() {
  const { setVisible, bindings } = useModal();

  const closeHandler = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: "",
      tags: [],
      venue: "",
      description: "",
      privacy: "",
      capacity: "",
      price: "",
      isManualApprove: false,
      banner: "",
      startAt: new Date(),
    },
  });

  const bannerChoosing = watch("banner");
  const startAt = watch("startAt");
  const router = useRouter();

  const onSubmit = useCallback(
    (data: any) => {
      fetch(
        "https://1p8s3jhf8j.execute-api.us-east-1.amazonaws.com/Supermomos/interview/social",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((res) =>
          router.push({ pathname: "/detail", query: res }, "/detail")
        )
        .catch((e) => alert("Something wrong!"))
        .finally(() => setSubmitting(false));
    },
    [router]
  );

  return (
    <>
      <Head>
        <title>Supermomos</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gradient-to-t from-[#942F70] to-[#FEF452] px-20 pb-20">
        <Header />
        <div className="mt-20 flex flex-row">
          <div className="w-1/2">
            <Input placeholder="Event Title" size="lg" {...register("title")} />
            <div className="flex flex-row mt-8 gap-4 items-center">
              <Image
                width={36}
                height={36}
                layout={"fixed"}
                src="/images/calendar.svg"
                alt="calendar"
              />
              <DatePicker
                selected={startAt}
                onChange={(date) => date && setValue("startAt", date)}
                showTimeSelect
                className="w-60 px-4 h-12 rounded-xl"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
            <div className="flex flex-row mt-8 gap-4">
              <Image
                width={36}
                height={36}
                layout={"fixed"}
                src="/images/location.svg"
                alt="location"
              />
              <Input placeholder="Location" {...register("venue")} />
            </div>
            <div className="flex flex-row mt-8 gap-4">
              <Image
                width={36}
                height={36}
                layout={"fixed"}
                src="/images/capacity.svg"
                alt="capacity"
              />
              <Input placeholder="Max capacity" {...register("capacity")} />
              <Image
                width={36}
                height={36}
                layout={"fixed"}
                src="/images/cost.svg"
                alt="cost"
              />
              <Input placeholder="Cost per person" {...register("price")} />
            </div>
            <div className="mt-20">
              <p className="text-xl mb-4">Description</p>
              <Textarea
                placeholder="Description of your event.."
                rows={8}
                size="lg"
                // @ts-ignore
                width={600}
                {...register("description")}
              />
            </div>
            <div className="mt-8 bg-white rounded-xl p-8">
              <div className="text-[#942F70] text-3xl font-bold mb-4">
                Settings
              </div>
              <Checkbox
                onChange={(checked) => setValue("isManualApprove", checked)}
              >
                I want to approve attendees
              </Checkbox>
              <div className="mt-4" />
              <Radio.Group
                orientation="horizontal"
                label="Privacy"
                defaultValue="primary"
                onChange={(val) => setValue("privacy", val)}
              >
                <Radio value="public" color="primary">
                  Public
                </Radio>
                <Radio value="curated Audience" color="primary">
                  Curated Audience
                </Radio>
                <Radio value="community only" color="primary">
                  Community Only
                </Radio>
              </Radio.Group>
              <p className="mt-4 text-xl">Tag your social</p>
              <p>Pick tags for our curation engine to work its magin</p>
              <Controller
                name="tags"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="flex flex-row gap-4">
                    {engines.map((en, i) => (
                      <Checkbox
                        // @ts-ignore
                        isSelected={value.includes(en)}
                        key={i}
                        onChange={(checked) => {
                          if (checked) {
                            onChange([...value, en]);
                          } else {
                            onChange(value.filter((v) => v !== en));
                          }
                        }}
                      >
                        {en}
                      </Checkbox>
                    ))}
                  </div>
                )}
              />
            </div>
            <div className="mt-4 w-full flex flex-col justify-center">
              <Button
                onClick={handleSubmit(onSubmit)}
                color="warning"
                size="lg"
                disabled={!isValid}
              >
                {submitting ? (
                  <Loading color="currentColor" size="sm" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
          <div className="w-1/2">
            <div
              onClick={() => setVisible(true)}
              className="relative cursor-pointer bg-[#F2F2F2]/5 w-98 border-dashed h-96 rounded-tr-3xl border-4 rounded-bl-3xl border-white flex items-center justify-center"
            >
              {bannerChoosing ? (
                <Image
                  src={bannerChoosing}
                  layout="fill"
                  alt="bannerChoosing"
                />
              ) : (
                <div className="flex flex-row gap-4">
                  <Image
                    width={36}
                    height={36}
                    layout={"fixed"}
                    src="/images/banner.svg"
                    alt="banner"
                  />
                  <p>Add a banner</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal {...bindings} onClose={closeHandler} closeButton width="900px">
        <Modal.Header>
          <p className="text-xl font-bold">Choose a Banner</p>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-row flex-wrap w-full gap-4">
            {banners.map((ba, i) => (
              <Image
                onClick={() => {
                  setValue("banner", ba);
                  closeHandler();
                }}
                key={i}
                width={200}
                height={100}
                layout={"fixed"}
                src={ba}
                alt="banner"
              />
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
