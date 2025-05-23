import React from "react";
import DeviceCard from "./DeviceCard";
import { Smartphone, Tablet, Tv, Laptop, Gamepad, Headset } from "lucide-react"

function DevicesSection() {
  const devices = [
    {
      title: "Smartphones",
      icon: <Smartphone />,
      description: "MovieSync is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store"
    },
    {
      title: "Tablet",
      icon: <Tablet className="h-6 w-6" />,
      description: "MovieSync is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store"
    },
    {
      title: "Smart TV",
      icon: <Tv className="h-6 w-6" />,
      description: "MovieSync is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store"
    },
    {
      title: "Laptops",
      icon: <Laptop className="h-6 w-6" />,
      description: "MovieSync is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store"
    },
    {
      title: "Gaming Consoles",
      icon: <Gamepad className="h-6 w-6" />,
      description: "MovieSync is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store"
    },
    {
      title: "VR Headsets",
      icon: <Headset className="h-6 w-6" />,
      description: "MovieSync is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store"
    }
  ];

  return (
    <section className="mt-40 w-full h-[669px] max-w-[1129px] max-md:mt-10 max-md:max-w-full">
      <div className="pr-36 w-full max-md:pr-5 max-md:max-w-full">
        <h2 className="text-3xl font-bold text-white max-md:max-w-full">
          We Provide you streaming experience across various devices.
        </h2>
        <p className="mt-2.5 text-base leading-6 text-neutral-400 max-md:max-w-full">
          With MovieSync, you can enjoy your favorite movies and TV shows
          anytime, anywhere. Our platform is designed to be compatible
          with a wide range of devices, ensuring that you never miss a
          moment of entertainment.
        </p>
      </div>

      <div className="mt-16 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-wrap gap-5 items-start w-full max-md:max-w-full">
          {devices.slice(0, 3).map((device, index) => (
            <DeviceCard
              key={index}
              title={device.title}
              icon={device.icon}
              description={device.description}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-5 items-start mt-5 w-full max-md:max-w-full">
          {devices.slice(3).map((device, index) => (
            <DeviceCard
              key={index + 3}
              title={device.title}
              icon={device.icon}
              description={device.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DevicesSection;