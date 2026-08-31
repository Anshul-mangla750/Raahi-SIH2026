export declare class MLProxyService {
    static calculateRouteScore(data: {
        routeId: string;
        roadIds?: string[];
        weatherSnapshot?: any;
        slopeRisk?: number;
        roadCondition?: string;
    }): Promise<any>;
    static predictDisruption(districtId: string, weatherSnapshot?: any): Promise<unknown>;
    static suggestAlternateRoute(originDistrictId: string, destDistrictId: string): Promise<{
        primaryRoute: {
            origin: string;
            destination: string;
            distanceKm: number;
            estimatedHours: number;
            riskScore: number;
        };
        alternateRoutes: {
            name: string;
            distanceKm: number;
            estimatedHours: number;
            riskScore: number;
            efficiencyGain: string;
        }[];
    }>;
}
//# sourceMappingURL=ml-proxy.service.d.ts.map