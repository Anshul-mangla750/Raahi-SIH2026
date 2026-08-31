import { User } from './User';
import { District } from './District';
import { Road } from './Road';
import { Bridge } from './Bridge';
import { Route } from './Route';
import { RiskScore } from './RiskScore';
import { Vehicle } from './Vehicle';
import { Driver } from './Driver';
import { Trip } from './Trip';
import { Delivery } from './Delivery';

// Define Associations
District.hasMany(Road, { foreignKey: 'district_id', as: 'roads' });
Road.belongsTo(District, { foreignKey: 'district_id', as: 'district' });

Road.hasMany(Bridge, { foreignKey: 'road_id', as: 'bridges' });
Bridge.belongsTo(Road, { foreignKey: 'road_id', as: 'road' });

District.hasMany(Bridge, { foreignKey: 'district_id', as: 'bridges' });
Bridge.belongsTo(District, { foreignKey: 'district_id', as: 'district' });

Route.hasMany(RiskScore, { foreignKey: 'route_id', as: 'risk_scores' });
RiskScore.belongsTo(Route, { foreignKey: 'route_id', as: 'route' });

Vehicle.hasOne(Driver, { foreignKey: 'vehicle_id', as: 'driver' });
Driver.belongsTo(Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' });

Vehicle.hasMany(Trip, { foreignKey: 'vehicle_id', as: 'trips' });
Trip.belongsTo(Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' });

Driver.hasMany(Trip, { foreignKey: 'driver_id', as: 'trips' });
Trip.belongsTo(Driver, { foreignKey: 'driver_id', as: 'driver' });

Route.hasMany(Trip, { foreignKey: 'route_id', as: 'trips' });
Trip.belongsTo(Route, { foreignKey: 'route_id', as: 'route' });

Trip.hasMany(Delivery, { foreignKey: 'trip_id', as: 'deliveries' });
Delivery.belongsTo(Trip, { foreignKey: 'trip_id', as: 'trip' });

export {
  User,
  District,
  Road,
  Bridge,
  Route,
  RiskScore,
  Vehicle,
  Driver,
  Trip,
  Delivery,
};
