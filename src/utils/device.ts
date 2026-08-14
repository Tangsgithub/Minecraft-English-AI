// Unique Device Fingerprint Utility for 3-Device Binding Limit
export function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') return 'server_device';
  
  let deviceId = localStorage.getItem('mc_device_id');
  if (!deviceId) {
    const userAgentStr = navigator.userAgent || 'unknown_ua';
    const randomHash = Math.random().toString(36).substring(2, 9);
    deviceId = 'dev_' + Date.now().toString(36) + '_' + randomHash;
    localStorage.setItem('mc_device_id', deviceId);
  }
  return deviceId;
}
