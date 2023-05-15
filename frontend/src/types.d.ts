namespace tympahealth {
  interface Device {
    device_id: string;
    device_status_code: string;
    tenant_id: string;
    device_make: string;
    device_model: string;
    device_activation_code: string;
    device_os_version: string;
    device_settings_json: any;
    device_projects_json: any;
    app_identifier: any;
    app_version: any;
    last_updated_ip: any;
    created_datetime: string;
    last_updated_datetime: string;
  }
}
