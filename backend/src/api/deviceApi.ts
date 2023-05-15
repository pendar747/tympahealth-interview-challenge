import { Router } from "express";
import { client } from "../db/client";
const deviceApi = Router();
import * as uuid from "uuid";

// Get all devices
deviceApi.get("/", async (req, res, next) => {
  try {
    const queryRes = await client.query("SELECT * from tbl_device;");
    res.json(queryRes.rows);
  } catch (error) {
    next(error);
  }
});

// Create a device
deviceApi.post("/", async (req, res, next) => {
  try {
    const {
      device_status_code = "NEW",
      tenant_id = null,
      device_make = null,
      device_model = null,
      device_os_version = null,
      device_settings_json = null,
      device_projects_json = null,
      app_identifier = null,
      app_version = null,
      last_updated_ip = null,
    } = req.body;

    const device_activation_code = Math.floor(
      Math.random() * (99999 - 10000 + 1) + 10000
    ).toString();
    const device_id = uuid.v4();

    const query = `
      INSERT INTO tbl_device (
        device_id, device_status_code, tenant_id, device_make, device_model,
        device_activation_code, device_os_version, device_settings_json,
        device_projects_json, app_identifier, app_version, last_updated_ip
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `;

    const values = [
      device_id,
      device_status_code,
      tenant_id,
      device_make,
      device_model,
      device_activation_code,
      device_os_version,
      device_settings_json,
      device_projects_json,
      app_identifier,
      app_version,
      last_updated_ip,
    ];

    const result = await client.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating device:", error);
    next(error);
  }
});

// Delete a device by ID
deviceApi.delete("/:device_id", async (req, res, next) => {
  try {
    const { device_id } = req.params;

    const query = "DELETE FROM tbl_device WHERE device_id = $1 RETURNING *";
    const values = [device_id];

    const result = await client.query(query, values);

    if (result.rowCount === 0) {
      res.status(404).json({ error: "Device not found" });
    } else {
      res.status(200).json({ message: "Device deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting device:", error);
    next(error);
  }
});

// Update a device by ID
deviceApi.put("/devices/:device_id", async (req, res) => {
  try {
    const { device_id } = req.params;

    const {
      device_status_code,
      tenant_id,
      device_make,
      device_model,
      device_os_version,
      device_settings_json,
      device_projects_json,
      app_identifier,
      app_version,
      last_updated_ip,
    } = req.body;

    const query = `
      UPDATE tbl_device
      SET device_status_code = $2,
          tenant_id = $3,
          device_make = $4,
          device_model = $5,
          device_os_version = $6,
          device_settings_json = $7,
          device_projects_json = $8,
          app_identifier = $9,
          app_version = $10,
          last_updated_ip = $11,
          last_updated_datetime = CURRENT_TIMESTAMP
      WHERE device_id = $1
      RETURNING *
    `;

    const values = [
      device_id,
      device_status_code,
      tenant_id,
      device_make,
      device_model,
      device_os_version,
      device_settings_json,
      device_projects_json,
      app_identifier,
      app_version,
      last_updated_ip,
    ];

    const result = await client.query(query, values);

    if (result.rowCount === 0) {
      res.status(404).json({ error: "Device not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error updating device:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default deviceApi;
