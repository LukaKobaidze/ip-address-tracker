export interface informationType {
  ip?: string;
  location?: string;
  timezone?: string;
  isp?: string;
}

export interface coordinatesType {
  latitude?: number;
  longitude?: number;
}

export interface dataType extends informationType, coordinatesType {}
