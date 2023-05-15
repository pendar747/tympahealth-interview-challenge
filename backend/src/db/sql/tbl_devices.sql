CREATE table tbl_device
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
	last_updated_ip varchar default NULL
);

create unique index tbl_device_device_id_uindex
	on tbl_device (device_id);

alter table tbl_device
	add constraint tbl_device_pk
		primary key (device_id);

