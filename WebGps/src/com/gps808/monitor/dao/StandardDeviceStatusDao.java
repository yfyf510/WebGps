package com.gps808.monitor.dao;

import java.util.Date;
import java.util.List;

import com.gps808.model.StandardDeviceGps;
import com.gps808.model.StandardDeviceStatus;
import com.gps808.model.StandardTransportGps;

public interface StandardDeviceStatusDao {
	public abstract List<StandardDeviceStatus> getStandardDeviceStatus();
	public abstract List<StandardDeviceGps> getStandardDeviceStatus(String devIDNO);
	
}
