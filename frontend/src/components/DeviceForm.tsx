import { useRouter } from "next/router";
import React, { FC, useState } from "react";

const DeviceForm: FC<{ device?: tympahealth.Device }> = ({
  device = {
    device_make: "",
    device_model: "",
    device_os_version: "",
  },
}) => {
  const [deviceData, setDeviceData] = useState(device);
  const router = useRouter();

  const operation = device.device_id ? "Update" : "Create";

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setDeviceData({
      ...deviceData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/devices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deviceData),
      });
      if (operation === "Create") {
        setDeviceData({
          device_make: "",
          device_model: "",
          device_os_version: "",
        });
        router.replace(router.asPath);
      } else {
        router.replace("/");
      }
    } catch (error) {
      console.error("error creating devices", error);
    }
  };

  return (
    <div>
      <h2>Create Device</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="device_make" className="form-label">
            Device Make
          </label>
          <input
            type="text"
            className="form-control"
            id="device_make"
            name="device_make"
            value={deviceData.device_make}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="device_model" className="form-label">
            Device Model
          </label>
          <input
            type="text"
            className="form-control"
            id="device_model"
            name="device_model"
            value={deviceData.device_model}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="device_os_version" className="form-label">
            Device OS Version
          </label>
          <input
            type="text"
            className="form-control"
            id="device_os_version"
            name="device_os_version"
            value={deviceData.device_os_version}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {operation}
        </button>
      </form>
    </div>
  );
};

export default DeviceForm;
