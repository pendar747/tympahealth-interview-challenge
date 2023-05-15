import { Client } from "pg";

const databaseUrl =
  process.env.DATABASE_URL ??
  "postgres://tympahealthserver:server-pass@localhost:5432/tympahealth";

export const client = new Client(databaseUrl);

export const setupDB = async () => {
  await client.connect();

  await client.query(`
    CREATE table IF NOT EXISTS tbl_device
    (
      device_id varchar not null,
      device_status_code varchar default 'NEW' not null,
        tenant_id varchar default NULL,
      device_make varchar default NULL,
      device_model varchar default NULL,
      device_activation_code varchar default  floor(random() * (99999-10000+1) + 10000)::text not null,
      device_os_version varchar default NULL,
      device_settings_json json default NULL,
      device_projects_json json default NULL,
      app_identifier varchar default NULL,
      app_version varchar default NULL,
      created_datetime timestamp default CURRENT_TIMESTAMP not null,
      last_updated_datetime timestamp default CURRENT_TIMESTAMP not null,
      last_updated_ip varchar default NULL,
      constraint tbl_device_pk primary key (device_id)
    );
  `);

  await client.query(
    `CREATE UNIQUE INDEX IF NOT EXISTS tbl_device_device_id_uindex ON tbl_device (device_id);`
  );
};
