import DeviceForm from "@/components/DeviceForm";
import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch("http://localhost:9000/devices");
    const devices: tympahealth.Device[] = await res.json();
    return {
      paths: devices.map((device) => ({
        params: {
          device_id: device.device_id,
        },
      })),
      fallback: true,
    };
  } catch (error) {
    console.error("error loading paths", error);
    return {
      notFound: true,
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps<{
  device: tympahealth.Device;
}> = async (context) => {
  try {
    const res = await fetch(
      `${process.env.apiUrl}/devices/${context.params?.device_id}`
    );
    const device: tympahealth.Device = await res.json();
    return {
      props: {
        device,
      },
    };
  } catch (error) {
    console.error("error loading data", error);
    return {
      notFound: true,
    };
  }
};

const EditDevicePage: FC<{ device: tympahealth.Device }> = ({ device }) => {
  return (
    <div className="container">
      <h2>Edit device</h2>
      <DeviceForm device={device} />
    </div>
  );
};

export default EditDevicePage;
