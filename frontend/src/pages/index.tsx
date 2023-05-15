import DeviceForm from "@/components/DeviceForm";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { FC } from "react";

export const getStaticProps: GetStaticProps<{
  devices: tympahealth.Device[];
}> = async () => {
  try {
    const res = await fetch("http://localhost:9000/devices");
    const devices: tympahealth.Device[] = await res.json();
    const sorted = devices.sort((a, b) =>
      a.device_os_version.toUpperCase() > b.device_os_version.toUpperCase()
        ? 1
        : -1
    );
    return {
      props: {
        devices: sorted,
      },
    };
  } catch (error) {
    console.error("error loading data", error);
    return {
      props: {
        devices: [],
      },
    };
  }
};

const Home: FC<{ devices: tympahealth.Device[] }> = ({ devices }) => {
  const router = useRouter();
  const handleDelete = async (device_id: string) => {
    try {
      await fetch(`/api/devices/${device_id}`, {
        method: "DELETE",
      });
      router.replace(router.asPath);
    } catch (error) {
      console.log("error deleting device", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Add device</h2>
          <DeviceForm />
        </div>
        <div className="col">
          <h2 className="mt-4 mb-3">Device List</h2>
          {devices.length === 0 ? (
            <p>Loading devices...</p>
          ) : (
            <ul className="list-group">
              {devices.map((device) => (
                <li key={device.device_id} className="list-group-item">
                  <h5 className="mb-2">{device.device_make}</h5>
                  <p className="mb-1">
                    <strong>Model:</strong> {device.device_model}
                  </p>
                  <p className="mb-1">
                    <strong>OS:</strong> {device.device_os_version}
                  </p>
                  <p className="mb-1">
                    <strong>Release Date:</strong> {device.created_datetime}
                  </p>
                  <p>
                    <button
                      className="btn btn-sm btn-primary m-1"
                      onClick={() =>
                        router.replace(`/edit/${device.device_id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(device.device_id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
